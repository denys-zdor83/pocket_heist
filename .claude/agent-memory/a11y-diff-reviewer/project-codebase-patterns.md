---
name: project-codebase-patterns
description: A11y-relevant UI patterns and conventions observed in the Pocket Heist codebase across reviews
metadata:
  type: project
---

Pocket Heist is a Next.js 16 App Router splash/heist-planning app. UI is scaffolding only; no backend yet.

**Route groups:**
- `app/(public)/` — unauthenticated, splash + auth forms
- `app/(dashboard)/` — authenticated, wrapped in Navbar + `<main>`

**Icon library:** `lucide-react`. Icons used inline in headings/feature cards frequently ship without `aria-hidden="true"`, making them invisible to AT as spurious content. This is a recurring anti-pattern to watch for.

**Splash page (`app/(public)/page.tsx`):**
- Uses `<section>` landmarks without `aria-label` — these merge into an unlabeled region in AT landmark lists.
- Feature cards use `<article>` + `<h2>` (correct semantic). Feature icons (`<Target>`, `<UsersRound>`, `<Trophy>`) are purely decorative and need `aria-hidden="true"`.
- The `<h1>` contains an inline `<Clock8>` SVG icon (from lucide-react) as a letter substitute inside "P[icon]cket Heist". The icon is neither hidden from AT nor given an alternative text, making the heading announce as "P cket Heist" or similar — critical accessible-name breakage.
- No skip-navigation link present on the splash page.
- `.cta` and `.loginPrompt a` color on `--color-dark` background: primary purple `#C27AFF` on `#3d0b1e` passes WCAG AA for large text but should be verified for normal text sizes.

**Focus styles:** Not overridden in the diff; assumed browser defaults remain (not removed without replacement).

**Why:** Captures first-review snapshot of the splash page so future reviews can spot regressions.
**How to apply:** When reviewing future diffs touching `app/(public)/page.tsx` or any lucide-react icon usage, check for missing `aria-hidden` and broken heading accessible names.
