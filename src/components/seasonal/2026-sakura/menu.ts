import type { SeasonCover, SeasonItem } from '@/lib/seasonal';
import coverImage from '@/components/seasonal/2026-sakura/cover.jpg';
import sparkling from '@/components/seasonal/2026-sakura/matcha-sparkling-sakura.jpg';
import float from '@/components/seasonal/2026-sakura/sakura-float.jpg';
import monaka from '@/components/seasonal/2026-sakura/sakura-monaka.jpg';

/* Prices are placeholders. */
export const items: SeasonItem[] = [
  {
    name: 'Matcha Sparkling Sakura',
    prices: [['single', 220]],
    description: 'Usucha poured over sparkling sakura, unstirred',
    notes: ['salted blossom', 'green apple', 'sea air'],
    image: sparkling,
    imageAlt: 'Clear cup, matcha layered dark green over pink sakura sparkling and ice',
  },
  {
    name: 'Sakura Float',
    prices: [['single', 240]],
    description: 'Sparkling sakura under a scoop of sakura gelato',
    notes: ['cherry leaf', 'milk', 'almond'],
    image: float,
    imageAlt: 'Pink sparkling sakura in a clear cup with a scoop of sakura gelato on the rim',
  },
  {
    name: 'Sakura Monaka',
    prices: [['single', 160]],
    description: 'Wafer shell stamped with a blossom, filled to order',
    image: monaka,
    imageAlt: 'Sakura monaka on a small white plate, wafer shell stamped with a cherry blossom',
  },
];

export const cover: SeasonCover = {
  image: coverImage,
  alt: "Matcha settling through sparkling sakura, salted blossom suspended in the bubbles",
};
