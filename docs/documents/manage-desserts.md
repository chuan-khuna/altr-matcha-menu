# Manage desserts

**File:** `src/content/desserts/<slug>/index.md` (one folder per dessert)
**Schema:** `src/collection-definitions/dessert.ts` · full field reference in
[`docs/content/how-to-manage-desserts.md`](../content/how-to-manage-desserts.md)

## Add a dessert

1. Create `src/content/desserts/<slug>/index.md`.
2. Put its photo beside it (`<slug>.jpg`) and reference it as `./<slug>.jpg`.

```yaml
---
name: "Sakura Monaka"
order: 1
available: true
prices:
  single: 160          # one key → only the figure prints
description: "optional line under the name"
notes: ["optional", "tasting notes"]
image: ./sakura-monaka.jpg
imageAlt: "Sakura monaka, wafer shell stamped with a cherry blossom"
---
```

For several variants, write several keys (`single: 130`, `set of four: 540`).
Every label then prints.

## Show / hide

- `available: false` takes the dessert off the menu. The prices stay written
  down.
- An empty `prices` (all keys commented out) hides it too.

## Where it shows

Only on the main page, in any category with `"source": "desserts"` (currently
**Dessert**, as a `grid` of image tiles). Desserts have no page of their own.
