import { getCollection, type CollectionEntry } from 'astro:content';
import { availableMenuItems } from '@/lib/content';

/* Categories sourced from `matcha` key into each blend's `menus` record by
   their own id, so the JSON id and the schema key are the same string. */
const MATCHA_MENU_KEYS = ['clear', 'latte', 'powder'] as const;
type MatchaMenuKey = (typeof MATCHA_MENU_KEYS)[number];
const isMatchaMenuKey = (id: string): id is MatchaMenuKey =>
  (MATCHA_MENU_KEYS as readonly string[]).includes(id);

const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) =>
  a.data.order - b.data.order;

/* An entry marked `available: false` is off the site, not just off the menu. */
const isAvailable = (e: { data: { available: boolean } }) => e.data.available;

/* A dessert or a piece of teaware, flattened to what the menu renders. The two
   collections carry the same fields, so one arm of the union and one pair of
   components cover both. */
export type MenuItem = {
  name: string;
  prices: [string, number][];
  description?: string;
  notes?: string[];
  image?: ImageMetadata;
  imageAlt?: string;
  /** Set for a piece with a page of its own; a dessert has none. */
  href?: string;
};

export type MenuGroup =
  | {
      kind: 'matcha';
      category: CollectionEntry<'menuCategories'>;
      blends: {
        blend: CollectionEntry<'matcha'>;
        menuItems: [string, number][];
        href: string;
      }[];
    }
  | {
      kind: 'items';
      category: CollectionEntry<'menuCategories'>;
      items: MenuItem[];
    };

const toMenuItem = (
  entry: CollectionEntry<'desserts'> | CollectionEntry<'teaware'>,
  href?: string
): MenuItem => ({
  ...entry.data,
  prices: Object.entries(entry.data.prices),
  href,
});

/**
 * The standing menu, in running order: one group per category with something
 * to price. A category with nothing to price is dropped — that covers `powder`
 * while its prices are commented out of the blends, and any collection whose
 * entries all have their prices commented out.
 */
export async function getMenuGroups(): Promise<MenuGroup[]> {
  const categories = (await getCollection('menuCategories')).sort(byOrder);
  const matchas = (await getCollection('matcha', isAvailable)).sort(byOrder);
  const desserts = (await getCollection('desserts', isAvailable)).sort(byOrder);
  const teaware = (await getCollection('teaware', isAvailable)).sort(byOrder);

  return categories.flatMap((category): MenuGroup[] => {
    if (category.data.source === 'matcha' && isMatchaMenuKey(category.id)) {
      const key = category.id;
      const blends = matchas
        .map((b) => ({
          blend: b,
          menuItems: availableMenuItems(b.data.menus[key]),
          href: `/matcha/${b.id}`,
        }))
        .filter((b) => b.menuItems.length > 0);
      return blends.length > 0 ? [{ kind: 'matcha', category, blends }] : [];
    }

    if (category.data.source === 'desserts' || category.data.source === 'teaware') {
      const teawareCategory = category.data.source === 'teaware';
      const entries = teawareCategory ? teaware : desserts;
      const items = entries
        .filter((e) => Object.keys(e.data.prices).length > 0)
        .map((e) => toMenuItem(e, teawareCategory ? `/teaware/${e.id}` : undefined));
      return items.length > 0 ? [{ kind: 'items', category, items }] : [];
    }

    return [];
  });
}
