/**
 * Id for a folder-per-entry collection: the entry's folder path under the
 * collection base, as written — `2026/narino/index.md` → `2026/narino`.
 *
 * The whole path, not just the leaf, so two entries that share a folder name
 * under different parents (the same blend in `2025/` and `2026/`) stay two
 * entries with two pages. It is also the URL segment after `/matcha/` or
 * `/teaware/`, so the page and the link read it straight off `entry.id`.
 */
export const entryId = ({ entry }: { entry: string }) =>
  entry.replace(/\/index\.mdx?$/, '');

/**
 * A blend's items under one `menus` category, as the `[title, price]` rows the
 * menu components set — items marked unavailable dropped. Empty when the blend
 * is not offered in that category, or when nothing in it is available.
 */
export const availableMenuItems = (
  items: { title: string; price: number; available: boolean }[] = []
): [string, number][] =>
  items.filter((i) => i.available).map((i) => [i.title, i.price]);
