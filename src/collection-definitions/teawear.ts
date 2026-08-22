import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The bowls, whisks and scoops we use at the counter and sell across it.
 * One piece per folder — `teawear/<slug>/index.md` — the same shape desserts
 * and matcha blends use, so a piece's photograph sits beside the file that
 * names it.
 *
 * `teawear` has no natural plural, so the definition file, the exported
 * variable and the content folder are all singular (the same exception the
 * `matcha` collection takes).
 */
export const teawear = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/teawear' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    order: z.number().default(0),
    /**
     * Variant label → price in THB, in written order. A piece sold one way has
     * a single key and the label is not printed; a bowl offered in two glazes
     * has several and every label shows.
     *
     * A piece with no priced variant is not rendered — comment the prices out
     * to pull it off the menu without deleting it.
     */
    prices: z.record(z.string(), z.number()),
    /** One short line under the name — form, glaze, maker. */
    description: z.string().optional(),
    /** The piece's own photograph, relative to this file. */
    image: image().optional(),
    imageAlt: z.string().default(''),
  }),
});
