# Content Architecture

Overview of all active content collections and static data files in the altr-matcha project.

---

## Content collections

Defined in `src/collection-definitions/`, registered in `src/content.config.ts`.
Content files live in `src/content/<plural-folder>/` as `.md` files.

| Collection key | Definition file | Content folder | Format |
|---|---|---|---|
| `matcha` | `src/collection-definitions/matcha.ts` | `src/content/matcha/<yyyy>/<slug>/` | `index.md` or `index.mdx` |
| `desserts` | `src/collection-definitions/dessert.ts` | `src/content/desserts/<slug>/index.md` | `.md` |
| `teaware` | `src/collection-definitions/teaware.ts` | `src/content/teaware/<slug>/index.md` | `.md` |
| `seasonal` | `src/collection-definitions/seasonal.ts` | `src/content/seasonal.json` (+ one folder per season in `src/components/seasonal/`) | single JSON array |
| `menuCategories` | `src/collection-definitions/menu-category.ts` | `src/content/menu-category.json` (+ images in `src/content/menu-categories/`) | single JSON array |

> `matchaDrinks` / `src/content/matcha-drinks/` used to be listed here but has
> never existed in the tree or in `content.config.ts`. Row removed.

---

## Static data files

Typed TypeScript exports consumed directly by Astro components — no collection loader needed.

| File | Exports | Used by |
|---|---|---|
| `src/data/site.ts` | `announcement`, `address`, `hours`, `reach`, `nav` | `Contact.astro`, `Nav.astro`, `Announcement.astro`, `Footer.astro` |

### Helper modules

| File | Exports | Used by |
|---|---|---|
| `src/lib/content.ts` | `entryId` | `generateId` of the `matcha`, `desserts` and `teaware` glob loaders |
| `src/lib/seasonal.ts` | `getSeasons`, `getLiveSeasons`, `seasonLayout`, `seasonHref` | `Seasonal.astro`, `seasonal/[slug].astro`, `Footer.astro` |

`seasonal.ts` also holds the layout registry — the glob over
`src/components/seasonal/*/index.astro` that maps a slug to the component
rendering it. Each season is one folder: its `index.astro` and its photographs.

`entryId` makes the id of a folder-per-entry collection its folder path,
`index.md` dropped: `matcha/2026/narino/index.md` → `2026/narino`. The detail
pages (`matcha/[...slug].astro`, `teaware/[...slug].astro`) and the menu links
use `entry.id` as-is, so ids and URLs stay unique across year folders.

---

## Naming conventions

| What | Format | Example |
|---|---|---|
| Collection definition file | `kebab-case-singular.ts` | `matcha-drink.ts` |
| Collection export variable | `camelCasePlural` | `matchaDrinks` |
| Content folder | `kebab-case-plural/` | `matcha-drinks/` |
| — uncountable noun | `kebab-case-singular/` | `matcha/`, `teaware/`, `seasonal` |
| Content file | `kebab-case.md` | `hana-blend.md` |

---

## Adding a new collection

1. Create `src/collection-definitions/<singular>.ts`
2. Create `src/content/<plural>/` folder and add `.md` files
3. Register in `src/content.config.ts`
4. Create `docs/content/how-to-manage-<plural>.md`
5. Add the new row to the schema-sync table in `.claude/agents/content-manager.md`, and add the collection to the overview tables above
