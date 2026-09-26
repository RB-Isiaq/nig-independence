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
- [ ] zod schemas; Wikidata leaders client; World Bank client
- [ ] Fallback snapshots + refresh script + CI workflow
- [ ] Leaders section; Nigeria-in-numbers section (animated counters + charts)
- [ ] Optional `content/years/{year}.ts` (theme/highlights) with hide-if-absent

## Phase 3 — Full motion
- [ ] Lazy WebGL flag (R3F shader) with CSS fallback
- [ ] Pinned horizontal timeline on desktop
- [ ] States map animated by creation year
- [ ] Symbols section (anthem audio + lyrics, pledge, coat of arms)
- [x] Intro sequence, pinned hero scroll scene, velocity marquees, SplitText headings, rolling digits
- [x] Custom cursor, magnetic buttons, scroll progress, page grain
- [ ] Lottie accents
- [ ] Milestone themes (gold for jubilees)

## Phase 4 — Engagement
- [x] Recording mode for social content (`?record`, autoplay, date preview)
- [ ] Personalised share card `/greet?name=` → OG image
- [ ] (Optional) moderated wish wall — needs DB + moderation plan
- [ ] Analytics (privacy-friendly)
