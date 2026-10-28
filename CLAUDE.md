# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

React 19 + TypeScript SPA (Vite, Mantine 9 UI) — the frontend for an ESD thesis project. No Figma design; mockups live in tldraw (linked in README.md). The dev server proxies `/api/*` to a backend at `http://backend:8000`, rewriting to `/api/v1/*` (see `vite.config.mjs`).

## Commands

Package manager is **npm**. Use `npm install` to install, `npm run <script>` to run scripts (matches existing scripts/CI).

- `npm install` — install dependencies
- `npm run dev` — start Vite dev server (port 5173)
- `npm run build` — `tsc` then `vite build` (type errors fail the build)
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — oxlint + stylelint (`npm run oxlint`, `npm run stylelint` individually)
- `npm run format:test` / `npm run format:write` — oxfmt check/write for `**/*.{ts,tsx,css}`
- `npm run vitest` / `npm run vitest:watch` — run/watch unit tests (Vitest + jsdom + RTL)
- `npm test` — full gate: typecheck → format:test → lint → vitest → build (this is what CI runs, minus install)
- Single test file: `npx vitest run path/to/File.test.tsx`

CI (`.github/workflows/npm_test.yml`) runs on every PR: install with npm, then `npm run build` and `npm test`.

Pre-commit hooks (`.pre-commit-config.yaml`, install via `pre-commit`) run `tsc`, then lint and format (`scripts/pre-commit-lint.sh`, `scripts/pre-commit-format.sh`) on staged `.ts`/`.tsx`/`.json` files only, auto-fixing and re-staging format issues.

## Architecture

