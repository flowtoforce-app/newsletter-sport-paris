# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment

No build step. Push to `main` → Vercel auto-deploys to **parissportweek.fr**.

```bash
git add <files>
git commit -m "message"
git push   # triggers Vercel deploy automatically
```

GitHub remote requires credentials (HTTPS) — use GitHub Desktop or configure SSH if push fails in terminal.

## Architecture

Static HTML site with one Vercel serverless function. No framework, no bundler.

| File | Purpose |
|------|---------|
| `index.html` | Landing page with email signup form |
| `partner.html` | Partner page — served at `/partenaire` via vercel.json rewrite |
| `n1.html`, `n2.html`, … | Newsletter issues — standalone static HTML |
| `api/subscribe.js` | Serverless POST handler — subscribes email to Beehiiv |
| `vercel.json` | URL rewrites + redirect parissportweek.com → parissportweek.fr |
| `sections/` | Section screenshots (PNG) for Beehiiv editor uploads |

## Serverless API (`api/subscribe.js`)

- **POST /api/subscribe** — calls Beehiiv v2 API to add subscriber
- Publication ID: `pub_36df61d2-bbfc-486f-a232-8d69ce2d8c3e`
- Requires env var `BEEHIIV_API_KEY` set in Vercel dashboard (not in code)
- Node 22.x runtime (set in `package.json` engines)

## Design system

CSS variables shared across all pages:

```css
--navy: #000055   /* primary background */
--blue: #4169E1   /* accent */
--baby: #89B8E8   /* light blue */
--white: #ffffff
--off:   #f5f7fd  /* light background sections */
--text:  #2a2f4a
--muted: #9aa0b8
```

Fonts: **Playfair Display** (display/headlines), **Space Mono** (labels/chips), **Inter** (body) — loaded from Google Fonts.

## Newsletter issues

Each issue is a self-contained HTML file (`n1.html`, …). Sections use these classes:
- `.header` — masthead (N°, date, title, byline)
- `.intro` — opening section
- `.section` — standard content section (chip + title + body)
- `.stat-block` — La Stat callout
- `.mot-block` — L'Œil de Lys (personal note)
- `.footer` — links, social, legal

Partner form on `partner.html` uses [FormSubmit](https://formsubmit.co) (no backend needed) — sends to parissportweek@protonmail.com.

## Editorial rules (must be respected in all newsletter content)

1. Jamais d'information inventée — always source with a URL link. Only "L'Œil de Lys" is 100% opinion, no source required.
2. Jamais de tiret dans les textes — no dash anywhere (not at start of line, not in sentences, not in lists).
