# How to Manage Teawear

Collection key: `teawear`  
Definition: `src/collection-definitions/teawear.ts`  
Content folder: `src/content/teawear/<slug>/index.md`  
File format: `.md` with YAML frontmatter

The bowls, whisks and scoops used at the counter and sold across it.

**One piece per folder**, the same shape desserts and matcha blends use — so a
piece's photograph sits beside the file that names it, and the folder name is the
slug:

```
src/content/teawear/
  mtch-shade/
    index.md
    mtch-shade.jpg           # referenced as ./mtch-shade.jpg
```

> **Naming.** `teawear` has no natural plural, so the definition file, the
> exported variable and the content folder are all singular — the same exception
> the `matcha` collection takes. See
> [content-architecture.md](./content-architecture.md).

---

## Frontmatter schema

```yaml
name: string            # Display name of the piece
order: number           # Sort order on the menu (default: 0, lower = first)

prices:                 # Variant label → price (THB). At least one key.
  <label>: number

description: string     # (optional) one short line under the name — form, glaze, maker
image: path             # (optional) photograph, relative to this file
imageAlt: string        # (optional) defaults to "" (decorative)
```

`prices` behaves exactly as it does for desserts: one key renders as a bare
figure, several render one row per price with every label shown. A piece with no
priced variant is not rendered — comment the prices out to pull it off the menu
without deleting the file.

---

## Example file — `src/content/teawear/mtch-shade/index.md`

```markdown
---
name: "Chawan MTCH Shade"
order: 1
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
- The folder name is the entry slug. Keep it kebab-case.
- Teawear has **no `notes` field** — a bowl has no tasting notes. That is the
  only way its schema differs from a dessert's.
- The Teawear category is set to `grid` in `menu-category.json`, so each piece
  renders as an image tile. See
  [how-to-manage-menu-categories.md](./how-to-manage-menu-categories.md).
- Every piece also gets a page of its own at `/teawear/<slug>`
  (`src/pages/teawear/[slug].astro`), and the menu tile links to it. The page
  heads with the name and the price, then sets anything written in the file
  **body** (below the frontmatter) beside the photograph as the piece's story.
  Leave the body empty and that block is simply omitted. `description` is not
  printed there — it is the line under the name on the menu tile, and the page's
  meta description.
- **The photograph and the price in the tree are mock** — a stand-in to shape the
  grid, not final photography or a real figure.