**State management** (`src/config/`): Redux Toolkit store composed from `src/config/reducers/index.ts`, wrapped in `redux-persist` (only the `app` slice — theme — and the `conversation` slice — the open conversation's id — are persisted; RTK Query cache and `auth` are not). Slices:
- `auth.reducer.ts` — holds the current user/auth status (`user`, `isAuthenticated`, `isLoading`). It has no thunk of its own: `store.ts` dispatches `api.endpoints.getUserMe.initiate()` once on store creation, and the slice mirrors that query through `extraReducers` matchers (`matchPending`/`matchFulfilled`/`matchRejected`, ignoring condition-skipped rejections). Read the user with `useAppSelector((state) => state.auth.user)`.
- **Login**: `src/homepage/hooks/use-login-modal.ts` (behind `src/homepage/components/login-modal.tsx`) does a hard `window.location.href` redirect to the backend's `/oauth2/authorization/{google|github}` (leaving the SPA entirely) — there's no in-app callback route; the backend redirects back to the frontend origin after the OAuth2 handshake, and a fresh page load re-runs `getUserMe`.
- **Logout**: on settle (not just success) of `api.useLogoutMutation()`, the `auth` slice resets itself via `logout.matchFulfilled`/`matchRejected` matchers, and the mutation's `onQueryStarted` dispatches `api.util.resetApiState()` in a `finally`, so the `auth` slice and the entire RTK Query cache are cleared even if the `POST /api/logout` call itself fails — avoids leaving stale "still logged in" UI or a previous user's cached data (e.g. documents) after logout.
- `app.reducer.ts` — UI-level state (currently just `theme`).
- `conversation.reducer.ts` — id of the conversation the chat is showing. On load the chat re-fetches it, or adopts `GET /conversations/latest` when none is stored; "New conversation" clears it and suppresses that adoption.
- `loading.reducer.ts` — single global `isLoading` boolean, transient (not persisted). See the loading-state convention below.
- `modals.reducer.ts` — open/closed flag per modal (`ModalName`: `login`, `uploadTrilogy`), transient (not persisted, so every modal starts closed on reload). See the modal convention below.
- API slice (`src/config/api.ts`) — RTK Query `createApi` using a custom `axiosBaseQuery` (`src/config/axios-config.ts`) instead of `fetchBaseQuery`, so all RTK Query calls go through axios with `withCredentials: true` (cookie-based auth, no bearer token). Endpoints opt into response validation with `extraOptions: { dataSchema: <zod schema> }` (schemas from `src/shared/dto/*`); `axiosBaseQuery` `safeParse`s the response and returns an error on mismatch. Make the schema match the backend DTO exactly (including nullable columns) — a mismatch turns a 200 into a failed query (for `getUserMe`, that logs the user out).

**Routing** (`src/config/create-router.tsx`): `react-router-dom` data router. Top-level split between logged-out (`/`, `HomePage` in `src/homepage/home.page.tsx` — welcome page with a login button) and logged-in (`/app`, `MainApp` shell in `src/main-app/main.page.tsx`), gated by `ProtectedRouteIsLoggedIn` / `ProtectedRouteIsLoggedOut` in `src/config/route-protection.tsx`, which read `state.auth.isAuthenticated`/`isLoading` and redirect. Because auth state depends on the bootstrap `getUserMe` query resolving, both guards render a loading state until `isLoading` is false. `/app`'s nested routes: index (`/app`) → `chat` module (free-form conversation over the trilogies), `/app/profile` → `profile` module (read-only clearance), `/app/documents` → `documents` module (trilogy titles; patrician-only upload with ingestion-job polling).

**Directory layout** (`src/`):
- `config/` — store, reducers, API slice, axios, router, route guards, theme.
- `homepage/` — logged-out page: `home.page.tsx`, `components/` (`login-modal.tsx`, `welcome/`), `hooks/`.
- `main-app/` — logged-in shell: `main.page.tsx` with its `hooks/use-main-app.ts`, and `modules/` (the `/app` feature modules).
- `shared/` — cross-page pieces: `components/` (`navbar.tsx`), `hooks/` (`use-clearance.ts`, `use-modal.ts`), `dto/`.

**Feature modules** (`src/main-app/modules/`): each module (`chat`, `profile`, `documents`) is self-contained with its own `components/`, `hooks/`, and an `index.tsx` entry (profile keeps `color-scheme-toggle.tsx` at the module root). Follow this layout for new `/app` sub-routes; components used outside one module go in `src/shared/components/`.

**Clearance-conditional UI** (`src/shared/hooks/use-clearance.ts`): `useClearance()` returns the user's `securityLevel` and `isPatrician` from `GET /me/security-level`. Use it to show or hide role-specific controls (e.g. the upload button). It is a UX courtesy only — the backend and Postgres enforce access, so never treat hiding a control as the security boundary. Clearance is read-only in the UI; it is assigned server-side.

**Shared types/DTOs** (`src/shared/dto/`): zod schemas paired with inferred TS types (`z.infer`), used both for RTK Query `dataSchema` validation and as the canonical types across the app. Prefer extending/adding a zod schema (and inferring the type from it) over hand-writing a separate interface.

**Path aliases**: `@/*` → `./src/*`, `@test-utils` → `./test-utils` (defined in `tsconfig.json`). Vite resolves `@test-utils` via `resolve.tsconfigPaths`, and resolves `@` explicitly via `resolve.alias` in `vite.config.mjs` (`'@': path.resolve(__dirname, './src')`). The codebase is inconsistent about using the alias vs. relative imports — prefer `@/` for new code, and use it for all new imports going forward.

**Theming**: Mantine `MantineProvider` in `src/App.tsx` with `defaultColorScheme="auto"` and theme overrides in `src/config/theme.ts`; `ColorSchemeToggle` component reads/writes scheme.

## Conventions

- **`.tsx` files are for JSX/markup only; `.ts` files (hooks) hold logic.** State, side effects, event handlers, and plain helper functions belong in a `use-*.ts` hook (or a co-located `.ts` helper), not inline in a component. A component destructures what it needs from its hook and renders it. This applies to state and business logic — data fetching, mutations, form/modal state, computed values, handlers — not to a single trivial library hook call whose return value is used directly in JSX (e.g. a lone `useMatch(...)` for an `active` prop). When in doubt, prefer moving it out. Every module's `hooks/` directory follows this; the shell (`main.page.tsx`) has its own `hooks/use-main-app.ts` for the same reason.
- **Every component file default-exports one named function component** — `export default function Welcome() { ... }` (see `src/homepage/components/welcome/welcome.tsx`), never an anonymous `export default function (...)`. Its props type, if any, is exported alongside as `<Name>Props`.
- **Modal open/closed state lives in the `modals` store slice, never in local state or props.** Add the modal's key to `ModalName` in `modals.reducer.ts`, then open/close it through `useModal(name)` (`@/shared/hooks/use-modal`), which reads `state.modals[name]` and dispatches `openModal`/`closeModal`. The hook behind the trigger button calls `open`; the modal's own hook reads `opened`/`close` — so the modal component takes no `opened`/`onClose` props. Don't use `useDisclosure` for modals. The same goes for the modal's data: rather than drilling an `onSubmit` callback, the modal's hook calls the mutation itself, and a page that needs its result shares it via an RTK Query `fixedCacheKey` (see `use-docs.ts` / `use-upload-modal.ts`). A modal hosted inside a page should dispatch `closeModal` on unmount so it doesn't reopen on the next visit. Generally, avoid prop-drilling state or setters that the store can hold.
- Import order is enforced by oxfmt (`.oxfmtrc.json`): side-effect/style imports, then external, then internal (`@/...`), then relative, then style, then unknown — no blank lines between groups. Run `npm run format:write` rather than hand-ordering imports.
- Single quotes, 100-char print width, ES5 trailing commas (oxfmt).
- CSS uses `stylelint-config-standard-scss` with several rules disabled — see `.stylelintrc.json` before assuming a stricter default ruleset.
- **All loading state goes through the global `loading` store slice, not local component/hook state.** A hook that derives an `isLoading`-type value from RTK Query flags (`isLoading`/`isFetching`) or its own async calls must report it via `dispatch(setGlobalLoading(...))` (`@/config/reducers/loading.reducer`) instead of returning it for the component to render locally — see `use-docs.ts` for the pattern (an effect syncing the derived value, plus a second effect whose only job is to reset the flag to `false` on unmount, so it can't get stuck `true` if the component unmounts mid-request). Each page (module `index.tsx`) then reads `state.loading.isLoading` via `useAppSelector` directly (this is the trivial-selector exception to the `.tsx`-is-markup-only rule above) and renders one Mantine `LoadingOverlay` at the top of its own content — do not add per-button `loading`/`disabled` props or other locally-controlled spinners tied to loading.
