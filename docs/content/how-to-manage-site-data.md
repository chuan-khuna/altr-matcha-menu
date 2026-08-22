# How to Manage Site Data

File: `src/data/site.ts`

This file contains all static site configuration exported as typed TypeScript
constants. It is imported directly by Astro components — there is no content
collection or loader involved.

---

## Exports

### `address`

Physical location of the cafe.

```ts
export const address = {
  line1:    string,   // Building / street
  line2:    string,   // Neighbourhood / district
  city:     string,   // City and postcode
  mapsHref: string,   // Google Maps URL
} as const;
```

**Example:**
```ts
export const address = {
  line1:    '1234 Placeholder Building',
  line2:    'Sample Road, Example District',
  city:     'Bangkok 10000',
  mapsHref: 'https://maps.google.com/?q=ALTR+Matcha',
} as const;
```

---

### `announcement`

Standing notice in the sand strip under the nav, rendered by
`src/components/Announcement.astro`.

```ts
export const announcement = {
  long:  string,   // shown from 40rem up
  short: string,   // shown below 40rem
} as const;
```

The strip is a **fixed height** (`--announce-h`) inside the same fixed block as
the nav, and the text is set `nowrap`. Keep both strings to one line — `long`
under roughly 95 characters, `short` under about 45 — or the end will be clipped
with an ellipsis rather than wrapping.

**Example:**
```ts
export const announcement = {
  long:  'Mock-up only — every photograph here is a placeholder downloaded from public sources.',
  short: 'Mock-up — photographs are placeholders.',
} as const;
```

To retire the notice, remove `<Announcement />` from `src/components/Nav.astro`
and set `--announce-h: 0rem` in `src/styles/presets/matcha.css` — every offset on
the site is computed from `--nav-h`, which is the two rows added together, so
nothing else needs touching.

---

### `hours`

Opening hours displayed in the Contact section. Each entry is one row in the hours table.

```ts
export const hours: { day: string; open: string }[] = [
  { day: string, open: string },  // e.g. "Mon — Fri", "08:00 — 18:00"
];
```

**Example:**
```ts
export const hours = [
  { day: 'Mon — Fri', open: '08:00 — 18:00' },
  { day: 'Sat',       open: '09:00 — 19:00' },
  { day: 'Sun',       open: '09:00 — 17:00' },
];
```

---

### `reach`

Social / contact links displayed in the Contact section.

```ts
export const reach: { label: string; href: string; display: string }[] = [
  { label: string, href: string, display: string },
];
```

| Field | Purpose |
|---|---|
| `label` | Accessible label / platform name (e.g. `"Instagram"`) |
| `href` | Full URL or `mailto:` address |
| `display` | Human-readable text shown in the link (e.g. `"@altr.matcha"`) |

**Example:**
```ts
export const reach = [
  { label: 'Instagram', href: 'https://instagram.com/altr.matcha', display: '@altr.matcha' },
  { label: 'Email',     href: 'mailto:hello@altr.cafe',            display: 'hello@altr.cafe' },
];
```

---

### `nav`

Navigation links rendered in the site header/nav bar.

```ts
export const nav: { label: string; href: string }[] = [
  { label: string, href: string },  // href is typically a hash anchor
];
```

**Example:**
```ts
export const nav = [
  { label: 'Menu',    href: '#menu' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
];
```

---

## Notes

- All exports use `as const` or explicit types — preserve these when editing.
- Prices are not stored here; they live in content collection frontmatter.
- To add a new social platform, append a new object to `reach`.
- To add a new nav item, append a new object to `nav` (order reflects render order).
- `announcement` is site-wide — it shows on the matcha blend pages too, not just
  the landing page.
