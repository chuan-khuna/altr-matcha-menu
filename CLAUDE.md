## Project

Landing page for **ALTR's Matcha Cafe** — a single-page site with sections: Hero, About, Menu, Gallery, Contact / Location & Hours.

**Visual direction:** Warm & earthy — greens, creams, browns.

**Stack:** Astro 6, Tailwind CSS, shadcn/ui, TypeScript (strict).

## Commands

Use `bun` as the package manager (preferred). `npm` and `npx` are acceptable alternatives.

```bash
bun install          # install dependencies
bun run dev          # dev server at localhost:4321
bun run build        # production build to ./dist/
bun run preview      # preview production build
bunx astro add ...   # add Astro integrations (e.g. tailwind, react)
bunx astro check     # TypeScript diagnostics
```

## Adding shadcn components

shadcn/ui requires the `@astrojs/react` integration and `tailwindcss`. Add components via:

```bash
bunx shadcn@latest add <component>
```

Components land in `src/components/ui/`. Import them in `.astro` files using the `client:load` (or `client:visible`) directive since they are React components.

## Import alias

Always use the `@/` alias instead of relative paths. The alias maps to `src/` and is configured in both `tsconfig.json` and `astro.config.mjs`.

```ts
// ✅ correct
import { Menu } from "@/components/sections/Menu";
import { cn } from "@/lib/utils";

// ❌ avoid
import { Menu } from "../../../components/sections/Menu";
```

This applies to `.astro`, `.tsx`, `.ts` — all source files.

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
- Use the Tailwind **theme preset** to define brand colours (greens, creams, browns) in `tailwind.config.*` rather than hardcoding hex values in class names.
- shadcn/ui component styles can be overridden via `cn()` from `@/lib/utils`.

## References

Design references and inspiration files are stored in `_references/` (gitignored — do not commit). Ignore all files in that folder.

## LLM-generated artifacts

Artifacts produced during AI-assisted sessions (plans, research notes, design decisions) are stored under:

```
docs/artifacts/<type>/yyyy-mm-dd-<topic>.md
```

| Type       | Contents                                                   |
| ---------- | ---------------------------------------------------------- |
| `prd`      | Product requirement documents and feature specs            |
| `plan`     | Implementation plans and architectural decisions           |
| `research` | Research notes, reference analysis, technology comparisons |
| `design`   | Design decisions, UX notes, visual direction               |

When producing an artifact during a session, save it to the appropriate subdirectory. Do not place artifacts directly in `docs/` root.
