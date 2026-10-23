# Jaya Uni'ang Sdn. Bhd. — website (Signal design system)

32-page static site. Content carried over from the earlier burgundy/saffron build;
design rebuilt in the "Signal" system — bright red on warm off-white with charcoal text.

## Structure

```
index.html                      Homepage — 3-slide banner, catalog, values, network, channels
about/
  index.html                    Our Story — 1983 founding, growth, group backing, milestones
  heritage.html                 Thong Guan group story, 1942 → today, group company table
  vision-mission.html           Vision & Mission, and how they shape decisions
  values.html                   The five values, expanded
products/
  index.html                    Catalog — 3 categories, featured products, 11-brand index
  food-beverage.html            Category 01
  household-personal-care.html  Category 02
  plastic-packaging.html        Category 03
  fn / 888 / alif-oil / djack / epaljac / cleanmom / premier / diapex /
  jombbq / jomfresh / zompac .html   Brand pages (last three include photo galleries)
distribution.html               Network — Sabah map, 4 branch cards, warehouse histories
customers.html                  8 trade channels + why customers stay
services.html            [NEW]  6 services with commitments band
partner-with-us.html     [NEW]  Brand-owner page — 4-step onboarding, why principals choose us
sustainability.html      [NEW]  Group certifications, what we do, what we don't yet
careers.html                    Hiring areas, what it's like, what we look for
news.html                       News & Events — event cards + company news list
events/
  sie-2026.html / sports-day-2026.html / donate-blood-for-life-2026.html   Event pages with photo galleries
faq.html                 [NEW]  10-question accordion
contact.html                    Form + head office, parent, sister company, 4 branches
assets/css/main.css             Single shared stylesheet
assets/js/main.js               Carousel, mobile nav, accordion, reveal, form
assets/img/                     10 optimised images (27 MB → 1.8 MB)
```

## Design system

Edit the variables at the top of `assets/css/main.css` to rebrand:

| Token | Value | Use |
|---|---|---|
| `--red` | `#E02B1D` | Banners, buttons, chevrons, accents |
| `--red-dark` | `#BC2114` | Hover states |
| `--red-deep` | `#8E170D` | Deep end of banner gradients |
| `--ink` | `#2B2926` | Body text, footer, dark panels |
| `--paper` | `#FCFBF9` | Page background (never pure white) |
| `--wash` | `#F4F2EF` | Alternating section background |
| `--tint` | `#FDECE9` | Icon tiles, accordion markers |

Type: Instrument Sans via Google Fonts.

Banners end on a straight horizontal edge (the earlier curved arc was removed).
`.pagehero` carries `padding:0` so it does not inherit the global `section` padding.

Accessibility notes: white on `--red` measures 4.63:1 and body text on `--paper`
measures 14:1. Banner gradients carry a dark scrim behind copy plus a grain layer
that prevents banding. All motion respects `prefers-reduced-motion`.

## Viewing locally

```bash
cd jaya-uniang-signal
python3 -m http.server 8080
# open http://localhost:8080
```

Or just double-click `index.html` — it works from the file system.

## Deploying

Drop the whole folder on any static host — Netlify Drop, Vercel, Cloudflare Pages,
GitHub Pages, or upload to `public_html/` on cPanel.

## WhatsApp

A floating WhatsApp button appears on every page (bottom-right), plus links in the
top bar, on each branch in the locator, and on the contact page.

**Replace the placeholder number before going live.** It currently points at
`60138801983`. Search and replace that string across `assets/js`, the HTML files,
or — if rebuilding — change `WA_NUMBER` in `locator.py`. Use the international
format with no `+` or spaces (e.g. Malaysian `012-345 6789` becomes `60123456789`).
Note that WhatsApp needs a mobile number; the 088 landlines won't work.

## Branch locator

`distribution.html` and the homepage share an interactive locator: pick a branch
from the left rail or click a pin on the map, and the detail panel updates with
address, regions served, phone and WhatsApp. Branch data lives in one place —
the `BRANCHES` list in `locator.py` — so edits propagate to both pages.

The map is a stylised silhouette, deliberately labelled as illustrative rather
than geographically precise.

## Contact form

`assets/js/main.js` validates required fields and shows a confirmation message.
It does not post anywhere. To make it live, point the `<form>` at your handler
(Formspree, a PHP mail script, or your own endpoint) and remove the `preventDefault`
block in `main.js`.

© 2026 Jaya Uni'ang Sdn. Bhd.
