import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/**
 * Menu category configuration — the running order of the menu, the copy that
 * heads each part, and the one photograph that stands for it.
 *
 * This collection carries no priced items of its own. Each category names the
 * collection its entries come from via `source`; a category whose source has
 * no live entries is simply not rendered.
 */
export const menuCategories = defineCollection({
  loader: file('./src/content/menu-category.json'),
  schema: ({ image }) =>
    z.object({
      /** Serif head for the category — "Clear", "Latte", "Dessert". */
      label: z.string(),
      /** Italic line under the head. One sentence, lowercase-ish, no full stop needed. */
      gloss: z.string().optional(),
      /** Ascending. Controls the running order of the menu. */
      order: z.number().default(0),
      /**
       * Where the entries come from.
       *  - `matcha`   — the `matcha` collection, keyed by this category's `id`
       *                 (`clear` | `latte` | `powder`) into each blend's `menus`.
       *  - `desserts` — the `desserts` collection.
       *  - `teawear`  — reserved. No collection exists yet, so the category is
       *                 configured but not rendered.
       */
      source: z.enum(['matcha', 'desserts', 'teawear']).default('matcha'),
      /**
       * Category photographs. Same shape as a matcha blend's `gallery`, and
       * rendered by the same component, so a category with more than one image
       * gets the crossfading gallery from the blend pages.
       * Paths are relative to this file, e.g. `./menu-categories/clear.jpg`.
       */
      gallery: z
        .array(
          z.object({
            image: image(),
            description: z.string().optional(),
          })
        )
        .optional(),
      /** Show the counter sweetness scale under this category's entries. */
      sweetnessScale: z.boolean().default(false),
    }),
});
