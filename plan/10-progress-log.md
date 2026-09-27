# 10 — Progress Log

Newest first. Each entry: what was done, what's verified, what's next, gotchas.

---

## 2026-09-27 — Full technical audit (pre-launch)

Read every source file; ran lint, typecheck, tests and build; runtime-scanned the production build in headless Chrome (6 scenarios: desktop, phone, phone + reduced motion, 1 Oct, 2060 and 2027 previews), scrolling the full page to fire every ScrollTrigger, and captured exceptions, console errors, hydration errors, overflow, hidden content and broken images.

**Fixed**
1. Hero count-up could animate to a stale number in a `&date=` preview with the same phase but a different year (e.g. 15 Sep 2027 showed 66): now keyed by phase + number. Verified: shows 67.
2. Intro counted to the server's year, ignoring previews: now uses `readNow()` (live clock + preview offset).
3. Slow phones: if JS started after ~5s, the CSS failsafe could hide the overlay mid-intro and leave the hero blank. Now the intro is skipped if JS starts after 4.5s; the failsafe is 8s; recordings always play the whole intro.
4. Clock resyncs as soon as a background tab becomes visible (throttled timers made it lag).
5. Era labels were inaccurate: the military era span covered the civilian Second Republic and ended in 1998; the First Republic ended in 1966, not 1965.
6. Motto band flag meaning didn't match the source: now "Green for agriculture · White for peace and unity".
7. "Ten moments" hardcoded: the count is now derived from the content.
8. Footer said photos "remain the property" of authors, which is wrong for public-domain images: reworded.
9. Stat-tile source links now align with the President tile.
10. Dead code removed: `LAGOS_TIMEZONE_LABEL`, `SITE.shortName`, `SITE.tagline`, `getNextNamedMilestone` (+ its tests). Layout import order tidied.

**Verified clean:** 0 exceptions, 0 console errors, 0 hydration errors, 0 horizontal overflow, 0 content left hidden after scroll, 10/10 images load, in every scenario. Generated CSS includes Safari prefixes. Tests 90/90.

**Owner action:** Vercel Analytics isn't live in production (`/_vercel/insights/script.js` 404). Deploy the `<Analytics />` change and enable Analytics in the Vercel dashboard.

## 2026-09-27 — Timeline "today" card: live + fixed 1 October wording

- **Bug (owner spotted):** on 1 October the card said "…the 66th anniversary *arrives* on 1 October 2026" on the day itself. New `getTodayCopy` has a celebration-day line ("Today, 1 October 2026, Nigeria celebrates 66 years of independence."), with tests for before, on and after the day, and 2060/2061.
- The card, the timeline eyebrow year ("1914 – {year}") and the footer © year now use the live clock (`TimelineToday` client, `CurrentYear`), so they flip exactly at midnight and follow `?record&date=` (previously server-rendered: up to ~15 min late and ignored previews).
- Verified in the browser: today, 1 Oct, 2 Oct, 1 Jan 2027 and 1 Oct 2060 all show the right year, age and wording. Tests 93/93.

## 2026-09-27 — "Nigeria today" live strip (Phase 2, compact)

- Chosen over full sections to keep reading light (owner: "don't bore users"); one screen, four tiles.
- `lib/sources`: World Bank then-and-now (1960 or earliest vs latest, plausibility bounds) and Wikidata current head of state (exactly one open-ended P35 statement, readable label, sane date). Tests use offline fixtures, including rejecting a unit mix-up, error payloads, ambiguous/vandalised data, and automatic succession after an election.
- `lib/data/nigeria-today.ts`: cached, with per-source fallback to the committed `snapshot.json`; `npm run data:refresh` (tsx; the script is `.mts` for top-level await).
- UI: `components/sections/nigeria-today` with scroll-triggered count-ups (CountUp gained `decimals` and `start="scroll"`); "Today" added to the desktop nav.
- Tests 88/88; lint, typecheck and build green; page still static (data fetched at build, then cached). Screenshots checked on desktop and phone.

## 2026-09-26 (late night) — Fact check + content plan

