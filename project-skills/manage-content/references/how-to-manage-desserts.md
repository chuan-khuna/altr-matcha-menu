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
