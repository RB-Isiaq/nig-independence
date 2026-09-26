import { Reveal } from "@/components/motion/reveal.client";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ElapsedClock } from "./elapsed-clock.client";

export function IndependenceClock({ serverNow }: { serverNow: string }) {
  return (
    <section id="clock" aria-labelledby="clock-title" className="py-28 sm:py-36">
      <Container>
        <SectionHeading
          id="clock-title"
          eyebrow="The independence clock"
          title="Every second since midnight, 1 October 1960."
          intro="Counted live in West Africa Time, from the moment the Union Jack was lowered in Lagos."
        />
        <Reveal className="mt-14" stagger={{ selector: "[data-reveal]", each: 0.1 }}>
          <ElapsedClock serverNow={serverNow} />
        </Reveal>
      </Container>
    </section>
  );
}
