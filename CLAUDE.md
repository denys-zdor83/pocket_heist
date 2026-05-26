# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # Run ESLint
npm test          # Run all tests (Vitest)
npm test -- Navbar  # Run a single test file by name
```

## Architecture

Next.js App Router project using **route groups** to split layouts:

- **`app/(public)/`** — Unauthenticated pages (no Navbar). Includes splash, login, signup, and a preview sandbox.
- **`app/(dashboard)/`** — Authenticated pages (Navbar injected via layout). Contains all `/heists` routes including list, create, and `[id]` detail.

Components live in `components/<ComponentName>/` with an `index.ts` barrel export and CSS Modules for scoped styles.

## Path Aliases

`@/*` maps to the project root. Use `@/components/Foo`, `@/app/...`, etc.

## Styling

Tailwind v4 with a custom `@theme` palette defined in `app/globals.css`. Semantic colour tokens: `primary`, `secondary`, `dark`, `light`, `lighter`, `success`, `error`, `heading`, `body`. Reusable layout classes (`page-content`, `center-content`, `form-title`) are also defined there.

## Testing

Vitest + Testing Library with jsdom. Tests live in `tests/` mirroring the source structure (e.g. `tests/components/`). The setup file imports `@testing-library/jest-dom/vitest` for extended matchers. Vitest globals are enabled — no need to import `describe`/`it`/`expect`.
