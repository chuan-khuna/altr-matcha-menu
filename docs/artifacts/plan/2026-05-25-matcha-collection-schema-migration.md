# Matcha Collection Schema Migration Plan

**Date:** 2026-05-25  
**Status:** Decided — ready to implement

---

## Context

Brainstorming session to revise the `matcha-drink` content collection schema to better model the domain: a **matcha blend (powder) is the entity**, and the drinks it can produce are serving styles, not separate items.

---

## Decisions

### 1. Collection rename
`matcha-drink` → `matcha`

- Definition file: `src/collection-definitions/matcha.ts`
- Collection variable: `matchas`
- Content folder: `src/content/matchas/`

### 2. `drinks[]` → `menus{}` (structured dictionary)

Replace the flat array with a typed object of fixed category keys, each holding a flexible price dictionary (`z.record(z.string(), z.number())`).

**Schema:**
```ts
menus: z.object({
  clear: z.object({
    notes: z.array(z.string()).optional(),
    items: z.record(z.string(), z.number()),
  }).optional(),
  latte: z.object({
    notes: z.array(z.string()).optional(),
    items: z.record(z.string(), z.number()),
  }).optional(),
  powder: z.object({
    notes: z.array(z.string()).optional(),
    items: z.record(z.string(), z.number()),
  }).optional(),
})
```

> **Note:** Per-style `notes` are optional and kept separate from items. Base character `notes` lives at the top level.

**Known menu items per category:**
| Category | Items |
|---|---|
| `clear` | Usucha, Light Brew, Koicha |
| `latte` | Latte, Cold Whisk Latte |
| `powder` | 40g Bag, 40g Tin Can |

- Keys are display names (string) → price (number)
- Milk variants (Soy Latte, Oat Latte) are **discarded from schema** — handled at order time
- All items optional; omit a category if the blend doesn't support it

**Frontmatter example:**
```yaml
menus:
  clear:
    Usucha: 180
    Light Brew: 160
    Koicha: 240
  latte:
    Latte: 190
    Cold Whisk Latte: 190
  powder:
    40g Bag: 650
    40g Tin Can: 750
```

### 3. `cuppingNotes` → `notes`

Renamed for simplicity. Remains top-level — represents the powder's base character regardless of serving style. Per-style flavour differences are expressed in the markdown body (prose), not as separate data fields.

### 4. `category` field — dropped

Was `'Clear Matcha' | 'Latte Matcha' | 'Powder Matcha'`. Redundant now that `menus` expresses which styles a blend supports. Dropped entirely.

### 5. `info{}` — unchanged

```ts
info: z.object({
  cultivar: z.string(),
  origin: z.string().optional(),
  shading: z.string().optional(),
  harvest: z.string().optional(),
  processing: z.string().optional(),
})
```

### 6. `order` — unchanged

Kept as-is for display ordering.

---

## New Schema (full)

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const matchas = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/matchas' }),
  schema: z.object({
    name: z.string(),
    order: z.number().default(0),
    notes: z.array(z.string()),
    info: z.object({
      cultivar: z.string(),
      origin: z.string().optional(),
      shading: z.string().optional(),
      harvest: z.string().optional(),
      processing: z.string().optional(),
    }),
    menus: z.object({
      clear: z.record(z.string(), z.number()).optional(),
      latte: z.record(z.string(), z.number()).optional(),
      powder: z.record(z.string(), z.number()).optional(),
    }),
  }),
});
```

---

## Migration Checklist

- [ ] Rename `src/collection-definitions/matcha-drink.ts` → `src/collection-definitions/matcha.ts`
- [ ] Update export: `matchaDrinks` → `matchas`
- [ ] Update `src/content.config.ts` import and registration
- [ ] Rename `src/content/matcha-drinks/` → `src/content/matchas/`
- [ ] Update all content files:
  - [ ] `clear/ceremonial-select.md`
  - [ ] `clear/forest-deep.md`
  - [ ] `clear/asatsuyu-baisen.md`
  - [ ] `latte/hana-blend.md`
- [ ] Update any components that query `matchaDrinks` collection
- [ ] Update reference doc in `project-skills/manage-content/references/`

---

## Asatsuyu Baisen — example migrated frontmatter

```yaml
---
name: "Asatsuyu Baisen"
order: 3
notes:
  - "grilled nori"
  - "toasted grains"
  - "cereal"
  - "roasted coconut"
  - "cacao"
  - "pistachio"
info:
  cultivar: "Single Cultivar · Asatsuyu (あさつゆ)"
  origin: "Kirishima, Kagoshima"
  shading: "21 days Jikkabuse"
  harvest: "Single Harvested"
  processing: "Special Roasted (Baisen)"
menus:
  clear:
    Usucha: 0
    Light Brew: 0
  latte:
    Cold Whisk Latte: 0
  powder:
    40g Bag: 0
---
```
