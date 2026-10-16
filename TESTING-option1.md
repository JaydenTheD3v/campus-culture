# Option 1 – Catalog Testing Results

| Test | Expected | Result |
|---|---|---|
| Open /shop | All 4 products show with image, name, category, price | Pass |
| Search "hoodie" | Only Campus Hoodie shows | Pass |
| Search "zzz" | 0 products, "No products match your search." | Pass |
| Category = Accessories | Only Campus Cap shows | Pass |
| Sort Low to High | $28, $32, $65, $89 | Pass |
| Sort High to Low | $89, $65, $32, $28 | Pass |
| Click a product card | Goes to /products/:id | Pass |
| Desktop (1280px) | 4 column grid | Pass |
| Mobile (390px) | 2 column grid, filters stacked | Pass |

## Issues found
- Product images didn't load because vite.config.js uses `base: "/campus-culture/"` and the image paths start with `/assets/`. Fixed in ProductCard.jsx by adding `import.meta.env.BASE_URL` to the image path.
- Build fails on Linux/GitHub because App.jsx imports `PagePlaceholder` but the file is named `PagePlaceHolder.jsx` (capital H). Not part of Option 1 – flagged to the team.
