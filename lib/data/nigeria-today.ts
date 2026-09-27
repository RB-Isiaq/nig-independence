import { cacheLife, cacheTag } from "next/cache";
import type { DataSnapshot } from "@/lib/sources/snapshot";
import snapshotJson from "@/lib/sources/snapshot.json";
import { fetchCurrentHeadOfState, type HeadOfState } from "@/lib/sources/wikidata";
import { fetchThenAndNow, INDICATORS, type IndicatorKey, type ThenAndNow } from "@/lib/sources/worldbank";

const snapshot = snapshotJson as DataSnapshot;

/**
 * Live World Bank figures, refreshed weekly. Each indicator falls back to the
 * committed snapshot on its own if the API is down or the data fails checks.
 */
export async function getThenAndNow(): Promise<ThenAndNow[]> {
  "use cache";
  cacheLife("weeks");
  cacheTag("worldbank");

  const keys = Object.keys(INDICATORS) as IndicatorKey[];
  const results = await Promise.allSettled(keys.map((key) => fetchThenAndNow(key)));
  return results.map((result, i) => {
    if (result.status === "fulfilled") return result.value;
    console.warn(`[nigeria-today] World Bank ${keys[i]} failed, using snapshot:`, result.reason);
    return snapshot.indicators.find((s) => s.key === keys[i])!;
  });
}

/** The current head of state from Wikidata, refreshed daily, with snapshot fallback. */
export async function getHeadOfState(): Promise<HeadOfState> {
  "use cache";
  cacheLife("days");
  cacheTag("wikidata");

  try {
    return await fetchCurrentHeadOfState();
  } catch (error) {
    console.warn("[nigeria-today] Wikidata failed, using snapshot:", error);
    return snapshot.headOfState;
  }
}
