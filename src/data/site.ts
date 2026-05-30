export const address = {
  line1: "555 Rasa Tower",
  line2: "Phahonyothin rd, Chatuchak",
  city: "Bangkok 10900",
  mapsHref: "https://maps.google.com/?q=ALTR+Matcha+Bangkok",
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
  { label: "About", href: "#about" },
];
