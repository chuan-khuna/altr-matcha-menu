import type { SeasonCover, SeasonItem } from '@/lib/seasonal';
import coverImage from '@/components/seasonal/2025-christmas/cover.jpg';

/* Prices are placeholders. */
export const items: SeasonItem[] = [
  {
    name: 'MTCH™ Ichigo Latte',
    prices: [['single', 200]],
    description: 'Strawberry compote, milk, usucha poured last',
    notes: ['strawberry', 'condensed milk', 'cocoa'],
  },
  {
    name: 'MTCH™ Strawberry Honey Lemon',
    prices: [['single', 210]],
    description: 'Sparkling honey lemon with whole strawberries, usucha on top',
    notes: ['honey', 'lemon peel', 'strawberry'],
  },
];

export const cover: SeasonCover = {
  image: coverImage,
  alt: "Usucha poured from a glass katakuchi into an ichigo latte and a strawberry honey lemon, red baubles alongside",
};
