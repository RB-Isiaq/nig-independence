import { Reveal } from "@/components/motion/reveal.client";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getHeadOfState, getThenAndNow } from "@/lib/data/nigeria-today";
import { HeadOfStateTile } from "./head-of-state-tile";
import { StatTile } from "./stat-tile";

/** "Nigeria today": four live figures, 1960 vs the latest year, with sources. */
export async function NigeriaToday() {
  const [stats, headOfState] = await Promise.all([getThenAndNow(), getHeadOfState()]);

  return (
    <section id="today" aria-labelledby="today-title" className="py-28 sm:py-36">
      <Container>
        <SectionHeading id="today-title" eyebrow="Nigeria today" title="Then and now." />
        <Reveal className="mt-14" stagger={{ selector: "[data-reveal]", each: 0.1 }}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatTile key={stat.key} stat={stat} />
            ))}
            <HeadOfStateTile person={headOfState} />
          </div>
        </Reveal>
        <p className="mt-6 text-xs text-snow/45">
          Figures update automatically from the World Bank and Wikidata; each shows the latest year available.
        </p>
      </Container>
    </section>
  );
}
