# Spec for Authentication Forms

branch: claude/feature/auth-forms
figma_component (if used): —

## Summary

Add functional authentication forms to the existing `/login` and `/signup` pages inside the `app/(public)` route group. Each page currently renders only a title heading; this feature fleshes them out with real form controls (email, password, password-visibility toggle, submit button) and provides a clear, low-friction way for a user to switch between the two forms. On submit, form details are logged to the browser console — no network, storage, or auth backend is introduced in this feature. This is a UI-layer scaffold that a future real auth flow can plug into.

## Functional Requirements

- Provide a shared authentication form component that renders in two modes: `login` and `signup`. Both `/login` and `/signup` consume it so that field layout, validation, and styling stay in lock-step.
- Fields on both forms:
  - Email input (`type="email"`, required, autocomplete `email`)
  - Password input (`type="password"` by default, required, autocomplete `current-password` on login and `new-password` on signup)
- Password visibility toggle:
  - Icon button placed inside the password input's trailing edge
  - Toggling flips the input `type` between `password` and `text`
  - The icon reflects state (eye vs. eye-off, sourced from `lucide-react` in keeping with the existing Navbar usage)
  - The button has an accessible label ("Show password" / "Hide password") that updates with state
- Submit button:
  - Label reads "Log In" on `/login` and "Sign Up" on `/signup`
  - Uses the existing `.btn` class defined in `app/globals.css`
  - Submitting the form logs a single object to the console: `{ mode: 'login' | 'signup', email, password }`. No network calls, no persistence.
  - The default browser submit navigation is prevented.
- Switch link:
  - `/login` includes text like "New here? Create an account" linking to `/signup`
  - `/signup` includes text like "Already have an account? Log in" linking to `/login`
  - Both use Next.js `<Link>` so switching feels instant
- The forms live in the public route group and continue to use the existing `.center-content` + `.page-content` + `.form-title` layout helpers already applied on those pages.

## Figma Design Reference (only if referenced)

Not applicable — no Figma component referenced in this feature.

## Possible Edge Cases

- User submits with an empty email or password → the native `required` attribute should block submission; no console log is emitted.
- User submits with a malformed email → the native `type="email"` validation should block submission; the exact browser message is fine and no custom UI is required for this iteration.
- User toggles password visibility and then submits → the submitted value is still the password text; the toggle does not affect what is logged.
- User navigates rapidly between `/login` and `/signup` via the switch link → field values are not expected to persist across the switch (each page is its own route/form instance).
- Autofill / password manager fills the fields → autocomplete tokens should be set so that browsers store the correct kind of credential (`current-password` vs. `new-password`).
- Long email or password values → the input should not overflow its container.
- Keyboard-only users → the visibility toggle button must be reachable via `Tab`, activate on `Enter`/`Space`, and expose its label to assistive tech.

## Acceptance Criteria

- Visiting `/login` shows: heading, email field, password field with a visibility toggle icon on the right, "Log In" submit button using `.btn`, and a link/prompt to switch to `/signup`.
- Visiting `/signup` shows: heading, email field, password field with a visibility toggle icon on the right, "Sign Up" submit button using `.btn`, and a link/prompt to switch to `/login`.
- Clicking the eye icon on either page toggles the password input's visibility and swaps the icon accordingly; the button's accessible name updates in sync.
- Submitting either form prevents native navigation and logs `{ mode, email, password }` to the console, with `mode` being `"login"` or `"signup"` respectively.
- Native browser validation blocks submission if required fields are empty or the email is malformed — the console log is not fired in that case.
- The switch link on each page navigates to the other page via a client-side `<Link>`.
- Forms adhere to the project's styling conventions from CLAUDE.md: styles applied via CSS Modules / `@apply` rather than Tailwind classes strung directly in JSX (at most one utility class per element), and no semicolons in the TS source.
- No new runtime dependencies are added beyond what's already in `package.json` (in particular, no form library).

## Open Questions

- Should the shared form live under `components/AuthForm/` (matching the existing `components/<Name>/` convention) or be co-located with the pages? Assumed: a shared component under `components/AuthForm/`. - Yes, live under `components/AuthForm/`
- Should the signup form also include a "confirm password" field? Assumed: no, out of scope for this iteration. - No, out of scope for this iteration.
- Should a minimum password length be enforced client-side beyond `required`? Assumed: no, defer to the future real auth layer.
- Should the switch link be a plain text link or styled as a secondary button? Assumed: plain text link with the accent color, to keep visual weight on the primary submit.
- Should the icons come from `lucide-react` (already used in `Navbar`) or a different set? Assumed: `lucide-react` (`Eye`, `EyeOff`).

## Testing Guidelines

Create a test file in the `tests/components/` folder for the new shared form (e.g. `AuthForm.test.tsx`). Keep tests focused and meaningful — cover the observable behavior, not implementation detail:

- Renders both fields, the visibility toggle button, and the submit button with the label appropriate to the mode (`"Log In"` vs `"Sign Up"`).
- Clicking the visibility toggle flips the password input's `type` attribute between `password` and `text`, and updates the toggle's accessible name.
- Submitting the form with valid values calls `console.log` once with `{ mode, email, password }` for the appropriate mode; the default form submission is prevented.
- The switch link points to the correct opposite route (`/signup` from login mode, `/login` from signup mode).

Route-level pages (`/login` and `/signup`) do not need their own test files beyond a smoke check that they render the shared form in the correct mode, if a smoke check adds meaningful coverage.
