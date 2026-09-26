# Nigeria Independence — Project Plan

> Planning folder, committed with the code. This is the single source of truth for
> *why* and *what*; the code is the source of truth for *how*.
> If you're picking this up cold (human or AI), read these in order.

| # | Doc | What it answers |
|---|-----|-----------------|
| 01 | [Vision](01-vision.md) | What we're building and for whom |
| 02 | [Evergreen content model](02-evergreen-content-model.md) | How the site stays correct every year with near-zero maintenance |
| 03 | [Architecture](03-architecture.md) | Folder structure, rendering & caching strategy, conventions |
| 04 | [Design & motion](04-design-and-motion.md) | Visual language, animation stack, performance & a11y budgets |
| 05 | [Data sources](05-data-sources.md) | External APIs (phase 2+) and their failure modes |
| 06 | [Roadmap](06-roadmap.md) | Phases with checklists — **update as you go** |
| 07 | [Decisions (ADR log)](07-decisions.md) | Every non-obvious decision and why |
| 08 | [Fact register](08-fact-register.md) | Every historical claim on the site + source + verification status |
| 09 | [Yearly runbook](09-yearly-runbook.md) | The (short) list of things a human may do each year |
| 10 | [Progress log](10-progress-log.md) | Dated log of what was done, what's next |
| 11 | [Sprint to 1 Oct](11-sprint-to-oct-1.md) | Day-by-day plan to ship Phases 2–4 before launch |

## Quick status

- **Current phase:** Phase 1 done → sprint to 1 Oct, see [11-sprint-to-oct-1.md](11-sprint-to-oct-1.md)
- **Code freeze:** Wed 30 Sep 2026, 12:00 WAT
- **Next anniversary:** 1 Oct 2026 → **66th**
- **Stack:** Next.js 16 (App Router, Cache Components), React 19, Tailwind v4, GSAP, Lenis, Vitest

## Ground rules

1. **Never hardcode anything that changes with time** (anniversary number, year, "current president", stats). Derive it or fetch it.
2. **Every fact has a source.** If it's not in the [fact register](08-fact-register.md), it doesn't ship.
3. **Small files, single responsibility.** A section = a folder. Logic lives in `lib/`, content in `content/`, presentation in `components/`.
4. **Motion is progressive enhancement.** The page must be complete and readable with JS disabled or `prefers-reduced-motion`.
5. **Log decisions** in [07-decisions.md](07-decisions.md) and progress in [10-progress-log.md](10-progress-log.md).
