# MIC-web

Events site for **Muslims In Construction**, served as [Cloudflare Workers
static assets](https://developers.cloudflare.com/workers/static-assets/):
everything in `public/` is the site, there is no build step.

Routes:

- `/` — the **MIC homepage** (concept, Rev. A): sells the organisation in the
  setting-out drawing language — the eight-point star constructed in the
  hero, and the two events in boxes at the top, each opening its event page
- `/trek/` — **Box Hill Trek for READ Foundation** (Saturday 12 September
  2026), exactly as supplied
- `/gala/` — **MIC Gala & Awards 2026** (Saturday 28 November 2026) in the
  setting-out design that matches the trek and the homepage; the printed
  leaflet PDF and front image stay served alongside it

When an event passes, retire its box on the homepage and add the next one.

## Structure

```
public/                     everything served
  index.html                the MIC homepage (concept) with the event boxes
  404.html                  themed not-found page
  favicon.svg / favicon.ico / apple-touch-icon.png
  robots.txt
  _headers                  security + caching headers
  trek/index.html           the trek page, as supplied
  gala/
    index.html              the gala page (setting-out / geometric-star design)
    mic-gala-2026-leaflet.pdf
    mic-gala-2026-leaflet-front.png
  assets/
    css/home.css            homepage styles (harvested from the gala's vocabulary)
    css/main.css            trek page styles (split out of the original file)
    css/gala.css            gala page styles (split out of the original file)
    js/countdown.js         trek page countdown (split out of the original file)
    js/gala.js              gala countdown (split out of the original file)
wrangler.jsonc              assets-only Worker config, no script
package.json                wrangler devDependency + dev/deploy/check scripts
CLAUDE.md                   standing git + release policy and the release ledger
```

The event pages' content, design, and behaviour are as supplied; the inline
`<style>` and `<script>` blocks were moved to `assets/` unchanged, and the
`TBC` tags are the owner's review markers, kept deliberately. The homepage is
a written-for-this-site concept (Rev. A) assembled entirely from the
setting-out design's own vocabulary and from claims made on the supplied
event pages — nothing invented.

## Local development

```bash
npm install
npm run dev        # wrangler dev — serves public/ on localhost
```

For a quick look without wrangler: `python3 -m http.server -d public`.

## Verification before every push

1. `npm run check` (`wrangler deploy --dry-run`) — validates the config.
2. Serve `public/`, render `/`, `/trek/`, `/gala/` and the 404 with headless
   Chromium at desktop and mobile widths, and inspect the screenshots: styles
   applied, fonts loaded, layout intact.

## Deployment

Connect the repo to **Cloudflare Workers Builds** (dashboard → Workers &
Pages → Create → Import a repository → `OttomanLabsAI/MIC-web`): every push to
`main` then deploys to production automatically (builds install from the
lockfile, then run `npx wrangler deploy`). Manual deploys are
`npm run deploy` with a logged-in wrangler.

If a build ever fails having "detected no tools" and found no static files,
it has built a commit from before the site existed — never retry that build
(a retry re-runs the same pinned commit); push to `main` instead.

Caching is set in `public/_headers`: `assets/` is cached hard for a year, so
**rename an asset file when its contents change** (and update its references);
icons and the leaflet cache for a week; HTML always revalidates, so releases
are visible immediately.

## External resources

Kept as absolute URLs on purpose — do not vendor them:

- **Google Fonts** (`fonts.googleapis.com`, `fonts.gstatic.com`) — Big
  Shoulders Display, Archivo, JetBrains Mono on the trek page; Bodoni Moda,
  Archivo, JetBrains Mono on the homepage and gala page.
- **Google Maps link** on the gala venue block (plain link, no embed).
- **Outbound links** — WhatsApp (`chat.whatsapp.com`), the National Trust
  Box Hill page, LinkedIn, Instagram, TikTok.

The pages' canonical URLs point at `muslimsinconstruction.uk` (the
organisation's own domain); nothing served here depends on reaching it.

## Content notes, as supplied

- The trek page carries the owner's `TBC` review markers deliberately
  (meeting point, route, fundraising link and similar) — it is a Rev. A draft
  for review. One is long enough to overflow a 390px screen by 12px until the
  wording is confirmed.
- The gala page's booking and notify buttons are placeholders (`href="#"`)
  until a booking platform is chosen, and several prices, speakers and
  policies carry `TBC` markers — exactly as in the supplied file.
- The homepage is marked "Rev. A — concept for review" in its footer.
