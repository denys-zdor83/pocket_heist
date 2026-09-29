---
name: project-globals-css
description: Global CSS helpers, theme tokens, and selectors defined in app/globals.css
metadata:
  type: project
---

Theme tokens (--color-*): primary (#C27AFF), secondary (#FB64B6), dark (#3d0b1e), light (#162d61), lighter (#101828), success, error, heading (white), body (#99A1AF). Font: Inter via --font-sans.

Global helpers: .page-content, .center-content, .form-title, .btn (with :hover bg-secondary).
- `.btn` = `inline-block px-4 py-2 rounded-md font-semibold text-heading bg-primary transition-colors` with hover bg-secondary.

Global selectors to watch for conflicts:
- `.public h1` applies `text-4xl` — scoped inside the (public) route group layout wrapper.
- `svg.logo` sets `display: inline-block` — any SVG with className="logo" gets this.

**Why:** Knowing these prevents authors from re-implementing globals (e.g. a hand-rolled .cta that duplicates .btn) and catches selector conflicts.
**How to apply:** When reviewing splash/landing page diffs, check .cta against .btn and check h1/svg rules against .public h1 and svg.logo globals.
