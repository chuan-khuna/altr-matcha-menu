# How to Manage Seasonal Menus

Collection key: `seasonal`
Definition: `src/collection-definitions/seasonal.ts`
Content file: `src/content/seasonal.json`
Layouts: `src/components/seasonal/<slug>/index.astro`
File format: single JSON array + one folder per season

The short runs that sit beside the standing menu — Sakura in spring, Christmas
in December.

**A seasonal menu is two things, not one.** The JSON row names the season and
orders it; the component is the season's menu, laid out however that season
wants to be laid out. Neither works without the other:

```
src/content/seasonal.json                  # the archive — slug, title, date, description
src/components/seasonal/
  2026-sakura/                             # the season, named after the slug
    index.astro                            # its layout
    cover.jpg  sakura-float.jpg  …         # its photographs
  2025-christmas/
    index.astro
    cover.jpg
  ui/
    SeasonHead.astro                       # the head every season opens on
```

> **Why not a normal collection?** Because a season is laid out around the
> pictures that exist. Spring 2026 had a macro cover and three photographed
> items, so it is a banner over a grid of tiles; December 2025 had one pour shot
> and two drinks, so it is a portrait column beside a list of type. One shared
> renderer would have had to flatten both into whichever shape was chosen first.

> **Naming.** `seasonal` has no natural plural, so the definition file, the
> exported variable and the content file are all singular — the same exception
> `matcha` and `teaware` take. See
> [content-architecture.md](./content-architecture.md).

---

## The archive row — `src/content/seasonal.json`

```jsonc
{
  "slug": "2026-sakura",      // <yyyy>-<season>. The row id, the URL, and the component folder.
  "title": "Sakura",          // serif head for the season
  "year_month": "2026-03",    // yyyy-mm — sorts the archive, newest first. Never printed.
  "display": "Spring 2026",   // what the archive prints beside the title
  "description": "…",         // (optional) one line under the title
  "live": true                // (optional, default false) show it on the landing page
}
```

`slug` does three jobs at once — it is the row's id, the URL at
`/seasonal/<slug>`, and the name of the folder holding the component that
renders it. Change it and rename the folder to match, or the season drops off
the site.

`live` is the only thing that decides what the landing page shows. A season stays
in the footer archive for good; retiring one is a one-word edit. Set it on more
than one and the index stacks them, newest first.

---

## Adding a season

1. **Add the row** to `src/content/seasonal.json`. Set `live: true` and set the
   outgoing season's `live` back to `false`.
2. **Make the folder** `src/components/seasonal/<slug>/` and put the
   photographs in it.
3. **Write the layout** at `src/components/seasonal/<slug>/index.astro`. It
   receives `season` and `headingLevel` and should open with `<SeasonHead>`:

   ```astro
   ---
   import type { SeasonLayoutProps } from "@/lib/seasonal";
   import SeasonHead from "@/components/seasonal/ui/SeasonHead.astro";
   import cover from "@/components/seasonal/2026-sakura/cover.jpg";

   type Props = SeasonLayoutProps;
   const { season, headingLevel = "h2" } = Astro.props;
   ---

   <article aria-labelledby={`seasonal-${season.data.slug}-label`}>
     <SeasonHead
       season={season}
       headingLevel={headingLevel}
       linked={headingLevel !== "h1"}
     />
     <!-- whatever this season should look like -->
   </article>
   ```

That is all. The landing page section, the `/seasonal/<slug>` page and the footer
archive all pick it up — there is no third place to register it.

---

## What renders where

| Where | Component | Shows |
|---|---|---|
| Landing page, between the nav and the menu | `src/components/sections/Seasonal.astro` | seasons with `live: true`, newest first |
| `/seasonal/<slug>` | `src/pages/seasonal/[slug].astro` | that one season, head as `<h1>` |
| Footer, every page | `src/components/Footer.astro` | every season, newest first |

A row whose folder is missing is **dropped everywhere** rather than linked to a
404 — see `getSeasons()` in `src/lib/seasonal.ts`. That is the safe way to sketch
a season in the JSON before its layout exists.

---

## Notes

- All prices are in Thai Baht (THB).
- Prices live **in the component**, not in the JSON. A season is over when it is
  over; its figures are a record of what it cost, not a live price list.
- Reuse `MenuGridTile` (`@/components/matcha-info/ui/MenuGridTile.astro`) for a
  photographed season — it takes `name`, `prices`, `description`, `notes`,
  `image`, `imageAlt` and an optional `imageWidth`. Ignore it when the season
  wants something else.
- One folder per season, holding its `index.astro` and its photographs. The
  layout registry globs `src/components/seasonal/*/index.astro`, so a folder is
  a season only once it has an `index.astro` — shared components live in
  `src/components/seasonal/ui/` and are never mistaken for one.
- **Every photograph and price in the tree is mock** — stand-ins to shape the
  layout, not final photography or real figures.
