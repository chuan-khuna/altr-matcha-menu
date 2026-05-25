---
target: index.astro + matcha/[slug].astro
total_score: 24
p0_count: 1
p1_count: 2
timestamp: 2026-05-25T15-10-05Z
slug: src-pages-index-astro-src-pages-matcha-slug-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No active nav states; [slug] page has no current-location indicator beyond back link |
| 2 | Match Between System and Real World | 3 | Copy is sharp and domain-appropriate; "Find us, before the leaf turns" adds poetic friction to a practical task |
| 3 | User Control and Freedom | 3 | Back link on detail page is well placed; anchor nav is clear; no skip-to-top on long scroll |
| 4 | Consistency and Standards | 2 | `.mono` maps to Lato (not monospace); `§ 02` appears in About alone; eyebrow tracking values vary (0.12em / 0.14em / 0.16em / 0.18em) across files |
| 5 | Error Prevention | 3 | Static site, minimal input surface; external links have correct `rel`; `formatPrice` handles zero gracefully |
| 6 | Recognition Rather Than Recall | 3 | Blend detail page surfaces all key info without extra navigation; menu category grouping is clear |
| 7 | Flexibility and Efficiency | 2 | No skip link; no in-page search or filter on menu; no keyboard shortcut path; hero has no direct link to first menu item |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and focused overall; repeated micro-label pattern across every block adds noise; `§ 02` orphan looks unfinished |
| 9 | Error Recovery | 2 | No custom 404 referenced; no fallback for missing blend data; static paths mitigate most risk |
| 10 | Help and Documentation | 1 | Domain terms (Usucha, Koicha, Ichibancha) are untranslated with no inline gloss; no onboarding path for first-timers |
| **Total** | | **24/40** | **Acceptable — significant improvements needed** |

---

## Anti-Patterns Verdict

**LLM assessment:**

The design does NOT immediately read as AI-generated in the crude sense — the copy has genuine voice and the layout has internal logic. But it fails the second-order slop test at two points.

First: **DM Serif Display** and **DM Serif Text** are both on the brand.md reflex-reject list. They are the default-reflex display serif choices AI reaches for when given a "craft / editorial / specialty food" brief. The combination — italic display serif headline + Lato with wide tracking as pseudo-mono labels + hairline rules + cream background + zero imagery — is precisely the "editorial-typographic" aesthetic lane that brand.md flags as saturated as of 2026. A visitor who has seen Stripe, Notion, and any specialty coffee roaster's web presence in the last two years will recognise the silhouette immediately.

Second: **repeated tiny uppercase tracked micro-labels** above every single information block. On the detail page alone: "Cupping notes", "The blend", "Specifications", "Available as" — all preceded by identical `text-xs uppercase tracking-[0.16em] text-ink-muted` labels. brand.md is explicit: "Repeated tiny uppercase tracked labels above every section heading. A single strong kicker can be voice; repeating it as section grammar is AI scaffolding unless it's a deliberate, named brand system."

Third: **zero imagery** on a restaurant brief. brand.md is unambiguous — "Zero images is a bug, not a design choice" for restaurant/food/hospitality surfaces. The hero is a giant italic wordmark on cream. Every section is text on cream. A visitor evaluating whether ALTR is worth the trip has nothing visual to latch onto.

**Deterministic scan:** CLI detector binary was not found at the expected path. Scan unavailable. Manual code scan identified: eyebrow micro-label repetition (6+ instances on the landing page, 4 on the detail page), no imagery (confirmed across all section components), and DM Serif Display / DM Serif Text on the reflex-reject list.

**Visual overlays:** Browser automation unavailable in this session. No overlay injection was attempted.

---

## Overall Impression

The structure is right and the copy is excellent. The IA ("by blend, not by drink") is a confident, differentiated choice. But the visual register hasn't caught up: the fonts are the first reflex, the micro-label pattern is scaffolding, and there's no imagery for a cafe that is explicitly asking visitors to "evaluate whether ALTR is worth the trip." The single biggest opportunity is imagery — one decisive photograph of the space or a preparation would do more for trust and warmth than any typography change.

---

## What's Working

1. **Copy voice is genuinely on-brief.** "By blend, not by drink." / "If you are not, you already know what to order." / "The prices reflect the work in the field, not the work in the cafe." These land exactly where PRODUCT.md points — cupping-note declarative, no marketing softness. The writing alone separates this from a generic cafe site.

