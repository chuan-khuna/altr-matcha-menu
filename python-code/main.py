import argparse
from dataclasses import dataclass
from termcolor import colored


# ── Ingredient unit prices (THB) ────────────────────────────────────────────

SYRUP_PRICE_PER_GRAM: float = 0.15
FRESH_MILK_PRICE_PER_ML: float = 0.10
MINERAL_WATER_PRICE_PER_ML: float = 0.10
PROFIT_MULTIPLIER: float = 1.5


# ── Data models ──────────────────────────────────────────────────────────────


@dataclass
class Ingredients:
    """Usage amounts per serving."""

    matcha_g: float
    water_ml: float = 0.0
    milk_ml: float = 0.0
    syrup_g: float = 0.0
    fixed_cost: float = 0.0  # e.g. dessert pairing, garnish, packaging


@dataclass
class Drink:
    """Menu item — wraps Ingredients with pricing."""

    name: str
    ingredients: Ingredients
    powder_price: float  # THB per gram of matcha powder
    profit_multiplier: float = PROFIT_MULTIPLIER

    # ── Cost breakdown ───────────────────────────────────────────────────────

    def matcha_cost(self) -> float:
        return self.ingredients.matcha_g * self.powder_price

    def water_cost(self) -> float:
        return self.ingredients.water_ml * MINERAL_WATER_PRICE_PER_ML

    def milk_cost(self) -> float:
        return self.ingredients.milk_ml * FRESH_MILK_PRICE_PER_ML

    def syrup_cost(self) -> float:
        return self.ingredients.syrup_g * SYRUP_PRICE_PER_GRAM

    def total_cost(self) -> float:
        return (
            self.matcha_cost()
            + self.water_cost()
            + self.milk_cost()
            + self.syrup_cost()
            + self.ingredients.fixed_cost
        )

    def selling_price(self) -> float:
        return self.total_cost() * self.profit_multiplier


# ── Menu specs (usage only, no price) ────────────────────────────────────────

MENU: list[tuple[str, Ingredients]] = [
    ("Latte", Ingredients(matcha_g=4, milk_ml=150, syrup_g=4)),
    ("Coldwhisk Latte", Ingredients(matcha_g=5, milk_ml=150, syrup_g=4)),
    ("Clear Matcha", Ingredients(matcha_g=3, water_ml=150)),
    ("Usucha", Ingredients(matcha_g=3, water_ml=60, fixed_cost=85)),
]


# ── Display ──────────────────────────────────────────────────────────────────


