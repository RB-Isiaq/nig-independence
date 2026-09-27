import type { HeadOfState } from "./wikidata";
import type { ThenAndNow } from "./worldbank";

/** Shape of lib/sources/snapshot.json, written by `npm run data:refresh`. */
export interface DataSnapshot {
  fetchedAt: string;
  indicators: ThenAndNow[];
  headOfState: HeadOfState;
}
