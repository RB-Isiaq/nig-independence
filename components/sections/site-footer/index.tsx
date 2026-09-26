import { Container } from "@/components/ui/container";
import { TIMELINE } from "@/content/history/timeline";
import { SITE } from "@/content/site";
import type { HistoryImage, Source } from "@/content/types";
import { toLagosDate } from "@/lib/time/lagos";

function uniqueSources(): Source[] {
  const byUrl = new Map<string, Source>();
  for (const event of TIMELINE) for (const s of event.sources) byUrl.set(s.url, s);
  return [...byUrl.values()].sort((a, b) => a.label.localeCompare(b.label));
}

function imageCredits(): (HistoryImage & { title: string })[] {
  return TIMELINE.flatMap((e) => (e.image ? [{ ...e.image, title: `${e.date.year} · ${e.title}` }] : []));
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function SiteFooter({ serverNow }: { serverNow: string }) {
  const sources = uniqueSources();
  const credits = imageCredits();
  const year = toLagosDate(new Date(serverNow)).year;

  return (
    <footer className="border-t border-snow/10 py-20">
      <Container>
        <p className="font-display text-3xl font-bold">{SITE.motto}.</p>
        <p className="mt-4 max-w-2xl text-snow/60">
          Dates and countdowns are calculated in West Africa Time (WAT) and update automatically every year. Every
          historical claim links to a source.
        </p>

        <div className="mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          <details>
            <summary className="cursor-pointer text-sm uppercase tracking-[0.2em] text-snow/70">
              Sources ({sources.length})
            </summary>
            <ul className="mt-4 space-y-2 text-sm text-snow/60">
              {sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} {...external} className="link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <details>
            <summary className="cursor-pointer text-sm uppercase tracking-[0.2em] text-snow/70">
              Photo credits ({credits.length})
            </summary>
            <ul className="mt-4 space-y-2 text-sm text-snow/60">
              {credits.map(({ title, credit }) => (
                <li key={credit.sourceUrl}>
                  {title}:{" "}
                  <a href={credit.sourceUrl} {...external} className="link">
                    {credit.author}
                  </a>
                  {", "}
                  {credit.licenseUrl ? (
                    <a href={credit.licenseUrl} {...external} rel="noopener noreferrer license" className="link">
                      {credit.license}
                    </a>
                  ) : (
                    credit.license
                  )}
                  , via Wikimedia Commons
                </li>
              ))}
            </ul>
          </details>
        </div>

        <p className="mt-14 text-sm text-snow/45">
          © {year} {SITE.owner}. All rights reserved. Photos remain the property of their credited authors.
        </p>
      </Container>
    </footer>
  );
}
