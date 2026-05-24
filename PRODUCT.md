# Product

## Register

brand

## Users

Specialty matcha drinkers and craft-food enthusiasts who care about provenance — single-cultivar origin, shading method, harvest, processing. They arrive on a phone or laptop with a specific intent: read the menu, learn about a blend, or find the cafe's address and hours. They are not browsing for entertainment; they are evaluating whether ALTR is worth the trip and whether the menu warrants the price.

A secondary audience is the curious passerby who has heard the name and wants to verify the cafe is real — location, hours, Instagram. They scan, they don't read.

## Product Purpose

A single-page landing site for ALTR Matcha Cafe that doubles as the public menu and brand statement. Blend-first information architecture: each menu entry is anchored to the matcha blend, with drink preparations (Usucha, Koicha, latte, dessert) as variants beneath. Dedicated `/blends/<slug>` pages carry the full provenance story.

Success looks like: a visitor can find a blend's origin and price in under ten seconds, read its full story without distraction, and locate the cafe without reaching for Google.

## Brand Personality

Minimal, serious, craft-focused. Three words: **considered, quiet, exacting.** The voice is the voice of a sourcing note or a cupping card — declarative, specific, no marketing softness. "Tana shading, 25 days" not "premium shade-grown leaves." The interface should feel closer to a specialty coffee roaster's bag label or a natural-wine importer's catalogue than to a hospitality website.

Emotionally: the page should evoke restraint and trust, not delight. If the user feels charmed, we've gone wrong; if they feel respected, we've gone right.

## Anti-references

- **Generic SaaS/startup landing template.** Rounded cards, gradient hero, full-bleed CTA buttons, three-column feature grid, illustrated mascots, stock photography of "happy customers." This is the default trap of every landing-page generator and the dominant first-order reflex for anything that isn't explicitly something else.
- **Trendy third-wave-cafe template.** Kraft-paper textures, hand-drawn doodles of tea leaves and steam swirls, animated SVG wave dividers between sections, "Our Story" with a sepia photo, Instagram grid embed, "Sustainably sourced ✨" with a sparkle emoji. The category-reflex trap for any cafe site.
- **Hospitality-brand precious minimalism.** Full-screen autoplay hero video of someone slowly whisking matcha, fashion-magazine pacing, a single word per screen on scroll, page that takes 12 seconds before any actual information appears. Minimal as a costume, not a discipline.
- **Boba / bubble-tea brand energy.** Bright pastels, playful blob shapes, emoji-forward menus, mascot characters. ALTR is a serious specialty cafe, not a chain dessert shop.

## Design Principles

1. **Cupping-note tone over marketing copy.** Every label, every microcopy line should read like it was written by someone who would be embarrassed by adjectives. "First flush, May" not "freshly harvested for peak flavor." If a word could appear on a Starbucks menu, cut it.
2. **The menu is the hero.** Not the logo, not the tagline, not an empty stage with a single sentence on it. Visitors come for the blends; surface them quickly and let them carry the page's weight.
3. **Specificity is the brand.** Origin, prefecture, shading duration, cultivar — the precision of the information is itself the design statement. Vague copy on a "minimal" template reads as empty; precise copy on the same template reads as authoritative.
4. **Hairlines, not boxes.** Structure through dividers, scale, and white space — not through bordered cards, drop shadows, or rounded containers. The page should look like it was set in a print shop, not assembled from a UI kit.
5. **Restraint over delight.** No micro-interactions that announce themselves, no decorative motion, no parallax. The only allowed animation is a subtle fade-up on scroll-in. Anything that draws attention to itself draws attention away from the matcha.

## Accessibility & Inclusion

- **WCAG 2.1 AA** is the target. Body text must hit 4.5:1 against the cream paper; large display headings (DM Serif Display at scale) must hit 3:1. The current ink-on-paper pairing should pass comfortably; sand and ink-muted need verification at smaller sizes.
- Respect `prefers-reduced-motion` — fade-up animation must collapse to an instant opacity transition.
- Keyboard navigation must work end-to-end. Fixed top nav anchors are the primary navigation; they must have visible focus rings (accent green, not the browser default ring on top of cream).
- Cupping-notes use IBM Plex Mono; verify legibility at the smallest sizes (`--text-xs` 0.75rem) — monospace at that size often falls below readable thresholds on low-DPR screens.
- English only by spec; no i18n requirement. Cultivar and prep terms (Usucha, Koicha, Ichibancha) stay untranslated and unitalicized — they are proper terms in the domain, not foreign words.
