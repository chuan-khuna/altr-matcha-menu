/**
 * Portfolio screenshots of the site.
 *
 *   bun run dev                       # in another terminal
 *   bun scripts/screenshot.ts         # or: BASE_URL=https://… bun scripts/screenshot.ts
 *   bun scripts/screenshot.ts home menu-board   # only some slugs
 *
 * Writes full-page JPEGs to screenshots/<slug>.jpg (desktop) and
 * screenshots/<slug>-mobile.jpg, each squeezed under MAX_BYTES.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, type Browser } from "playwright";
import sharp from "sharp";

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:4321").replace(/\/$/, "");
const OUT_DIR = "screenshots";
const MAX_BYTES = 500 * 1024;
const MAX_WIDTH = 1600;
// JPEG can't encode an edge longer than 65535px.
const MAX_HEIGHT = 65_000;

const PAGES: { slug: string; path: string }[] = [
  { slug: "home", path: "/" },
  { slug: "menu-board", path: "/menu-board/" },
  { slug: "menu-board-print", path: "/menu-board/print/" },
  { slug: "matcha-signature-blend", path: "/matcha/2026/signature-blend/" },
  { slug: "seasonal-zairai", path: "/seasonal/2026-zairai/" },
];

const VIEWPORTS = [
  { suffix: "", width: 1440, height: 900, scale: 2, mobile: false },
  { suffix: "-mobile", width: 390, height: 844, scale: 3, mobile: true },
];

async function capture(browser: Browser, url: string, vp: (typeof VIEWPORTS)[number]) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.scale,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  // Hide Astro's dev toolbar when shooting the dev server.
  await page.addStyleTag({ content: "astro-dev-toolbar { display: none !important; }" });

  // Scroll through so lazy images and on-scroll reveals fire, then return to top.
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  const png = await page.screenshot({ fullPage: true, animations: "disabled" });
  await context.close();
  return png;
}

/** Shrink width/quality until the JPEG fits under MAX_BYTES. */
async function toJpeg(png: Buffer): Promise<{ data: Buffer; width: number; quality: number }> {
  const meta = await sharp(png).metadata();
  const srcW = meta.width!;
  const srcH = meta.height!;
  let width = Math.min(srcW, MAX_WIDTH, Math.floor((MAX_HEIGHT * srcW) / srcH));

  while (width >= 320) {
    for (const quality of [85, 78, 70, 62, 55]) {
      const data = await sharp(png)
        .resize({ width, withoutEnlargement: true })
        .flatten({ background: "#ffffff" })
        .jpeg({ quality, mozjpeg: true, progressive: true })
        .toBuffer();
      if (data.length <= MAX_BYTES) return { data, width, quality };
    }
    width = Math.floor(width * 0.85);
  }
  throw new Error(`could not fit under ${MAX_BYTES} bytes`);
}

async function main() {
  const only = process.argv.slice(2);
  const pages = only.length ? PAGES.filter((p) => only.includes(p.slug)) : PAGES;
  if (!pages.length) throw new Error(`no matching slugs; known: ${PAGES.map((p) => p.slug).join(", ")}`);

  try {
    await fetch(BASE_URL);
  } catch {
    throw new Error(`${BASE_URL} is not reachable — start the site with \`bun run dev\` first`);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const { slug, path } of pages) {
      for (const vp of VIEWPORTS) {
        const file = `${OUT_DIR}/${slug}${vp.suffix}.jpg`;
        const png = await capture(browser, BASE_URL + path, vp);
        const { data, width, quality } = await toJpeg(png);
        await writeFile(file, data);
        console.log(`${file}  ${width}px  q${quality}  ${(data.length / 1024).toFixed(0)} KB`);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
