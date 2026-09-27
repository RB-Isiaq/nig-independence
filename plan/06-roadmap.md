# 06 — Roadmap

> Schedule for Phases 2–4: [11-sprint-to-oct-1.md](11-sprint-to-oct-1.md). Wish wall, anthem audio and culture section are deferred to post-launch.

Legend: `[x]` done · `[ ]` todo · `[~]` in progress / partial

## Phase 1 — MVP (target: live for 1 Oct 2026)
- [x] Plan folder + docs
- [x] Tooling: GSAP, @gsap/react, Lenis, Vitest; `test` + `typecheck` scripts
- [x] `cacheComponents: true`
- [x] `lib/anniversary/` — number, ordinal, phases, milestones, countdown, elapsed + unit tests
- [x] `lib/snapshot.ts` — cached server now
- [x] `hooks/use-now.ts` — hydration-safe live clock
- [x] Design tokens + fonts
- [x] Motion infra: GSAP registration, Lenis bridge, Reveal, CountUp, reduced-motion handling
- [x] Hero: CSS waving flag, count-up number, phase-aware headline, countdown
- [x] Live "time since independence" ticker
- [x] Timeline 1914 → today (sourced content, scroll-drawn line, reveals, derived "today" node)
- [x] Sources footer
- [x] Metadata + dynamic OG image
- [x] Quality gates pass (lint, typecheck, test, build)
- [x] Visual QA: desktop, 390px phone, reduced motion, scrolled animations (headless Chrome)
- [ ] Human fact-check pass over [08-fact-register.md](08-fact-register.md)
- [x] Deploy to Vercel: https://nig-independence.vercel.app (custom domain: optional)
- [ ] Manual QA on a real mid-range Android + iOS Safari

## Phase 2 — Live data
- [x] zod schemas; Wikidata head-of-state client; World Bank client (tested with fixtures)
- [x] Fallback snapshot + `npm run data:refresh` (CI schedule: todo)
- [x] "Nigeria today" compact strip: 3 World Bank figures (1960 vs latest) + current head of state, scroll count-ups
- [ ] ~~Leaders gallery~~ (Wikidata history incomplete; skipped by design)
- [ ] Optional `content/years/{year}.ts` (theme/highlights) with hide-if-absent

## Phase 3 — Full motion
- [ ] Lazy WebGL flag (R3F shader) with CSS fallback
- [ ] Pinned horizontal timeline on desktop
- [ ] States map animated by creation year
- [ ] Symbols section (anthem audio + lyrics, pledge, coat of arms)
- [x] Intro sequence, pinned hero scroll scene, velocity marquees, SplitText headings, rolling digits
- [x] Custom cursor, magnetic buttons, scroll progress, page grain
- [ ] Lottie accents
- [x] 1 October celebration: opening show, live midnight finale, ambient + tap fireworks (canvas-confetti, worker canvas, full motion only)
- [~] Milestone themes: gold confetti in jubilee years (full gold UI theme still todo)

## Phase 4 — Engagement
- [x] Recording mode for social content (`?record`, autoplay, date preview)
- [ ] Personalised share card `/greet?name=` → OG image
- [ ] (Optional) moderated wish wall — needs DB + moderation plan
- [x] Analytics: Vercel Analytics (`<Analytics />` in layout, added by owner)