def print_blend(blend: str, weight_g: int, price: int, drinks: list[Drink]) -> None:
    ppg = price / weight_g

    print()
    print(colored("═" * 56, "green"))
    print(colored(f"  {blend}", "green", attrs=["bold"]))
    print(colored(f"  {weight_g}g  •  ฿{price:,}  •  ฿{ppg:.2f}/g", "green"))
    print(colored("═" * 56, "green"))

    for d in drinks:
        print(colored(f"\n  {d.name}", "cyan", attrs=["bold"]))

        # Build rows: (label, qty, unit, unit_price, total)
        rows: list[tuple[str, str, str, str, str]] = []
        if d.ingredients.matcha_g:
            rows.append(
                (
                    "Matcha",
                    f"{d.ingredients.matcha_g:.0f}",
                    "g",
                    f"{d.powder_price:.2f}/g",
                    f"{d.matcha_cost():.2f}",
                )
            )
        if d.ingredients.milk_ml:
            rows.append(
                (
                    "Milk",
                    f"{d.ingredients.milk_ml:.0f}",
                    "ml",
                    f"{FRESH_MILK_PRICE_PER_ML:.2f}/ml",
                    f"{d.milk_cost():.2f}",
                )
            )
        if d.ingredients.water_ml:
            rows.append(
                (
                    "Water",
                    f"{d.ingredients.water_ml:.0f}",
                    "ml",
                    f"{MINERAL_WATER_PRICE_PER_ML:.2f}/ml",
                    f"{d.water_cost():.2f}",
                )
            )
        if d.ingredients.syrup_g:
            rows.append(
                (
                    "Syrup",
                    f"{d.ingredients.syrup_g:.0f}",
                    "g",
                    f"{SYRUP_PRICE_PER_GRAM:.2f}/g",
                    f"{d.syrup_cost():.2f}",
                )
            )
        if d.ingredients.fixed_cost:
            rows.append(
                (
                    "Fixed",
                    "",
                    "",
                    "",
                    f"{d.ingredients.fixed_cost:.2f}",
                )
            )

        # Column widths
        w_label = max(len(r[0]) for r in rows)
        w_qty = max(len(r[1]) for r in rows)
        w_unit = max(len(r[2]) for r in rows)
        w_price = max(len(r[3]) for r in rows)
        w_total = max(len(r[4]) for r in rows)

        for label, qty, unit, unit_price, total in rows:
            print(
                f"    {label:<{w_label}}  {qty:>{w_qty}}{unit:<{w_unit}}  ×  "
                f"{unit_price:>{w_price}}  =  {total:>{w_total}}"
            )

        sep = "─" * (w_label + w_qty + w_unit + w_price + w_total + 18)
        print(colored(f"    {sep}", "yellow"))
        print(
            colored(
                f"    {'Cost':<{w_label + w_qty + w_unit + 2}}  {d.total_cost():>{w_price + w_total + 7}.2f}",
                "yellow",
            )
        )
        print(
            colored(
                f"    {'Sell (×' + str(d.profit_multiplier) + ')':<{w_label + w_qty + w_unit + 2}}  {d.selling_price():>{w_price + w_total + 7}.2f}",
                "yellow",
                attrs=["bold"],
            )
        )

    print()
    print(colored("═" * 56, "green"))
    print()


# ── Entry point ──────────────────────────────────────────────────────────────


DEFAULT_BLENDS: list[tuple[str, int, int]] = [
    ("Asatsuyu", 40, 1050),
    ("Asatsuyu Baisen", 40, 1050),
    ("Gokasho Samidori", 40, 1500),
    ("OYT Special Blend", 40, 100),
    ("Star Village", 30, 990),
    ("Narino", 20, 1900),
]


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Matcha cost & selling price calculator"
    )
    parser.add_argument("-n", metavar="BLEND", type=str, help="Blend name")
    parser.add_argument("-g", metavar="GRAMS", type=int, help="Package weight (g)")
    parser.add_argument("-p", metavar="PRICE", type=int, help="Package price (THB)")
    parser.add_argument(
        "-m",
        metavar="MULTIPLIER",
        type=float,
        help="Profit multiplier (default: 1.5)",
        default=None,
    )
    args = parser.parse_args()

    custom = all([args.n, args.g, args.p])
    if custom:
        blends = [(args.n, args.g, args.p)]
        multiplier = args.m or PROFIT_MULTIPLIER
        for blend, weight_g, price in blends:
            ppg = price / weight_g
            drinks = [
                Drink(
                    name=name,
                    ingredients=ing,
                    powder_price=ppg,
                    profit_multiplier=multiplier,
                )
                for name, ing in MENU
            ]
            print_blend(blend, weight_g, price, drinks)
    else:
        if any([args.n, args.g, args.p]):
            parser.error("Provide all three of -n, -g, and -p together.")
        multiplier = args.m or PROFIT_MULTIPLIER
        for blend, weight_g, price in DEFAULT_BLENDS:
            ppg = price / weight_g
            drinks = [
                Drink(
                    name=name,
                    ingredients=ing,
                    powder_price=ppg,
                    profit_multiplier=multiplier,
                )
                for name, ing in MENU
            ]
            print_blend(blend, weight_g, price, drinks)


if __name__ == "__main__":
    main()
