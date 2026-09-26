# 11 — Sprint to 1 October 2026

Goal: ship Phases 2–4 (minus the wish wall) before **00:00 WAT, Thu 1 Oct 2026**.
**Code freeze: Wed 30 Sep, 12:00 WAT.** After freeze: only fixes, QA, deploy.

De-risked 2026-09-26: World Bank API (population to 2025 ✔) and Wikidata SPARQL
(Tinubu current since 2023-05-29, predecessors with dates ✔) both respond.

## Principle
Each day ends **deployable**: gates green and the site better than yesterday. If a day slips,
we cut from the bottom of the list, never the freeze.

---

## Day 1 — Sat 26 (rest of day) + Sun 27 · Phase 2: live data
| # | Task | Output |
|---|---|---|
| 1 | `zod`; `lib/sources/worldbank.ts`, `lib/sources/wikidata.ts` (validate + sanity checks) | typed clients + tests (fixtures) |
| 2 | `lib/fallback/*.json` + `scripts/refresh-snapshots.ts` (`npm run data:refresh`) | committed snapshots, never-blank sections |
| 3 | `'use cache'` + `cacheLife('days'/'weeks')` + `cacheTag`, `<Suspense>` + fallback | live data in static shell |
| 4 | **Leaders** section: heads of state 1960 → today, civilian/military, portraits (Commons, credited) | auto-updates after 2027 election |
| 5 | **Nigeria in numbers**: 1960 vs latest; population, GDP, life expectancy, urban % — animated counters + small SVG charts; "Source · as of {year}" | |
| 6 | Optional `content/years/{year}.ts` (theme/highlights), section hides if absent | |

## Day 2 — Mon 28 · Phase 3a: story sections
| # | Task |
|---|---|
| 7 | Timeline: **pinned horizontal scroll** on desktop (vertical stays on mobile) |
| 8 | **36 states + FCT map** — SVG from geoBoundaries (CC BY 4.0, credited), states light up by creation year 1967→1996 on scroll |
| 9 | **Symbols**: flag story (Taiwo Akinkunmi), coat of arms, pledge, anthem lyrics |
| 10 | Fact-register rows for all new facts |

## Day 3 — Tue 29 · Phase 3b + 4: motion polish & sharing
| # | Task |
|---|---|
| 11 | **WebGL waving flag** (React Three Fiber shader), lazy, capable devices only; CSS flag stays as fallback |
| 12 | ~~SplitText headings, custom cursor + magnetic buttons, film grain~~ ✅ done early (26 Sep), plus intro, hero scroll scene, motto bands, rolling digits |
| 13 | **Celebration mode** (1 Oct): confetti/fireworks burst; **gold theme** on jubilee years |
| 14 | **Personalised greeting**: `/greet?name=Ada` → personalised OG image + WhatsApp / X / copy-link share buttons |
| 15 | Vercel Analytics (privacy-friendly) |

## Day 4 — Wed 30 · Freeze, QA, launch
| Time (WAT) | Task |
|---|---|
| 09:00 | Stretch-only window (see cut list) |
| **12:00** | **Code freeze** |
| 12:00–15:00 | Owner fact-check pass (08-fact-register), Lighthouse mobile ≥ 85, real Android + iPhone |
| 15:00 | Production deploy + domain; `NEXT_PUBLIC_SITE_URL` if needed |
| 16:00 | Test link previews in WhatsApp, X, LinkedIn; simulate 1 Oct with a date override in preview only |
| 23:50 | Watch the live flip at 00:00 WAT |

## Cut list (in order, if we slip)
1. Horizontal timeline (vertical already works)
2. WebGL flag (CSS flag already works)
3. States map → simple animated count 12 → 19 → 21 → 30 → 36

## Explicitly out of this sprint
- **Moderated wish wall**: needs a database, moderation and abuse handling. Too risky to launch unmoderated on a national day. Post-launch.
- **Anthem audio**: needs a recording we have rights to. Lyrics only unless the owner supplies licensed audio.
- **People & culture section**: large fact-check burden. Post-launch.

## Needs from the owner
- Vercel account (or preferred host) + domain name, by Tue 29.
- ~1–2 hours on Wed 30 for the fact-check pass and phone testing.
- Decision on anything in "explicitly out" you want back in.
