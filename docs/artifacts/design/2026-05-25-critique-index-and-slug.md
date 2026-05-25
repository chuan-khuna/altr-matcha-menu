# Critique: `index.astro` + `matcha/[slug].astro`

**Date:** 2026-05-25
**Target:** `src/pages/index.astro` and `src/pages/matcha/[slug].astro`
**Score:** 24/40 — Acceptable (significant improvements needed)
**P0:** 1 | **P1:** 2 | **P2:** 2 | **P3:** 2

---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No active nav states; blend detail page has no current-location indicator |
| 2 | Match System / Real World | 3 | Copy is sharp and domain-appropriate; "Find us, before the leaf turns" adds poetic friction to a practical task |
| 3 | User Control and Freedom | 3 | Back link on detail page is well placed; anchor nav clear; no skip-to-top on long scroll |
| 4 | Consistency and Standards | 2 | `.mono` maps to Lato (not monospace); `§ 02` appears in About alone; eyebrow tracking varies (0.12em / 0.14em / 0.16em / 0.18em) across files |
| 5 | Error Prevention | 3 | Static site, minimal input surface; external links have correct `rel` |
| 6 | Recognition Rather Than Recall | 3 | Blend detail surfaces all key info in one view; menu category grouping clear |
| 7 | Flexibility and Efficiency | 2 | No skip link; no menu search/filter; hero has no direct link to first blend |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and focused overall; repeated micro-label pattern adds noise; `§ 02` orphan looks unfinished |
| 9 | Error Recovery | 2 | No custom 404; no fallback for missing blend data |
| 10 | Help and Documentation | 1 | Domain terms (Usucha, Koicha, Ichibancha) untranslated with no inline gloss; no first-timer onboarding path |
| **Total** | | **24/40** | **Acceptable — significant improvements needed** |

---

## Anti-Patterns Verdict

**LLM assessment:** The design doesn't read as AI-generated in the crude sense — the copy has genuine voice and the IA decision ("by blend, not by drink") is confident and differentiated. But it fails the **second-order slop test** at two points.

One: **DM Serif Display** and **DM Serif Text** are both on the brand.md reflex-reject font list. The total silhouette — italic display serif heading, Lato with wide tracking as pseudo-mono labels, hairline rules, cream background, zero imagery — is the **editorial-typographic** aesthetic lane brand.md flags as saturated by 2026. The fingerprint matches exactly.

Two: **repeated tiny uppercase tracked micro-labels** precede every single information block on both pages. brand.md flags this explicitly as AI scaffolding unless it's a deliberate, named brand system. On the detail page alone: "Cupping notes", "The blend", "Specifications", "Available as" — same treatment, same weight, same size.

**Deterministic scan:** CLI detector binary not found. Fallback: manual code scan confirmed eyebrow micro-label repetition (6+ instances on landing, 4 on detail), zero imagery across all section components, and DM Serif Display / DM Serif Text on the reflex-reject list.

---

## Overall Impression

The structure is right. The copy is excellent. The IA is genuinely differentiated. But the visual register hasn't caught up: the fonts are the first reflex, the micro-label pattern is scaffolding, and there is no imagery for a cafe that is explicitly asking visitors to evaluate whether it's worth the trip. The single biggest opportunity is **one decisive photograph** of the space, a preparation, or a cup on a worn surface.

---

## What's Working

1. **Copy voice is genuinely on-brief.** "By blend, not by drink." / "If you are not, you already know what to order." / "The prices reflect the work in the field, not the work in the cafe." — cupping-note declarative, no marketing softness.

2. **Blend detail page IA is well-designed.** The two-column layout (story left, specs + pricing right) co-locates all decision-making information without requiring navigation. The dotted leader lines in the price list are a clean, considered touch.

3. **Technical foundations are solid.** OKLCH color system with tinted neutrals, `prefers-reduced-motion` respected, focus rings configured with the brand accent, `border-radius: 0` committed globally, `text-wrap: balance` on headings.

---

## Priority Issues

**[P0] Zero imagery on a restaurant brief**
- **Why it matters:** Visitors "evaluate whether ALTR is worth the trip." They have no visual evidence the cafe exists. brand.md: "Zero images is a bug, not a design choice" for restaurant/hospitality surfaces.
- **Fix:** One hero-zone image (the space, a preparation, a cup on a worn wooden surface) in the Hero section. A single image in the article column of the blend detail page to anchor the provenance story.
- **Suggested command:** `impeccable craft`

