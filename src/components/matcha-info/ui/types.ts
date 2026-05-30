import type { CollectionEntry } from 'astro:content';

export interface MenuCardProps {
  blend: CollectionEntry<'matcha'>;
  menuItems: [string, number][];
  href: string;
}
