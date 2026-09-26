# 02 — Evergreen Content Model

The core idea: **classify every piece of content by how it stays correct.**

| Class | Examples | Mechanism | Human effort |
|---|---|---|---|
| **A. Derived** | anniversary number, ordinal ("66th"), year, countdown, days since independence, celebration mode, milestone jubilees | Pure functions of *now* in `Africa/Lagos` time → `lib/anniversary/` | None, ever |
| **B. Immutable history** | 1914 amalgamation, 1960 independence, 1963 republic, state creation, 1999 Fourth Republic… | Typed, sourced content in `content/` | Once (+ fact-check) |
| **C. Live structured data** (Phase 2) | current & past heads of state, population, GDP, life expectancy | Wikidata SPARQL + World Bank API, cached, validated, with committed fallback snapshots | None (alerts on failure) |
| **D. Editorial** (optional) | official yearly theme, notable events of the past year | Optional `content/years/{year}.ts`; **section hides if absent** | Optional, ~10 min/yr |

## Class A — the rules (implemented in `lib/anniversary/`)

- Independence instant: **1960-10-01T00:00:00+01:00** (midnight WAT). WAT is UTC+1, no DST → fixed offset is correct and deterministic.
- All calendar reasoning is done in **Lagos time**, never the viewer's local time (a diaspora visitor in LA must see the same "today").
- `anniversaryNumber(year) = year − 1960` (2026 → 66).
- **Phases** of the calendar year (Lagos time):
  - `celebration` — the whole of 1 October.
  - `approaching` — 30 days before 1 Oct.
  - `afterglow` — 2 Oct → 31 Oct (still "Nigeria at N").
  - `year-round` — everything else.
- **Age** = completed years (before 1 Oct 2026 Nigeria is 65; from 1 Oct it is 66).
- **Next celebration** = this year's 1 Oct if not yet passed, else next year's. On 1 Oct itself the "next" is today (countdown shows zero / celebration UI).
- **Ordinals**: 1st 2nd 3rd 4th… 11th 12th 13th… 21st 22nd 23rd… 111th 112th 113th.
- **Milestones**: 25 Silver Jubilee, 40 Ruby, 50 Golden Jubilee, 60 Diamond Jubilee, 70 Platinum Jubilee, 100 Centenary; other multiples of 5 are "landmark" years. Next named milestones: **70th (2030)**, **100th (2060)**.

## How "now" reaches the page (see ADR-002)
- The server renders with a **cached snapshot time** (`'use cache'`, revalidate 15 min), so the static page is at most ~15 minutes stale.
- Client components (countdown, hero) take the server time as the initial value (no hydration mismatch) and switch to the **live clock** after hydration. So at 00:00:00 WAT on 1 Oct the page flips to celebration mode *live*, no reload needed.

## Class B — rules
- Lives in `content/history/*.ts` as typed arrays (TypeScript gives validation for free).
- Every entry has `sources: { label, url }[]` (min 1).
- Every entry must also appear in [08-fact-register.md](08-fact-register.md) with a verification status.
- The timeline's last node ("Today — Nigeria at N") is **derived**, so the timeline always reaches the current year.

## Class D — rules
- `content/years/2026.ts` etc. Shape: `{ theme?: string; themeSource?: Source; highlights?: Event[] }`.
- Missing file ⇒ section not rendered. Never show a previous year's theme as current.
