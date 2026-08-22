import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One dessert per folder — `desserts/<slug>/index.md`, the same shape a matcha
 * blend uses, so a dessert's photograph sits beside the file that names it.
 * Each entry carries its own image the way a blend carries its gallery, which
 * is what lets the Dessert category be set as a grid of tiles rather than a
 * column of price rows.
 */
export const desserts = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/desserts' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    order: z.number().default(0),
    /**
     * Variant label → price in THB, in written order. Same shape as a matcha
     * blend's `menus.<category>`: a dessert sold one way has a single key and
     * the label is not printed; a monaka sold singly and by the box has several
     * and every label shows.
     *
     * An entry with no priced variant is not rendered — comment the prices out
     * to pull a dessert off the menu without deleting it.
     */
    prices: z.record(z.string(), z.number()),
    /** One short line under the name. */
    description: z.string().optional(),
    /** Tasting descriptors, joined with `·` under the name. */
    notes: z.array(z.string()).optional(),
    /** The dessert's own photograph, relative to this file. */
    image: image().optional(),
    imageAlt: z.string().default(''),
  }),
});
