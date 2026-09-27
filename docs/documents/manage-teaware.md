# Manage teaware

**File:** `src/content/teaware/<slug>/index.md` (one folder per piece)
**Schema:** `src/collection-definitions/teaware.ts` · full field reference in
[`docs/content/how-to-manage-teaware.md`](../content/how-to-manage-teaware.md)

## Add a piece

1. Create `src/content/teaware/<slug>/index.md`, with its photo beside it.
2. Fill the frontmatter; the body becomes the story on the piece's page.

```yaml
---
name: "Chawan MTCH Shade"
order: 1
available: true
prices:
  single: 850
description: "Chawan, polycarbonate — MTCH"
image: ./mtch-shade.jpg
imageAlt: "Matte black katakuchi bowl"
---
```

Same as desserts, but with no `notes` field.

## Show / hide

- `available: false` removes the piece from the menu **and** its page.
- An empty `prices` removes it from the menu only.

## Where it shows

- **Main page:** categories with `"source": "teaware"` (currently **Teaware**,
  as a `grid`). Each tile links to the piece's page.
- **Own page:** `/teaware/<slug>`. The body text is left out if it is empty.
