# Nigeria Independence 🇳🇬

An animated website that celebrates Nigeria's Independence Day, **1 October 1960**, and stays correct every year without anyone having to update it.

The anniversary number, the countdown, the "Happy 66th" celebration mode and the share image are all worked out from the date in Lagos time. Next year the site reads "67th", and in 2060 it announces the Centenary, without a code change or redeploy.

## Features

- **Always-correct anniversary.** The number, ordinal (61st, 62nd, 63rd…), jubilees (Platinum 2030, Centenary 2060) and wording change through the year: approaching → celebration day → afterglow → the rest of the year.
- **Live countdown and independence clock.** They tick every second in West Africa Time (WAT), so a visitor in London or Houston sees the same "today" as one in Lagos. At 00:00 WAT on 1 October the page switches to celebration mode live, without a reload.
- **Visual history timeline**, 1914 to today: ten moments, one line each, with freely licensed photos credited on each card. Every event links to its source, and the final entry is worked out from the date so the timeline always reaches the current year.
- **Motion:** an opening sequence, a pinned hero scroll scene, marquee bands that react to scroll speed, masked text reveals, odometer digits, parallax, a custom cursor and smooth scrolling.
- **Motion levels.** Phones set to reduce motion get a *gentle* version: soft fades and count-ups, with no pinning, zooming, parallax or smooth scrolling. A notice and the header **Motion** toggle let anyone switch to full motion (or back), and the choice is remembered. All content is readable without JavaScript.
- **Dynamic share image**: the link preview always shows the current anniversary.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) · React 19 · TypeScript (strict)
- Tailwind CSS v4
- [GSAP](https://gsap.com) (ScrollTrigger, SplitText) · [Lenis](https://lenis.darkroom.engineering) smooth scroll
- [Vitest](https://vitest.dev) for date logic and content integrity tests

## Getting started

Requires Node.js 20.9+ (developed on Node 24).

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The intro plays once per browser tab; open a new tab to see it again.

To test on your phone over the same Wi-Fi, run `npm run dev -- -H 0.0.0.0` and open `http://<your-computer-ip>:3000`.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build and server |
| `npm test` | Run the unit tests once (`npm run test:watch` to watch) |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |

## Recording mode (for social content)

Add `?record` to any URL to get a clean frame for screen recordings (Instagram Reels, TikTok, Stories): no cursor, header, grain or progress bar, and the intro replays on every load.

| URL | What you get |
| --- | --- |
| `/?record` | Clean frame; scroll yourself |
| `/?record&autoplay` | Waits 2.5s after the intro, then scrolls steadily through the whole site |
| `/?record&autoplay&speed=220` | Same, at 220 px/s (range 40–600, default 140) |
| `/?record&date=2026-10-01T00:00:05` | Previews another moment, e.g. the "Happy 66th" celebration. Times without a timezone are treated as WAT |

Keys: **Space** pauses and resumes the scroll, **R** restarts from the top.

For vertical 9:16 videos, record on a phone, or use your browser's device toolbar (e.g. 390 × 844). `date` only affects the page in recording mode; the real page, title and share image always use the true date.

## How it stays correct every year

| Kind of content | Examples | How it stays correct |
| --- | --- | --- |
| Worked out from the date | anniversary number, countdown, celebration mode, jubilees | Pure functions of the current time in Lagos: [`lib/anniversary`](lib/anniversary) |
| Fixed history | 1960 independence, 1963 republic, 1999 Fourth Republic… | Typed, sourced content in [`content/history`](content/history) |
| Live data *(coming)* | current president, population, GDP | Wikidata and World Bank APIs, cached, with saved backup copies |
| Editorial *(optional)* | the year's official theme | Optional yearly file; the section hides itself if it's missing |

**Time handling.** The server reads the clock in one place only, [`lib/snapshot.ts`](lib/snapshot.ts), which is cached and refreshed every 15 minutes, so the page can be served as static HTML. In the browser, [`hooks/use-now.ts`](hooks/use-now.ts) takes over with a live clock after hydration.

## Project structure

```text
app/            layout, page, share image, global styles and design tokens
components/
  motion/       animation building blocks (GSAP setup, reveal, count-up, cursor…)
  sections/     one folder per page section (hero, timeline, clock…)
  ui/           presentational primitives
content/        site copy and sourced historical content
hooks/          client hooks
lib/            pure logic: anniversary maths, Lagos time, formatting
plan/           product plan, architecture decisions, fact register, roadmap
```

## Adding or changing content

1. Add the event to [`content/history/timeline.ts`](content/history/timeline.ts), in chronological order, with at least one `https` source and a one-line summary.
2. Images: only freely licensed ones (e.g. public domain or Creative Commons from Wikimedia Commons). Put the file in `content/history/images/`, import it, and fill in `credit` (author, licence, licence URL for CC, source page).
3. Add rows to [`plan/08-fact-register.md`](plan/08-fact-register.md).
4. Run `npm test`. It checks ordering, ids, sources, summary length and image credits.

Facts on this site should be accurate and neutral. If you spot an error, please open an issue with a source.

## Deployment

The site deploys to [Vercel](https://vercel.com) with no configuration: import the repository and deploy.

| Variable | Needed when |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Only when hosting outside Vercel, so share images use the right absolute URL (e.g. `https://example.com`). On Vercel the production domain, including a custom domain, is detected automatically. |

## Documentation

Start with [`plan/README.md`](plan/README.md) for the vision, the evergreen content model, the architecture decisions, the roadmap and the yearly runbook, which is short and optional.

## Copyright

© RB-Isiaq. All rights reserved. Historical photos belong to their credited authors and are used under the licences listed on the site.

---

*Unity and Faith, Peace and Progress.*
