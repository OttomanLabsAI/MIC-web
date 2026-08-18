# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

A Cloudflare Workers static-assets site — the events site for Muslims In
Construction. Everything served lives in `public/` and there is no build step -
the files in that directory are the site. Once the repo is connected to
Cloudflare Workers Builds, **every push to `main` deploys to production**.

```
public/            everything served
  index.html       the MIC homepage (concept) — sells the organisation,
                   events boxed at the top, each box opening its page
  trek/            the Box Hill Trek page, as supplied
  gala/            the MIC Gala 2026 page (setting-out / star design)
                   with its leaflet PDF + image
  404.html
  assets/css|js
  _headers         security + caching headers
  robots.txt
wrangler.jsonc     assets-only config, no Worker script
package.json       wrangler devDependency + dev/deploy scripts
```

The homepage sells MIC itself and lists the events in boxes at the top.
Event pages live at their own paths. When an event passes, retire its box
and add the next event's.

## Local development

```bash
npm install
npm run dev          # wrangler dev
```

## Verification - before every push to main

1. `npx wrangler deploy --dry-run`
2. Serve `public/`, render `/`, `/trek/`, `/gala/` and the 404 with headless
   Chromium, and inspect the screenshots: styles applied, fonts loaded,
   layout intact.

Never leave pushed work unverified or half-finished. Work in small, complete
batches: implement, verify, commit, push.

## Git and release workflow

- Before committing: `git config user.name "Fid" && git config user.email "fid_kk@proton.me"`
- Develop on the working branch (`site-work`) and push there first. Release
  verified work by fast-forwarding `main` onto it and pushing `main`.
- Every push to `main` is a release. Versions are an ascending `vMAJOR.MINOR`
  sequence starting at `v1.0`; every push bumps the minor regardless of size. A
  major bump is reserved for a ground-up overhaul.
- With every push to `main`, provide release-tag text in the reply, in exactly
  this shape. The owner creates the GitHub release manually - **never push tags**:

  ```
  Tag: v<next>  —  Title: <five to nine words, plain and evocative>
  Description: <one to three sentences of editorial prose describing what changed
  from the owner's point of view — outcomes, not implementation. No bullet lists,
  no jargon, no file names.>
  ```

- Append the release line to the ledger below as part of the same push.
- Commit messages: descriptive imperative first line (what the change does, not
  "update X"), then a short prose body; dash bullets are fine there. One commit
  per coherent piece of work; several may share a push, but each push gets
  exactly one version entry.
- Never include model names, AI attribution trailers, session links, or other
  tooling identifiers in commit messages, titles, or code.

## The pages themselves

Content, design, and behaviour are as supplied by the owner. Do not tidy markup,
rename classes, rewrite copy, or modernise CSS unless asked - changes to the
design are their own release, requested deliberately. The `TBC` tags on the
pages are the owner's review markers; leave them until the owner confirms the
detail they flag.

## Release ledger

| Version | Title | Description |
| --- | --- | --- |
| v1.0 | The events site moves into its own home | The Muslims In Construction events site now lives in its own repository: the Box Hill trek fronts the door as the next event on the calendar, the gala stands at its own address, and the gala's leaflet on the homepage is the way through. Connect the repository to Cloudflare and every release from here publishes itself. |
| v1.1 | The front door now sells the whole idea | The site opens on Muslims In Construction itself — the eight-point star drawn from its construction lines, what the network is, and both events in boxes at the top that open straight onto their pages. The trek moves to its own address, and the gala returns in the drawn, setting-out design. All of it a concept for review. |
| v1.2 | The offer joins the drawings | The concept now sells itself: a Make It Yours page lays out the offer, the before-and-after, and the prices, reached from a gold tab on every page. The browser icon becomes the eight-point star, and the footer no longer collides with itself in a narrow window. |
