import { Container } from "@/components/ui/container";
import { TIMELINE } from "@/content/history/timeline";
import { SITE } from "@/content/site";
import type { Source } from "@/content/types";

function uniqueSources(): Source[] {
  const byUrl = new Map<string, Source>();
  for (const event of TIMELINE) for (const s of event.sources) byUrl.set(s.url, s);
  return [...byUrl.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function SiteFooter() {
  const sources = uniqueSources();

  return (
    <footer className="border-t border-snow/10 py-20">
      <Container>
        <p className="font-display text-3xl font-bold">{SITE.motto}.</p>
        <p className="mt-4 max-w-2xl text-snow/60">
          All dates and countdowns are calculated in West Africa Time (WAT, UTC+1) and update automatically every year.
          Every historical claim on this page links to a source.
        </p>

        <details className="mt-10 max-w-3xl">
          <summary className="cursor-pointer text-sm uppercase tracking-[0.2em] text-snow/70">
            Sources ({sources.length})
          </summary>
          <ul className="mt-4 grid gap-2 text-sm text-snow/60 sm:grid-cols-2">
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </Container>
    </footer>
  );
}
