"use client";

import { useMemo, useRef } from "react";
import { CountUp } from "@/components/motion/count-up.client";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { onIntroDone } from "@/components/motion/intro-signal";
import { useNow } from "@/hooks/use-now";
import { getAnniversaryState } from "@/lib/anniversary";
import { Countdown } from "./countdown";
import { getHeroCopy } from "./hero-copy";

/**
 * The live part of the hero: phase-aware headline, big number, countdown.
 * `data-hero` = intro animation targets; `data-scroll` = scroll-scene wrappers
 * (kept on separate elements so the two never fight over the same props).
 */
export function HeroHeadline({ serverNow }: { serverNow: string }) {
  const now = useNow(serverNow);
  const state = useMemo(() => getAnniversaryState(new Date(now)), [now]);
  const copy = getHeroCopy(state);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const intro = gsap
          .timeline({ paused: true, defaults: { ease: "expo.out", duration: 1.4 } })
          .from("[data-hero=fade]", { autoAlpha: 0, y: 16, duration: 1 })
          .from("[data-hero=rise]", { yPercent: 110, stagger: 0.12 }, "<0.1")
          .from("[data-hero=sub]", { autoAlpha: 0, y: 24, duration: 1 }, "<0.5")
          .from("[data-hero=cell]", { autoAlpha: 0, y: 32, stagger: 0.08, duration: 1 }, "<0.2");
        return onIntroDone(() => intro.play());
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [] },
  );

  return (
    <div ref={root} className="relative z-10 flex flex-col items-start">
      <div data-scroll="top">
        <p data-hero="fade" className="eyebrow">
          {copy.eyebrow}
        </p>
        <span aria-hidden className="mt-6 block overflow-hidden pb-2">
          <span data-hero="rise" className="block font-display text-4xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl">
            {copy.lead}
          </span>
        </span>
      </div>

      <h1 className="sr-only">{`${copy.lead} ${copy.number}${copy.suffix} ${copy.trail}`.trim()}</h1>

      <div data-scroll="number" aria-hidden className="origin-left overflow-hidden">
        <span data-hero="rise" className="hero-number block font-display font-extrabold tracking-tighter">
          <CountUp value={copy.number} delay={0.3} />
          {copy.suffix && <span className="hero-number__suffix">{copy.suffix}</span>}
        </span>
      </div>

      <div data-scroll="bottom">
        {copy.trail && (
          <span aria-hidden className="block overflow-hidden pt-2">
            <span data-hero="rise" className="block font-display text-4xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl">
              {copy.trail}
            </span>
          </span>
        )}
        <p data-hero="sub" className="mt-8 max-w-xl text-lg leading-relaxed text-snow/75 sm:text-xl">
          {copy.subtitle}
        </p>
        {copy.showCountdown && (
          <div className="mt-10">
            <Countdown parts={state.countdown} label={`${state.countdown.days} days until 1 October ${state.next.year}`} />
          </div>
        )}
      </div>
    </div>
  );
}
