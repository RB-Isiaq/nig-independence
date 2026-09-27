"use client";

import { useNow } from "@/hooks/use-now";
import { getAnniversaryState } from "@/lib/anniversary";
import { toLagosDate } from "@/lib/time/lagos";
import { getTodayCopy } from "./today-copy";

/**
 * The derived final entry, so the timeline always reaches the present. Uses the
 * live clock (like the hero), so it flips exactly at midnight and follows
 * recording mode's `&date=` preview.
 */
export function TimelineToday({ serverNow }: { serverNow: string }) {
  const now = new Date(useNow(serverNow));
  const copy = getTodayCopy(getAnniversaryState(now));

  return (
    <li data-timeline-item className="timeline-item timeline-item--today relative pl-10 sm:pl-16">
      <span aria-hidden className="timeline-item__dot" />
      <p data-timeline-year className="font-display text-6xl font-bold tracking-tight text-snow sm:text-8xl lg:text-9xl">
        {toLagosDate(now).year}
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{copy.title}</h3>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-snow/75">{copy.body}</p>
    </li>
  );
}
