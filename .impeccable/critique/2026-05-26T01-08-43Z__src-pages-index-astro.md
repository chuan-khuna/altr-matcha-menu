---
target: src/pages/index.astro — Menu section
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-05-26T01-08-43Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Fade-up on scroll and arrow micro-hover are the only feedback signals on a fully static page |
| 2 | Match System / Real World | 3 | Specialty terms are appropriate; "By blend, not by drink" tagline contradicts the drink-category grouping delivered |
| 3 | User Control and Freedom | 3 | Anchor nav works; detail pages link back; no traps |
| 4 | Consistency and Standards | 3 | Strong type system; `border-border` vs `border-foreground` on cards vs separators is a small inconsistency |
| 5 | Error Prevention | 3 | Static page; no error-prone interactions |
| 6 | Recognition Rather Than Recall | 3 | Origin, brand, notes, price all visible upfront; `→` communicates interactivity |
| 7 | Flexibility and Efficiency | 2 | No filtering, sorting, or search; one fixed reading order |
| 8 | Aesthetic and Minimalist Design | 3 | Clean hierarchy; dot-leader price rows are precise; `border-b border-border` on every card creates repetition that flattens the list |
| 9 | Error Recovery | 3 | Static page; n/a |
| 10 | Help and Documentation | 3 | Cupping notes inline; blend detail pages carry full provenance |
| **Total** | | **28/40** | **Good** |

## Anti-Patterns Verdict

**LLM Assessment**: The design sits squarely inside the brand.md's explicitly listed "reflex-reject aesthetic lane": *display serif (often italic) + small mono labels + ruled separators + monochromatic restraint.* The fingerprint matches exactly: italic DM Serif Display heading, tracked-uppercase mono category labels, bottom-ruled list items, IBM Plex Mono for metadata. Both typefaces are on the brand.md reflex-reject list. The combination is the canonical "considered, quiet, exacting" landing-page reflex of 2026, indistinguishable from hundreds of similar specialty-food and craft-product pages.

Mitigations: dot-leader price rows carry print-shop specificity. Cupping notes in lowercase mono are tonally precise. The `→` hover choreography is restrained. These keep it from being pure template, but the overall aesthetic answer arrived before the question was fully asked.

**Deterministic Scan**: CLI scan unavailable — bundled detector not found.

**Visual Overlays**: Not attempted (browser automation unavailable).

## Overall Impression

The type system is disciplined and the copy is doing real work. The single biggest opportunity is the IA contradiction: the tagline promises "by blend, not by drink" and the implementation delivers the opposite. Fix the architecture and the page's credibility increases sharply. The second gap — zero imagery on a cafe brief — is a brand.md violation that leaves the page reading as a text catalogue rather than a place worth visiting.

## What's Working

1. **Dot-leader price rows.** The `border-dotted border-sand` separator with `tabular-nums` is a deliberate print reference. It organizes price information without adding visual weight.

2. **Cupping notes as UI copy.** `"grilled mochi · light smoke · hazelnut · creamy"` rendered lowercase mono is exactly right for this brand. No adjectives, no marketing softness. It reads like a cupping card.

3. **Category count metadata.** Zero-padded `"02 blends"` in the category header is a small but precise touch that sets expectations before the user scans the list.

## Priority Issues

**[P1] IA contradiction: "by blend" tagline, "by drink" grouping**

**What**: The section header reads "By blend, not by drink." The actual grouping is by preparation category (Clear Matcha, Latte Matcha, Powder) with blends listed under each. A blend available in multiple categories appears multiple times across the page. This is drink-first IA.

**Why it matters**: A visitor evaluating a specific blend must scan all three category sections to see its full preparation options. The blend's identity is fragmented. The interface promises blend-first and delivers the opposite, which breaks trust with the exact audience PRODUCT.md describes.

**Fix**: Restructure so each blend appears exactly once as the primary row, with available preparations and prices nested beneath. Preparation categories can become a secondary filter or tab, but the primary axis must be blend.

**Suggested command**: `impeccable shape menu`

---

**[P1] Zero imagery on a food/cafe brief**

