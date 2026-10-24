# Mantine Vite template

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- Oxlint setup for TypeScript and React sources

## App structure

- `/` – logged-out welcome page with a login button (`src/homepage/home.page.tsx`)
- `/app` – logged-in shell (`src/main-app/main.page.tsx`), with:
  - `/app` (index) – free-form chat over the trilogies the user is cleared to read
  - `/app/profile` – user profile and (read-only) clearance
  - `/app/documents` – trilogy titles; patricians can upload a trilogy (title + 3 PDFs)

Each `/app` sub-route is a self-contained feature module under `src/main-app/modules/` (own `index.tsx`, `components/`, `hooks/`).

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs oxlint and stylelint
- `format:test` – checks files with oxfmt
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `format:test`, `lint` and `typecheck` scripts

### Other scripts

- `format:write` – formats all files with oxfmt

## Pseudo design files

There is no figma design for the frontend app. The are mock ups done in [tldraw](https://www.tldraw.com/f/78D3VBnwwWg1Hchx6xIxe?d=v0.33.1660.933.page)
