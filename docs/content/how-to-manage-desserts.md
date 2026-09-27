# How to Manage Desserts

Collection key: `desserts`  
Definition: `src/collection-definitions/dessert.ts`  
Content folder: `src/content/desserts/<slug>/index.md`  
File format: `.md` with YAML frontmatter

**One dessert per folder**, the same shape a matcha blend uses — so a dessert's
photograph sits beside the file that names it, and the folder path is the entry id:

```
src/content/desserts/
  sakura-monaka/
    index.md
    sakura-monaka.jpg        # the photograph, referenced as ./sakura-monaka.jpg
  gelato/
    index.md
    gelato.jpg
```

Each entry is a single item on the menu and carries its own photograph, the way a
matcha blend carries its gallery. (Blends nest under a harvest year —
`matcha/2026/<slug>/` — because the leaf changes with the crop; desserts do not,
so they sit flat under `desserts/`.)

---

## Frontmatter schema

```yaml
name: string            # Display name of the dessert
order: number           # Sort order on the menu (default: 0, lower = first)
available: boolean      # (default: true) false = hidden from the menu

prices:                 # Variant label → price (THB). At least one key.
  <label>: number

description: string     # (optional) one short line under the name
notes:                  # (optional) tasting descriptors, joined with ·
  - string
image: path             # (optional) photograph, relative to this file
imageAlt: string        # (optional) defaults to "" (decorative)
```

---

## `prices` — one dessert, one or several figures

An ordered map of variant label to price.

```yaml
# Sold one way — the label is not printed, only the figure.
prices:
  single: 160
```

```yaml
# Sold several ways — one row per price, every label shown, in written order.
prices:
  single: 130
  set of four: 540
  set of five: 650
```

In both layouts a dessert with several variants gets one row per price — label
left, figure right — rather than a wrapped line of figures.

Keys are printed verbatim, so write them the way they should read on the menu
(lowercase, no quotes needed unless the label contains a colon).

**An entry with no priced variant is not rendered.** Comment the prices out to
pull a dessert off the menu without deleting the file — the same mechanism that
keeps the `powder` category off the page.

To hide a dessert and keep its prices written down, set `available: false`
instead.

---

## Example file — `src/content/desserts/matcha-monaka/index.md`

```markdown
---
name: "Matcha Monaka"
order: 4
available: true
prices:
  single: 160
  large: 190
image: ./matcha-monaka.jpg
imageAlt: "Matcha monaka, wafer shell split"
---
```

The markdown body is not rendered on the menu today. Leave it empty, or use it
for a note to whoever edits the file next.

> **`.mdx` needs an integration.** The loader accepts `index.md` *or* `index.mdx`,
> but `@astrojs/mdx` is not installed, and an `.mdx` entry is dropped **silently**
> — the build succeeds and the dessert simply never appears on the menu. Stay on
> `.md` unless you install the integration first
> (`bunx astro add mdx`).

---

## Images

Drop the file in the dessert's own folder, next to `index.md`, and reference it
relatively (`image: ./matcha-monaka.jpg`). Any aspect ratio works — both layouts render a
square frame with `object-cover`, so the centre survives the crop.

`imageAlt` is the alt text. Leave it off for a photograph that adds nothing the
name does not already say; the empty default marks it decorative to a screen
reader.

In the **grid** layout a dessert without a photograph still holds a square of
paper, so the tiles stay on one baseline rather than riding up level with their
neighbours' captions.

---

## How desserts are laid out

The **category** decides, not the dessert — `layout` in `menu-category.json`:

| `layout` | Component                                     | Shows                                   |
| -------- | --------------------------------------------- | --------------------------------------- |
| `grid`   | `ui/MenuGridTile.astro`                       | Image tile, name, price(s) beneath      |
| `list`   | `ui/MenuSpecialRow.astro`                     | Row: thumbnail + name, price(s) right   |

The Dessert category is set to `grid`. See
[how-to-manage-menu-categories.md](./how-to-manage-menu-categories.md).

---

## Notes

- All prices are in Thai Baht (THB).
- `entry.id` is the folder path under `src/content/desserts/` (e.g. `sakura-monaka`, or
  `2026/sakura-monaka` if you nest it). Keep folder names kebab-case and matching `name`.
- `order` controls sort order across all desserts (ascending).
- `notes` and `description` are both optional and both render in muted ink under
  the name. Use `description` for a sentence about the dessert, `notes` for
  comma-free descriptors. No dessert carries either today.
- **Photographs currently in the tree are mock** — stand-ins to shape the grid,
  not final photography. Prices are placeholders too.
- The Dessert **category** head, its gloss and its category photograph come from
  `menu-category.json`, not from here.
