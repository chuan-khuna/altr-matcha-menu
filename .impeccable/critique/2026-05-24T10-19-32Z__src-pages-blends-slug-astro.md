---
target: src/pages/blends/
total_score: 23
p0_count: 0
p1_count: 3
timestamp: 2026-05-24T10-19-32Z
slug: src-pages-blends-slug-astro
---
# Critique · `src/pages/blends/[slug].astro`

Date: 2026-05-24
Command: `$impeccable critique src/pages/blends/`
Detector: unavailable (`scripts/detector/detect-antipatterns.mjs` missing) — manual review only.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Hover-only feedback on back link; no scroll progress on a long read |
| 2 | Match System / Real World | 4 | Cupping-card vocabulary used correctly (Ichibancha, Tana, Usucha) |
| 3 | User Control and Freedom | 2 | Only exit is "Back to the menu"; no prev/next blend, no anchor to the specific menu row |
| 4 | Consistency and Standards | 3 | Mixed rule weights on `.blend__notes` (ink-top, hairline-bottom) read accidental |
| 5 | Error Prevention | n/a | Static content page |
| 6 | Recognition Rather Than Recall | 3 | Mono eyebrows label every block well; spec list redundant with header origin line |
| 7 | Flexibility and Efficiency | 2 | No share/print/copy-link, no "next blend"; deep-link readers bounce after one entry |
| 8 | Aesthetic and Minimalist Design | 3 | Largely on-brand editorial; bordered cupping chips + display-serif body undercut it |
| 9 | Error Recovery | n/a | No interactive failure surfaces |
| 10 | Help and Documentation | 3 | Domain terms self-document by virtue of context |
| **Total** | | **23/30** (n/a removed) | **Solid editorial baseline, needs precision pass** |

## Anti-Patterns Verdict

Not AI slop. The page belongs to the editorial-catalogue family PRODUCT.md explicitly references ("specialty coffee roaster's bag label"). It sidesteps the two dominant first-order reflexes for a cafe site — kraft-paper third-wave and gradient-hero SaaS template. Italic DM Serif Display name, mono eyebrows in tracked uppercase, and dotted price leaders read as deliberate print-shop language.

## Overall Impression

A page that mostly believes what PRODUCT.md says it believes, with three or four small concessions that betray it. The display face is doing the body's job, the cupping notes are wearing tiny boxes when the brief says "hairlines, not boxes," and the only motion on the page is the one motion the brief bans. Each is a one-line fix; together they're the difference between "competently editorial" and "exacting."

## What's Working

1. **The headline composition.** Eyebrow category → italic display name → mono origin in tracked uppercase accent green is a real three-line catalogue lockup, not a hero. It carries the page without chrome.
2. **Specs as a real `<dl>`.** `dt`/`dd` semantics, hairline rules, tabular-num prices — a specifications block you could screenshot for a sourcing portfolio.
3. **Dotted price leaders.** `border-bottom: 1px dotted` between drink name and price is a genuine print-menu detail. Stays in budget; pays the brand back.

## Priority Issues

### [P1] Display serif used as body text
Lines 152–158: `.blend__story-body` sets `font-family: var(--font-display)` at `--text-xl` (1.5rem), line-height 1.45. DM Serif Display is a high-contrast headline face — at body sizes the hairline strokes thin and shimmer, and WCAG 4.5:1 on cream paper gets shaky. The story is the longest-read element on the page; it should be the body face (or a text serif), not the display face.

- Fix: drop the family override, keep the size bump; let it inherit the text family. If you want serif texture, introduce a dedicated `--font-serif-text` (e.g. EB Garamond, Source Serif) to `tokens.css` and use it here only.
- Command: `$impeccable typeset src/pages/blends/[slug].astro`

### [P1] Cupping notes are bordered chips
Lines 143–146: `border: 1px solid var(--color-sand)` around each note recreates the box-y vocabulary PRODUCT.md bans ("hairlines, not boxes"). They read as soft tag pills.

- Fix: drop the borders; render the notes as a mono inline list separated by `·` or em-space, leading with the existing "Cupping notes" eyebrow. The result is a cupping card, not a tag cloud.
- Command: `$impeccable distill src/pages/blends/[slug].astro`

### [P1] The one motion on the page is the one motion that's banned
Lines 220–223: `.blend__back:hover { transform: translateX(-2px); }`. The brand principle explicitly says "the only allowed animation is a subtle fade-up on scroll-in. Anything that draws attention to itself draws attention away from the matcha." The sliding arrow announces itself.

