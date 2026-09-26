# 10 — Progress Log

Newest first. Each entry: what was done, what's verified, what's next, gotchas.

---

## 2026-09-26 (evening) — Deployed + recording mode

**Live:** https://nig-independence.vercel.app (Vercel, auto-deploys; `main` = production, `dev` = previews). Verified in prod: title/countdown correct, OG image absolute URL + renders, 390px no horizontal scroll, served from Vercel cache.

**Repo:** github.com/RB-Isiaq/nig-independence (public). Owner commits and pushes manually; no AI attribution trailers. The repo was recreated to drop a co-author trailer.

**Done**
- Recording mode (`lib/record-mode.ts`, tested): `?record` clean frame + intro replay; `&autoplay[&speed=]` steady scroll via `RecordController` (GSAP ticker → Lenis `immediate` scroll), Space/R keys; `&date=` previews another moment through a clock offset in `use-now` (client only; metadata/OG unaffected).
- `lenis-instance.ts` registry so other client code can drive Lenis.
- A11y: visual hero lead/trail `aria-hidden` (screen readers read the sr-only `<h1>` once).
- `og:url` + canonical.
- Tests 58/58.

## 2026-09-26 (later) — Motion upgrade pulled forward (owner: "feels too subtle")

**Done**
- Intro: 1960 → current-year counter, green-white-green panels cover then sweep away; once per session (`sessionStorage`), gated pre-paint by `IntroGateScript` (adds `js` / `intro-skip` on `<html>`), CSS failsafe hides it after 6s. `intro-signal.ts` makes hero intro + CountUp wait for it.
- Hero scroll scene (`HeroStage`): pinned for 110% of viewport; copy lifts away, "66" swells ×5.5 into a watermark, flag drifts to centre and tilts.
- Motto bands: two counter-scrolling giant marquees, speed + skew react to scroll velocity.
- SplitText line/word mask reveals on section headings (`SplitReveal`, static text only).
- Rolling odometer digits (`RollingNumber`, CSS keyed remount) for countdown + clock.
- Custom cursor (fine pointers only, blend-difference, grows on links), magnetic nav, flag-coloured scroll-progress bar, film grain.
- Timeline: bigger years with parallax, active item dot glows.

**QA fixes**: muddy semi-transparent number mid-scroll → early fade; cursor parked at (0,0) → appears on first move; outline marquee showed variable-font contour overlaps → solid green band.

**Verified**: lint ✔ typecheck ✔ tests 53/53 ✔ build ✔; frames captured for intro, hero, scroll scene, bands, mobile 390px (no horizontal scroll).

**Not yet verified**: real-device smoothness (mid-range Android), Safari behaviour of pin + Lenis.

## 2026-09-26 — Phase 1 MVP built

**Done**
- Plan folder (`/plan`, initially gitignored, now committed — ADR-006) with vision, content model, architecture, design, data sources, roadmap, ADRs, fact register, yearly runbook.
- Deps: `gsap`, `@gsap/react`, `lenis`; dev: `vitest`, `@types/node@24` (bumped from 20 — vitest 5 peer requirement).
- Scripts: `npm test`, `npm run test:watch`, `npm run typecheck`.
- `cacheComponents: true`. Page and OG image are static with 15 min revalidate / 1 day expire.
- `lib/anniversary` + `lib/time` + `lib/format` — pure, 53 unit tests (WAT midnight boundaries, UTC-vs-Lagos, leap years, 2030/2060/2073, hero copy per phase, content integrity).
- Sections: header, hero (CSS waving flag, count-up, phase-aware copy, live countdown), independence clock (live elapsed), timeline (16 sourced events + derived "today" node, scroll-drawn line), footer (deduped sources).
- Metadata title + OG image both derive from `getHeroCopy` (single source of wording).

**Verified**
- lint ✔ typecheck ✔ tests 53/53 ✔ build ✔.
- Prod server HTML: title "Nigeria turns 66 · Countdown to the 66th Independence Day"; countdown correct for 26 Sep 15:13 WAT (4d 8h 46m).
- Screenshots (headless Chrome via CDP script): desktop, 390px phone (no horizontal scroll), reduced-motion full page, scrolled timeline with animations firing.
- All source URLs return 200 (Britannica 403 = bot block).

**Bugs found & fixed during QA**
- Mobile horizontal scroll from GSAP `x` start states → `overflow-x: clip` on html/body.
- Flag rendered black under reduced motion (shade overlay had no resting opacity) → `opacity: 0.1`.
- `CountUp` originally wrote `textContent` (detaches React's text node) → writes `firstChild.nodeValue`.
- Fixed header overlapped content → gradient backdrop.

**Gotchas for next session**
- Never call `Date.now()` in server code outside `lib/snapshot.ts` — Cache Components will error.
- Don't use GSAP SplitText on text React re-renders (hero ticks every second). Use it only on static server-rendered text.
- Lenis is set up vanilla in `SmoothScroll` (not `ReactLenis`) so reduced-motion users don't cause a tree remount on hydration.
- `metadataBase` needs `NEXT_PUBLIC_SITE_URL` in prod unless on Vercel (auto via `VERCEL_PROJECT_PRODUCTION_URL`).

**Next**
1. Human fact-check pass on [08-fact-register.md](08-fact-register.md).
2. Deploy to Vercel (+ domain, set `NEXT_PUBLIC_SITE_URL` if not Vercel).
3. Real-device QA (mid-range Android, iOS Safari), Lighthouse.
4. Then Phase 2 (Wikidata leaders, World Bank numbers).
