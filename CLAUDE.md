## Project

Landing page for **ALTR's Matcha Cafe** — a single-page site with sections: Hero, About, Menu, Gallery, Contact / Location & Hours.

**Visual direction:** Warm & earthy — greens, creams, browns.

**Stack:** Astro 7, Tailwind CSS v4 (CSS-first, no `tailwind.config.*`), shadcn/ui, TypeScript (strict).

## Commands

Use `bun` as the package manager (preferred). `npm` and `npx` are acceptable alternatives.

```bash
bun install          # install dependencies
bun run dev          # dev server at localhost:4321
```

## Adding shadcn components

shadcn/ui requires the `@astrojs/react` integration and `tailwindcss`. Add components via:

```bash
bunx shadcn@latest add <component>
```

Components land in `src/components/ui/`. Import them in `.astro` files using the `client:load` (or `client:visible`) directive since they are React components.

## Conventions

### File & folder naming

| What                        | Format                      | Examples                        |
| --------------------------- | --------------------------- | ------------------------------- |
| Astro / React components    | `PascalCase.astro` / `.tsx` | `Hero.astro`, `Nav.astro`       |
| Pages                       | `kebab-case.astro`          | `index.astro`, `[slug].astro`   |
| Lib / utility files         | `kebab-case.ts`             | `utils.ts`                      |
| Data / config files         | `kebab-case.ts`             | `site.ts`                       |
| Collection definition files | `kebab-case-singular.ts`    | `matcha-drink.ts`, `dessert.ts` |
| Collection variables / keys | `camelCasePlural`           | `matchaDrinks`, `desserts`      |
| Content folders             | `kebab-case-plural/`        | `matcha-drinks/`, `desserts/`   |

### Imports

Always use the `@/` alias (maps to `src/`). No relative paths in any `.astro`, `.tsx`, or `.ts` file.

### Content collections

Definition file is **singular**; variable and content folder are **plural** — all three names are trivially derivable from each other:

```
matcha-drink.ts  →  export const matchaDrinks  →  src/content/matcha-drinks/
dessert.ts       →  export const desserts      →  src/content/desserts/
```

**Exception — uncountable nouns:** if the noun has no natural plural in English (e.g. "matcha"), use the singular for both the variable and the content folder:

```
matcha.ts  →  export const matcha  →  src/content/matcha/
```

## Architecture

```
src/
  pages/
    index.astro           # single page — composes all sections
  layouts/
    Layout.astro          # root HTML shell (<html>, <head>, global meta)
  components/
    FontLoader.astro      # injects <Font> tags for Astro's Fonts API
    sections/             # one Astro component per page section
      Hero.astro
      About.astro
      Menu.astro
      Gallery.astro
      Contact.astro
    ui/                   # shadcn/ui React components
  lib/
    utils.ts              # cn() and other shared utilities
  data/                   # static content / config (menu items, hours, etc.)
public/                   # static assets served at /
```

- `src/pages/index.astro` composes `<Layout>` + all section components in order.
- `src/layouts/Layout.astro` wraps pages with the HTML shell and global meta.
- Section components live in `src/components/sections/` — each section is its own `.astro` file.
- shadcn React components live in `src/components/ui/` and need a `client:*` directive when used in `.astro` files.
- Static content (menu items, opening hours, contact info) lives in `src/data/`.

## Content collections

Structure:

```
src/
  collection-definitions/   # one .ts file per collection (singular name)
    matcha-drink.ts
    dessert.ts
  content.config.ts         # imports all definitions, exports { collections }
  content/
    matcha-drinks/          # .md files (plural folder)
    desserts/
```

`content.config.ts` is kept thin — only imports and re-exports:

```ts
import { matchaDrinks } from "@/collection-definitions/matcha-drink";
import { desserts } from "@/collection-definitions/dessert";

export const collections = { matchaDrinks, desserts };
```

When adding a new collection: create `src/collection-definitions/<singular>.ts`, add `src/content/<plural>/`, then register in `content.config.ts`.

**Documentation rule:** Whenever you change `src/collection-definitions/**` or `src/data/**`, update the matching reference doc in `docs/content/`. A task is not complete until the docs are in sync. Content work can be delegated to the **`content-manager`** subagent (`.claude/agents/content-manager.md`), which owns these collections and the schema-sync rule.

## Fonts

**Font loading:** Astro Font API (`astro.config.mjs` → `fonts[]` with `fontProviders.google()`) + `FontLoader.astro` component injected in `BaseLayout.astro` `<head>`. CSS variables follow `--font-<kebab-name>` convention (e.g. `--font-lato`). Do **not** add Google Fonts `@import` to CSS — configure new fonts in `astro.config.mjs` and add a `<Font cssVariable="..." />` entry in `src/components/FontLoader.astro` instead.

## Troubleshooting display and animation issues

When animations, visual effects, or interactive behavior don't work, the cause is often Astro's default static rendering — React components render to HTML on the server and ship no JS unless a `client:*` directive is present.

| Directive             | When JS loads                   | Use for                                  |
| --------------------- | ------------------------------- | ---------------------------------------- |
| `client:load`         | Immediately on page load        | Above-the-fold interactive components    |
| `client:idle`         | When browser is idle            | Non-critical UI                          |
| `client:visible`      | When component enters viewport  | Below-the-fold animations/effects        |
| `client:only="react"` | Immediately, skips SSR entirely | Components using `window`, WebGL, canvas |

If an animation works in isolation but breaks on the site, first check whether the component has the right `client:*` directive.

## Styling

- Use **Tailwind** for all styling. Do not write custom CSS unless Tailwind cannot cover it.
- This is **Tailwind v4** — there is no `tailwind.config.*`. Configuration is CSS-first: `src/styles/globals.css` imports Tailwind (`@import "tailwindcss"`) and defines theme tokens via `@theme inline { … }`.
- Define brand colours (greens, creams, browns) as CSS variables in the preset `src/styles/presets/matcha.css`, exposed to Tailwind through `@theme inline` in `globals.css`, rather than hardcoding hex values in class names.
- shadcn/ui component styles can be overridden via `cn()` from `@/lib/utils`.

Design references and inspiration files are stored in `_references/` (gitignored — do not commit). Ignore all files in that folder.

## Agent skills

### Issue tracker

Issues, specs, and session artifacts (PRDs, plans, research and design notes) live as local markdown under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, used verbatim as status strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
