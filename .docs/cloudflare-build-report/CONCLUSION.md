# Conclusion — Cloudflare adapter cannot be enabled on this static site

**Decision: stay static, adapter disabled** (current committed state). Cold build passes:
8 pages, images optimized (`narino-cultivar` 2647kB → 238kB).

Full iteration ledger (Iter 1–7, each with its log): see
`2026-05-30-1936-static-adapter-image-enoent.md`.

## Why the adapter cannot be enabled

`@astrojs/cloudflare` exists to serve **on-demand (SSR) routes** from a Cloudflare Worker. To do
that it *always* restructures the build output into a worker layout:

```
dist/client/_astro/…   ← static assets (incl. ORIGINAL source images)
dist/.prerender/…      ← prerendered HTML + chunks
```

That restructuring is the `Rearranging server assets…` step. It is **unconditional** — it runs
even when every route is static. A 100%-static site gets all of the adapter's disruption and none
of its benefit.

## Why it fails (exact mechanism)

Astro emits each content-collection `<Image>` source as a hashed asset
(`narino-cultivar.CC7D9qEO.png`) into `dist/_astro/`, then a later step reads it back to generate
the `.webp` variants via `loadImage()` (`astro/dist/assets/build/generate.js:240`).

Required order: **emit original → generate variants**. With the adapter in static mode the order
is inverted:

```
1. Rearranging server assets…     moves dist/_astro/*  →  dist/client/_astro/*
2. generating optimized images    loadImage() opens dist/_astro/narino-cultivar.CC7D9qEO.png
                                  → ENOENT (it was moved in step 1)
```

The optimizer reads a directory the adapter already emptied.

## Why each attempted fix failed

| Attempt | Result | Why |
| --- | --- | --- |
| Warm cache | PASS (false) | `node_modules/.astro/assets` short-circuits `loadImage`; masks the bug. Cloudflare builds cold. |
| `imageService: "cloudflare-binding"` | FAIL | Still schedules build-time generation; reads moved `dist/_astro/`. |
| `imageService: "compile"` | FAIL | Same — generation still scheduled, same read path. |
| `imageService: "passthrough"` | FAIL | Same — passthrough still reads the source to copy it. |
| Top-level `passthroughImageService()` | FAIL | Adapter overrides the image service back to its own. |
| Upgrade adapter/astro | N/A | `@astrojs/cloudflare@13.6.0` + `astro@6.3.7` already latest. |
| `output: "server"` | PASS | **Only** fix — reorders generation before the rearrange. But it is a rendering-pipeline change (out of scope). |

## Net recommendation

For a fully static site, ship `dist/` to Cloudflare **Pages** directly — no adapter. Re-enable the
adapter only when a genuine on-demand route is introduced, and at that point adopt
`output: "server"` + per-page `export const prerender = true` (served HTML stays byte-identical;
a `_worker.js` is added for the SSR routes).
