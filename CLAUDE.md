# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pocket Heist — a Next.js starter for the Claude Code Masterclass. Themed around creating and managing "heists" (tiny office missions). Currently UI scaffolding only; no backend, auth, or data model exists yet.

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` / `npm start` — production build and serve
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + TS)
- `npm test` — Vitest in watch mode
- `npx vitest run` — single non-watch run
- `npx vitest run tests/components/Navbar.test.tsx` — run one test file
- `npx vitest run -t "renders the Create Heist link"` — run a single test by name

## Architecture

Next.js 16 App Router with React 19 and TypeScript strict mode. Path alias `@/*` maps to the project root (e.g. `@/components/Navbar`).

Routes are split into two **route groups** that share `app/layout.tsx` but have their own inner layout:

- `app/(public)/` — unauthenticated area, wrapped in `<main class="public">`. Holds the splash `/`, `/login`, `/signup`, and a `/preview` scratch page for iterating on new components.
- `app/(dashboard)/` — authenticated area, layout renders the shared `Navbar` above `<main>`. Holds `/heists`, `/heists/create`, and `/heists/[id]`.

The splash `app/(public)/page.tsx` is intentionally a decision point: when auth exists, logged-in users should be redirected to `/heists` and everyone else to `/login` (see the comment at the top of the file).

Components live under `components/<Name>/` as a folder with the component, a co-located `<Name>.module.css`, and an `index.ts` barrel — import via `@/components/<Name>` rather than the inner path.

## Styling

Tailwind CSS v4 via `@tailwindcss/postcss`. Theme tokens (colors, `Inter` font) are declared in `app/globals.css` under `@theme` and referenced through Tailwind utilities (`bg-dark`, `text-body`, `text-heading`, etc.) — prefer these tokens over hard-coded colors. Reusable layout helpers `.page-content`, `.center-content`, and `.form-title` are also defined there. Component-scoped styles use CSS Modules alongside Tailwind.

## Testing

Vitest 4 with jsdom, `globals: true` (no need to import `describe`/`it`/`expect`), and `vite-tsconfig-paths` so the `@/*` alias resolves in tests. `vitest.setup.ts` pulls in `@testing-library/jest-dom/vitest` matchers globally. Tests live under `tests/` mirroring the source tree.

## Additional Coding Preferences

- Do NOT use semicolons for JavaScript or TypeScript code.
- Do NOT apply tailwind classes directly in component templates unless essential or just 1 at most. If an element needs more than a single tailwind class, combine them into a custom class using the `@apply` directive.
- Use minimal project dependencies where possible.
- Use the `git switch -c` command to switch to new branches, not `git checkout`.
