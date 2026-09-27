# 05 — Data Sources (live since 27 Sep 2026)

| Data | Source | Endpoint / query | Refresh | Notes |
|---|---|---|---|---|
| Heads of state (P35) & government (P6) of Nigeria (Q1033) with start/end | Wikidata | `https://query.wikidata.org/sparql` | `cacheLife('days')` | Must send a descriptive `User-Agent`. Risk: vandalism → sanity checks |
| Portraits | Wikimedia Commons (P18) | via Wikidata | days | Show licence/credit |
| Population `SP.POP.TOTL` | World Bank | `https://api.worldbank.org/v2/country/NGA/indicator/SP.POP.TOTL?format=json&per_page=100` | weeks | Lags 1–2 years; always show year |
| GDP current US$ `NY.GDP.MKTP.CD` | World Bank | same pattern | weeks | 2014 rebasing jump — annotate |
| Life expectancy `SP.DYN.LE00.IN` | World Bank | same | weeks | |
| Urban population % `SP.URB.TOTL.IN.ZS` | World Bank | same | weeks | |

## Reliability rules
1. Fetch → validate (zod) → sanity-check → render.
2. On any failure, use `lib/fallback/*.json` (committed snapshot) and log.
3. `scripts/refresh-snapshots.ts` refreshes fallbacks; run in CI weekly; CI fails if validation fails.
4. Sanity checks, e.g. population must be within ±10% of previous value; leader must have a start date; exactly one current head of state.
5. UI always shows "Source · as of {year}".

## As built (27 Sep 2026)
- Code: `lib/sources/{http,worldbank,wikidata}.ts` (pure, fetcher injectable, zod + plausibility checks), cached in `lib/data/nigeria-today.ts` (`'use cache'`: World Bank `weeks` + tag `worldbank`, Wikidata `days` + tag `wikidata`).
- Fallback: `lib/sources/snapshot.json`, used per source when live fetch or validation fails (logs `[nigeria-today] … using snapshot`). Refresh with `npm run data:refresh`; it fails loudly on bad data, and a test checks the committed snapshot.
- Shown: population (SP.POP.TOTL), life expectancy (SP.DYN.LE00.IN), urban share (SP.URB.TOTL.IN.ZS), and the current head of state (the single P35 statement with a start date and no end date).
- Not used: the Wikidata P35 history (only 5 statements, incomplete), so there is no leaders gallery; GDP (2014 rebasing makes a 1960 comparison misleading).
- Note: the default `'use cache'` handler is in-memory, so on serverless the sources may be re-queried when the page regenerates (at most every ~15 min). That's fine for these free APIs; consider `'use cache: remote'` if traffic grows.
