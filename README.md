# Brunch Bakers: online bakery storefront

A responsive storefront for Brunch Bakers, a pure veg bakery. Built with React 18, Vite 5 and React Router 6. No backend yet: product, promo and franchise data live in `src/data`.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview
```

## Quality checks
```bash
npm run lint           # ESLint (React + hooks rules)
npm test               # Vitest: cart reducer, promo maths, form validators, product data
npm run format         # Prettier (run `npm run format:check` to only check)
```
GitHub Actions (`.github/workflows/ci.yml`) runs lint, tests and the build on every push to `main` and on pull requests. Use Node 20 (`.nvmrc`).

## Pages
| Route | What it does |
|---|---|
| `/` | Hero carousel, signature categories, brand story, promo codes (click to copy), testimonials, brand numbers, franchise strip, store finder |
| `/products` | Menu with category chips (`?cat=Cakes`) and search (`?q=brownie`) |
| `/cart` | Quantities, promo validation, order summary, saved in localStorage (ids and quantities only) |
| `/franchise` | Hero, "Why Brunch Bakers" (statement and figures), at-a-glance strip, joining process, support, FAQ, enquiry form |
| `/investment-calculator` | The investment calculator on its own page, with the four image cards under it (header, footer and franchise hero link here); "Discuss these numbers" opens the franchise enquiry form with the estimate filled in |
| `/contact` | Message form on the cocoa surface, with quick links |
| `/login` | Login form (front-end only: no accounts exist yet, so it explains that nothing was checked) |
| `/track` | Track-order form (front-end only: no order records exist yet, so it points people to Contact) |
| `/about` | Our Story: split intro, "How a bake is born", timeline, brand pillars, map of cities |

## Structure
```
src/
  components/
    common/     ProductCard, SectionTitle, Toast, LocationModal, ErrorPage
    layout/     Header (+ HeaderIcons, PromoPopover), Footer, Layout (Outlet + global UI)
    home/       Hero, Categories, ValueProps, Promos, Testimonials, BrandNumbers, FranchiseStrip, CallToAction
    account/    AccountFormPage (shared by Login and Track)
    about/      StoryProcess, StoryJourney (+ RoadMap, SectionHead)
    franchise/  InvestmentCalculator, WhyBrunch, HighlightCards (+ WhyBrunch.css), Faq, EnquiryForm, Icons
  context/      CartContext (state + promo), cartReducer (pure logic), ToastContext, LocationContext
  hooks/        useForm, useLocalStorage, useSlider, useVoiceSearch, useDocumentTitle, useStoryScroll
  utils/        validators (form rules), storage (safe localStorage + every key we use), mapProjection (lat/lon to map)
  data/         products, promos (+ discount logic), constants, franchise (+ "Why Brunch Bakers"), story (timeline, steps, map pins), account (Login and Track copy and rules)
  pages/        one file per route
  styles/       main.css (tokens, base, buttons), header, hero, home, story, signatures, franchise, contact, pages
  assets/       images imported by components (hashed by Vite): hero, products, signature, story, franchise
public/         images referenced by URL: hero/ (carousel), franchise/ (storefront, process steps), _redirects, _headers
design-source/  original artwork, not shipped in the build
doc.md          planning and implementation notes for the structure refactor
```
Tests sit next to the code they cover (`*.test.js`). Imports use the `@/` alias for `src/` (see Conventions).

## Conventions
- **Imports:** use `@/...` (= `src/...`) whenever an import leaves its own folder, and `./x` only for a sibling file. The alias is set in `vite.config.js`, `vitest.config.js` and `jsconfig.json`; keep the three in step. Do not climb with `../`.
- **Content out of components:** copy, image choices and crop positions live in `src/data/*.js`; components only lay them out. Page-specific behaviour that touches the DOM goes in a hook (`useStoryScroll`).
- **Styles next to the section:** a section with its own look gets its own CSS file beside the component (`WhyBrunch.css`); shared tokens and base rules stay in `src/styles/`.
- **Logic out of components:** anything that can be tested without a browser lives in a plain `.js` file (`cartReducer`, `validators`, `calcDiscount`) with a test beside it.
- **Forms:** use `useForm` with a schema from `utils/validators`; do not copy validation code into a page.
- **Cart:** only `{ id, qty }` is saved. Names, prices and images come from `data/products.js`, so editing a price updates saved carts too.
- **Colours:** use the CSS variables from `main.css` (`--cocoa`, `--raspberry`, `--butter`, `--pistachio`, `--mint-white`, `--error`), not hex values.
- **Storage:** read and write localStorage through `utils/storage`; add new keys to `STORAGE_KEYS`.

## Editing content
- **Menu:** `src/data/products.js`. Add a photo to `src/assets/products/` as `name.webp` (640x640) and set `image: img("name")`. `npm test` fails if a name is misspelled or a category does not exist. Prices marked as placeholders there still need real figures.
- **Promos:** `src/data/promos.js`.
- **Our Story timeline, process steps, map pins:** `src/data/story.js`. Add a photo to `src/assets/story/`, import it at the top of the file and add `[image, "alt text", layout, "crop"]` to the milestone's `pics`.
- **"Why Brunch Bakers" figures and cards:** `WHY_STATS` and `WHY_HIGHLIGHTS` in `src/data/franchise.js`.
- **Franchise figures:** `src/data/franchise.js`. All estimates and calculator inputs are unverified placeholders. Confirm them before launch.
- **Forms:** the franchise enquiry and contact forms are front-end only (`DEMO_FORM` in `data/franchise.js`). Connect an API or email service in each form's submit handler.

## Deploy
Vercel or Netlify: build command `npm run build`, output directory `dist`. SPA rewrites are already set (`vercel.json` for Vercel, `public/_redirects` for Netlify).

## Known gaps
- Track and Login in the header open front-end-only pages (`/track`, `/login`). There are no customer accounts and no order records, so both pages say plainly that nothing was checked. Connect a backend in `AccountFormPage`'s `onValid` to make them real.
- Sandwiches has a homepage tile but no products yet.
- Store addresses, hours and map links are not supplied (only the city list).
- Checkout is a demo: Place Order clears the cart without taking payment.
- Menu, cart and contact styles use short global class names (`.prod`, `.crow`, `.qty`). Only the franchise page is prefixed (`fr-`); prefix or scope the rest before the stylesheet grows.
- `package-lock.json` has not been refreshed since lint, format and test tooling were added: run `npm install` once and commit the new lockfile (CI uses `npm ci`).
