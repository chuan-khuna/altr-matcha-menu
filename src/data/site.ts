/**
 * Standing notice in the strip under the nav. `short` is what a narrow screen
 * gets — both are set on one line at a fixed height, so keep them to one.
 */
export const announcement = {
  long: "Mock-up only — every photograph here is a placeholder downloaded from public sources.",
  short: "Mock-up — photographs are placeholders.",
} as const;

export const address = {
  line1: "1234 Placeholder Building",
  line2: "Sample Road, Example District",
  city: "Bangkok 10000",
  mapsHref: "https://maps.google.com/?q=ALTR+Matcha",
} as const;

export const hours: { day: string; open: string }[] = [
  { day: "Mon — Fri", open: "08:00 — 18:00" },
  { day: "Sat", open: "09:00 — 19:00" },
  { day: "Sun", open: "09:00 — 17:00" },
];

export const reach: { label: string; href: string; display: string }[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/altr.matcha",
    display: "@altr.matcha",
  },
  {
    label: "Email",
    href: "mailto:hello@altr.cafe",
    display: "hello@altr.cafe",
  },
];

export const nav: { label: string; href: string }[] = [
  { label: "Menu", href: "#menu" },
];
