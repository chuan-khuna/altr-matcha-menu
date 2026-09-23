import { getCollection, type CollectionEntry } from 'astro:content';

export type Season = CollectionEntry<'seasonal'>;

export interface SeasonLayoutProps {
  season: Season;
  /** `h1` on the season's own page, `h2` where it sits inside the landing page. */
  headingLevel?: 'h1' | 'h2';
}

/** An `.astro` component, typed as loosely as Story.astro types its `Content`. */
export type SeasonLayout = (_props: SeasonLayoutProps) => unknown;

/**
 * Every season's layout, keyed by slug. A season is on the site as soon as two
 * things exist: a row in `src/content/seasonal.json` and a folder named after
 * its slug in this directory with an `index.astro` in it. There is no third
 * place to register it, and a row without a folder is filtered out rather than
 * linked to a 404.
 *
 * The glob matches the `index.astro` and nothing else, so a season's
 * photographs — and anything shared, in `ui/` — sit inside the tree without
 * being mistaken for a season.
 */
const layouts = new Map<string, SeasonLayout>(
  Object.entries(
    import.meta.glob<{ default: SeasonLayout }>(
      '/src/components/seasonal/*/index.astro',
      { eager: true }
    )
  ).map(([path, mod]) => [path.split('/').at(-2)!, mod.default])
);

export const seasonLayout = (slug: string) => layouts.get(slug);

export const seasonHref = (slug: string) => `/seasonal/${slug}`;

/**
 * Newest first — the order the footer archive and the index both read in.
 * Rows marked `available: false` are dropped here, so they vanish from the
 * landing page, the footer archive and the page routes all at once.
 * Sorted on `year_month`, which is `yyyy-mm` and so sorts as a plain string.
 */
export async function getSeasons(): Promise<Season[]> {
  const seasons = await getCollection('seasonal');
  return seasons
    .filter((s) => s.data.available && layouts.has(s.data.slug))
    .sort((a, b) => b.data.year_month.localeCompare(a.data.year_month));
}

/** What the landing page shows, between the nav and the menu. */
export const getLiveSeasons = async () =>
  (await getSeasons()).filter((s) => s.data.live);
