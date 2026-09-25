# Plan — Authentication Forms

Branch: `claude/feature/auth-forms`
Spec: `_specs/auth-forms.md`

## Context

`/login` and `/signup` are currently placeholder pages that render only a heading. The spec asks for real form UI with email + password, a password-visibility toggle, a submit button that logs the payload to the console, and an easy switch between the two forms. No backend, no persistence, no new dependencies. The goal is a UI-layer scaffold that a real auth flow can later plug into by replacing the console.log side-effect with a call.

The spec's Open Questions have been resolved (component lives under `components/AuthForm/`, no confirm-password field, native browser validation only, plain-text switch link, icons from `lucide-react`).

## Approach (one shared component, two thin pages)

Introduce a **single `AuthForm` component** that takes a `mode: 'login' | 'signup'` prop and renders the correct labels, autocomplete tokens, submit button text, and switch prompt. Both `/login` and `/signup` become one-liner pages that render `<AuthForm mode="login" />` / `<AuthForm mode="signup" />`. This is the simplest way to guarantee lock-step behavior between the two forms and lets a user switch by clicking the in-form link (client-side `<Link>`).

## Files to add / modify

### New — `components/AuthForm/`

- **`AuthForm.tsx`** — client component (`"use client"`, needed for `useState` on the visibility toggle and the submit handler). Props: `{ mode: 'login' | 'signup' }`. Internal state: `showPassword: boolean`. Renders a `<form>` containing:
  - Email field: `<label>` + `<input type="email" name="email" required autoComplete="email">`
  - Password field wrapper containing:
    - `<label>` + `<input type={showPassword ? 'text' : 'password'} name="password" required autoComplete={mode === 'login' ? 'current-password' : 'new-password'}>`
    - `<button type="button">` with `aria-label={showPassword ? 'Hide password' : 'Show password'}` rendering `Eye` / `EyeOff` from `lucide-react`, absolutely positioned at the input's trailing edge
  - Submit button: `<button type="submit" className="btn">` with label `"Log In"` (login) or `"Sign Up"` (signup) — reuses the existing global `.btn` class
  - Switch prompt: paragraph with `<Link>` — "New here? Create an account" (→ `/signup`) on login, "Already have an account? Log in" (→ `/login`) on signup
  - `onSubmit`: `e.preventDefault()`, read email/password from state (controlled inputs) or from `FormData`, then `console.log({ mode, email, password })`

- **`AuthForm.module.css`** — starts with `@reference "../../app/globals.css";` (same pattern as `Navbar.module.css`). Per CLAUDE.md's "no direct Tailwind in templates" rule, define scoped classes using `@apply`:
  - `.form` — column flex, gap, max-width
  - `.field` — label above input, vertical rhythm
  - `.label` — small, semibold, `text-body`
  - `.input` — full width, padding, `bg-lighter` background, `text-heading` color, rounded, focus ring using `--color-primary`
  - `.passwordField` — `position: relative` (parent for absolute-positioned toggle)
  - `.toggle` — absolute-positioned icon button, right-aligned, inherits `text-body`, hover `text-heading`, no background
  - `.switchPrompt` — small, centered, muted; nested `a` uses primary color

- **`index.ts`** — barrel: `export { default } from "./AuthForm"` (matches the `Navbar` pattern; imported via `@/components/AuthForm`)

### Modified — pages

- **`app/(public)/login/page.tsx`** — replace the placeholder body with `<AuthForm mode="login" />` inside the existing `.center-content` + `.page-content` wrapper; keep the current `<h1 className="form-title">Log in to Your Account</h1>` heading above it.
- **`app/(public)/signup/page.tsx`** — same change with `mode="signup"` and the existing "Signup for an Account" heading (promote its `<h2>` to `<h1>` for consistency with `/login`, which was updated earlier).

### New — tests

- **`tests/components/AuthForm.test.tsx`** — mirrors the pattern in `tests/components/Navbar.test.tsx` (Vitest + Testing Library, `globals: true`, `@/` alias works). Uses `@testing-library/user-event` (already installed) for realistic interactions. Test cases per the spec's Testing Guidelines:
  1. `mode="login"` renders email input, password input, visibility toggle button, submit button labeled `"Log In"`, and switch link pointing to `/signup`. Same test structure repeated for `mode="signup"` with `"Sign Up"` and `/login`.
  2. Clicking the toggle flips the password input's `type` between `password` and `text` and swaps the accessible name between `"Show password"` and `"Hide password"`.
  3. Submitting with valid values calls `console.log` exactly once with `{ mode, email, password }`; default submission is prevented (spy on `console.log` via `vi.spyOn(console, 'log')`).
  4. The switch link's `href` is the opposite route in each mode.

## Existing code to reuse

- **`.btn` in `app/globals.css`** — submit buttons must use this class (primary bg → secondary on hover), not a new one.
- **`.form-title`, `.center-content`, `.page-content` in `app/globals.css`** — page-level layout is already covered by these; the plan doesn't touch them.
- **`@theme` tokens (`--color-primary`, `--color-lighter`, `--color-body`, `--color-heading`)** — the AuthForm CSS module references these via Tailwind utilities like `bg-lighter`, `text-body`, wrapped in `@apply`, matching `Navbar.module.css`'s use of `bg-light` etc.
- **`lucide-react`** — already a dependency and already used in `Navbar.tsx`; icons for the toggle come from here (`Eye`, `EyeOff`), no new dep.
- **Component folder convention** — mirror `components/Navbar/`: `AuthForm.tsx`, `AuthForm.module.css`, `index.ts`.
- **Test setup** — `vitest.config.mts` + `vitest.setup.ts` already load `jsdom`, jest-dom matchers, and the `@/*` alias; no config changes needed.

## Conventions to follow

- No semicolons in `.ts` / `.tsx` (per `CLAUDE.md`).
- At most one Tailwind class directly in JSX; anything more goes into the CSS module via `@apply` (per `CLAUDE.md`). Submit button using `className="btn"` is fine because `.btn` is a single project-defined class.
- No new dependencies.
- Existing `Link` from `next/link` for the switch prompt.

## Verification

1. **Unit tests** — `npx vitest run tests/components/AuthForm.test.tsx` should pass all four cases. `npx vitest run` should keep the existing `Navbar` / `Avatar` test suites green.
2. **Manual — visual + interaction**:
   - `npm run dev` (if Turbopack has stale CSS from an earlier session, delete `.next/dev` first — we hit a case earlier where Turbopack didn't re-emit the tail of `globals.css`).
   - Visit `/login`: form shows email + password + eye icon + "Log In" button; clicking the eye reveals/hides the password; submitting logs `{ mode: 'login', email, password }` to the console; clicking the switch link navigates to `/signup`.
   - Repeat on `/signup`: submit logs `{ mode: 'signup', ... }`; switch link returns to `/login`.
   - Try submitting with empty fields → native browser validation blocks it, no console log.
   - Try a malformed email → native validation blocks it, no console log.
   - Tab through the form: focus reaches email → password → eye toggle → submit → switch link, in that order; the toggle activates on `Enter`/`Space`.
3. **Lint / types** — `npm run lint` passes; `tsc` via `next build` type-checks clean.

## Out of scope (deferred to a real auth feature)

- Any network call, credential storage, session, or redirect after submit.
- Custom validation messages, min password length, or "confirm password".
- Password strength meter, remember-me, forgot-password link, OAuth buttons.
- Rate limiting, CSRF, or any security hardening.
