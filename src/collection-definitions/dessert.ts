import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const desserts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/desserts' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    order: z.number().default(0),
    notes: z.array(z.string()).optional(),
    items: z.array(
      z.object({
        name: z.string(),
        price: z.number(),
        /** One short line under the item name. */
        description: z.string().optional(),
        /**
         * Optional per-item photograph, relative to this file. When present the
         * menu renders the item as a thumbnail row instead of a plain price row.
         */
        image: image().optional(),
        imageAlt: z.string().default(''),
      })
    ),
  }),
});
