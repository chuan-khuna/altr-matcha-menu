# Cloudflare adapter setting vs. `dist/` output

**Date:** 2026-05-31
**Topic:** How `adapter: cloudflare()` in `astro.config.mjs` changes the build output, and what `dist/` looks like for a pure SSG deploy.

---

## TL;DR

This site is **100% static** (all routes prerendered, `output: "static"`). For a pure SSG
site you **do not need the `@astrojs/cloudflare` adapter** — the Astro docs say so directly:

> "If you're using Astro as a static site builder, you don't need an adapter."

The adapter was the root cause of the deploy failure (it auto-provisions a `SESSION` KV
namespace + `IMAGES` binding, and the KV provisioning collided with an existing namespace —
`[code: 10014]`). See `2026-05-31-build-success-deploy-fails.md`.

**Current state:** the adapter is commented out, so the build emits a clean static `dist/`.

---

## Current `astro.config.mjs` (adapter disabled)

```js
// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";   // still imported, but unused
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [],
  fonts: [ /* Cormorant Garamond, Lato */ ],
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { "@": "/src" } },
  },
  // adapter: cloudflare({
  //   // imageService: "compile",
  //   // prerenderEnvironment: "node",
  // }),
});
```

> Cleanup note: since the adapter is disabled, the `import cloudflare from "@astrojs/cloudflare"`
> line is now dead and can be removed too.

## Current `wrangler.toml`

```toml
name = "altr-matcha-menu"
compatibility_date = "2026-05-31"

[assets]
directory = "./dist/"        # correct for adapterless SSG output
# not_found_handling = "404-page"
# html_handling = "auto-trailing-slash"
```

---

## Adapter ON vs. OFF — what changes in the output

| | Adapter **OFF** (current, pure SSG) | Adapter **ON** (`@astrojs/cloudflare`) |
| --- | --- | --- |
| Build output root | `dist/` | `dist/client/` (assets) + `dist/_worker.js/` (server) |
| Worker script | none | `dist/_worker.js/index.js` generated |
| Generated wrangler config | none | `dist/client/wrangler.json` (wrangler redirects to it) |
| Runtime bindings | none | `SESSION` KV + `IMAGES` auto-provisioned on deploy |
| `wrangler.toml` `[assets].directory` | `./dist` | `./dist/client` |
| Deploy type | static assets only | Worker + static assets |
| Provisioning at deploy | nothing to provision | KV namespace creation (← the 10014 failure) |

Build-log signatures of the adapter being ON:
```
[@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
[@astrojs/cloudflare] Enabling image processing with Cloudflare Images ... "IMAGES" binding.
[build] adapter: @astrojs/cloudflare
```

---

## Current `dist/` output (adapter OFF)

Build: `bun run build` → 8 pages, static output, completed clean.

### Tree — depth 1

```
dist/
├── _astro/        # hashed build assets: CSS, optimized images, woff2 fonts
├── matcha/        # 7 prerendered drink pages (<slug>/index.html each)
├── index.html     # landing page
├── favicon.ico
└── favicon.svg
```

### Full tree

```
dist/
├── _astro/
│   ├── fonts/
│   │   ├── 00b5bb498060bc63.woff2
│   │   ├── 1e7711c88eeee1a2.woff2
│   │   ├── 22d71f5b12f02070.woff2
│   │   ├── 37b071bf8c304f56.woff2
│   │   ├── b247e2262a34a0c3.woff2
│   │   └── e21b17c4b1c38605.woff2
│   ├── Nav.89sDigcy.css
│   ├── narino-cultivar.CC7D9qEO.png
│   ├── narino-cultivar.CC7D9qEO_185D1X.webp
│   ├── narino-farm.Dp38cnjL.jpg
│   ├── narino-farm.Dp38cnjL_ZqyRSj.webp
│   ├── narino-farm-2.DjIoPjdl.jpg
│   ├── narino-farm-2.DjIoPjdl_4IPiM.webp
│   ├── narino-tin.DZGq5XZ1.png
│   ├── narino-tin.DZGq5XZ1_16dL6c.webp
│   ├── narino-usucha.CypH19kO.png
│   └── narino-usucha.CypH19kO_wDMPJ.webp
├── matcha/
│   ├── asatsuyu/index.html
│   ├── asatsuyu-baisen/index.html
│   ├── gokasho-samidori/index.html
│   ├── nana-tsu-mori/index.html
│   ├── narino/index.html
│   ├── oyt-special-blend/index.html
│   └── star-village/index.html
├── favicon.ico
├── favicon.svg
└── index.html
```

### Key observations

- **No `_worker.js/`** and **no `client/` subfolder** → confirms a pure static build, no Worker.
- **No generated `wrangler.json`** in `dist/` → wrangler uses the root `wrangler.toml` directly
  (when the adapter is on, wrangler instead "redirects" to `dist/client/wrangler.json`).
- Images are optimized at build time into `_astro/` (both original `.png/.jpg` and `.webp`
  variants) via Astro's default Sharp service — no runtime `IMAGES` binding needed.
- Fonts (6 `.woff2`) are downloaded and self-hosted under `_astro/fonts/` by Astro's Font API.
- HTML uses directory-style routes (`matcha/<slug>/index.html`), which Cloudflare serves with
  `html_handling = "auto-trailing-slash"` (the default).

---

## Deploy this output

```bash
bun run build          # → dist/ (static)
npx wrangler deploy    # uploads dist/ as Worker static assets; nothing to provision
```

No KV, no IMAGES, no Worker script → the `[code: 10014]` provisioning error cannot recur.
