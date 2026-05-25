import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const matchaDrinks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/matcha-drinks' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['Clear Matcha', 'Latte Matcha', 'Powder Matcha']),
    order: z.number().default(0),
    cuppingNotes: z.array(z.string()),
    info: z.object({
      cultivar: z.string(),
      origin: z.string().optional(),
      shading: z.string().optional(),
      harvest: z.string().optional(),
      processing: z.string().optional(),
    }),
    drinks: z.array(
      z.object({
        name: z.string(),
        price: z.number(),
      })
    ),
  }),
});
