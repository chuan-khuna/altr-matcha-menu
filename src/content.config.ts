import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blends = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blends' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['Clear Matcha', 'Latte Matcha', 'Dessert']),
    order: z.number().default(0),
    origin: z.object({
      region: z.string(),
      prefecture: z.string(),
    }),
    cuppingNotes: z.array(z.string()),
    info: z.object({
      cultivarType: z.enum(['Single Cultivar', 'Special Blend']),
      origin: z.string(),
      shading: z.string(),
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

export const collections = { blends };
