# Cloudflare Build Failure — Image Optimization ENOENT

Document: https://docs.astro.build/en/guides/integrations-guide/cloudflare/

## Problem

Cloudflare Pages build fails at the "generating optimized images" step. The build completes static route generation successfully, then crashes when trying to read image files that were supposed to have been copied to `dist/_astro/`.

**Error summary:** `ENOENT: no such file or directory, open '/opt/buildhome/repo/dist/_astro/narino-cultivar.CC7D9qEO.png'`

This happens on commit `f2d8336`. The Cloudflare adapter was present and active at that commit.

## Current state of the project (local, cloudflare build passes, but I want to add the "adapters")

The adapter is **currently commented out** in `astro.config.mjs` as a workaround — the build passes locally and on Cloudflare with static output, but loses server-side capabilities. The goal is to re-enable the adapter correctly.

**`astro.config.mjs`** (current — adapter disabled):

```js
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [],
  fonts: [...],
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { "@": "/src" } },
  },
  // adapter: cloudflare({
  //   imageService: "passthrough",
  //   prerenderEnvironment: "node",
  // }),
});
```

**`wrangler.json`** (current):

```json
{
  "name": "altr-matcha",
  "compatibility_date": "2026-05-30",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  },
  "observability": { "enabled": true }
}
```

**`package.json`** key versions:

```json
{
  "dependencies": {
    "@astrojs/cloudflare": "^13.5.1",
    "astro": "^6.3.7",
    "sharp": "^0.34.5"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.0",
    "tailwindcss": "^4.3.0"
  }
}
```

**Cloudflare build environment (from log):** `bun@1.2.15`, `nodejs@22.16.0`

## Full build log (failing commit `f2d8336`)

```
2026-05-30T08:35:53.184Z  [@astrojs/cloudflare] Enabling image processing with Cloudflare Images for production with the "IMAGES" Images binding.
2026-05-30T08:35:53.187Z  [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
...
2026-05-30T08:35:58.223Z  [build] output: "static"
2026-05-30T08:35:58.224Z  [build] adapter: @astrojs/cloudflare
...
2026-05-30T08:36:00.440Z  [assets] Copying fonts (6 files)...
2026-05-30T08:36:00.612Z  [vite] ✓ built in 2.35s
2026-05-30T08:36:00.672Z  [build] Rearranging server assets...

 generating static routes
2026-05-30T08:36:00.718Z    ├─ /matcha/asatsuyu/index.html (+17ms)
...
2026-05-30T08:36:00.743Z  ✓ Completed in 69ms.

 generating optimized images
2026-05-30T08:36:00.746Z  [WARN] [build] Unable to generate optimized image for /_astro/narino-cultivar.CC7D9qEO.png: Error: ENOENT: no such file or directory, open '/opt/buildhome/repo/dist/_astro/narino-cultivar.CC7D9qEO.png'
2026-05-30T08:36:00.746Z  [WARN] [build] Unable to generate optimized image for /_astro/narino-tin.DZGq5XZ1.png: ...
2026-05-30T08:36:00.746Z  [WARN] [build] Unable to generate optimized image for /_astro/narino-usucha.CypH19kO.png: ...
2026-05-30T08:36:00.746Z  [WARN] [build] Unable to generate optimized image for /_astro/narino-farm.Dp38cnjL.jpg: ...
2026-05-30T08:36:00.746Z  [WARN] [build] Unable to generate optimized image for /_astro/narino-farm-2.DjIoPjdl.jpg: ...
2026-05-30T08:36:00.990Z  Error generating image for /_astro/narino-cultivar.CC7D9qEO.png: Error: ENOENT: no such file or directory, open '/opt/buildhome/repo/dist/_astro/narino-cultivar.CC7D9qEO.png'
  at generatePages (astro/dist/core/build/generate.js:202:13)
  at async loadImage (astro/dist/assets/build/generate.js:240:11)
  at async generateImage (astro/dist/assets/build/generate.js:69:28)

error: script "build" exited with code 1
```

**Key observation:** The adapter logs show it detected `"IMAGES"` and `"SESSION"` bindings — but `wrangler.json` at the time defined no such bindings. This means the adapter was reading bindings from a source other than `wrangler.json` (possibly a Cloudflare dashboard environment variable), or the adapter auto-detected and configured something it shouldn't have.

**Second key observation:** `[build] output: "static"` + `adapter: @astrojs/cloudflare` — static output with an adapter is a contradictory state. The Cloudflare adapter expects `output: "server"` or `output: "hybrid"`. The adapter's "Rearranging server assets..." step may be relocating image source files before Astro's image optimizer reads them.

## Reference project to compare against

Compare this project against `D:/code/digital-garden-2024`, which uses the same Cloudflare adapter and deploys successfully.

**Cloudflare bindings in that project:**

- Assets → `ASSETS`
- KV namespace → `SESSION`

Specifically compare:

1. `package.json` — `@astrojs/cloudflare`, `astro`, `sharp` versions
2. `wrangler.jsonc` — binding definitions
3. `astro.config.mjs` — adapter config, `output` mode, `imageService`
4. How `<Image>` is used and where image files live (`src/assets/` vs `public/`)

## Investigation steps

Work through these in order, stopping when you find the root cause:

1. **Check `output` mode conflict** — was `output: "server"` or `output: "hybrid"` set when the adapter was active? Static output + Cloudflare adapter is unsupported; confirm whether removing the `output` line (letting the adapter set it) fixes the build.

2. **Check `imageService` interaction** — `imageService: "passthrough"` tells Astro not to optimize images, but the build log shows image optimization still ran. Why? Was a conflicting `image` config present?

3. **Check binding mismatch** — the adapter auto-activated `IMAGES` and `SESSION` bindings that weren't in `wrangler.json`. Did a stale Cloudflare dashboard env var inject these? Does the reference project define them in `wrangler.jsonc` explicitly?

4. **Check image source location** — images erroring are in `src/content/matcha-drinks/narino/`. Are they in `src/assets/` in the reference project? Astro's image optimizer only processes images imported via `src/assets/` (or content collection images) — not `public/`. Confirm the import pattern in the narino content entry.

5. **Check `sharp` presence on Cloudflare** — `sharp` is in `dependencies` (not `devDependencies`). Does the reference project also ship `sharp`, or does it rely on Cloudflare's image service?

## Fix hypothesis to test

Before implementing, state your hypothesis here. Then:

1. Apply the minimal config change
2. Run `bun run build` locally — confirm it passes
3. Push — confirm Cloudflare build passes
4. Fill in the report below

---

## Report

You can use `debug-mantra` skill to find the bug.

Write the completed report to `.docs/cloudflare-build-report/2026-05-30-HHMM-<short-title>.md` using this format:

```markdown
---
title:
local_build_status: pass | fail
cloudflare_build_status: pass | fail | pending
---

## hypothesis

## files changed

## result
```

Commit the report alongside the fix.
