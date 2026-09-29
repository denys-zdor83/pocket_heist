---
name: project-conventions
description: Confirmed repo-wide coding conventions observed across diffs
metadata:
  type: project
---

Confirmed conventions from CLAUDE.md and observed diffs:

- No semicolons in JS/TS source files.
- At most one Tailwind utility class directly on a JSX element; multiples must be composed via `@apply` in the co-located CSS Module.
- CSS Modules must start with `@reference "../../app/globals.css";` so `@apply` can resolve theme tokens.
- Components live under `components/<Name>/` with `<Name>.tsx`, `<Name>.module.css`, and `index.ts` barrel.
- Import components via barrel (`@/components/Navbar`), not inner file.
- Client components need `"use client"`; server components stay server-side by default.
- Prefer theme tokens (`bg-primary`, `text-heading`, `bg-lighter`, `text-body`) over hard-coded colors.
- Global helpers defined in globals.css: `.page-content`, `.center-content`, `.form-title`, `.btn`. Reuse these instead of re-implementing.
- Minimal dependencies — flag new packages if a hand-rolled or existing solution works.
- `svg.logo` is a global selector in globals.css; it sets `display: inline-block` on SVGs with className="logo".

**Why:** Enforced via CLAUDE.md and code review gate.
**How to apply:** Flag any diff that violates these — especially semicolons, inline Tailwind stacks, missing @reference, and .btn re-implementation.