- Fix: remove the transform; keep only the colour shift to `--color-accent` on hover.
- Command: `$impeccable quieter src/pages/blends/[slug].astro`

### [P2] Asymmetric rule weights on the notes band
Lines 119–120: `border-top: var(--rule-ink); border-bottom: var(--rule-hairline)`. The weight difference is small enough to look like a mistake rather than a deliberate hierarchy (the rest of the page commits to hairlines).

- Fix: use `--rule-hairline` on both edges, or commit to `--rule-ink` on both and pull the band up tighter as a visible heavyweight. Pick one.
- Command: `$impeccable polish src/pages/blends/[slug].astro`

### [P2] Dead-end at the bottom of a deep-link
A visitor landing on `/blends/hana-blend` from Instagram has exactly one exit: back to a menu they never saw. A `Previous · Next` pair extends the read inside the brand voice — it's how a catalogue paginates.

- Fix: compute prev/next from `getCollection('blends')` sorted by `data.order` in `getStaticPaths` and pass as props. Render mono uppercase eyebrow rows above the back link.
- Command: `$impeccable craft prev/next blend navigation`

## Persona Red Flags

**The specialty matcha drinker (primary).** They came for provenance.
- Pass: origin, prefecture, cultivar, shading duration, harvest, processing are all in the first viewport on desktop.
- Fail: story body in display serif at 1.5rem is harder to read than it should be on a phone in a cafe's ambient light — exactly the read context the page is for. They will scan the spec list, not the story.

**The curious passerby (secondary).** They scan, they don't read.
- Pass: headline lockup tells them what blend, where, what category in under a second.
- Fail: no visible price band in the header. Prices are buried in "Available as" on the right rail. A scanner asking "is this expensive?" has to hunt. Promote the lowest drink price into the header lockup as a `from ฿180` mono line.

## Minor Observations

- Lines 38–39 (header origin) and the `Origin` spec row print the same prefecture twice with slightly different formatting. Precision is the brand. Drop the spec row; the header already carries it in accent green.
- Line 172: `grid-template-columns: 7rem 1fr` hard-codes the label column. "Processing" fits; longer cultivar names won't. `auto 1fr` with a `column-gap` is more robust.
- Lines 199–203: `.blend__drinks-dots` uses `transform: translateY(-3px)` to fake baseline alignment of the dotted leader. Brittle under zoom. Replace with `align-items: end` on the `<li>` and let the leader sit on the baseline naturally.
- Line 87: the back link's `←` is a literal arrow character. Consider `‹` or an inline `<svg>` to match the eyebrow tracking; the arrow currently optically outweighs the tracked uppercase next to it.
- Five `.fade-up` elements all fire on initial paint above the fold. If the observer triggers them simultaneously, the page "animates in" rather than "is there." Scope fade-up to below-the-viewport elements only, and gate everything on `prefers-reduced-motion: reduce`.
- `&amp;` in `src/content/blends/hana-blend.md` frontmatter (lines 7, 11, 12) renders literally as `&amp;` in YAML strings — these display as `&amp;`, not `&`. Use plain `&`.

## Questions to Consider

- What if the price lived in the header lockup, not the aside? The scanner persona finds it in one glance and the page stops hiding the commercial.
- What would a confident version look like with the story typeset in a real text serif instead of borrowing the display face?
- If the only motion is on hover and on scroll-in, do you need scroll-in fade-up at all? A page that just *is there* when you load it might be more on-brand than one that arrives politely.

## Recommended Actions (in priority order)

1. `$impeccable typeset src/pages/blends/[slug].astro` — move story body off the display face; consider introducing `--font-serif-text` in `tokens.css`.
2. `$impeccable distill src/pages/blends/[slug].astro` — drop chip borders on cupping notes; render as inline mono list separated by `·`.
3. `$impeccable quieter src/pages/blends/[slug].astro` — remove the back-link `translateX` hover; keep only the colour shift.
4. `$impeccable craft prev/next blend navigation` — wire prev/next from the collection sorted by `data.order`; mono eyebrow rows above the back link.
5. `$impeccable polish src/pages/blends/[slug].astro` — final pass: rule-weight symmetry, spec-row column sizing, drinks-dots baseline alignment, header price line, dedupe Origin, fix `&amp;` in content frontmatter.
