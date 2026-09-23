# Manage seasonal menus

**Files:** `src/content/seasonal.json` (the list) +
`src/components/seasonal/<slug>/index.astro` (the layout)
**Schema:** `src/collection-definitions/seasonal.ts` · full reference in
[`docs/content/how-to-manage-seasonal-menus.md`](../content/how-to-manage-seasonal-menus.md)

A season is on the site only when **both** exist: a JSON row and a component
folder with the same `slug`. If either is missing, the season is skipped.

```json
{
  "slug": "2026-sakura",
  "title": "Sakura",
  "year_month": "2026-03",
  "display": "Spring 2026",
  "description": "Blossom season — salted petals, sparkling, and the leaf underneath.",
  "live": true
}
```

- `live: true` puts the season on the main page, above the menu. If several are
  live, they stack newest first by `year_month`.
- Every season, live or not, stays in the footer archive and at
  `/seasonal/<slug>`.
- The layout component decides everything else: items, prices and photos live
  in its folder.
