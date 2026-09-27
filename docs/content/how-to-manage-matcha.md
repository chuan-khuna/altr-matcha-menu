# How to Manage Matcha

Collection key: `matcha`  
Definition: `src/collection-definitions/matcha.ts`  
Content folder: `src/content/matcha/`  
Sub-folders: `yyyy/<slug>/` (one directory per blend, per year)  
File format: `index.md` or `index.mdx` inside each blend folder  
Assets: keep flat at `src/content/matcha/<yyyy>/` or `src/content/matcha/assets/` — **not** inside the blend sub-folder  
Entry id: the folder path under `src/content/matcha/`, e.g. `2026/narino`  
Detail page route: `/matcha/<id>`, e.g. `/matcha/2026/narino`

---

## Frontmatter schema

```yaml
name: string          # Display name of the blend
order: number         # Sort order on the menu (default: 0, lower = first)
available: boolean    # (default: true) false = off the menu, and no /matcha page

notes:                # Cupping / tasting descriptors (2–6 short phrases)
  - string

info:
  cultivar: string      # Cultivar description
  brand: string         # (optional) Sourcing brand / supplier credit (e.g. "MTCH")
  origin: string        # (optional) Full origin description
  shading: string       # (optional) Shading method description
  harvest: string       # (optional) Harvest details
  processing: string    # (optional) Processing details

gallery:              # (optional) List of images for this blend
  - image: string     # Relative path from the blend folder (e.g. ./photo.jpg) — processed by Astro image optimization
    description: string # (optional) Caption for the image

menus:                # Which styles this blend is sold in; omit a category if not offered
  clear:              # (optional) Clear matcha preparations — a list, in menu order
    - title: string     # Display name, e.g. "Usucha"
      price: number     # THB (0 = TBD)
      available: boolean  # (default: true) false = this item is off the menu
  latte:              # (optional) Latte preparations — same item shape
    - title: "Latte"
      price: 180
      available: true
  powder:             # (optional) Retail powder, priced per unit rather than per serving
    - title: "40g Bag"
      price: 1050
      available: true
```

**Known item names per category:**

| Category | Canonical item names |
|---|---|
| `clear` | Usucha, Usucha Set, Light Brew, Hard Brew, Koicha |
| `latte` | Latte, Cold Whisk Latte, Nitro Cold Whisk Latte |
| `powder` | 20g Bag, 40g Bag, 30g Tin Can, 40g Tin Can |

- Each item is `title` (display name) + `price` (THB; `0` if TBD) + `available`.
- Set an item's `available: false` to take just that drink off the menu. A category
  with no available item is not shown for the blend; a menu category with no
  available item across all blends is not rendered at all.
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
available: true
menus:
  latte:
    - title: "Latte"
      price: 180
      available: true
    - title: "Cold Whisk Latte"
      price: 190
      available: false  # off the menu for now
gallery:
  - image: ./photo1.jpg
    description: "Morning preparation"
  - image: ./photo2.jpg
---

Body text describing the blend — flavour profile, intent, how it was made.
```

---

## Notes

- **Year folders:** place each blend as `src/content/matcha/<yyyy>/<slug>/index.md`. The glob loader picks up all depths. `entry.id` is the whole folder path, `<yyyy>/<slug>` (set by `entryId` in `src/lib/content.ts`), and the page route is `src/pages/matcha/[...slug].astro`, so the same blend can have a folder in `2025/` and in `2026/`, and each gets its own page.
- **Assets:** images referenced in `gallery` should be placed inside the blend sub-folder (e.g. `src/content/matcha/2025/hana-blend/photo.jpg`) and referenced as `./photo.jpg`. Other assets (not in gallery) keep flat at `src/content/matcha/<yyyy>/` or `src/content/matcha/assets/`.
- **Grouping on the menu page:** derived from which `menus` keys are present. A blend with both `clear` and `latte` appears in both menu groups.
- `order` controls sort order within each menu group (ascending).
- `notes` are displayed as flavour tag chips — keep them short (1–3 words each).
- All prices are in Thai Baht (THB).
- `harvest` and `processing` under `info` are optional; omit if unknown.
- `brand` under `info` is optional; when present it renders as `by {brand} — {origin}` in the header credit line.
