## No adapter in `astro.config.mjs`

Claude suggest me that

````
1. Edit astro.config.mjs — remove the adapter

Delete the cloudflare import and the entire
adapter: block. Static is Astro's default output,
so nothing replaces it.

```
// @ts-check
import { defineConfig, fontProviders } from
"astro/config";
import tailwindcss from "@tailwindcss/vite";
// ← keep
// import cloudflare from "@astrojs/cloudflare";
 // ← REMOVE this line

export default defineConfig({
  integrations: [],
  fonts: [ /* …unchanged… */ ],
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { "@": "/src" } },
  },
  // adapter: cloudflare({ … })   ← REMOVE the
whole adapter block
});
```
````

### build log

```
generating static routes
14:37:27   ├─ /matcha/asatsuyu/index.html (+8ms)
14:37:27   ├─ /matcha/asatsuyu-baisen/index.html (+3ms)
14:37:27   ├─ /matcha/gokasho-samidori/index.html (+2ms)
14:37:27   ├─ /matcha/nana-tsu-mori/index.html (+2ms)
14:37:27   ├─ /matcha/narino/index.html (+7ms)
14:37:27   ├─ /matcha/oyt-special-blend/index.html (+2ms)
14:37:27   ├─ /matcha/star-village/index.html (+3ms)
14:37:27   ├─ /index.html (+6ms)
14:37:27 ✓ Completed in 87ms.

generating optimized images
14:37:27   ▶ /_astro/narino-cultivar.CC7D9qEO_185D1X.webp (reused cache entry) (+1ms) (1/5)
14:37:27   ▶ /_astro/narino-tin.DZGq5XZ1_16dL6c.webp (reused cache entry) (+1ms) (2/5)
14:37:27   ▶ /_astro/narino-usucha.CypH19kO_wDMPJ.webp (reused cache entry) (+1ms) (3/5)
14:37:27   ▶ /_astro/narino-farm.Dp38cnjL_ZqyRSj.webp (reused cache entry) (+1ms) (4/5)
14:37:27   ▶ /_astro/narino-farm-2.DjIoPjdl_4IPiM.webp (reused cache entry) (+2ms) (5/5)
14:37:27 ✓ Completed in 2ms.

14:37:27 [build] ✓ Completed in 881ms.
14:37:27 [build] 8 page(s) built in 1.20s
14:37:27 [build] Complete!
```

### dist

```
│   favicon.ico
│   favicon.svg
│   index.html
│
├───matcha
│   ├───asatsuyu
│   │       index.html
│   │
│   ├───asatsuyu-baisen
│   │       index.html
│   │
│   ├───gokasho-samidori
│   │       index.html
│   │
│   ├───nana-tsu-mori
│   │       index.html
│   │
│   ├───narino
│   │       index.html
│   │
│   ├───oyt-special-blend
│   │       index.html
│   │
│   └───star-village
│           index.html
│
└───_astro
    │   narino-cultivar.CC7D9qEO.png
    │   narino-cultivar.CC7D9qEO_185D1X.webp
    │   narino-farm-2.DjIoPjdl.jpg
    │   narino-farm-2.DjIoPjdl_4IPiM.webp
    │   narino-farm.Dp38cnjL.jpg
    │   narino-farm.Dp38cnjL_ZqyRSj.webp
    │   narino-tin.DZGq5XZ1.png
    │   narino-tin.DZGq5XZ1_16dL6c.webp
    │   narino-usucha.CypH19kO.png
    │   narino-usucha.CypH19kO_wDMPJ.webp
    │   Nav.89sDigcy.css
    │
    └───fonts
            00b5bb498060bc63.woff2
            1e7711c88eeee1a2.woff2
            22d71f5b12f02070.woff2
            37b071bf8c304f56.woff2
            b247e2262a34a0c3.woff2
```
