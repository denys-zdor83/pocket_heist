---
name: antipatterns-observed
description: Recurring anti-patterns caught in this codebase across reviews
metadata:
  type: feedback
---

1. **Re-implementing `.btn` as a scoped `.cta` class** — seen in `app/(public)/page.module.css`. The `.cta` class duplicates `.btn` (inline-block, rounded-md, bg-primary, px, py, text-lg font-semibold, text-heading, transition-colors, hover:bg-secondary) instead of using the global `.btn` helper. Flag this whenever a scoped CTA/button class appears.

2. **Conflicting h1 font-size rules** — `.public h1` in globals.css applies `text-4xl`, but `page.module.css` applies `text-6xl` via `.hero h1`. The module rule wins due to specificity/cascade, silently overriding the global. The global rule becomes dead code. Flag this pattern.

3. **`svg.logo` redundancy** — globals.css already sets `display: inline-block` on `svg.logo`. Repeating `display: inline-block` in `.hero h1 svg` is redundant for the logo SVG specifically (though the module rule also covers non-logo SVGs in h1).

**Why:** These surfaced in the first splash page diff (2026-09-28).
**How to apply:** Check new button-like scoped classes against .btn. Check new h1 size rules against .public h1. Check svg display rules against svg.logo.
