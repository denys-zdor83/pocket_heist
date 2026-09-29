# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pocket Heist — a Next.js starter for the Claude Code Masterclass. Themed around creating and managing "heists" (tiny office missions). UI scaffolding only; there is no backend, no persistence, and no auth layer yet.

## Commands

- `npm run dev` — Next.js dev server on http://localhost:3000 (Turbopack)
- `npm run build` / `npm start` — production build and serve
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + TS)
- `npm test` — Vitest in watch mode
- `npx vitest run` — single non-watch run of the full suite
- `npx vitest run tests/components/AuthForm.test.tsx` — run one test file
- `npx vitest run -t "logs { mode, email, password }"` — run tests by name substring

## Architecture

Next.js 16 App Router with React 19 and TypeScript strict mode. Path alias `@/*` maps to the project root (e.g. `@/components/AuthForm`).

### Route groups

Routes are split into two **route groups** that share `app/layout.tsx` but each own an inner layout:

- **`app/(public)/`** — unauthenticated area. Its layout wraps children in `<main class="public">` (the `.public` selector in `globals.css` sizes the splash `<h1>`). Holds `/`, `/login`, `/signup`, and a `/preview` scratch page for iterating on new components.
- **`app/(dashboard)/`** — authenticated area. Its layout renders the shared `Navbar` above `<main>`. Holds `/heists`, `/heists/create`, and `/heists/[id]`.

The splash `app/(public)/page.tsx` is intentionally a decision point: once auth exists, logged-in users should be redirected to `/heists` and everyone else to `/login` (see the comment at the top of the file).

### Component convention

Components live under `components/<Name>/` as a folder containing:
- `<Name>.tsx` — the component
- `<Name>.module.css` — co-located CSS Module
- `index.ts` — barrel: `export { default } from "./<Name>"`

Always import via the folder (`@/components/Navbar`), not the inner file. Client components must declare `"use client"` at the top; server components (the default) should stay server-side unless they truly need hooks or event handlers.

## Styling

Tailwind CSS v4 via `@tailwindcss/postcss`. Design tokens live in `app/globals.css` inside an `@theme` block (colors under `--color-*`, `--font-sans`) which Tailwind uses to generate matching utilities (`bg-primary`, `text-heading`, etc.).

Global layout helpers defined in `globals.css`: `.page-content`, `.center-content`, `.form-title`, and `.btn`. Use these directly from JSX rather than re-implementing them.

**CSS Modules must start with `@reference "../../app/globals.css";`** so `@apply` inside the module can see the theme tokens. Without this, utility-token references like `bg-primary` won't resolve in the module. Follow the pattern in `components/Navbar/Navbar.module.css`.

## Testing

Vitest 4 with jsdom, `globals: true` (no need to import `describe`/`it`/`expect`), and `vite-tsconfig-paths` so the `@/*` alias resolves in tests. `vitest.setup.ts` pulls in `@testing-library/jest-dom/vitest` matchers globally. `@testing-library/user-event` is available for interaction tests.

Tests live under `tests/` and mirror the source tree. Prefer role/label queries (`getByRole`, `getByLabelText`) over test ids or class-based selectors.

## Feature workflow

- **`_specs/`** — feature specs written before implementation. `_specs/template.md` is the source-of-truth structure. Specs are typically produced by the `/spec-v1` skill and cut on a new `claude/feature/<slug>` branch.
- **`_plans/`** — implementation plans written after a spec is agreed and before code is touched. Plans reference the corresponding spec.

## Coding Preferences

- **No semicolons** in JavaScript or TypeScript source.
- **No inline Tailwind stacks in component templates.** At most one utility class directly on an element. Anything more should be composed into a scoped class inside the component's CSS Module using `@apply`. Global project-defined classes (`.btn`, `.page-content`, etc.) applied by name are fine — that's still one class.
- **Prefer theme tokens** (`bg-primary`, `text-heading`, `bg-lighter`, `text-body`, …) over hard-coded colors so palette changes stay centralized.
- **Minimal dependencies.** Don't add a package if a small hand-rolled solution or an existing dep (e.g. `lucide-react` for icons, native `<form>` for forms) will do.
- **Branching:** use `git switch -c <name>` to create a new branch, not `git checkout -b`.

## Checking Documentation

- **important:** Then implemeting any lib/framework-specific features, ALWAYS check the appropriate lib/framework documentation using the Context7 MCP server before writing any code.