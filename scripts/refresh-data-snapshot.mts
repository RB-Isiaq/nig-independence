/**
 * Refreshes the committed backup copy of the live data (lib/sources/snapshot.json).
 * The site only uses it when a live source is down or returns bad data.
 * Run: npm run data:refresh   (fails loudly if any source fails validation)
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { fetchCurrentHeadOfState } from "../lib/sources/wikidata";
import { fetchThenAndNow, INDICATORS, type IndicatorKey } from "../lib/sources/worldbank";
import type { DataSnapshot } from "../lib/sources/snapshot";

const keys = Object.keys(INDICATORS) as IndicatorKey[];
const [indicators, headOfState] = await Promise.all([
  Promise.all(keys.map((key) => fetchThenAndNow(key))),
  fetchCurrentHeadOfState(),
]);

const snapshot: DataSnapshot = { fetchedAt: new Date().toISOString(), indicators, headOfState };
const out = fileURLToPath(new URL("../lib/sources/snapshot.json", import.meta.url));
writeFileSync(out, JSON.stringify(snapshot, null, 2) + "\n");

console.log(`Wrote ${out}`);
for (const i of indicators) console.log(`  ${i.key}: ${i.then.value} (${i.then.year}) → ${i.now.value} (${i.now.year})`);
console.log(`  head of state: ${headOfState.name} since ${headOfState.since}`);
