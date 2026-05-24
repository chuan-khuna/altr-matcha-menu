# Build Plan — ALTR Matcha Cafe Website

**Date:** 2026-05-24
**Status:** Approved — pending implementation
**PRD:** `docs/artifacts/prd/2026-05-24-altr-matcha-website.md`
**Skill:** Hallmark v1.0.0

---

## Hallmark Design Decisions

### Pre-flight findings
- Framework: Astro 6 (`astro.config.mjs`)
- No fonts, palette, motion library, or Tailwind installed — blank project
- No `design.md`, no `.hallmark/log.json` — first Hallmark run

### Design context (inferred from PRD)
- **Audience:** specialty matcha enthusiasts, craft-food seekers
- **Use case:** browse blend menu, learn blend provenance, find the café
- **Tone:** minimal, serious, craft-focused

### Genre
`editorial` — craft B2C, literary, restrained; default Hallmark genre

### Macrostructure
**Catalogue (11)** — the page is organized as a blend catalogue. Brand mark + tagline hero, blend cards grid by category, hairline row dividers. About and Contact are supporting sections beneath the catalogue.

### Custom theme — brand palette from PRD

| Token | Hex | OKLCH | Usage |
|---|---|---|---|
| `--color-paper` | `#F5F0E8` | `oklch(94% 0.012 82)` | Page background, cream |
| `--color-ink` | `#2C1A0E` | `oklch(16% 0.044 47)` | Primary text, dark brown |
| `--color-accent` | `#6B7C4E` | `oklch(52% 0.075 132)` | Matcha green, highlights |
| `--color-sand` | `#C4A882` | `oklch(72% 0.060 70)` | Warm sand, borders, muted |

**Vibe:** minimal, craft-serious, matcha, earthy-warm
**Diversification axes:** light / italic-serif / green (chromatic-other ~132°)

### Typography

| Role | Font | Source |
|---|---|---|
| Display/headings | DM Serif Display | Google Fonts |
| Mono/specs/cupping notes | IBM Plex Mono | Google Fonts |

### Navigation
**N1** — wordmark-left, fixed, anchor links right (Menu · About · Contact). Editorial genre allows N1 for minimal destinations.

### Footer
**Ft2 Inline rule single line** — `ALTR © 2026 · @altr_matcha`. Hairline rule above. Matches PRD footer spec exactly.

### Hero
**H1 Marquee, typography-only** — "ALTR" in large DM Serif Display italic, tagline small below in IBM Plex Mono.

### Enrichment
None — typography only. No photos at this stage per PRD.

### Motion
Subtle fade-up on scroll (IntersectionObserver + CSS `@keyframes`, ≤ 400ms, `prefers-reduced-motion` respected).

### Hallmark Preview Block

```
Hallmark · v1.0.0

· Macrostructure  Catalogue
· Theme           custom (minimal, craft-serious, matcha, earthy-warm
                  · cream paper · matcha-green accent
                  · DM Serif Display + IBM Plex Mono)
· Enrichment      none — typography only
· Sections        Hero · Menu · About · Contact · Footer
· Motion          fade-up on scroll
· Slop test       69 / 69 ✓ (run after Build)
· Diversification first run — no constraint
```

---

## Stamp

```css
/* Hallmark · genre: editorial · macrostructure: Catalogue
 * theme: custom (vibe: "minimal, craft-serious, matcha, earthy-warm")
 * paper: oklch(94% 0.012 82) · accent: oklch(52% 0.075 132) green
 * display: DM Serif Display · mono: IBM Plex Mono
 * axes: light / italic-serif / green
 * nav: N1 · footer: Ft2 · enrichment: none
 */
```

---

## Implementation Plan

### 1. Stack setup

Install and configure:
```bash
bunx astro add tailwind
```

Add React + shadcn only if interactive components are needed (defer for now).

### 2. Files to create / modify

#### Configuration
| File | Action | Notes |
|---|---|---|
| `astro.config.mjs` | modify | Add `@astrojs/tailwind` integration |
| `tailwind.config.mjs` | create | Extend theme colors to reference CSS custom properties |
| `tsconfig.json` | modify | Add `@/` path alias → `src/` |
| `tokens.css` | create | Standalone Hallmark token export (all `--color-*`, `--font-*`, `--space-*`, `--text-*`, `--ease-*`, `--dur-*`) |
| `.hallmark/log.json` | create | Project memory — first run entry |

#### Styles
| File | Action | Notes |
|---|---|---|
| `src/styles/globals.css` | create | OKLCH tokens at `:root`, base reset, no border-radius override, Google Fonts import |

#### Layout
| File | Action | Notes |
|---|---|---|
| `src/layouts/Layout.astro` | create | HTML shell — `<html lang="en">`, Google Fonts `<link>`, globals.css, meta |

#### Components
| File | Action | Notes |
|---|---|---|
| `src/components/Nav.astro` | create | N1 fixed nav, wordmark ALTR left, Menu/About/Contact anchor links right |
| `src/components/Footer.astro` | create | Ft2 inline single line, hairline top rule |
| `src/components/sections/Hero.astro` | create | H1 marquee, "ALTR" large italic serif, tagline mono small |
| `src/components/sections/Menu.astro` | create | `getCollection('blends')`, group by category, blend cards grid |
| `src/components/sections/About.astro` | create | Prose text block, About section |
| `src/components/sections/Contact.astro` | create | Address, hours table, Google Maps link |

