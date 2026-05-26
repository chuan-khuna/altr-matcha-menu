# How to Manage Matcha

Collection key: `matcha`  
Definition: `src/collection-definitions/matcha.ts`  
Content folder: `src/content/matcha/`  
Sub-folders: `yyyy/<slug>/` (one directory per blend, per year)  
File format: `index.md` or `index.mdx` inside each blend folder  
Assets: keep flat at `src/content/matcha/<yyyy>/` or `src/content/matcha/assets/` — **not** inside the blend sub-folder  
Detail page route: `/matcha/<slug>` (slug = blend folder name)

---

## Frontmatter schema

```yaml
name: string          # Display name of the blend
order: number         # Sort order on the menu (default: 0, lower = first)

notes:                # Cupping / tasting descriptors (2–6 short phrases)
  - string

info:
  cultivar: string      # Cultivar description
  brand: string         # (optional) Sourcing brand / supplier credit (e.g. "MTCH")
  origin: string        # (optional) Full origin description
  shading: string       # (optional) Shading method description
  harvest: string       # (optional) Harvest details
  processing: string    # (optional) Processing details

menus:                # Which styles this blend is available in; omit a key if not offered
  clear:              # (optional) Clear matcha preparations
    "Usucha": number    # Item name → price in THB (0 = TBD)
    "Light Brew": number
    "Koicha": number
  latte:              # (optional) Latte preparations
    "Latte": number
    "Cold Whisk Latte": number
  powder:             # (optional) Retail powder
    "40g Bag": number
    "40g Tin Can": number
```

**Known item names per category:**

| Category | Canonical item names |
|---|---|
| `clear` | Usucha, Light Brew, Koicha |
| `latte` | Latte, Cold Whisk Latte |
| `powder` | 40g Bag, 40g Tin Can |

- Keys are display names (string) → price in THB (number). Use `0` if price is TBD.
- Milk variants (Soy, Oat) are **not** in the schema — handled at order time.
- Omit entire category if the blend doesn't support that style.

---

## Example file — `src/content/matcha/2025/hana-blend/index.mdx`

```markdown
---
name: "Hana Blend"
order: 4
notes:
  - "floral"
  - "creamy body"
  - "stone fruit"
info:
  cultivar: "Blend"
  origin: "Kagoshima & Kyoto Prefecture"
  shading: "Tana & cheesecloth · mixed"
  harvest: "First & second flush"
  processing: "Stone-ground tencha, blended post-grind"
menus:
  latte:
    Latte: 180
    Cold Whisk Latte: 190
---

Body text describing the blend — flavour profile, intent, how it was made.
```

---

## Notes

- **Year folders:** place each blend as `src/content/matcha/<yyyy>/<slug>/index.md`. The glob loader picks up all depths; the slug is the folder name (the page strips `/index` from `entry.id` before routing).
- **Assets:** keep flat at `src/content/matcha/<yyyy>/` or `src/content/matcha/assets/` — do **not** nest them inside the blend sub-folder.
- **Grouping on the menu page:** derived from which `menus` keys are present. A blend with both `clear` and `latte` appears in both menu groups.
- `order` controls sort order within each menu group (ascending).
- `notes` are displayed as flavour tag chips — keep them short (1–3 words each).
- All prices are in Thai Baht (THB).
- `harvest` and `processing` under `info` are optional; omit if unknown.
- `brand` under `info` is optional; when present it renders as `by {brand} — {origin}` in the header credit line.
