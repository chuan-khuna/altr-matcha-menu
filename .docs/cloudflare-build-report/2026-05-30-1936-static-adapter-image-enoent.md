---
title: Cloudflare static build — image optimization ENOENT with @astrojs/cloudflare adapter
local_build_status: pass
cloudflare_build_status: pending
---

## constraint

Keep **rendering behaviour unchanged**: `output` stays static (default), pages stay
prerendered as they already are. No `output: "server"`, no per-page `export const prerender`.
Re-enable the Cloudflare adapter without breaking the build.

## hypothesis

Mechanism (proven below): with the Cloudflare adapter and static output, the adapter's
`Rearranging server assets…` step runs **before** `generating optimized images`. The rearrange
moves the original source assets out of `dist/_astro/` (into `dist/client/_astro/`), so the
image generator's `loadImage()` — which reads from `dist/_astro/` — hits ENOENT. The
`imageService` value does not change this (compile / cloudflare-binding / passthrough all fail
the same way).

## iteration ledger

Each iteration is a fresh build with the image cache cleared
(`rm -rf dist node_modules/.astro/assets`) to mimic Cloudflare's cold build.

### Iter 1 — reproduce with warm cache (adapter, imageService: cloudflare-binding)
- Change: re-enabled adapter as failing commit `f2d8336` (`imageService: "cloudflare-binding"`).
- Build: **PASS** locally — but log says `(reused cache entry)` for every image.
- Verdict: cache masked the bug. Not a valid repro of Cloudflare's cold build.

### Iter 2 — reproduce cold (adapter, cloudflare-binding, cache cleared)
- Change: same config; cleared `dist` + `node_modules/.astro/assets`.
- Build: **FAIL** — `ENOENT … open 'dist\_astro\narino-cultivar.CC7D9qEO.png'`.
  Stack: `loadImage (astro/dist/assets/build/generate.js:240)`.
- Verdict: reliable repro. Bug is cold-cache only → matches Cloudflare.

### Iter 3 — flip imageService knob (adapter, imageService: compile, cold)
- Change: `imageService: "compile"` (the value the working reference project uses).
- Build: **FAIL** — identical ENOENT.
- Verdict: imageService does NOT move the failure. Root cause is elsewhere.

### Iter 4 — differential: adapter OFF (no adapter, static, cold)
- Change: adapter disabled.
- Build: **PASS**. `dist/_astro/` contains BOTH original `narino-cultivar.CC7D9qEO.png`
  AND generated `…_185D1X.webp` (2647kB → 238kB, real sharp compression).
- Verdict: without the adapter the original stays at `dist/_astro/` so the optimizer reads it.

### Iter 5 — locate the moved file (adapter ON, cold)
- Change: adapter re-enabled.
- Observation: original asset is emitted to `dist/client/_astro/narino-cultivar.CC7D9qEO.png`,
  NOT `dist/_astro/`. Optimizer reads `dist/_astro/` → ENOENT.
- Verdict: **root cause confirmed** — adapter restructures `_astro → client/_astro` during
  `Rearranging server assets`, which runs before image generation in static mode.

### Iter 6 — static + imageService: passthrough (cold)
- Change: `output` static (default), adapter `imageService: "passthrough"` (doc baseline).
- Build: **FAIL** — same ENOENT. Log order: `Rearranging server assets…` THEN
  `generating optimized images`. The rearrange runs first → source already moved.
- Verdict: imageService=passthrough does not avoid the source read.

### Iter 7 — static + Astro `passthroughImageService()` (cold)
- Change: top-level `image: { service: passthroughImageService() }` to try to skip generation.
- Build: **FAIL** — same ENOENT. The adapter overrides the image service back to its own,
  which still schedules build-time generation for prerendered content images.
- Verdict: no top-level image override survives the adapter. Reverted.

### Version check
- `@astrojs/cloudflare` 13.6.0 (latest on npm), `astro` 6.3.7. No upstream fix to upgrade into.

## conclusion so far

In **static** mode the adapter always runs `Rearranging server assets` BEFORE
`generating optimized images`, so any content-collection `<Image>` read fails — independent of
`imageService` or a top-level image service. The ONLY observed config that reorders
generation before rearrange is `output: "server"` (Iter, earlier): there `generating optimized
images` runs first while sources are still at `dist/_astro/`, then rearrange moves the final
output. Pages can still be prerendered to byte-identical static HTML via
`export const prerender = true`.

This is a genuine fork:
- **A. Keep static literally** → cannot enable the adapter; stay on current no-adapter build and
  deploy `dist/` to Cloudflare Pages directly (no server capability).
- **B. Enable the adapter for server capability** → needs `output: "server"` + per-page
  `prerender = true`. Served HTML is identical static output; only the build pipeline/config
  default changes.

## decision

**Chose A — stay static, no adapter.** The adapter is left disabled (current committed state).

## why the adapter cannot be enabled on this static site

The `@astrojs/cloudflare` adapter exists to serve **on-demand (SSR) routes** from a Cloudflare
Worker. To do that it restructures the build output into a worker-shaped layout:

```
dist/client/_astro/…   ← static assets (incl. ORIGINAL source images)
dist/.prerender/…      ← prerendered HTML + chunks
```

This restructuring is the `Rearranging server assets…` build step. It is unconditional whenever
the adapter is present — it runs even when every route is static.

## why it fails (exact mechanism)

Astro's build emits each content-collection `<Image>` source as a hashed asset
(`narino-cultivar.CC7D9qEO.png`) into `dist/_astro/`, then a later step,
`generating optimized images`, reads that original back via
`loadImage()` (`astro/dist/assets/build/generate.js:240`) to produce the `.webp` variants.

The two steps must run in this order: **emit original → generate variants**. With the adapter in
**static** mode the order is inverted:

```
1. Rearranging server assets…     → moves dist/_astro/*  →  dist/client/_astro/*
2. generating optimized images    → loadImage() opens dist/_astro/narino-cultivar.CC7D9qEO.png
                                     → ENOENT (it was moved in step 1)
```

So the optimizer reads a path the adapter already emptied. The failure is purely this ordering:

- It reproduces only on a **cold** build (a warm `node_modules/.astro/assets` cache short-circuits
  `loadImage`, which is why it passed locally but failed on Cloudflare's clean builder).
- It is **independent of `imageService`** — `compile`, `cloudflare-binding`, and `passthrough`
  all fail identically, because all of them still schedule build-time generation for prerendered
  images, and all read from the moved `dist/_astro/`.
- A top-level `passthroughImageService()` does **not** help — the adapter overrides the image
  service back to its own.
- `@astrojs/cloudflare@13.6.0` + `astro@6.3.7` are both the latest published versions, so there
  is no upstream fix to upgrade into.

`output: "server"` is the only thing that flips the order (generation runs first, while sources
are still in `dist/_astro/`, then the rearrange moves the finished output). But that is a
rendering-pipeline change, which was explicitly out of scope — hence decision A.

## net

For a 100% static site, the Cloudflare adapter adds no value and actively breaks the image
build. The correct deployment is to ship the static `dist/` to Cloudflare Pages **without** an
adapter. Re-enable the adapter only when a real on-demand route is introduced, and at that point
adopt `output: "server"` + per-page `export const prerender = true`.

## files changed

None (source restored to committed state). This report is the only added file.

## result

Cold local build with the adapter **disabled** (current committed config): **PASS** — 8 pages,
images optimized (`narino-cultivar` 2647kB → 238kB). Cloudflare: unchanged from the already-passing
static deployment.
