# 04 — Design & Motion

## Visual language
- **Palette** (tokens in `app/globals.css`):
  - `--color-nigeria` `#008751` (flag green), `--color-nigeria-deep` `#003d24`, `--color-ink` `#03140c` (near-black green background),
  - `--color-snow` `#f7f5ef` (warm white), `--color-gold` `#d4a64a` (accent for milestones/celebration only).
- **Type:** Display — *Bricolage Grotesque* (bold, characterful, large numerals). Body — *Geist*.
- **Mood:** dark, cinematic, big typography, generous whitespace; green/white used boldly; subtle grain + glow.

## Section list (full vision)
1. Hero — waving flag, huge anniversary number count-up, phase-aware headline, countdown. *(P1: CSS flag · P3: WebGL flag)*
2. Live ticker — years/days/hours/min/sec of independence. *(P1)*
3. Timeline 1914 → today. *(P1: vertical + scroll-drawn line · P3: pinned horizontal)*
4. Leaders (Wikidata). *(P2)*
5. Nigeria in numbers, 1960 vs latest (World Bank). *(P2)*
6. 36 states + FCT map, animated by creation year. *(P3)*
7. National symbols: flag, coat of arms, anthem, pledge. *(P3)*
8. People & culture. *(P3)*
9. Share card / personalised greeting. *(P1: OG image · P4: personalised)*
10. Sources footer. *(P1)*

## Motion stack
| Tool | Used for |
|---|---|
| GSAP + ScrollTrigger | scroll reveals, scrubbed timeline line, pinning (P3) |
| GSAP SplitText | headline char/line reveals |
| Lenis | smooth scroll (disabled for reduced motion) |
| CSS keyframes | flag wave, ambient glows (cheap, no JS) |
| React Three Fiber | P3 only, lazy-loaded WebGL flag/particles |
| Lottie | P3 small illustrations |

## Signature moments (built 26 Sep)
1. Intro: 1960 → today counter, flag panels sweep (once per session)
2. Pinned hero: "66" swells into a watermark, flag takes centre stage
3. Velocity marquees: motto + flag meaning, speed/skew follow scroll
4. Masked word reveals on headings; odometer digits; parallax timeline years
5. Cursor, magnetic nav, scroll progress, grain

## Motion principles
- Enter animations: 0.8–1.2s, `power3.out` / `expo.out`; stagger 0.03–0.08s.
- Never animate layout properties; only `transform`/`opacity`/`clip-path`.
- **`prefers-reduced-motion: reduce`** ⇒ no Lenis, no scrub, no count-up, flag static; content visible immediately.
- **No-JS ⇒ content visible.** Initial hidden state is applied by JS (GSAP `from`), never by CSS.

## Budgets
- JS on first load ≤ ~180 KB gzip (P1). WebGL chunk lazy, only on capable devices.
- LCP < 2.5s on 4G mid-range; CLS < 0.05.
- Fonts via `next/font` (self-hosted, `display: swap`).
