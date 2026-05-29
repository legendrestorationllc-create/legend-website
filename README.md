# Legend Restoration — Marketing Website

Multi-page marketing & SEO website for **Legend Restoration LLC** (insurance-approved roofing
in Connecticut). Separate from the conversion landing page at `~/legend-restoration`, which is
embedded read-only at `/inspection`.

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + CSS custom properties (shared design system)
- Fonts: **Sora** (headings) + **DM Sans** (body) via `next/font` (self-hosted, no layout shift)
- Static-rendered pages, `next/image`, JSON-LD schema → built for Lighthouse 90+

## Pages
| Route | Description |
|-------|-------------|
| `/` | Home — hero, services, why CT, process, projects, testimonials, FAQ |
| `/services` | Roof replacement, insurance claims, storm damage, siding |
| `/projects` | Before/after gallery (drag-to-compare slider + grid) |
| `/about` | Daniel Rivera + team |
| `/contact` | Contact form (mailto) + details |
| `/inspection` | The existing landing page, embedded **as-is** via iframe (noindex) |

## Design tokens
Navy `#1B2A6B` · Navy2 `#111d4a` · Navy3 `#253690` · Orange `#E8401C` · Orange2 `#c73515`.
Defined in `app/globals.css` and `tailwind.config.ts` (mirrors the landing page exactly).

## SEO
- Per-page `metadata` (title, description, canonical, OpenGraph, Twitter)
- `RoofingContractor` LocalBusiness JSON-LD (CT region, geo, areaServed cities, hours)
- `FAQPage`, `Service`, `BreadcrumbList`, `ImageGallery`, `ContactPage` schema
- `app/sitemap.ts` + `app/robots.ts` (excludes `/inspection`)

## Run locally
```bash
cd ~/legend-website
npm install
npm run dev          # http://localhost:3002
```
The landing page must run separately for `/inspection` to load:
```bash
cd ~/legend-restoration && npm run dev   # http://localhost:3001
```

## Configuration (`.env.local`)
```
NEXT_PUBLIC_SITE_URL=https://legendrestorationct.com
NEXT_PUBLIC_INSPECTION_URL=http://localhost:3001   # prod: deployed landing page URL
```

## Content edits
All copy/data lives in `lib/site.ts` (services, process, why, projects, FAQs, service areas,
contact). Edit there — pages render from it.

## Deploy
Deploy on Vercel as a separate project. Set `NEXT_PUBLIC_SITE_URL` to the production domain and
`NEXT_PUBLIC_INSPECTION_URL` to the deployed landing page URL so `/inspection` embeds production.