2. **Blend detail page IA is well-designed.** The two-column layout — story left, specs + pricing right — co-locates all the information a decision-making visitor needs without requiring navigation. The dotted leader lines in the price list are a clean touch. The back link placement (hairline-ruled, bottom of page) is unobtrusive and correct.

3. **Token system and accessibility foundations are solid.** OKLCH color system with tinted neutrals, `prefers-reduced-motion` respected, focus rings configured with the brand accent, `border-radius: 0` committed globally, `text-wrap: balance` on headings. These are not accidents; they show considered implementation.

---

## Priority Issues

**[P0] Zero imagery on a restaurant brief**
- **Why it matters:** A visitor is evaluating whether ALTR is worth the trip. They have no visual evidence the cafe exists, what the space feels like, or what a drink looks like. brand.md is explicit: "Zero images is a bug, not a design choice" for restaurant/food surfaces. The cream-on-cream text-only hero reads as a developer placeholder, not a brand statement.
- **Fix:** One hero-zone image (the space, a preparation, a cup on a worn surface) placed either full-bleed behind the Hero text or as a half-width compositional element. Unsplash `photo-1529040922175-8c2e4dde9977` (matcha preparation) is a verified starting point. The blend detail page also benefits from a blend-specific or preparation image in the article column.
- **Suggested command:** `impeccable craft` (imagery integration as part of a Hero redesign)

**[P1] DM Serif Display + editorial-typographic lane: AI fingerprint**
- **Why it matters:** DM Serif Display and DM Serif Text are on the brand.md reflex-reject list. More critically, the total aesthetic — italic display serif + tracked Lato pseudo-mono + hairlines + cream + no imagery — is the exact "editorial-typographic" lane brand.md flags as saturated. Category-reflex second-order check fails. A viewer familiar with the category will clock it as "AI made that for a specialty food brand."
- **Fix:** Rethink the font stack with the brand.md procedure: write three physical-object words for ALTR's voice ("worn ceramic, technical print, field report"), browse with those words, reject the first two finds. Consider a single committed sans with extreme weight contrast (e.g., a grotesque at black weight for the wordmark, regular for body) rather than the serif-display pattern.
- **Suggested command:** `impeccable typeset`

**[P1] Repeated micro-label scaffolding pattern**
- **Why it matters:** `text-xs uppercase tracking-[...]` labels precede every information block across both pages. PRODUCT.md flags this explicitly as AI scaffolding. The repetition makes every block feel equally weighted — "Cupping notes", "Specifications", "Available as", "The blend" all receive the same visual treatment, which undermines hierarchy and reads as a template, not a brand system.
- **Fix:** Reserve the tracked micro-label for one or two key roles (eyebrow above major headings; section count in the menu header). Use the label's absence as a structural signal. Inside the detail page's aside, distinguish "Specifications" from "Available as" through spatial weight and type size, not repeated identical labels.
- **Suggested command:** `impeccable layout`

**[P2] `.mono` utility maps to Lato (naming lie + missed opportunity)**
- **Why it matters:** The `.mono` class is used 20+ times across the codebase as a signal of "technical / cupping-note register" but maps to `var(--font-sans)` = Lato. PRODUCT.md says "IBM Plex Mono" is intended for cupping notes — but it's never loaded. The visual distinction between "display" (DM Serif) and "mono" (also Lato) only exists when tracking is added. This is a half-realised type system.
- **Fix:** Either load a real monospace for the cupping-note / spec register (a narrow geometric mono would contrast against Lato), or rename the utility to `.label` and commit to Lato-tracked-caps as the intentional system. Whichever is chosen, make the distinction visible at the cupping notes and specs.
- **Suggested command:** `impeccable typeset`

**[P2] `§ 02` section marker orphan**
- **Why it matters:** The About section shows `§ 02` in the sticky sidebar — but no other section uses section numbering. Menu is not `§ 01`, Contact is not `§ 03`. The lone number looks like an unfinished implementation or dropped copy.
- **Fix:** Either extend the numbering system to all sections (§ 01 Menu, § 02 About, § 03 Visit) as a deliberate structural device, or remove `§ 02` from About entirely.
- **Suggested command:** `impeccable polish`

