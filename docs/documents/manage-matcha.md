# Manage matcha

**File:** `src/content/matcha/<yyyy>/<slug>/index.md` (one folder per blend, per year)
**Schema:** `src/collection-definitions/matcha.ts` · full field reference in
[`docs/content/how-to-manage-matcha.md`](../content/how-to-manage-matcha.md)

## Add a blend

1. Create `src/content/matcha/2026/<slug>/index.md` (kebab-case folder).
2. Put gallery photos in the same folder and reference them as `./photo.jpg`.
3. Fill the frontmatter; write the story as the body.

```yaml
---
name: "Star Village"
order: 5
available: true
notes: ["grilled mochi", "hazelnut"]
info:
  cultivar: "Yabukita"
  origin: "Yame"
menus:
  clear:
    - title: "Light Brew"
      price: 170
      available: true
  latte:
    - title: "Latte"
      price: 220
      available: false
---
```

## Show / hide

| To hide…                      | Set                                  |
| ----------------------------- | ------------------------------------ |
| the whole blend and its page  | `available: false` at the top level  |
| one drink                     | `available: false` on that menu item |
| the blend from one category   | every item in that category `false`, or remove the category |

## Where it shows

- **Main page menu:** once under every category whose `id` (`clear`, `latte`,
  `powder`) matches a `menus` key with at least one available item. See
  [main-page-rendering.md](./main-page-rendering.md).
- **Own page:** `/matcha/<yyyy>/<slug>`. It lists the available items only.
