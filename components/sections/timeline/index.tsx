import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ERAS } from "@/content/history/eras";
import { TIMELINE } from "@/content/history/timeline";
import type { EraId, HistoryEvent } from "@/content/types";
import { CurrentYear } from "@/components/ui/current-year.client";
import { TimelineItem } from "./timeline-item";
import { TimelineToday } from "./timeline-today.client";
import { TimelineTrack } from "./timeline-track.client";

function groupByEra(events: readonly HistoryEvent[]) {
  const groups = new Map<EraId, HistoryEvent[]>();
  for (const event of events) groups.set(event.era, [...(groups.get(event.era) ?? []), event]);
  return [...groups];
}

export function Timeline({ serverNow }: { serverNow: string }) {
  return (
    <section id="timeline" aria-labelledby="timeline-title" className="py-28 sm:py-36">
      <Container>
        <SectionHeading
          id="timeline-title"
          eyebrow={
            <>
              1914 – <CurrentYear serverNow={serverNow} />
            </>
          }
          title="The making of a nation."
          intro="Ten moments that shaped Nigeria."
        />

        <TimelineTrack>
          {groupByEra(TIMELINE).map(([eraId, events]) => (
            <div key={eraId} className="mt-24">
              <p className="eyebrow relative pl-10 sm:pl-16">
                {ERAS[eraId].label} <span className="text-snow/40">· {ERAS[eraId].span}</span>
              </p>
              <ol className="mt-10 space-y-24 sm:space-y-32">
                {events.map((event) => (
                  <TimelineItem key={event.id} event={event} index={TIMELINE.indexOf(event)} />
                ))}
              </ol>
            </div>
          ))}
          <ol className="mt-20">
            <TimelineToday serverNow={serverNow} />
          </ol>
        </TimelineTrack>
      </Container>
    </section>
  );
}
