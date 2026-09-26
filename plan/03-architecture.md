# 03 — Architecture

## Stack
- **Next.js 16.3** App Router with `cacheComponents: true` — ⚠️ this is NOT older Next. Read `node_modules/next/dist/docs/` before using an API.
- React 19.2, TypeScript strict, Tailwind CSS v4 (CSS-first config in `app/globals.css`).
- Motion: **GSAP 3** (+ ScrollTrigger; SplitText available, register it only when first used) via `@gsap/react` `useGSAP`; **Lenis** smooth scroll (vanilla, set up in `SmoothScroll`).
- Tests: **Vitest** for pure logic (`lib/**`, `*-copy.ts`, content integrity).
- Package manager: npm.

## Folder structure
```
app/
  layout.tsx               fonts, metadata base, <SmoothScroll> provider
  page.tsx                 composes sections only — no logic
  opengraph-image.tsx      dynamic share image (uses anniversary snapshot)
  globals.css              design tokens (@theme), base styles, keyframes
components/
  motion/                  animation infrastructure (client)
    gsap.ts                single place that registers GSAP plugins
    smooth-scroll.client.tsx  Lenis ↔ GSAP ticker/ScrollTrigger bridge (renders null)
    reveal.client.tsx      generic scroll-reveal wrapper
    count-up.client.tsx    number count-up (mutates React's text node safely)
  ui/                      presentational primitives (Container, Eyebrow, Flag…)
  sections/<name>/         one folder per page section
    index.tsx              server component, public entry of the section
    *.client.tsx           interactive parts, explicitly suffixed
    *-copy.ts              pure wording functions (tested) where copy depends on state
  (current sections: site-header, hero, independence-clock, timeline, site-footer)
hooks/                     client hooks (useNow — shared ticking clock)
lib/
  anniversary/             Class A logic — pure, framework-free, 100% tested
  time/                    Lagos-time helpers
  snapshot.ts              cached server "now" (the only server Date.now())
  format.ts                locale-independent formatting (hydration-safe)
content/
  site.ts                  site-wide copy & constants
  history/                 Class B typed content
  types.ts                 shared content types
```

## Conventions
- **Server components by default.** A file is a client component only if it needs state/effects/animation; name it `*.client.tsx`.
- `lib/` has **no React and no Next imports** (except `snapshot.ts`) → trivially testable.
- No clock reads (`Date.now()`, argument-less `new Date()`) on the server except `lib/snapshot.ts`; parsing the snapshot with `new Date(iso)` is fine. Client time comes from `hooks/use-now.ts`.
- Files stay small (guideline < ~150 lines). If a component grows, split it.
- Named exports; kebab-case filenames.
- Content never contains presentation; components never contain facts.

## Rendering & caching
| Thing | Strategy |
|---|---|
| Page shell + history | Prerendered static |
| Anniversary snapshot | `'use cache'` + `cacheLife({ stale: 300, revalidate: 900, expire: 86400 })` → ≤15 min stale |
| Countdown/hero live state | Client, live clock after hydration |
| OG image | Uses same snapshot → correct number within ~15 min |
| Phase 2 live data | `'use cache'` + `cacheLife('days' / 'weeks')` + `cacheTag`, fallback JSON |

## Quality gates
`npm run lint`, `npm run typecheck`, `npm test`, `npm run build` must all pass before a phase is "done".
