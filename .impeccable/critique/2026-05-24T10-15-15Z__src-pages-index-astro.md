---
target: src/pages/index.astro
total_score: 33
p0_count: 0
p1_count: 2
timestamp: 2026-05-24T10-15-15Z
slug: src-pages-index-astro
---
# Critique - src/pages/index.astro

## Design Health Score: 33/40 (Polished, on-brand, with specific slips)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Fade-up gives progress; hover states present. |
| 2 | Match System / Real World | 4 | Domain language precise; "By blend, not by drink" matches mental model. |
| 3 | User Control & Freedom | 3 | Anchor nav + back link work. |
| 4 | Consistency & Standards | 3 | Section-number system used only in About. CTA arrow inconsistent. |
| 5 | Error Prevention | n/a | No forms. |
| 6 | Recognition over Recall | 4 | Explicit labels; baseline-aligned prices. |
| 7 | Flexibility & Efficiency | 3 | Appropriate for type. No skip-link. |
| 8 | Aesthetic & Minimalist Design | 4 | Strongest area. Loses for glass nav + chip borders. |
| 9 | Error Recovery | n/a | - |
| 10 | Help & Documentation | 3 | Copy carries its own help. |

## Anti-Patterns Verdict

LLM assessment: Does NOT look AI-generated. Voice, hairline-grid commitment, blend-first IA all read as deliberate.

Residual slop tells:
1. Backdrop blur on fixed nav (glassmorphism-as-default).
2. "Scroll for the menu" pointer.
3. "Read the blend ->" CTA repeating card-as-link affordance.
4. Green accent dot in "ALTR." (trend-adjacent).
5. Bordered cupping-note chips (re-introduce micro-cards).

Deterministic scan: unavailable (detector script missing).
Visual overlays: not available (no browser tool).

## Priority Issues

- [P1] No skip-to-content link with a fixed top nav. WCAG AA miss. Fix: visually-hidden skip link in Layout.astro, id="main" on <main>. -> impeccable harden
- [P1] Section numbering half-implemented (only About has Section 02). Fix: commit across sections, or remove. -> impeccable typeset / impeccable distill
- [P2] Backdrop-blur nav is glassmorphism by default. Fix: solid paper background + hairline. -> impeccable quieter
- [P2] Scroll pointer + per-card CTA are landing-page tics. Fix: remove both. -> impeccable distill
- [P2] Cupping-note chips re-introduce bordered-box pattern. Fix: inline prose with middle-dot separators. -> impeccable distill
- [P3] Hero green dot is trend-adjacent. Fix: try ink period, accent rule, or removal. -> impeccable shape

## Persona Red Flags

Mira (specialty buyer): cultivar/shading need a click; cupping chips read as UI tags not sommelier notes.
Kai (first-time mobile visitor): Hero takes full first viewport; Contact link in muted mono at smallest size is easy to miss.

## Minor Observations

- Hard <br/> in Hero tagline; let max-width wrap.
- Missing OG/Twitter meta in Layout.
- "est. 2026" cute for unopened cafe.
- Google Fonts @import render-blocks; move to <link rel="preconnect"> in head.
- Universal border-radius:0 selector belt-and-braces (Tailwind already enforces).
- Verify Contact address wraps cleanly at 360px.

## Questions to Consider

- What if the Menu WERE the page, and the Hero were a one-line strip?
- What if there were no global nav at all?
- What is the boldest version of cupping notes (italic display serif inline)?
- Is the green dot doing brand work, or is it the page's safety blanket?
