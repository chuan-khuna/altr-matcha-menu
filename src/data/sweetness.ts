/**
 * The counter sweetness scale — how much syrup each level adds to a drink.
 * Shown under every menu category with `sweetnessScale: true`, and as its own
 * block on the compact menu. Exactly one level should be `recommended`.
 */
export const sweetnessLevels: {
  label: string;
  /** Syrup added, as printed. "—" for none. */
  grams: string;
  recommended?: boolean;
}[] = [
  { label: "0%", grams: "—" },
  { label: "25%", grams: "2 g" },
  { label: "50%", grams: "4 g", recommended: true },
  { label: "75%", grams: "6 g" },
  { label: "100%", grams: "8 g" },
];
