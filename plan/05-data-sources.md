# 05 — Data Sources (Phase 2+)

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