- **Automated source check:** every timeline claim was checked against the plain text of its Wikipedia source; quotes recorded in 08-fact-register. All matched except "Nigeria's longest run of civilian rule" (1999), which isn't stated in the source, so it was rewritten to "A new constitution begins the Fourth Republic, with Olusegun Obasanjo as elected President." Also confirmed: the clock-intro wording (Union Jack lowered at midnight), the flag line and the motto.
- **Image licences:** templates read from every file page. All clean except the 1960 photo: public domain in Nigeria, but the US tag is doubtful. Low risk; kept, noted.
- **Content plan:** plan/12-content-plan.md has shot lists, URLs, voice-over, captions and checklists for Mon, Tue and midnight Wed.

## 2026-09-26 (night) — 1 October celebration effects

- `canvas-confetti` (ISC, ~6 KB, OffscreenCanvas worker). Choreography is pure and tested in `lib/celebration/bursts.ts` (seeded PRNG): opening show about 3s, finale about 6s, ambient every 4.5–8s, tap bursts clamped to the viewport; flag palette, plus gold for named jubilees.
- `Celebration` (inside `HeroHeadline`): canvas created imperatively (a worker canvas can only be transferred once, so this survives React dev double effects). Opening show after the intro on 1 Oct; finale when approaching → celebration is seen live; ambient only while the hero is visible and the tab is active; full motion only.
- The hero entrance replays and the number re-counts when the phase changes (useGSAP deps `[phase]`, `revertOnUpdate`; CountUp keyed by phase).
- Verified in headless Chrome: `?record&date=2026-10-01T09:00` (opening show), `?record&date=2026-09-30T23:59:52` (countdown reads 0/00/00/03 at 5.5s, then the finale and "Happy 66th Independence Day" at 10.5s), tap burst at the tap point. Tests 75/75; lint, typecheck and build green.

## 2026-09-26 (later still) — 1967 photo + national anthem

- 1967–70 now has a photo: 1968 relief workers unloading food aid (US CDC, public domain). Chosen to honour the human cost without being graphic or partisan.
- National anthem player built and tested, then **removed before commit**: the source YouTube video of the only usable recording is now private, so its CC BY licence can't be verified. Social videos will use the platforms' licensed music instead. See the fact register for how to bring it back.
- `ImageCredit` renamed to `MediaCredit` (used for images and audio).

## 2026-09-26 (late) — Visual timeline, credits, copyright

**Owner direction:** people don't read, so use fewer words and more visuals. Three social posts: Mon (code + brief), Tue night (countdown teaser), Wed midnight (live flip).

**Done**
- Timeline trimmed 16 → 10 moments, one line each (a test enforces ≤120 chars); the source is a small link; `until` supports periods (civil war 1967–1970).
- 9 freely licensed Commons photos in `content/history/images/` (≤1400px, 3.2 MB total; AVIF/WebP served via next/image, blur placeholders from static imports). Credits sit on each card and in a footer "Photo credits" list. Civil war gets a text-only panel.
- Full motion: photos wipe open (clip-path) and drift inside their frames; text slides in; the years parallax. Gentle mode: fades.
- Footer © {Lagos year} RB-Isiaq, all rights reserved (no LICENSE file, owner's choice). `SITE.owner`.
- Tests 69/69; lint, typecheck and build green; screenshots checked on desktop and phone.

**Next:** Oct 1 celebration effects (confetti/fireworks) for post #3; then live data if time allows.

## 2026-09-26 (night) — "No animation on my phone" → motion levels

**Cause:** the owner's phone requests reduced motion, and the old code switched all motion off in that case (confirmed by emulating it against production). Not a deploy bug; with motion allowed, production plays the intro.

**Done**
- `lib/motion-preference.ts` (full | gentle; system | full | gentle preference) and a rewritten gate script (classes `motion-gentle` / `motion-full`), with a test that runs the real inline script against the library for all 16 combinations.
- `withMotion({ full, gentle })` helper; all 12 animation call sites migrated. Gentle keeps fades, count-up, crossfading digits, scroll progress and the timeline highlight.
- Header **Motion** toggle (green dot = full), one-time `MotionNotice` for system-reduced visitors ("Show full motion" / "Keep calm").
- CSS: ambient loops stop under `html.motion-gentle`; without JS it falls back to the media query.
- Intro only marked "seen" when it actually played (opting in shows it).
- Mobile header: section links hidden below `sm`, brand no longer wraps.
- Tests 67/67; lint, typecheck and build green.

**Verified (emulated phone, 390px):** reduce-motion → gentle + notice; tap "Show full motion" → reload → `motion-full`, Lenis on, intro plays; normal phone unaffected.

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
