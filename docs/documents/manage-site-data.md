# Manage site data

**File:** `src/data/site.ts` · full reference in
[`docs/content/how-to-manage-site-data.md`](../content/how-to-manage-site-data.md)

Plain TypeScript exports, not a content collection. Edit the values and save.

| Export         | Used by                  | Holds                                   |
| -------------- | ------------------------ | --------------------------------------- |
| `announcement` | `Announcement.astro`     | Strip under the nav: `long` and `short` text. Keep each to one line |
| `address`      | `Contact.astro`, footer  | Address lines + Google Maps link        |
| `hours`        | `Contact.astro`, footer  | `{ day, open }` rows, in display order  |
| `reach`        | `Contact.astro`, footer  | Instagram, email, … (`label`, `href`, `display`) |
| `nav`          | `Nav.astro`              | Top-nav links (`#menu`, …)              |