**[P3] Missing Open Graph / social meta tags**
- **Why it matters:** `Layout.astro` has only `<title>` and `<meta name="description">`. When a visitor shares a blend page on LINE, Instagram, or messaging apps, there is no preview card. For a cafe where discovery happens through social sharing, this is a concrete lost conversion.
- **Fix:** Add `og:title`, `og:description`, `og:image`, `og:type`, and `og:url` to Layout.astro. The blend page already has the metadata to populate these dynamically.
- **Suggested command:** `impeccable harden`

**[P3] No skip-to-main content link**
- **Why it matters:** The fixed nav means keyboard users tab through all nav items before reaching main content. WCAG 2.4.1 requires a bypass mechanism.
- **Fix:** Add `<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 ...">Skip to content</a>` as the first child of `<body>`. Add `id="main-content"` to `<main>`.
- **Suggested command:** `impeccable audit`

---

## Persona Red Flags

**Jordan (First-Timer)** — *Primary: landing page, goal: understand the menu and decide to visit*
- Lands on "ALTR." in a 10rem italic serif on cream. No image of the space, no drink, no visual warmth. The brief says visitors "evaluate whether ALTR is worth the trip" — Jordan has no visual evidence yet.
- Scrolls to menu, reads "By blend, not by drink." — likely doesn't know what a "blend" means vs. ordering a "latte." The category label "Clear Matcha" vs "Latte Matcha" is assumed knowledge.
- Clicks a blend, arrives at detail page. Sees "Cupping notes: umami · floral · light astringency." Sees "Usucha" in the price list. No tooltip, no gloss, no inline explanation. The About section says "If you are new to matcha, we are happy to walk you through the menu" — but that's an in-store promise, not on-page help.
- Jordan has no visual hook and no terminology anchor. High bounce risk before visiting.

**Casey (Distracted Mobile User)** — *Goal: quick address check one-handed on the street*
- The nav "Visit" link jumps directly to Contact — this works well.
- The Contact section three-column grid collapses gracefully on mobile.
- The "Open in Google Maps →" link is the primary CTA and it's positioned correctly.
- One issue: the Google Maps href is `address.mapsHref` from `@/data/site` — if this is a placeholder value, it will silently fail. Casey has no fallback (no street address is clickable on its own).
- The contact heading "Find us, before the leaf turns." adds a poeticspeed bump for someone who just wants coordinates.

**Sam (Accessibility-Dependent)** — *Uses keyboard navigation and screen reader*
- Focus rings are configured with the brand accent (`--color-focus: oklch(48% 0.14 130)`) — visible and on-brand.
- `prefers-reduced-motion` is correctly implemented (instant opacity, no transform).
- Heading hierarchy is sound: h1 → h2 → h3 → h4 across both pages.
- `<dl>` / `<dt>` / `<dd>` in the specs table is semantically correct.
- Missing: no skip link (P3 above). The `aria-hidden="true"` on the "Scroll for the menu" hint is defensible but removes any scroll-cue for non-sighted users.
- The `.mono` class being Lato means cupping notes at `text-xs` (0.75rem) are in a proportional humanist sans — at that size on a low-DPR screen they may fall below comfortable legibility thresholds. PRODUCT.md specifically flagged this risk.

---

## Minor Observations

- `formatPrice` is duplicated identically in `MenuCard.astro` and `[slug].astro`. Extract to `@/lib/utils.ts`.
- `const d = entry.data;` in `[slug].astro` — very short alias. `const data` or `const blend` would be clearer.
- `border-b border-border border-t border-foreground` on the cupping notes block in `[slug].astro` creates an asymmetric rule (heavy top, light bottom). Intentional but undocumented — a future editor may accidentally "fix" it.
- The `→` arrow in `MenuCard.astro` is `aria-hidden="true"` — correct. But the `← Back to menu` text in the Nav for [slug] pages duplicates the same link in the page body footer. One of them should be the authority; consider removing the page-body version if the nav handles it, or vice versa.
- `eyebrow` class (in globals.css) sets `tracking: 0.14em` but many inline uses add `tracking-[0.16em]` or `tracking-[0.18em]`. The eyebrow utility should be the single source of truth for this value.

---

## Questions to Consider

- "The hero shows the name and a tagline. What if it showed the name and the first three blends instead — making the menu the hero, as the brief intends?"
- "DM Serif Display is the first-reflex font for this category. What typeface would the cafe use on a physical chalk menu board, a tin label, or a stamped paper sleeve — and is that more distinctive than editorial Italian?"
- "Every section uses the same micro-label treatment. What would the page look like if only the most important label — the one that carries the real structure — used that treatment, and everything else was unlabeled?"
