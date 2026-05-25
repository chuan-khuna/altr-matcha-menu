import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const matcha = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/matcha' }),
  schema: z.object({
    name: z.string(),
    order: z.number().default(0),
    notes: z.array(z.string()),
    info: z.object({
      cultivar: z.string(),
      origin: z.string().optional(),
      shading: z.string().optional(),
      harvest: z.string().optional(),
      processing: z.string().optional(),
    }),
    menus: z.object({
      clear: z.record(z.string(), z.number()).optional(),
      latte: z.record(z.string(), z.number()).optional(),
      powder: z.record(z.string(), z.number()).optional(),
    }),
  }),
});
