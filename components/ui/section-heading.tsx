import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal.client";
import { SplitReveal } from "@/components/motion/split-reveal.client";

interface SectionHeadingProps {
  eyebrow: ReactNode;
  title: string;
  intro?: ReactNode;
  id?: string;
}

export function SectionHeading({ eyebrow, title, intro, id }: SectionHeadingProps) {
  return (
    <header className="max-w-4xl">
      <Reveal y={16}>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <SplitReveal
        id={id}
        className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight text-balance sm:text-7xl lg:text-8xl"
      >
        {title}
      </SplitReveal>
      {intro && (
        <Reveal y={24} delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-snow/70">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
