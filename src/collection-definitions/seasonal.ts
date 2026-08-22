import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/**
 * The seasonal menu archive — every short run we have put on beside the
 * standing menu, in one file.
 *
 * This collection carries no items or prices of its own. Each season's menu is
 * a component of its own at `src/components/seasonal/<slug>.astro`, laid out
 * however that season wants to be laid out; this file only names the seasons,
 * orders them, and gives the footer archive and `/seasonal/<slug>` something to
 * list. A row whose component is missing is not rendered and not linked.
 *
 * `seasonal` has no natural plural, so the definition file, the exported
 * variable and the content file are all singular (the same exception the
 * `matcha` and `teawear` collections take).
 */
export const seasonal = defineCollection({
  loader: file('./src/content/seasonal.json', {
    /* The rows are keyed by `slug` rather than `id` — it is the component
       filename and the URL segment, so naming it `slug` keeps the JSON, the
       component and the link reading as the same thing. */
    parser: (text) =>
      (JSON.parse(text) as Record<string, unknown>[]).map((row) => ({
        ...row,
        id: row.slug,
      })),
  }),
  schema: z.object({
    /**
     * `<yyyy>-<season>`. Three things at once: the id of this row, the URL at
     * `/seasonal/<slug>`, and the name of the component that renders it. Change
     * it and all three move together.
     */
    slug: z.string(),
    /** Serif head for the season — "Sakura", "Christmas". */
    title: z.string(),
    /** `yyyy-mm`. Sorts the archive, newest first. Never printed. */
    year_month: z.string().regex(/^\d{4}-\d{2}$/),
    /**
     * What the archive prints beside the title — a year, a month, a season, or
     * a run of them. Written out, because how a season is best dated changes
     * with the season.
     */
    display: z.string(),
    /** One line under the title. The same sentence the season's page opens on. */
    description: z.string().optional(),
    /**
     * On the landing page, between the nav and the menu. A season stays in the
     * archive for good; this is only what the index shows, so retiring one is a
     * single-word edit. Set it on more than one and the index stacks them,
     * newest first.
     */
    live: z.boolean().default(false),
  }),
});
