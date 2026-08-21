# Mantine Vite template

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- Oxlint setup for TypeScript and React sources

## App structure

- `/` – logged-out welcome page with a login button
- `/app` – logged-in shell (`src/pages/main-app/page.tsx`), with:
  - `/app` (index) – chat for report creation
  - `/app/profile` – user profile
  - `/app/documents` – document upload/management

Each `/app` sub-route is a self-contained feature module under `src/pages/main-app/modules/` (own `index.tsx`, `components/`, `hooks/`).

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
