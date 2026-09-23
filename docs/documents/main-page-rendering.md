# How the main page picks and renders content

**Entry:** `src/pages/index.astro` renders, in order: `Nav` → `Seasonal` →
`Menu`. `Hero`, `About` and `Contact` are commented out for now.

## 1. Seasonal (`sections/Seasonal.astro`)

`getLiveSeasons()` (`src/lib/seasonal.ts`) reads `seasonal.json`. It keeps rows
that have a component folder and `live: true`, sorts them newest first, and
renders each season's own `index.astro`.

## 2. Menu (`sections/Menu.astro`)

1. **Load.** Categories from `menu-category.json`, sorted by `order`. Matcha,
   desserts and teaware are loaded with `available: false` entries **already
   filtered out**, then sorted by `order`.
2. **Fill each category by its `source`:**
   - `matcha`: every blend with a `menus[<category id>]` list. Only items with
     `available: true` are kept (`availableMenuItems` in `src/lib/content.ts`).
     A blend left with no items is skipped. Each row links to
     `/matcha/<entry id>`.
   - `desserts` / `teaware`: every entry with at least one `prices` key.
     Teaware tiles link to `/teaware/<entry id>`.
3. **Drop empty categories.** A category with nothing left is not rendered and
   does not appear in the category index (`MenuCategoryNav`).
4. **Render by `layout`:**
   - matcha source: one `MenuCard` per blend, listing its available items
   - `grid`: `MenuGridTile` (photo, name, price)
   - `list`: `MenuSpecialRow` (name, price)

   The category `gallery` sits beside the entries. `sweetnessScale` adds
   `MenuRemark` under them.

## Detail pages

| Route                     | Built for                        |
| ------------------------- | -------------------------------- |
| `/matcha/<yyyy>/<slug>`   | every matcha entry with `available: true` |
| `/teaware/<slug>`         | every teaware entry with `available: true` |
| `/seasonal/<slug>`        | every season with a component folder |

The entry id is the folder path under the collection (`2026/narino`), so the
same blend in two year folders gets two pages.
