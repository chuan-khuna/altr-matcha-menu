# Manage menu categories

**File:** `src/content/menu-category.json` (one array; photos in
`src/content/menu-categories/`)
**Schema:** `src/collection-definitions/menu-category.ts` · full field reference in
[`docs/content/how-to-manage-menu-categories.md`](../content/how-to-manage-menu-categories.md)

Each row is one section of the menu on the main page. The rows have no items of
their own. `source` says which collection fills the section.

```json
{
  "id": "latte",
  "label": "Latte",
  "gloss": "The same leaf, with milk.",
  "order": 2,
  "source": "matcha",
  "layout": "list",
  "gallery": [{ "image": "./menu-categories/latte.jpg" }],
  "sweetnessScale": true
}
```

| Field            | What it does                                                        |
| ---------------- | ------------------------------------------------------------------- |
| `id`             | For `matcha`, the `menus` key to read (`clear`/`latte`/`powder`). Also the anchor `#menu-<id>` |
| `order`          | Section order, ascending                                            |
| `source`         | `matcha`, `desserts` or `teaware`                                   |
| `layout`         | `list` (name/price rows) or `grid` (image tiles)                    |
| `gallery`        | Photo(s) beside the section. More than one image crossfades          |
| `sweetnessScale` | Adds the sweetness remark under the entries                         |

A category with no available entries is not rendered. It also drops out of the
category index.
