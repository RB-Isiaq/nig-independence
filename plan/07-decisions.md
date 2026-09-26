# 07 — Decisions (ADR log)

Format: **ADR-NNN — Title** · date · status. Context → Decision → Consequences.

---

### ADR-001 — Lagos time is the only calendar
2026-09-26 · accepted
- **Context:** Visitors are worldwide; "is it 1 October?" must have one answer.
- **Decision:** All calendar logic uses WAT (UTC+1, fixed, no DST) via a constant offset in `lib/time/lagos.ts`.
- **Consequences:** Deterministic, testable, no Intl timezone dependency. If Nigeria ever adopts DST (no indication), update one constant.

### ADR-002 — Server snapshot time + live client clock
2026-09-26 · accepted
- **Context:** Next 16 Cache Components forbids uncached `Date.now()` in prerender. We want a static, fast page that is still correct the moment the date changes.
- **Decision:** `lib/snapshot.ts` returns an ISO time inside `'use cache'` with revalidate 15 min / expire 1 day. Client components receive it as their initial value via `useSyncExternalStore`'s server snapshot, then tick live.
- **Consequences:** No hydration mismatch; the HTML/OG image is ≤ ~15 min stale; client UI is exact to the second.

### ADR-003 — Typed TS content instead of JSON + runtime validation (Phase 1)
2026-09-26 · accepted
- **Context:** History content is authored by us, not fetched.
- **Decision:** `content/**/*.ts` with strict types. zod only enters in Phase 2 for *external* data.
- **Consequences:** Compile-time validation, fewer deps.

### ADR-004 — GSAP (not Framer Motion) as the primary motion engine
2026-09-26 · accepted
- **Context:** Reference sites rely on scroll-driven, timeline-style animation.
- **Decision:** GSAP + ScrollTrigger + SplitText (free since 3.13), `@gsap/react` for lifecycle-safe hooks. Lenis for smooth scroll bridged to GSAP's ticker.
- **Consequences:** One mental model for all motion; best-in-class scroll tooling.

### ADR-005 — Initial hidden states set by JS, not CSS
2026-09-26 · accepted
- **Decision:** Use `gsap.from()` so content is visible without JS and for reduced motion.
- **Consequences:** Possible flash-of-visible-content before hydration on slow devices; mitigated by animating only elements below the fold with ScrollTrigger, and hero intro starting immediately on hydration.

### ADR-006 — `plan/` is committed (revised)
2026-09-26 · superseded original "gitignored" decision (owner's call)
- **Context:** Initially gitignored; that left the plan with no backup.
- **Decision:** Commit `plan/` with the code.
- **Consequences:** Versioned and backed up. If the repo is public, the plan is public — keep secrets and private notes out of it.

### ADR-007 — No SplitText on React-rendered live text
2026-09-26 · accepted
- **Context:** SplitText rewrites DOM text nodes. The hero re-renders every second (countdown) and changes copy at phase boundaries; React would then write into detached nodes.
- **Decision:** Hero lines are separate elements animated with an overflow mask (`yPercent`). SplitText reserved for static server-rendered headings (Phase 3).

### ADR-008 — Hero wording is one pure function reused everywhere
2026-09-26 · accepted
- **Decision:** `getHeroCopy(state)` drives the hero, `<title>` and the OG image, so they can never disagree.

### ADR-009 — Intro gated by a pre-paint inline script
2026-09-26 · accepted
- **Context:** The intro overlay must cover the hero from first paint (no flash), yet must never appear without JS, on repeat visits in a session, or for reduced motion.
- **Decision:** `IntroGateScript` in `<head>` adds `js` and optionally `intro-skip` to `<html>`; CSS shows `.intro` only for `html.js:not(.intro-skip)`; a 6s CSS failsafe hides it if JS stalls. `<html suppressHydrationWarning>`.

### ADR-010 — Scroll scene and intro animate different elements
2026-09-26 · accepted
- **Decision:** `data-hero=*` elements get intro tweens; `data-scroll=*` wrappers get scrubbed scroll tweens. Never both on one node, so recorded start values can't conflict.

### ADR-011 — Gentle motion + opt-in, not "reduced = none"
2026-09-26 · accepted (supersedes the all-or-nothing reduced-motion handling)
- **Context:** The owner tested on their phone and saw no animation at all. Many people have "Reduce Motion" / "Remove animations" enabled (sometimes via battery-saver modes) without knowing, and a celebration site that is completely still looks broken.
- **Decision:** Two levels, `full` and `gentle`. The OS setting chooses `gentle` by default: vestibular triggers (pinning, zoom, parallax, smooth scroll, marquees, large travel) are removed, soft fades and counting are kept. The visitor can override this in either direction (header toggle + one-time notice), and it persists in `localStorage`. Recording mode forces `full`. The inline gate script mirrors `resolveMotionLevel`, and a test runs the real script against it for every combination.
- **Consequences:** The OS preference is respected by default and the full experience is one tap away. Toggling reloads the page, so no animation has to handle a live switch.