**What**: The Menu section (and entire page) contains no photography — no preparation shots, no tin photos, no pour imagery. brand.md is explicit: "Zero images is a bug, not a design choice" for restaurant, food, and product briefs.

**Why it matters**: Specialty matcha buyers are evaluating whether the product is worth the price and the trip. Imagery is part of that evaluation. "Considered, quiet, exacting" does not mean text-only; it means every element is intentional, including photography.

**Fix**: At minimum, one decisive hero image. In the Menu section, a single full-bleed image above the first category or small square thumbnails per blend.

**Suggested command**: `impeccable bolder menu` after imagery sourcing.

---

**[P2] Row hover affordance is ambiguous**

**What**: The entire `<li>` is a clickable link but the only visual hover feedback is the `→` arrow shifting 4px right and going accent. No row background tint, no underline on the blend name. The `→` is `aria-hidden` — invisible to screen reader users.

**Why it matters**: Users may not recognize the entire row as interactive. On touch devices, there is no hover state at all.

**Fix**: Add `group-hover:bg-[oklch(0.97_0.005_100)]` or equivalent subtle tint to the full row on hover. Consider `group-hover:underline` on the `h4`.

**Suggested command**: `impeccable polish menu`

---

**[P2] Font pairing is on the reflex-reject list**

**What**: DM Serif Display + IBM Plex Mono are both on brand.md's reflex-reject list. The pairing is the canonical fingerprint of the saturated editorial-typographic aesthetic lane.

**Why it matters**: The brand should feel distinctive. Per brand.md, existing committed typography preserves identity, but this is the moment to plan a refresh toward something less saturated — a Japanese-foundry-influenced Latin serif, a condensed grotesque with high weight contrast, or a monospace display that doubles as brand voice.

**Fix**: Plan a font refresh. Existing pages don't need immediate retyping; future iterations should move off reflex-reject choices.

**Suggested command**: `impeccable typeset`

---

**[P2] Border color inconsistency: category separator vs card items**

**What**: Category headers use `border-foreground` (full ink weight). Card `<li>` items use `border-border` (lighter token). The difference may be intentional (section vs row) but the token names suggest it could be accidental.

**Fix**: Confirm intent. If deliberate, document it. If accidental, standardize on one token per semantic level.

**Suggested command**: `impeccable polish menu`

## Persona Red Flags

**Jordan (First-Timer — curious passerby)**:
Sees "Clear Matcha" as a category label — has no idea what "clear" means in a matcha context. No tooltip, no inline explanation. Sees "Gokasho Samidori" with origin "Uji" and cupping notes — intriguing, but no image of what this looks like as a drink. Leaves with questions instead of answers. Bounces without finding the address.

**Casey (Distracted Mobile User)**:
On mobile, the price grid flips to a stacked layout with `items-start`. The dot leader (`flex-1 border-b border-dotted`) collapses to nothing — it depends on `flex-1` which has nothing to fill horizontally. The visual alignment precision of the desktop price list is lost; Casey sees preparation names and prices in a plain stacked list. The signature dot-leader treatment evaporates on the device Casey most likely uses to check the menu before visiting.

**The Specialty Matcha Enthusiast (project-specific)**:
Arrives wanting to compare two blends on cultivar and origin. `MenuCard` shows `origin` in accent color (good) but not `cultivar` — that field exists in the data (`info.cultivar`) but is absent from the card. Comparative evaluation requires clicking through to detail pages for both blends. The expert user's primary task requires two navigations instead of one glance.

## Minor Observations

- `max-w-[42rem]` on the section header `<header>` is a magic number; a named token would be cleaner.
- `getSlug` splits on `/` and takes the last segment — fragile if content IDs change format.
- `clamp(1.75rem,3.5vw,2.75rem)` on the section h2: the `3.5vw` midpoint means at 1400px the heading barely reaches its max. A wider max-width container would expose this.
- `padStart(2, '0')` for blend count is a charming typographic gesture. Keep it.
- The `aria-label="Cupping notes"` on the notes paragraph is correct and appreciated.
- `fade-up` class is applied on `<li>` but defined globally — verify it respects `prefers-reduced-motion` per PRODUCT.md's accessibility requirements.
