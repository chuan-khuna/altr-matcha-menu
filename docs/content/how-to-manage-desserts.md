# How to Manage Desserts

Collection key: `desserts`  
Definition: `src/collection-definitions/dessert.ts`  
Content folder: `src/content/desserts/`  
File format: `.md` or `.mdx` with YAML frontmatter

---

## Frontmatter schema

```yaml
name: string            # Display name of the dessert group
order: number           # Sort order on the menu (default: 0, lower = first)
notes:                  # (optional) Array of tasting descriptors
  - string

items:                  # List of individual items with prices (THB)
  - name: string
    price: number
    description: string  # (optional) one short line under the item name
    image: path          # (optional) photograph, relative to this file
    imageAlt: string     # (optional) defaults to "" (decorative)
```

---

## Example file — `src/content/desserts/kusa-dessert.md`

```markdown
---
name: "Kusa Dessert"
order: 1
notes: ["grassy sweet", "vanilla finish", "low bitter"]
items:
  - { name: "Matcha Affogato", price: 220 }
  - { name: "Matcha Soft Serve", price: 180 }
  - { name: "Warabi Mochi", price: 160 }
---

Body text describing the dessert collection — flavour intent, best pairings, how it fits the menu.
```

---

## Notes

- `notes` is optional — omit the field entirely if there are no tasting notes.
- `order` controls sort order across all dessert groups (ascending).
- All prices are in Thai Baht (THB).
- The markdown body is used as the dessert description in the menu card.
- `items[].description` is optional — one short line under the item name, shown
  in muted ink. No dessert item carries one today.
- `items[].image` is optional. Drop the file next to the `.md` and reference it
  relatively (`./matcha-affogato.jpg`). When an item has one, the menu renders it
  as a thumbnail row; without one it renders as a plain name / price row. No
  dessert item carries a photograph today.
- The Dessert **category** head, its gloss and its category photograph come from
  `menu-category.json`, not from here — see
  [how-to-manage-menu-categories.md](./how-to-manage-menu-categories.md).