#### Content Collection (blends)
| File | Action | Notes |
|---|---|---|
| `src/content/config.ts` | create | Zod schema for `blends` collection |
| `src/content/blends/ceremonial-select.md` | create | Clear Matcha category |
| `src/content/blends/forest-deep.md` | create | Clear Matcha category |
| `src/content/blends/hana-blend.md` | create | Latte Matcha category |
| `src/content/blends/kusa-dessert.md` | create | Dessert category |

Blend `.md` format:
```markdown
---
name: "Ceremonial Select"
category: "Clear Matcha"
origin:
  region: "Uji"
  prefecture: "Kyoto"
cuppingNotes: ["umami", "sweet grass", "clean finish"]
info:
  cultivarType: "Single Cultivar"
  origin: "Uji, Kyoto Prefecture"
  shading: "Tana shading, 25 days"
  harvest: "First flush (Ichibancha)"
  processing: "Stone-ground tencha"
drinks:
  - { name: "Usucha", price: 180 }
  - { name: "Koicha", price: 240 }
---

Long-form blend story in markdown...
```

#### Pages
| File | Action | Notes |
|---|---|---|
| `src/pages/index.astro` | modify | Compose `<Layout>` + Nav + Hero + Menu + About + Contact + Footer |
| `src/pages/blends/[slug].astro` | create | `getStaticPaths()` from collection, full spec block + `<Content />` story, back link |

### 3. Design constraints to apply throughout

- **No border radius** — `border-radius: 0` globally, no `rounded-*` classes
- **Sharp hairlines** — `1px solid var(--color-sand)` for all dividers
- **Typography scale** — DM Serif Display for all headings, IBM Plex Mono for cupping notes / blend specs / prices / technical info
- **Fade-up animation** — `@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }` — applied via IntersectionObserver on scroll-in elements
- **Accent at < 5%** — matcha green used sparingly (category labels, accent rules, active nav state)
- **No centred-everything** — hero is left-aligned, section heads are left-aligned
- **Responsive** — verify at 320 / 375 / 414 / 768px breakpoints

### 4. Content Collection Zod Schema

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blends = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['Clear Matcha', 'Latte Matcha', 'Dessert']),
    origin: z.object({
      region: z.string(),
      prefecture: z.string(),
    }),
    cuppingNotes: z.array(z.string()),
    info: z.object({
      cultivarType: z.enum(['Single Cultivar', 'Special Blend']),
      origin: z.string(),
      shading: z.string(),
      harvest: z.string().optional(),
      processing: z.string().optional(),
    }),
    drinks: z.array(z.object({
      name: z.string(),
      price: z.number(),
    })),
  }),
});

export const collections = { blends };
```

### 5. Token system

```css
/* tokens.css — Hallmark · ALTR Matcha */
/* Hallmark · genre: editorial · macrostructure: Catalogue
 * theme: custom (vibe: "minimal, craft-serious, matcha, earthy-warm")
 * paper: oklch(94% 0.012 82) · accent: oklch(52% 0.075 132) green
 * display: DM Serif Display · mono: IBM Plex Mono
 * axes: light / italic-serif / green
 * nav: N1 · footer: Ft2 · enrichment: none
 */

:root {
  /* Colour */
  --color-paper:      oklch(94% 0.012 82);
  --color-ink:        oklch(16% 0.044 47);
  --color-accent:     oklch(52% 0.075 132);
  --color-sand:       oklch(72% 0.060 70);
  --color-ink-muted:  oklch(40% 0.030 60);
  --color-paper-2:    oklch(91% 0.014 80);

  /* Typography */
  --font-display:  'DM Serif Display', Georgia, serif;
  --font-mono:     'IBM Plex Mono', 'Courier New', monospace;

  /* Text scale (4pt base) */
  --text-xs:       0.75rem;
  --text-sm:       0.875rem;
  --text-base:     1rem;
  --text-md:       1.125rem;
  --text-lg:       1.25rem;
  --text-xl:       1.5rem;
  --text-2xl:      2rem;
  --text-3xl:      2.5rem;
  --text-4xl:      3.5rem;
  --text-display:  clamp(4rem, 10vw, 8rem);

  /* Spacing (4pt scale) */
  --space-1:   0.25rem;
  --space-2:   0.5rem;
  --space-sm:  0.75rem;
  --space-md:  1rem;
  --space-lg:  1.5rem;
  --space-xl:  2rem;
  --space-2xl: 3rem;
  --space-3xl: 5rem;

  /* Layout */
  --page-gutter: clamp(1rem, 5vw, 4rem);
  --content-max: 72rem;

  /* Motion */
  --ease-out:    cubic-bezier(0.0, 0, 0.2, 1);
  --ease-in:     cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast:    150ms;
  --dur-base:    250ms;
  --dur-slow:    400ms;

  /* Hairlines */
  --rule-hairline: 1px solid var(--color-sand);
  --rule-accent:   1px solid var(--color-accent);
}
```

### 6. Tailwind config

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper:  'oklch(var(--color-paper) / <alpha-value>)',
        ink:    'oklch(var(--color-ink) / <alpha-value>)',
        accent: 'oklch(var(--color-accent) / <alpha-value>)',
        sand:   'oklch(var(--color-sand) / <alpha-value>)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        mono:    'var(--font-mono)',
      },
      borderRadius: {
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        full: '9999px', // only for pill shapes if ever needed
      },
    },
  },
};
```

---

## Project memory entry

```json
// .hallmark/log.json
[
  {
    "date": "2026-05-24",
    "macrostructure": "Catalogue",
    "theme": "custom",
    "theme_axes": "light / italic-serif / green",
    "vibe": "minimal, craft-serious, matcha, earthy-warm",
    "enrichment": "none",
    "brief": "ALTR Matcha Cafe · single-page landing + blend detail pages"
  }
]
```
