import type { AnniversaryState } from "@/lib/anniversary";

/** The derived final node, so the timeline always reaches the present year. */
export function TimelineToday({ state, year }: { state: AnniversaryState; year: number }) {
  return (
    <li data-timeline-item className="timeline-item timeline-item--today relative pl-10 sm:pl-16">
      <span aria-hidden className="timeline-item__dot" />
      <p data-timeline-year className="font-display text-6xl font-bold tracking-tight text-snow sm:text-8xl lg:text-9xl">{year}</p>
      <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Nigeria at {state.age}</h3>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-snow/75">
        {state.age} years on, the story is still being written, and the {state.next.ordinal} anniversary arrives on 1
        October {state.next.year}.
      </p>
    </li>
  );
}
