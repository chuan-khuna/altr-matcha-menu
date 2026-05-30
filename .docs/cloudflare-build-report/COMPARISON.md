# Comparison — why two sibling repos build with the Cloudflare adapter and this one doesn't

Compares **altr-matcha** (fails) against two repos that pass with `@astrojs/cloudflare`:

- **digital-garden-2024** — the original reference (`ASTRO_CLOUDFLARE_BUG.md`).
- **company-landing-page** — a second Astro 6 + Cloudflare site (anonymised). This one is the
  important comparison: it is a near-clone of altr-matcha's setup and still passes.

> **Headline finding:** the CONCLUSION's claim — *"the Cloudflare adapter fundamentally cannot be
> used on a static site"* — is **disproven** by company-landing-page, which is a 100% static site
> that uses the adapter, the `image()` schema, and large co-located images, and builds fine. The
> real differentiator is the **adapter version**: altr-matcha floated `^13.5.1` up to **13.6.0**,
> which regressed the asset-rearrange step. The siblings are pinned to **13.5.x** and are unaffected.

---

## Side-by-side

| Dimension | altr-matcha (**FAIL**) | company-landing-page (**PASS**) | digital-garden-2024 (**PASS**) |
| --- | --- | --- | --- |
| `@astrojs/cloudflare` (installed) | **13.6.0** | **13.5.4** | 13.5.1 |
| `astro` (installed) | 6.3.7 | 6.3.5 | 6.3.2 |
| `sharp` | 0.34.5 | 0.34.5 | 0.33.5 |
| Adapter enabled? | yes (when reproducing) | **yes** | **yes** |
| `output` | static (default) | static (default) | static (default) |
| `imageService` | `compile` / `passthrough` (tried) | **`compile`** | `compile` |
| `prerenderEnvironment` | `node` | `node` | `node` |
| Content-collection `image()` schema | **yes** | **yes** | no |
| Co-located content images | **yes** (`src/content/matcha/2026/narino/…`) | **yes** (`src/content/**`, large PNG/JPG) | no (images in `src/assets/`) |
| Dynamic / on-demand routes | none | none | yes (`src/pages/og/**/*.png.ts`, satori) |
| `wrangler` bindings | `ASSETS` | `ASSETS` + `main: …/entrypoints/server` | `ASSETS`, `SESSION` |

---

## Similarities (these are *not* the cause)

altr-matcha and **company-landing-page** are effectively the same project shape:

- Astro 6, Tailwind v4 via `@tailwindcss/vite`, `@astrojs/react`, shadcn-style setup.
- **100% static** — no `output: "server"`, no `export const prerender` anywhere, no SSR endpoints.
- Cloudflare adapter active with the **identical** config: `imageService: "compile"`,
  `prerenderEnvironment: "node"`.
- Both define content collections with the **`image()` schema helper** and ship **large
  co-located raster images** inside `src/content/**` (company-landing-page even has multi-MB PNGs).
- Same `CI=true astro build` command, same Node 22 / sharp 0.34.5.

Every variable the CONCLUSION fingered — static output, the adapter, `image()`, co-located
images, the rearrange step — is **present in company-landing-page too, and it still passes**. So
none of them is the root cause on their own.

The reference (digital-garden-2024) differs more and is a weaker comparison: it has no `image()`
schema (images live in `src/assets/`) and it ships genuine dynamic `.png.ts` OG endpoints. Useful,
but it doesn't isolate the variable. company-landing-page does.

---

## The one difference that matters: adapter 13.6.0 vs 13.5.x

The only material delta between the failing repo and the passing near-clone is the adapter patch
version. `package.json` declares `^13.5.1`, and on altr-matcha that caret resolved up to **13.6.0**
(confirmed in `bun.lock`). company-landing-page is pinned at **13.5.4**; digital-garden at 13.5.1.

### Proof in the build output (dist layout differs by version)

