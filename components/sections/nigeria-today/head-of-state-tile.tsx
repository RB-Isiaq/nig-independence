import { formatIsoDate } from "@/lib/format";
import type { HeadOfState } from "@/lib/sources/wikidata";

/** The current President (title and name from Wikidata), so it changes by itself after an election. */
export function HeadOfStateTile({ person }: { person: HeadOfState }) {
  return (
    <article data-reveal className="glass flex flex-col rounded-3xl p-6">
      <h3 className="eyebrow">{person.title}</h3>
      <p className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-balance">{person.name}</p>
      <p className="mt-2 text-sm text-snow/60">Since {formatIsoDate(person.since)}</p>
      <a
        href={person.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link mt-auto pt-6 text-xs uppercase tracking-[0.15em] text-snow/45"
      >
        Wikidata
      </a>
    </article>
  );
}
