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

**State management** (`src/config/`): Redux Toolkit store composed from `src/config/reducers/index.ts`, wrapped in `redux-persist` (only the `app` slice — theme — is persisted; RTK Query cache and `auth` are not). Slices:
- `auth.reducer.ts` — holds the current user/auth status. On store creation, `onBootStrap()` thunk fires immediately (`store.ts`) and calls `GET /api/me` via a *separate* unconfigured axios instance (`axiosInstanceBootstrap`, base URL `http://localhost:5173`) rather than through RTK Query, since it must run before the API slice/interceptors exist.
- **Login**: `src/components/login-modal.tsx` does a hard `window.location.href` redirect to the backend's `/oauth2/authorization/{google|github}` (leaving the SPA entirely) — there's no in-app callback route; the backend redirects back to the frontend origin after the OAuth2 handshake, and a fresh page load re-runs `onBootStrap()`.
- **Logout**: `api.useLogoutMutation()` (`src/config/api.ts`) always dispatches `resetUser()` and `api.util.resetApiState()` on settle (in a `finally`, not just on success), so the `auth` slice and the entire RTK Query cache are cleared even if the `POST /api/logout` call itself fails — avoids leaving stale "still logged in" UI or a previous user's cached data (e.g. documents) after logout.
- `app.reducer.ts` — UI-level state (currently just `theme`).
- `loading.reducer.ts` — single global `isLoading` boolean, transient (not persisted). See the loading-state convention below.
- API slice (`src/config/api.ts`) — RTK Query `createApi` using a custom `axiosBaseQuery` (`src/config/axios-config.ts`) instead of `fetchBaseQuery`, so all RTK Query calls go through axios with `withCredentials: true` (cookie-based auth, no bearer token). Endpoints define `extraOptions: { dataSchema: <zod schema> }` for response validation against `src/shared/dto/*` zod schemas — check `axios-config.ts`/`api.ts` together when adding endpoints to keep this convention.

**Routing** (`src/config/create-router.tsx`): `react-router-dom` data router. Top-level split between logged-out (`/`, `HomePage` — welcome page with a login button) and logged-in (`/app`, `MainApp` shell), gated by `ProtectedRouteIsLoggedIn` / `ProtectedRouteIsLoggedOut` in `src/config/route-protection.tsx`, which read `state.auth.isAuthenticated`/`isLoading` and redirect. Because auth state depends on the `onBootStrap` bootstrap thunk resolving, both guards render a loading state until `isLoading` is false. `/app`'s nested routes: index (`/app`) → `chat` module (report-creation chat), `/app/profile` → `profile` module, `/app/documents` → `documents` module.

**Feature modules** (`src/pages/main-app/modules/`): each module (`chat`, `profile`, `documents`) is self-contained with its own `components/`, `hooks/`, and an `index.tsx` entry — follow this layout for new `/app` sub-routes rather than adding flat files to `src/pages/main-app/components/`, which is reserved for shell-only pieces (currently just `navbar.tsx`).

**Shared types/DTOs** (`src/shared/dto/`): zod schemas paired with inferred TS types (`z.infer`), used both for RTK Query `dataSchema` validation and as the canonical types across the app. Prefer extending/adding a zod schema (and inferring the type from it) over hand-writing a separate interface.

**Path aliases**: `@/*` → `./src/*`, `@test-utils` → `./test-utils` (defined in `tsconfig.json`). Vite resolves `@test-utils` via `resolve.tsconfigPaths`, and resolves `@` explicitly via `resolve.alias` in `vite.config.mjs` (`'@': path.resolve(__dirname, './src')`). The codebase is inconsistent about using the alias vs. relative imports — prefer `@/` for new code, and use it for all new imports going forward.

**Theming**: Mantine `MantineProvider` in `src/App.tsx` with `defaultColorScheme="auto"` and theme overrides in `src/config/theme.ts`; `ColorSchemeToggle` component reads/writes scheme.

## Conventions

- **`.tsx` files are for JSX/markup only; `.ts` files (hooks) hold logic.** State, side effects, event handlers, and plain helper functions belong in a `use-*.ts` hook (or a co-located `.ts` helper), not inline in a component. A component destructures what it needs from its hook and renders it. This applies to state and business logic — data fetching, mutations, form/modal state, computed values, handlers — not to a single trivial library hook call whose return value is used directly in JSX (e.g. a lone `useMatch(...)` for an `active` prop). When in doubt, prefer moving it out. Every module's `hooks/` directory follows this; the shell (`Main.page.tsx`) has its own `hooks/use-main-app.ts` for the same reason.
- Import order is enforced by oxfmt (`.oxfmtrc.json`): side-effect/style imports, then external, then internal (`@/...`), then relative, then style, then unknown — no blank lines between groups. Run `npm run format:write` rather than hand-ordering imports.
- Single quotes, 100-char print width, ES5 trailing commas (oxfmt).
- CSS uses `stylelint-config-standard-scss` with several rules disabled — see `.stylelintrc.json` before assuming a stricter default ruleset.
- **All loading state goes through the global `loading` store slice, not local component/hook state.** A hook that derives an `isLoading`-type value from RTK Query flags (`isLoading`/`isFetching`) or its own async calls must report it via `dispatch(setGlobalLoading(...))` (`@/config/reducers/loading.reducer`) instead of returning it for the component to render locally — see `use-docs.ts` for the pattern (an effect syncing the derived value, plus a second effect whose only job is to reset the flag to `false` on unmount, so it can't get stuck `true` if the component unmounts mid-request). Each page (module `index.tsx`) then reads `state.loading.isLoading` via `useAppSelector` directly (this is the trivial-selector exception to the `.tsx`-is-markup-only rule above) and renders one Mantine `LoadingOverlay` at the top of its own content — do not add per-button `loading`/`disabled` props or other locally-controlled spinners tied to loading.
