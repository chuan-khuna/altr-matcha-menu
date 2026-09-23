import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { entryId } from '@/lib/content';

const menuItems = z.array(
  z.object({
    /** Display name — "Usucha", "Cold Whisk Latte", "40g Bag". */
    title: z.string(),
    /** THB. `0` while the price is still to be set. */
    price: z.number(),
    available: z.boolean().default(true),
  })
);

export const matcha = defineCollection({
  loader: glob({
    pattern: '**/index.{md,mdx}',
    base: './src/content/matcha',
    generateId: entryId,
  }),
  schema: ({ image }) => z.object({
    name: z.string(),
    order: z.number().default(0),
    /**
     * Set `false` to take the whole entry off the site — off the menu, and
     * no page of its own — without deleting the file.
     */
    available: z.boolean().default(true),
    notes: z.array(z.string()),
    info: z.object({
      cultivar: z.string(),
      brand: z.string().optional(),
      origin: z.string().optional(),
      shading: z.string().optional(),
      harvest: z.string().optional(),
      processing: z.string().optional(),
    }),
    /**
     * Category → the drinks or packs this blend is sold as, in written order.
     * Omit a category the blend is not offered in. Set an item's `available`
     * to `false` to pull it off the menu; a category left with no available
     * item is not shown for this blend.
     */
    menus: z.object({
      clear: menuItems.optional(),
      latte: menuItems.optional(),
      powder: menuItems.optional(),
    }),
    gallery: z.array(
      z.object({
        image: image(),
        description: z.string().optional(),
      })
    ).optional(),
  }),
});
