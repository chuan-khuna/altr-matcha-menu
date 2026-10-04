import type { SeasonCover, SeasonItem } from '@/lib/seasonal';
import coverImage from '@/components/seasonal/2026-zairai/cover.jpg';

export const items: SeasonItem[] = [
  {
    name: 'Zairai Usucha',
    prices: [['single', 110]],
    description: 'Wild, seed-grown · Kyoto–Nara border · stone milled',
    notes: ['round umami', 'forest air', 'deep moss', 'nashi pear', 'lemon zest'],
  },
];

export const cover: SeasonCover = {
  image: coverImage,
  alt: "MTCH's monthly matcha card for Zairai — tea bushes in a motion blur, with the origin, tasting notes and menu set in white type",
};

/** The paragraph the season opens on — its page and the menu board both print it. */
export const story =
  'Zairai (在来) means native — tea grown from seed, not cloned, so every bush is genetically its own. These are more than sixty years old, on steep hand-worked slopes along the Kyoto–Nara border. No fixed character, just the place and the year, in the cup.';
