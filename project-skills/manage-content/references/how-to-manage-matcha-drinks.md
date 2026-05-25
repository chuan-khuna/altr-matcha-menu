# How to Manage Matcha Drinks

Collection key: `matchaDrinks`  
Definition: `src/collection-definitions/matcha-drink.ts`  
Content folder: `src/content/matcha-drinks/`  
Sub-folders: `clear/`, `latte/`, `powder/`  
File format: `.md` or `.mdx` with YAML frontmatter

---

## Frontmatter schema

```yaml
name: string          # Display name of the blend
category: string      # "Clear Matcha" | "Latte Matcha" | "Powder Matcha"
order: number         # Sort order on the menu (default: 0, lower = first)

origin:
  region: string      # e.g. "Kagoshima · Uji"
  prefecture: string  # e.g. "Kagoshima & Kyoto"

cuppingNotes:         # Array of tasting descriptors (2–5 short phrases)
  - string

info:
  cultivar: string      # Cultivar description (e.g. "Single Cultivar · Samidori", "Special Blend")
  origin: string        # Full origin description
  shading: string       # Shading method description
  harvest: string       # (optional) Harvest details
  processing: string    # (optional) Processing details

drinks:               # List of drink formats with prices (THB)
  - name: string
    price: number
```

---

## Example file — `src/content/matcha-drinks/hana-blend.md`

```markdown
---
name: "Hana Blend"
category: "Latte Matcha"
order: 3
origin:
  region: "Kagoshima · Uji"
  prefecture: "Kagoshima & Kyoto"
cuppingNotes: ["floral", "creamy body", "stone fruit"]
info:
  cultivarType: "Special Blend"
  origin: "Kagoshima & Kyoto Prefecture"
  shading: "Tana & cheesecloth · mixed"
  harvest: "First & second flush"
  processing: "Stone-ground tencha, blended post-grind"
drinks:
  - { name: "Hot Latte", price: 180 }
  - { name: "Iced Latte", price: 190 }
  - { name: "Oat Latte", price: 200 }
---

Body text describing the blend — flavour profile, intent, how it was made.
```

---

## Notes

- `category` controls which menu group the drink appears under. Valid values: `"Clear Matcha"`, `"Latte Matcha"`, `"Powder Matcha"`.
- Place files in the matching sub-folder (`clear/`, `latte/`, `powder/`) to keep the content tree organised — the glob picks up all depths.
- `order` controls sort order within each category group (ascending).
- `cuppingNotes` are displayed as flavour tags — keep them short (1–3 words each).
- All prices are in Thai Baht (THB).
- `harvest` and `processing` under `info` are optional; omit if unknown.
- The markdown body is used as the blend description in the menu card.
