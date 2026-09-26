import type { HistoryEvent } from "@/content/types";
import { formatHistoricDate } from "@/lib/format";
import { TimelineMedia, TimelineMediaPlaceholder } from "./timeline-media";

/** One moment: big year, title, one line, and a photo. Alternates sides on desktop. */
export function TimelineItem({ event, index }: { event: HistoryEvent; index: number }) {
  const [source] = event.sources;

  return (
    <li data-timeline-item className="timeline-item relative pl-10 sm:pl-16">
      <span aria-hidden className="timeline-item__dot" />
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <div data-timeline-text className={index % 2 === 1 ? "md:order-2" : undefined}>
          <p data-timeline-year className="font-display text-6xl font-bold tracking-tight text-nigeria-bright sm:text-8xl">
            {event.date.year}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{event.title}</h3>
          <p className="mt-3 max-w-md text-lg leading-relaxed text-snow/75">{event.summary}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.15em] text-snow/45">
            <time>{formatHistoricDate(event.date)}</time>
            {event.until && <> – <time>{formatHistoricDate(event.until)}</time></>}
            {" · "}
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="link" title={source.label}>
              Source
            </a>
          </p>
        </div>
        {event.image ? (
          <TimelineMedia image={event.image} />
        ) : (
          <TimelineMediaPlaceholder
            label={event.until ? `${event.date.year} – ${event.until.year}` : String(event.date.year)}
          />
        )}
      </div>
    </li>
  );
}
