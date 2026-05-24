# PRD — ALTR Matcha Cafe Website

**Date:** 2026-05-24  
**Status:** Approved

---

## Overview

A single-page landing site for **ALTR Matcha Cafe** with individual blend detail pages. The site serves as a public menu and brand presence for the cafe.

---

## Goals

- Display the cafe's specialty matcha menu organized by blend
- Provide detailed blend information (provenance, cupping notes, story) on dedicated pages
- Communicate brand identity: minimal, serious, craft-focused
- Show location, hours, and contact info

---

## Site Structure

### Main Landing Page (`/`)

Sections in order:

1. **Hero** — Cafe name, tagline
2. **Menu** — Blend cards by category
3. **About** — Cafe story
4. **Contact & Hours** — Address, opening hours, Instagram

### Blend Detail Pages (`/blends/<blend-name>`)

Full blend profile page per blend.

---

## Content Spec

### Language
English only. Technical terms (blend names, cupping notes, origins) remain in English.

### Menu Categories
- Clear Matcha
- Latte Matcha
- Dessert

### Menu Structure: Blend-First

Each menu item is organized around the **blend**, not the drink type. A single blend may be available as multiple drink preparations.

#### Blend Card (on landing page)
- Blend name
- Origin (region, prefecture)
- Cupping notes (flavor descriptors)
- Available drinks for this blend + prices

#### Blend Detail Page
- Blend name + origin
- Full blend story (long-form description)
- Cupping notes
- Technical info block:
  - Cultivar type (single / blend)
  - Origin
  - Shading method & duration
  - Harvest type
  - Processing notes
- Available drinks with prices
- Back navigation to menu

### About Section
> "ALTR is a specialty matcha cafe focused on single-cultivar and carefully blended matchas, sourced directly from Japanese farms and served with precision."

### Contact Section
- Single location (text only, no map embed)
- Address (mocked)
- Opening hours
- Google Maps link (text)

### Footer
- Cafe name
- Copyright year
- Instagram handle

---

## Design Spec

### Visual Style
- Minimal, clean
- **No border radius** (sharp corners throughout)
- Subtle fade-in scroll animations only

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#F5F0E8` | Page background, cream |
| Text | `#2C1A0E` | Primary text, dark brown |
| Accent | `#6B7C4E` | Matcha green, highlights |
| Secondary | `#C4A882` | Warm sand, borders, muted elements |

### Typography

| Role | Font |
|---|---|
| Headings / body | DM Serif Display (Google Fonts) |
| Cupping notes / blend specs / technical info | IBM Plex Mono (Google Fonts) |

### Navigation
- Fixed top nav
- Logo / cafe name — left
- Anchor links: Menu, About, Contact — right

---

## Data

Mock data will be used for initial build. Structure mirrors real blend data; content is original ALTR-branded (not copied from any source).

**Mock blend structure:**
```ts
type Blend = {
  slug: string
  name: string
  origin: { region: string; prefecture: string }
  cuppingNotes: string[]
  info: {
    cultivarType: 'Single Cultivar' | 'Special Blend'
    origin: string
    shading: string
    harvest?: string
    processing?: string
  }
  story: string
  drinks: { name: string; price: number }[]
}
```

---

## Technical Stack

- **Framework:** Astro 6
- **Styling:** Tailwind CSS (theme preset for brand colors)
- **Components:** shadcn/ui (React, `client:visible` for below-fold)
- **Language:** TypeScript (strict)
- **Package manager:** bun
- **Import alias:** `@/` → `src/`

---

## Out of Scope

- Online ordering
- Multilingual toggle
- Multiple locations
- Map embed
- Image gallery (no photos available at this stage)
