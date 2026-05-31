```
2026-05-31T07:05:29.456Z	Initializing build environment...
2026-05-31T07:05:30.926Z	Success: Finished initializing build environment
2026-05-31T07:05:31.637Z	Cloning repository...
2026-05-31T07:05:33.875Z	Detected the following tools from environment: bun@1.2.15, nodejs@22.16.0
2026-05-31T07:05:33.876Z	Restoring from dependencies cache
2026-05-31T07:05:33.878Z	Restoring from build output cache
2026-05-31T07:05:34.399Z	Success: Build output restored from build cache.
2026-05-31T07:05:36.927Z	Success: Dependencies restored from build cache.
2026-05-31T07:05:36.932Z	Installing project dependencies: bun install --frozen-lockfile
2026-05-31T07:05:37.077Z	bun install v1.2.15 (df017990)
2026-05-31T07:05:37.921Z
2026-05-31T07:05:37.921Z	+ @tailwindcss/vite@4.3.0
2026-05-31T07:05:37.921Z	+ tailwindcss@4.3.0
2026-05-31T07:05:37.921Z	+ @astrojs/cloudflare@13.6.0
2026-05-31T07:05:37.921Z	+ astro@6.3.7
2026-05-31T07:05:37.921Z	+ sharp@0.34.5
2026-05-31T07:05:37.921Z	+ wrangler@4.95.0
2026-05-31T07:05:37.921Z
2026-05-31T07:05:37.921Z	307 packages installed [864.00ms]
2026-05-31T07:05:38.120Z	Executing user build command: bun run build
2026-05-31T07:05:38.193Z	$ CI=true astro build
2026-05-31T07:05:40.917Z	07:05:40 [@astrojs/cloudflare] Enabling image processing with Cloudflare Images for production with the "IMAGES" Images binding.
2026-05-31T07:05:40.917Z	07:05:40 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
2026-05-31T07:05:46.443Z	07:05:46 [content] Syncing content
2026-05-31T07:05:46.461Z	07:05:46 [content] Synced content
2026-05-31T07:05:46.463Z	07:05:46 [vite]   ➜  Tunnel closed
2026-05-31T07:05:46.476Z	07:05:46 [types] Generated 5.54s
2026-05-31T07:05:46.477Z	07:05:46 [build] output: "static"
2026-05-31T07:05:46.477Z	07:05:46 [build] mode: "static"
2026-05-31T07:05:46.477Z	07:05:46 [build] directory: /opt/buildhome/repo/dist/
2026-05-31T07:05:46.477Z	07:05:46 [build] adapter: @astrojs/cloudflare
2026-05-31T07:05:46.477Z	07:05:46 [build] Collecting build info...
2026-05-31T07:05:46.477Z	07:05:46 [build] ✓ Completed in 5.56s.
2026-05-31T07:05:46.478Z	07:05:46 [build] Building static entrypoints...
2026-05-31T07:05:49.061Z	07:05:49 [assets] Copying fonts (6 files)...
2026-05-31T07:05:49.061Z	07:05:49 [vite]   ➜  Tunnel closed
2026-05-31T07:05:49.347Z	07:05:49 [vite] ✓ built in 2.80s
2026-05-31T07:05:49.429Z	07:05:49 [vite]   ➜  Tunnel closed
2026-05-31T07:05:49.435Z	07:05:49 [vite] ✓ built in 85ms
2026-05-31T07:05:49.445Z	07:05:49 [build] Rearranging server assets...
2026-05-31T07:05:49.457Z	Default inspector port 9229 not available, using 9230 instead
2026-05-31T07:05:49.457Z
2026-05-31T07:05:49.471Z
2026-05-31T07:05:49.471Z	 generating static routes
2026-05-31T07:05:49.778Z	07:05:49   ├─ /matcha/asatsuyu/index.html (+36ms)
2026-05-31T07:05:49.794Z	07:05:49   ├─ /matcha/asatsuyu-baisen/index.html (+20ms)
2026-05-31T07:05:49.817Z	07:05:49   ├─ /matcha/gokasho-samidori/index.html (+22ms)
2026-05-31T07:05:49.839Z	07:05:49   ├─ /matcha/nana-tsu-mori/index.html (+22ms)
2026-05-31T07:05:49.859Z	07:05:49   ├─ /matcha/narino/index.html (+21ms)
2026-05-31T07:05:49.873Z	07:05:49   ├─ /matcha/oyt-special-blend/index.html (+14ms)
2026-05-31T07:05:49.886Z	07:05:49   ├─ /matcha/star-village/index.html (+12ms)
2026-05-31T07:05:49.928Z	07:05:49   ├─ /index.html (+43ms)
2026-05-31T07:05:49.929Z	07:05:49 [vite]   ➜  Tunnel closed
2026-05-31T07:05:49.940Z	07:05:49 ✓ Completed in 494ms.
2026-05-31T07:05:49.940Z
2026-05-31T07:05:49.942Z	07:05:49 [build] ✓ Completed in 3.46s.
2026-05-31T07:05:49.943Z	07:05:49 [build] 8 page(s) built in 9.03s
2026-05-31T07:05:49.943Z	07:05:49 [build] Complete!
2026-05-31T07:05:49.945Z	07:05:49 [vite]   ➜  Tunnel closed
2026-05-31T07:05:49.998Z	Success: Build command completed
2026-05-31T07:05:50.320Z	Executing user deploy command: npx wrangler deploy
2026-05-31T07:05:51.889Z
2026-05-31T07:05:51.889Z	 ⛅️ wrangler 4.95.0
2026-05-31T07:05:51.889Z	───────────────────
2026-05-31T07:05:51.901Z	Using redirected Wrangler configuration.
2026-05-31T07:05:51.901Z	 - Configuration being used: "dist/client/wrangler.json"
2026-05-31T07:05:51.902Z	 - Original user's configuration: "wrangler.jsonc"
2026-05-31T07:05:51.902Z	 - Deploy configuration file: ".wrangler/deploy/config.json"
2026-05-31T07:05:51.907Z
2026-05-31T07:05:51.907Z	Cloudflare collects anonymous telemetry about your usage of Wrangler. Learn more at https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md
2026-05-31T07:05:52.562Z	🌀 Building list of assets...
2026-05-31T07:05:52.565Z	✨ Read 34 files from the assets directory /opt/buildhome/repo/dist/client
2026-05-31T07:05:52.637Z	🌀 Starting asset upload...
2026-05-31T07:05:54.277Z	No updated asset files to upload. Proceeding with deployment...
2026-05-31T07:05:54.280Z	Total Upload: 0.31 KiB / gzip: 0.22 KiB
2026-05-31T07:05:54.695Z
2026-05-31T07:05:54.696Z	Experimental: The following bindings need to be provisioned:
2026-05-31T07:05:54.696Z	Binding             Resource
2026-05-31T07:05:54.696Z	env.SESSION         KV Namespace
2026-05-31T07:05:54.696Z
2026-05-31T07:05:54.696Z
2026-05-31T07:05:54.858Z	Provisioning SESSION (KV Namespace)...
2026-05-31T07:05:54.858Z	🌀 Creating new KV Namespace "altr-matcha-menu-session"...
2026-05-31T07:05:55.140Z
2026-05-31T07:05:55.188Z	✘ [ERROR] A request to the Cloudflare API (/accounts/85896390c4c548dd702c7d50754889c2/storage/kv/namespaces) failed.
2026-05-31T07:05:55.188Z
2026-05-31T07:05:55.188Z	  a namespace with this account ID and title already exists [code: 10014]
2026-05-31T07:05:55.188Z
2026-05-31T07:05:55.188Z	  If you think this is a bug, please open an issue at: https://github.com/cloudflare/workers-sdk/issues/new/choose
2026-05-31T07:05:55.188Z
2026-05-31T07:05:55.188Z
2026-05-31T07:05:55.193Z	🪵  Logs were written to "/opt/buildhome/.config/.wrangler/logs/wrangler-2026-05-31_07-05-51_568.log"
2026-05-31T07:05:55.278Z	Failed: error occurred while running deploy command

```

## Error

```
🌀 Creating new KV Namespace ....
✘ [ERROR] A request to the Cloudflare API (/accounts/85896390c4c548dd702c7d50754889c2/storage/kv/namespaces) failed.

a namespace with this account ID and title already exists [code: 10014]
```
