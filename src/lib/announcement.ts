import { getCollection, type CollectionEntry } from 'astro:content';

/** The notice in the strip under the nav — the first live row, or none. */
export async function getAnnouncement(): Promise<
  CollectionEntry<'announcements'>['data'] | undefined
> {
  const [live] = await getCollection('announcements', ({ data }) => data.live);
  return live?.data;
}
