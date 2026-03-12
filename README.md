# CinéReview

Modern single-page dashboard for discovering films via [TMDB](https://www.themoviedb.org/) data. Browse trending titles, search, filter by genre, and open rich modals with trailers, credits, and community reviews.

## ✨ Highlights
- Fresh UI built with CSS Grid/Flexbox (no legacy Foundation/jQuery deps)
- Lightweight vanilla JS (`assets/script.js`) with async/await + error handling
- Re-usable genre + sort filters, quick search, and trending slider
- Rich modal: poster, synopsis, release info, director/cast, YouTube trailer, TMDB reviews
- API layer centralized in `assets/config.js` (replace with your own TMDB key)

## 📦 Structure
```
./index.html          → layout + components
./assets/style.css    → design system + responsive layout
./assets/script.js    → data fetching, rendering, modal logic
./assets/config.js    → TMDB API key placeholder
```

## 🚀 Run locally
1. Clone the repo
   ```bash
   git clone https://github.com/lyf703331869/cine-review.git
   cd cine-review
   ```
2. Duplicate `assets/config.sample.js` → `assets/config.js` 并填入你的 TMDB v3 API Key。
3. Start a static server (or simply open `index.html`). Example using VS Code Live Server or:
   ```bash
   npx serve .
   ```

> **IMDb dependency removed** – 所有信息均来自 TMDB。默认会使用课程时代的示例 key，为长期使用请替换为你自己的 key。

## 🛠️ Customizing
- **Styling**: tweak CSS variables at the top of `assets/style.css` (colors, radii, fonts).
- **Genres**: adjust the `GENRES` array inside `assets/script.js` to spotlight different categories.
- **Deploy**: upload to any static host (Vercel, Netlify, GitHub Pages, etc.).

---
Built with ❤️ for movie lovers.
