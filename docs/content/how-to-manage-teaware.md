# How to Manage Teaware

Collection key: `teaware`  
Definition: `src/collection-definitions/teaware.ts`  
Content folder: `src/content/teaware/<slug>/index.md`  
File format: `.md` with YAML frontmatter

The bowls, whisks and scoops used at the counter and sold across it.

**One piece per folder**, the same shape desserts and matcha blends use — so a
piece's photograph sits beside the file that names it, and the folder path is the
entry id:

```
src/content/teaware/
  mtch-shade/
    index.md
    mtch-shade.jpg           # referenced as ./mtch-shade.jpg
```

> **Naming.** `teaware` has no natural plural, so the definition file, the
> exported variable and the content folder are all singular — the same exception
> the `matcha` collection takes. See
> [content-architecture.md](./content-architecture.md).

---

## Frontmatter schema

```yaml
name: string            # Display name of the piece
order: number           # Sort order on the menu (default: 0, lower = first)
available: boolean      # (default: true) false = hidden from the menu, and no /teaware page

prices:                 # Variant label → price (THB). At least one key.
  <label>: number

description: string     # (optional) one short line under the name — form, glaze, maker
image: path             # (optional) photograph, relative to this file
imageAlt: string        # (optional) defaults to "" (decorative)
```

`prices` behaves exactly as it does for desserts: one key renders as a bare
figure, several render one row per price with every label shown. A piece with no
priced variant is not rendered — comment the prices out to pull it off the menu
without deleting the file, or set `available: false` to hide the piece (and
its page) with the prices left in place.

---

## Example file — `src/content/teaware/mtch-shade/index.md`

```markdown
---
name: "Chawan MTCH Shade"
order: 1
available: true
prices:
  single: 1400
description: "Katakuchi bowl, matte black"
image: ./mtch-shade.jpg
imageAlt: "Chawan MTCH Shade — matte black katakuchi bowl with a drawn spout"
---
```

---

## Notes

- All prices are in Thai Baht (THB).
- `entry.id` is the folder path under `src/content/teaware/` (e.g. `mtch-shade`, or
  `bowls/mtch-shade` if you nest it). Keep folder names kebab-case.
- Teaware has **no `notes` field** — a bowl has no tasting notes. That is the
  only way its schema differs from a dessert's.
- The Teaware category is set to `grid` in `menu-category.json`, so each piece
  renders as an image tile. See
  [how-to-manage-menu-categories.md](./how-to-manage-menu-categories.md).
- Every piece also gets a page of its own at `/teaware/<id>`
  (`src/pages/teaware/[...slug].astro`), and the menu tile links to it. The page
  heads with the name and the price, then sets anything written in the file
  **body** (below the frontmatter) beside the photograph as the piece's story.
  Leave the body empty and that block is simply omitted. `description` is not
  printed there — it is the line under the name on the menu tile, and the page's
  meta description.
- **The photograph and the price in the tree are mock** — a stand-in to shape the
  grid, not final photography or a real figure.
