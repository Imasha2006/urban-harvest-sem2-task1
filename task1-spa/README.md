# Urban Harvest Hub — Task 1 (SPA)

**Module:** COMP50017 Web Development — Assignment 2
**Task:** 1 of 2 (Component-Based SPA, 35 marks)

A responsive Single Page Application for *Urban Harvest Hub*, built with
**React 18 + Vite + Tailwind CSS v3 + React Router v6**.

---

## Quick start

```bash
cd task1-spa
npm install
npm run dev
```

Then open <http://localhost:5173>.

To build for production:

```bash
npm run build
npm run preview
```

---

## How this satisfies each marking criterion

### Client-Side SPA (5 marks)
- Built with **React + Vite**.
- **`react-router-dom` v6** drives client-side routing with these views:
  `/`, `/catalogue`, `/workshops`, `/events`, `/item/:id`,
  `/products/:id` (alias), `/booking`, `/about`, plus a 404 page.
- Single HTML entry point (`index.html`) — true SPA behaviour.

### Component-Based Design (10 marks)
- Reusable components in `src/components/`:
  `Navbar`, `Footer`, `ItemCard`, `CategoryCard`, `CategoryFilter`,
  `WeatherWidget`.
- `ItemCard` is consumed by **four** different pages (Home, Catalogue,
  Workshops, Events) — demonstrating real reusability and prop-driven
  variation (`variant`, `linkPrefix`).
- Data flow uses **React Context** (`src/context/AppContext.jsx`)
  for theme, language and cart state.
- Logic separated into a custom hook (`src/hooks/useWeather.js`).

### Data Handling (10 marks)
- **Internal JSON:** all products, workshops, events, and categories live
  in `src/data/items.json` and are imported as static seed data.
- **External API:** `useWeather` consumes the free Open-Meteo public API
  (no key required) and is rendered through the `WeatherWidget` component
  on the Home and Events pages.
- **Master–detail view (×2):**
  - *Home page:* clicking a category card filters the visible items
    inline (in-page master–detail).
  - *Catalogue → Item detail:* clicking *View Details* routes to
    `/item/:id` rendering the full detail view (routed master–detail).
- **State management:** Context API (`AppProvider`) holds global state;
  individual pages use local `useState` + `useMemo`.

### Tailwind Styling (5 marks)
- See `tailwind.config.js`:
  - Two new custom colour palettes: `harvest-*` and `earth-*`.
  - One new custom font: `font-heading` (Poppins) loaded from Google Fonts.
- See `src/index.css`:
  - `@layer components` defines `.btn-primary`, `.btn-outline`,
    `.btn-secondary`, `.card`, `.card-interactive`, `.badge`,
    `.badge-earth`, `.input-field`, `.section-container`, `.nav-link`,
    `.skip-link`.
  - `@layer utilities` defines `.text-gradient-green`,
    `.text-gradient-earth`, `.hover-lift`, `.glass`.
- Every page is styled with Tailwind (well over the *two pages* minimum).

### Accessibility & Quality (Discretionary, 5 marks)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<footer>` throughout.
- ARIA: `aria-current`, `aria-expanded`, `aria-controls`, `aria-pressed`,
  `aria-invalid`, `aria-describedby`, `aria-live`, `role="alert"`,
  `role="region"`, `role="tablist"`.
- Visible focus ring on every focusable element (`*:focus-visible`).
- Skip-to-content link at the top of every page.
- Form validation in the Booking page: required-field check + email regex,
  inline error messages with `role="alert"`.
- Light/dark mode toggle, persisted to `localStorage`.
- Multilingual support (English + Sinhala) — toggleable from the navbar.
- `prefers-reduced-motion` honoured in CSS.
- Responsive across mobile / tablet / desktop with a hamburger menu.

---

## Tech stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.3 | UI library |
| Vite | 5.4 | Dev server + bundler |
| React Router | 6.26 | Client-side routing |
| Tailwind CSS | 3.4 | Utility-first styling |
| Open-Meteo | — | Free external weather API (no key) |

---

## Project structure

```
task1-spa/
├── index.html                # SPA entry
├── package.json
├── tailwind.config.js        # custom colours + font
├── postcss.config.js
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              # bootstrap (router + context)
    ├── App.jsx               # route definitions
    ├── index.css             # Tailwind + @layer rules
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ItemCard.jsx
    │   ├── CategoryCard.jsx
    │   ├── CategoryFilter.jsx
    │   └── WeatherWidget.jsx
    ├── context/
    │   └── AppContext.jsx
    ├── hooks/
    │   └── useWeather.js
    ├── data/
    │   ├── items.json        # seed data
    │   └── translations.js   # en + si dictionary
    └── pages/
        ├── Home.jsx
        ├── Catalogue.jsx
        ├── Workshops.jsx
        ├── Events.jsx
        ├── ItemDetail.jsx
        ├── Booking.jsx
        ├── About.jsx
        └── NotFound.jsx
```

---

## What to deploy

This SPA deploys cleanly to **Netlify** or **Vercel**:

- Build command: `npm run build`
- Publish directory: `dist`
- For Netlify, add a `_redirects` file in `public/`:
  ```
  /*  /index.html  200
  ```
- For Vercel, no config is needed — it handles SPA fallback automatically.