**company-landing-page (13.5.4) — passes.** Its `dist/` keeps `_astro/` at the root and puts
prerendered output in a sibling `.prerender/`:

```
dist/
  _astro/            ← optimized images here, e.g. ainu.<hash>.png (orig 631kB + optimized 112kB)
  .prerender/        ← _astro/, chunks/, prerender-entry.<hash>.mjs
  announcements/  blogs/  careers/  …  (static HTML)
```

`_astro/` is **never moved**, so the post-build "generating optimized images" pass reads
`dist/_astro/<source>.png` and finds it. 46 image assets optimized successfully.

**altr-matcha (13.6.0) — fails.** Per the CONCLUSION's trace, 13.6.0's "Rearranging server
assets" step relocates `dist/_astro/* → dist/client/_astro/*` *before* the image pass runs:

```
1. Rearranging server assets…   moves dist/_astro/* → dist/client/_astro/*
2. generating optimized images  loadImage() opens dist/_astro/narino-cultivar.<hash>.png
                                → ENOENT (it was moved in step 1)
```

Same mechanism the CONCLUSION documented — but it is **specific to 13.6.0's new rearrange
behavior**, not to "static + adapter" in general. In 13.5.4 the rearrange leaves `_astro/` at the
root, so the race never happens.

### Why each repo lands where it does

- **company-landing-page passes** — same static + `image()` + co-located-images setup as
  altr-matcha, but on adapter **13.5.4**, where `_astro/` stays put and the image pass reads a
  directory that still exists.
- **digital-garden-2024 passes** — on **13.5.1** *and* it sidesteps the sensitive path two extra
  ways: no `image()` schema (no content-collection images re-read from disk) and real on-demand
  routes (a true worker-context build, `dist/client` + `dist/server`).
- **altr-matcha fails** — the only one on **13.6.0**, whose rearrange empties `dist/_astro/`
  before the static image-optimization pass reads it.

---

## What this changes about the CONCLUSION

The CONCLUSION correctly traced the *mechanism* (rearrange races ahead of `loadImage`), but drew
the wrong scope from it:

| CONCLUSION said | Corrected by this comparison |
| --- | --- |
| The adapter can't be used on a static site at all. | A static site **can** use it — company-landing-page does, on 13.5.4. |
| "Upgrade adapter/astro: N/A — 13.6.0 already latest." | The fix is the opposite direction: **pin/downgrade to 13.5.4**, which was never tried. |
| `output: "server"` is the *only* fix. | It's *a* fix (reorders the pass), but not the only one; staying on 13.5.x also fixes it while keeping pure-static output. |

The `IMAGES`/`SESSION` binding auto-detection noted in the bug report is a side-effect of 13.6.0
too, not the cause of the ENOENT.

---

## Recommended next step (untested on altr-matcha — verify before trusting)

Pin the adapter to the version the sibling ships, re-enable the adapter, and build cold:

```jsonc
// package.json
"@astrojs/cloudflare": "13.5.4"   // exact, no caret — stop the float to 13.6.0
```

```js
// astro.config.mjs
adapter: cloudflare({ imageService: "compile", prerenderEnvironment: "node" }),
```

Then `rm -rf node_modules/.astro dist && bun install && bun run build` (cold, to avoid the warm
`node_modules/.astro/assets` cache that masks the bug). Expectation, by analogy to
company-landing-page: `dist/_astro/` stays at the root, images optimize, build passes — with the
adapter enabled and output still static.

If 13.5.4 builds clean, the remaining task is to **report the 13.6.0 regression upstream**
(`withastro/adapters`): the rearrange step moves `_astro/` ahead of the static image-generation
pass on `output: "static"` builds.

> Status: the version-regression hypothesis is strongly supported by the controlled comparison
> (identical setup, different adapter version, opposite outcome) but has **not yet been run on
> altr-matcha itself**. Build with the pin before updating the CONCLUSION's "stay static" decision.
