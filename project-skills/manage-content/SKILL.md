---
name: manage-content
description: >
  Reference skill for managing site content and keeping collection format docs
  up to date. Use this skill when the user asks to:
  - Add or edit a matcha drink or dessert entry
  - Update site data (address, hours, social links, nav items)
  - Update a content collection schema (collection-definitions files)
  - Know the correct frontmatter format for any content type
  - Add a new collection or scaffold a new menu section
  When a collection definition file or site data file changes, update the
  corresponding reference doc in this skill's references/ folder so it always
  reflects the live schema.
---

# Manage Content

This skill has two jobs:

1. **Content authoring guide** — tells you the correct format (frontmatter / TypeScript)
   for every active content collection so you never guess field names or types.

2. **Schema sync rule** — whenever a collection definition file or static data file
   changes, the matching reference doc here must be updated in the same task.

---

## Reference docs

| What you need | Reference file |
|---|---|
| Overview of all collections and data files | [`references/content-architecture.md`](./references/content-architecture.md) |
| Matcha drink entries (Clear Matcha / Latte Matcha) | [`references/how-to-manage-matcha-drinks.md`](./references/how-to-manage-matcha-drinks.md) |
| Dessert entries | [`references/how-to-manage-desserts.md`](./references/how-to-manage-desserts.md) |
| Site data — address, hours, social links, nav | [`references/how-to-manage-site-data.md`](./references/how-to-manage-site-data.md) |

---

## Schema sync rule

When any collection definition or site data file changes, update the matching
reference doc so it reflects the live codebase.

| Source path | Reference doc |
|---|---|
| `src/collection-definitions/matcha-drink.ts` | `references/how-to-manage-matcha-drinks.md` |
| `src/collection-definitions/dessert.ts` | `references/how-to-manage-desserts.md` |
| `src/data/site.ts` | `references/how-to-manage-site-data.md` |

If a new collection is added, create a new reference doc and add it to the tables above.
