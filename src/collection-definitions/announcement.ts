import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/**
 * Notices for the sand strip under the nav, in one file. Keep as many rows as
 * you like and switch between them with `live` — the first live row is the one
 * shown. With none live the strip is not rendered and the nav closes up over
 * the space it held.
 */
export const announcements = defineCollection({
  loader: file('./src/content/announcement.json'),
  schema: z.object({
    /**
     * The sentence from 40rem up. Set on one line at a fixed height, so keep it
     * under roughly 95 characters or the end is clipped with an ellipsis.
     */
    long: z.string(),
    /** What a narrow screen gets, below 40rem. Under about 45 characters. */
    short: z.string(),
    /** Show this notice on the site. The first live row in the file wins. */
    live: z.boolean().default(false),
  }),
});