**[P1] DM Serif Display is on the reflex-reject list — editorial-typographic lane**
- **Why it matters:** DM Serif Display and DM Serif Text are both explicitly on the brand.md reflex-reject list. Combined with tracked Lato labels and hairline rules, the total aesthetic is the saturated editorial-typographic lane.
- **Fix:** Apply the brand.md font-selection procedure: write three physical-object words for ALTR, browse a real catalog, reject the first two finds.
- **Suggested command:** `impeccable typeset`

**[P1] Repeated micro-label pattern reads as AI scaffolding**
- **Why it matters:** `text-xs uppercase tracking-[...]` precedes every information block on both pages. When every block receives the same label treatment, nothing is differentiated — hierarchy is flat and the pattern reads as template scaffolding.
- **Fix:** Reserve the tracked micro-label for one structural role. Distinguish blocks inside the detail page's aside through spatial weight and type size contrast, not identical labels.
- **Suggested command:** `impeccable layout`

**[P2] `.mono` maps to Lato — naming lie and missed opportunity**
- **Why it matters:** The `.mono` utility is used 20+ times as a "technical / cupping-note register" signal but maps to Lato. PRODUCT.md says cupping notes should use IBM Plex Mono — but it's never loaded.
- **Fix:** Either load an actual monospace for cupping notes and specs, or rename the utility to `.label` and document Lato-tracked-caps as the intentional system.
- **Suggested command:** `impeccable typeset`

**[P2] `§ 02` section marker orphan**
- **Why it matters:** About has `§ 02` in the sticky sidebar, but no other section uses numbering. Looks like a dropped implementation.
- **Fix:** Either extend numbering to all sections (§ 01 Menu, § 02 About, § 03 Visit), or remove `§ 02` from About.
- **Suggested command:** `impeccable polish`

**[P3] Missing Open Graph / social meta tags**
- **Why it matters:** `Layout.astro` only has `<title>` and `<meta name="description">`. Blend pages shared on social produce no preview card.
- **Fix:** Add `og:title`, `og:description`, `og:image`, `og:type`, `og:url` to `Layout.astro`.
- **Suggested command:** `impeccable harden`

**[P3] No skip-to-main link**
- **Why it matters:** Fixed nav means keyboard users tab through all nav links before reaching main content. WCAG 2.4.1 requires a bypass mechanism.
- **Fix:** Add a skip link as the first child of `<body>`. Add `id="main-content"` to `<main>`.
- **Suggested command:** `impeccable audit`

---

## Persona Red Flags

**Jordan (First-Timer)** — landing page, goal: understand the menu and decide to visit
- No image of the space or a drink; no visual evidence the cafe is real.
- "By blend, not by drink" and "Clear Matcha" vs "Latte Matcha" assume familiarity.
- Domain terms (Usucha, Koicha) appear on the detail page with no gloss. The About section's "we are happy to walk you through the menu" is an in-store promise, not an on-page path.

**Casey (Distracted Mobile User)** — street, one-handed, goal: quick address check
- "Visit" nav link jumps directly to Contact — correct.
- Risk: `address.mapsHref` — if this is a placeholder, the Maps link silently fails with no fallback.
- "Find us, before the leaf turns." adds poetic friction for someone who just needs coordinates.

**Sam (Accessibility-Dependent)** — keyboard + screen reader
- Focus rings and `prefers-reduced-motion` are correctly implemented.
- Heading hierarchy is sound (h1 → h2 → h3 → h4).
- Missing: no skip-to-main link.
- Cupping notes at `text-xs` (0.75rem) in proportional Lato — PRODUCT.md flagged legibility risk at this size; current implementation is potentially worse than the intended monospace.

---

## Minor Observations

- `formatPrice` duplicated in `MenuCard.astro` and `[slug].astro` — extract to `@/lib/utils.ts`.
- `const d = entry.data;` in `[slug].astro` — short alias; `const blend` or `const data` would be clearer.
- `border-b border-border border-t border-foreground` on the cupping notes block — intentional asymmetric rule weight but undocumented; vulnerable to accidental "fix."
- `.eyebrow` class sets `tracking: 0.14em` but inline `mono` labels override with 0.12em, 0.16em, or 0.18em. The utility should be the single source of truth.
- The `←` back link appears in both the Nav (`showBack` prop) and the page body footer of `[slug].astro` — one is redundant.

---

## Questions to Consider

- "The hero shows the name and a tagline. What if it showed the name and the first three blends — making the menu the actual hero, as the brief intends?"
- "DM Serif Display is the first-reflex font for specialty-food editorial. What typeface would ALTR use on a physical tin label, a chalk menu board, or a stamped paper sleeve — and is that more distinctive?"
- "Every section uses the same micro-label treatment. What would the page feel like if only one label used that pattern, and everything else was unlabeled?"
