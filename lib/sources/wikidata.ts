import { z } from "zod";
import { fetchJson, type JsonFetcher } from "./http";

export interface HeadOfState {
  /** The office's title, e.g. "President" (from Wikidata, so it follows any constitutional change). */
  title: string;
  name: string;
  /** Wikidata entity URL, e.g. https://www.wikidata.org/wiki/Q3510872 */
  sourceUrl: string;
  /** YYYY-MM-DD */
  since: string;
}

/**
 * Nigeria (Q1033) → head of state (P35) statements with start (P580) and end
 * (P582) dates, plus the office itself (P1906, "President of Nigeria").
 */
const QUERY = `SELECT ?person ?personLabel ?start ?end ?officeLabel WHERE {
  wd:Q1033 p:P35 ?statement. ?statement ps:P35 ?person.
  OPTIONAL { ?statement pq:P580 ?start } OPTIONAL { ?statement pq:P582 ?end }
  OPTIONAL { wd:Q1033 wdt:P1906 ?office }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`;

const Literal = z.object({ value: z.string() });
const Response = z.object({
  results: z.object({
    bindings: z.array(
      z.object({
        person: Literal,
        personLabel: Literal,
        start: Literal.optional(),
        end: Literal.optional(),
        officeLabel: Literal.optional(),
      }),
    ),
  }),
});

/**
 * The current head of state: the one statement with a start date and no end
 * date. Anything else (none, several, a bare Q-id as the name) is treated as
 * bad data so the site falls back to its last good snapshot.
 */
export function toCurrentHeadOfState(raw: unknown): HeadOfState {
  const current = Response.parse(raw).results.bindings.filter((b) => b.start && !b.end);
  if (current.length !== 1) throw new Error(`expected exactly one current head of state, got ${current.length}`);

  const [{ person, personLabel, start, officeLabel }] = current;
  const name = personLabel.value.trim();
  if (!name || /^Q\d+$/.test(name)) throw new Error(`head of state has no English label (${person.value})`);
  const since = start!.value.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(since) || Number(since.slice(0, 4)) < 1960) throw new Error(`bad start date ${since}`);

  return { title: toTitle(officeLabel?.value), name, since, sourceUrl: person.value.replace("/entity/", "/wiki/") };
}

/** "President of Nigeria" → "President". Falls back to "President" if Wikidata has no usable label. */
export function toTitle(officeLabel: string | undefined): string {
  const title = officeLabel?.replace(/\s+of\s+(the\s+)?(Federal Republic of\s+)?Nigeria$/i, "").trim();
  return title && !/^Q\d+$/.test(title) ? title : "President";
}

export async function fetchCurrentHeadOfState(get: JsonFetcher = fetchJson): Promise<HeadOfState> {
  const url = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(QUERY)}`;
  return toCurrentHeadOfState(await get(url, { headers: { Accept: "application/sparql-results+json" } }));
}
