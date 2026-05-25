import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const desserts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/desserts' }),
  schema: z.object({
    name: z.string(),
    order: z.number().default(0),
    notes: z.array(z.string()).optional(),
    items: z.array(
      z.object({
        name: z.string(),
        price: z.number(),
      })
    ),
  }),
});
