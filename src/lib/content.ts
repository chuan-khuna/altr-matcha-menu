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
