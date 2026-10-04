import { getMenuGroups, type MenuGroup } from '@/lib/menu';
import { getLiveSeasons, seasonMenu } from '@/lib/seasonal';

/* The menu board's data — the same standing menu and live seasons as the
   landing page, flattened to price tables. Shared by the screen board at
   /menu-board and the A4 sheets at /menu-board/print. */

export interface BoardRow {
  name: string;
  /** Under the name, in the name column — never under the prices. */
  notes?: string;
  href?: string;
  /** Column label → price. A column this row is not sold in is left blank. */
  prices: Record<string, number>;
}

export interface BoardTable {
  id: string;
  label: string;
  /** Micro-type above the label — "Seasonal · September 2026". */
  eyebrow?: string;
  /** Price columns, left to right. */
  columns: string[];
  rows: BoardRow[];
}

export interface BoardPicture {
  image: ImageMetadata;
  alt: string;
}

/** One table and the picture that goes with it. */
export interface BoardBlock {
  table: BoardTable;
  picture?: BoardPicture;
}

/* Every price label any row in the block is sold as, in first-seen order — so
   a blend's own written order decides the columns, and a blend that is not sold
   in one leaves that cell blank. */
const columnsOf = (rows: BoardRow[]) => [
  ...new Set(rows.flatMap((row) => Object.keys(row.prices))),
];

const toTable = (t: Omit<BoardTable, 'columns'>): BoardTable => ({
  ...t,
  columns: columnsOf(t.rows),
});

const standingBlock = (group: MenuGroup): BoardBlock => {
  const { label, gallery } = group.category.data;
  /* The first of the category's photographs — a board has no room to crossfade. */
  const first = gallery?.[0];
  const rows: BoardRow[] =
    group.kind === 'matcha'
      ? group.blends.map(({ blend, menuItems, href }) => ({
          name: blend.data.name,
          notes: blend.data.notes.join(' · ') || undefined,
          href,
          prices: Object.fromEntries(menuItems),
        }))
      : group.items.map((item) => ({
          name: item.name,
          notes: item.notes?.join(' · ') || item.description,
          href: item.href,
          prices: Object.fromEntries(item.prices),
        }));
  return {
    table: toTable({ id: `menu-board-${group.category.id}`, label, rows }),
    picture: first && { image: first.image, alt: first.description ?? '' },
  };
};

/**
 * `seasonal` — one block per live season that has a `menu.ts`, its cover as
 * the picture. `standing` — one block per category with something to price,
 * in running order, its first photograph as the picture.
 */
export async function getMenuBoard(): Promise<{
  seasonal: BoardBlock[];
  standing: BoardBlock[];
  /** Labels of the categories that take the sweetness scale. Empty → no scale. */
  sweetnessFor: string[];
}> {
  const groups = await getMenuGroups();
  const standing = groups.map(standingBlock);
  const sweetnessFor = groups
    .filter((g) => g.category.data.sweetnessScale)
    .map((g) => g.category.data.label);

  const seasonal = (await getLiveSeasons()).flatMap((season): BoardBlock[] => {
    const menu = seasonMenu(season.data.slug);
    if (!menu || menu.items.length === 0) return [];
    return [
      {
        table: toTable({
          id: `menu-board-seasonal-${season.data.slug}`,
          label: season.data.title,
          eyebrow: `Seasonal · ${season.data.display}`,
          rows: menu.items.map((item) => ({
            name: item.name,
            notes: item.notes?.join(' · ') || item.description,
            prices: Object.fromEntries(item.prices),
          })),
        }),
        picture: menu.cover,
      },
    ];
  });

  return { seasonal, standing, sweetnessFor };
}
