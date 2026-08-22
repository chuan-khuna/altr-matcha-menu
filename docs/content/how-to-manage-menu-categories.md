# How to Manage Menu Categories

Collection key: `menuCategories`
Definition: `src/collection-definitions/menu-category.ts`
Content file: `src/content/menu-category.json`
Category images: `src/content/menu-categories/`
File format: a single JSON **array** of category objects

This collection is the running order of the menu, the copy that heads each part,
and the one photograph that stands for it. It holds **no priced items of its
own** — each category names the collection its entries come from.

---

## Schema

```jsonc
{
  "id": "clear",            // required, unique. For source "matcha" this MUST be
                            // one of: clear | latte | powder — it is the key
                            // into each blend's `menus` record.
  "label": "Clear",         // serif head for the category
  "gloss": "No milk...",    // (optional) italic line under the head
  "order": 1,               // ascending; controls the running order
  "source": "matcha",       // matcha | desserts | teaware
  "layout": "list",         // list | grid  (default: list)
  "gallery": [              // (optional) one or more photographs
    { "image": "./menu-categories/clear.jpg", "description": "caption" }
  ],
  "sweetnessScale": false   // show the counter sweetness scale under this category
}
```

`gallery` is the **same shape as a matcha blend's `gallery`** and is rendered by
the same component (`MatchaGallery.astro`), so a category with more than one
image gets the crossfading gallery from the blend pages — caption, counter and
arrows included. A single image renders as a still frame with no controls.
`description` doubles as the image's alt text; omit it for a decorative photo.

### `source` — where the entries come from

| Value      | Entries                                                                    |
| ---------- | -------------------------------------------------------------------------- |
| `matcha`   | The `matcha` collection, keyed by the category's own `id` into each blend's `menus`. |
| `desserts` | The `desserts` collection — one entry per dessert, each with its own price(s) and photograph. |
| `teaware`  | The `teaware` collection — one entry per piece, each with its own price(s) and photograph. |

### `layout` — how the entries are set

| Value  | Component                 | Shows                                                  |
| ------ | ------------------------- | ------------------------------------------------------ |
| `list` | `ui/MenuSpecialRow.astro` | Rows down the measure: name left, price(s) right.       |
| `grid` | `ui/MenuGridTile.astro`   | Image tiles — two across, three from 46rem.             |

`list` is the default and the only layout a **`matcha`** source uses: a blend's
photographs belong to the blend page, not to a priced row, so `layout` is ignored
on `clear`, `latte` and `powder`. `grid` is for a source whose entries each carry
their own photograph — `desserts` and `teaware` — which is why `dessert` and
`teaware` are the two categories set to `grid`.

`desserts` and `teaware` are flattened to the same shape before rendering
(`MenuItem` in `Menu.astro`), so both layouts and both components serve either
source without a branch of their own.

**A category with nothing priced is not rendered.** That is the mechanism that
keeps `powder` off the page while its prices are commented out of the blends.

---

## Adding or changing category images

1. Drop the file in `src/content/menu-categories/`. Any aspect ratio works — the
   rail renders a square frame with `object-cover`, so the centre survives the
   crop and the edges do not.
2. Add an entry to `gallery` with the path **relative to `menu-category.json`**,
   e.g. `{ "image": "./menu-categories/latte.jpg" }`.
3. Add a `description` when the photograph shows something the category head does
   not already say — it is used as both the caption and the alt text. Omit it for
   a purely decorative shot.

> **Placeholders in the tree:** `clear.jpg` and `latte.jpg` are stand-ins and
> should be replaced with real photography. `dessert.jpg`, `powder.jpg` and
> `teaware.jpg` are real.

---

## Turning a category on

- **`powder`** — uncomment the `powder:` block in the blends that should sell it
  (`src/content/matcha/<year>/<slug>/index.md`). See
  [how-to-manage-matcha.md](./how-to-manage-matcha.md).
- **`teaware`** — live. Add a folder under `src/content/teaware/` with an
  `index.md` and a photograph; see
  [how-to-manage-teaware.md](./how-to-manage-teaware.md).

---

## Notes

- `id` is consumed by the `file()` loader and does **not** appear in `entry.data`
  — read it as `entry.id`.
- Categories render in `order`, not array order, but keeping the two in step
  makes the file easier to read.
- `sweetnessScale` renders `src/components/matcha-info/MenuRemark.astro`. Only
  `latte` sets it today.
- `layout` is written explicitly on every category even though `list` is the
  default, to keep the file readable as a single table of settings.
- The category head and its `gloss` run the **full measure** and pin under the nav
  from 46rem up. The gallery sits in a left rail below the head, `position: sticky`
  from 62rem up, so the photographs stay level with the entries as you scroll that
  category.
- **Keep `label` and `gloss` to one line each.** The rail's sticky offset is
  `--menu-head-h` in `presets/matcha.css`, computed from the type scale as
  *padding + label line + gap + gloss line + padding + rule*. A head that wraps
  is taller than that figure and the pinned rail will tuck under it.
- The rail gallery is rendered with `animate={false}`. A `position: sticky`
  element can already be pinned when it first enters the viewport, so the
  scroll-triggered `.fade-up` has no reliable moment to fire and the rail would
  stay at `opacity: 0`.
