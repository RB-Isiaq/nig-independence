import type { HistoryEvent } from "@/content/types";
import { formatHistoricDate } from "@/lib/format";

export function TimelineItem({ event }: { event: HistoryEvent }) {
  return (
    <li data-timeline-item className="timeline-item relative pl-10 sm:pl-16">
      <span aria-hidden className="timeline-item__dot" />
      <p data-timeline-year className="font-display text-6xl font-bold tracking-tight text-nigeria-bright sm:text-8xl lg:text-9xl">
        {event.date.year}
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{event.title}</h3>
      <p className="mt-1 text-sm uppercase tracking-[0.15em] text-snow/50">
        <time>{formatHistoricDate(event.date)}</time>
      </p>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-snow/75">{event.summary}</p>
      <p className="mt-3 text-sm text-snow/50">
        Source:{" "}
        {event.sources.map((source, i) => (
          <span key={source.url}>
            {i > 0 && " · "}
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="link">
              {source.label}
            </a>
          </span>
        ))}
      </p>
    </li>
  );
}
