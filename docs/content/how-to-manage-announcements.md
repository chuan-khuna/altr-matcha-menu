# How to Manage Announcements

Definition: `src/collection-definitions/announcement.ts`
Content: `src/content/announcement.json`
Collection key: `announcements`

The notice in the sand strip under the nav, rendered by
`src/components/Announcement.astro`. It is site-wide — it shows on every page
with the nav (the landing page, matcha and teaware pages, seasonal pages).

---

## Format

One JSON array. Each row is one notice; keep old ones in the file and switch
between them with `live`.

```json
[
  {
    "id": "mock-up",
    "long": "Mock-up only — every photograph here is a placeholder downloaded from public sources.",
    "short": "Mock-up — photographs are placeholders.",
    "live": true
  }
]
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Unique key for the row. Never printed |
| `long` | string | yes | Shown from 40rem up. Under roughly 95 characters |
| `short` | string | yes | Shown below 40rem. Under about 45 characters |
| `live` | boolean | no (default `false`) | Show this notice. The first live row in the file wins |

The strip is a **fixed height** (`--announce-h`) inside the same fixed block as
the nav, and the text is set `nowrap`. Keep both strings to one line, or the end
is clipped with an ellipsis rather than wrapping.

---

## Turning it on and off

- **Hide the strip:** set `live` to `false` on every row. The strip is not
  rendered, and `Layout.astro` sets `--announce-h: 0rem` on `<html>`, so every
  offset computed from `--nav-h` closes up with it — nothing else to touch.
- **Show a notice:** set `live: true` on its row.
- **Swap notices:** add a new row, set it `live`, and set the old one `false`
  (or put the new row first — the first live row is the one shown).

The lookup is `getAnnouncement()` in `src/lib/announcement.ts`, used by
`Announcement.astro` and `Layout.astro`.
