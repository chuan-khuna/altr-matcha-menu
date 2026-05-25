# Content Architecture

Overview of all active content collections and static data files in the altr-matcha project.

---

## Content collections

Defined in `src/collection-definitions/`, registered in `src/content.config.ts`.
Content files live in `src/content/<plural-folder>/` as `.md` files.

| Collection key | Definition file | Content folder | Format |
|---|---|---|---|
| `matchaDrinks` | `src/collection-definitions/matcha-drink.ts` | `src/content/matcha-drinks/` (`clear/`, `latte/`, `powder/`) | `.md` or `.mdx` |
| `desserts` | `src/collection-definitions/dessert.ts` | `src/content/desserts/` | `.md` or `.mdx` |

---

## Static data files

Typed TypeScript exports consumed directly by Astro components — no collection loader needed.

| File | Exports | Used by |
|---|---|---|
| `src/data/site.ts` | `address`, `hours`, `reach`, `nav` | `Contact.astro`, `Nav.astro` |

---

## Naming conventions

| What | Format | Example |
|---|---|---|
| Collection definition file | `kebab-case-singular.ts` | `matcha-drink.ts` |
| Collection export variable | `camelCasePlural` | `matchaDrinks` |
| Content folder | `kebab-case-plural/` | `matcha-drinks/` |
| Content file | `kebab-case.md` | `hana-blend.md` |

---

## Adding a new collection

1. Create `src/collection-definitions/<singular>.ts`
2. Create `src/content/<plural>/` folder and add `.md` files
3. Register in `src/content.config.ts`
4. Create `project-skills/manage-content/references/how-to-manage-<plural>.md`
5. Add the new row to the schema sync table in `project-skills/manage-content/SKILL.md`
