import { z } from "zod";
import { fetchJson, type JsonFetcher } from "./http";

/** World Bank indicators shown on the site, with plausibility bounds for sanity checks. */
export const INDICATORS = {
  population: { code: "SP.POP.TOTL", min: 1e7, max: 1e9 },
  lifeExpectancy: { code: "SP.DYN.LE00.IN", min: 20, max: 100 },
  urbanShare: { code: "SP.URB.TOTL.IN.ZS", min: 0, max: 100 },
} as const;

export type IndicatorKey = keyof typeof INDICATORS;

export interface DataPoint {
  year: number;
  value: number;
}

export interface ThenAndNow {
  key: IndicatorKey;
  code: string;
  /** Official indicator name from the World Bank. */
  label: string;
  /** 1960 if available, else the earliest year. */
  then: DataPoint;
  /** The most recent year with data. */
  now: DataPoint;
  sourceUrl: string;
}

const Row = z.object({
  indicator: z.object({ id: z.string(), value: z.string() }),
  date: z.string().regex(/^\d{4}$/),
  value: z.number().nullable(),
});
// The API returns [pagination, rows] (or [message] on errors).
const Response = z.tuple([z.object({ page: z.number(), pages: z.number() }), z.array(Row)]);

const apiUrl = (code: string) => `https://api.worldbank.org/v2/country/NGA/indicator/${code}?format=json&per_page=200`;
export const indicatorPageUrl = (code: string) => `https://data.worldbank.org/indicator/${code}?locations=NG`;

/** Picks the 1960 (or earliest) and the latest non-empty values, and sanity-checks them. */
export function toThenAndNow(key: IndicatorKey, raw: unknown): ThenAndNow {
  const [, rows] = Response.parse(raw);
  const points = rows
    .filter((r): r is typeof r & { value: number } => r.value !== null)
    .map((r) => ({ year: Number(r.date), value: r.value }))
    .sort((a, b) => a.year - b.year);
  if (points.length < 2) throw new Error(`${key}: not enough data points`);

  const { code, min, max } = INDICATORS[key];
  const then = points.find((p) => p.year === 1960) ?? points[0];
  const now = points[points.length - 1];
  for (const p of [then, now]) {
    if (!Number.isFinite(p.value) || p.value < min || p.value > max) {
      throw new Error(`${key}: implausible value ${p.value} for ${p.year}`);
    }
  }
  if (now.year <= then.year) throw new Error(`${key}: latest year ${now.year} is not after ${then.year}`);

  return { key, code, label: rows[0].indicator.value, then, now, sourceUrl: indicatorPageUrl(code) };
}

export async function fetchThenAndNow(key: IndicatorKey, get: JsonFetcher = fetchJson): Promise<ThenAndNow> {
  return toThenAndNow(key, await get(apiUrl(INDICATORS[key].code)));
}
