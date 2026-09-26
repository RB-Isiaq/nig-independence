"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, withMotion } from "@/components/motion/gsap";

interface MottoBandProps {
  phrases: readonly string[];
  /** Scroll direction of the band. */
  reverse?: boolean;
}

const REPEATS = 4;

/**
 * Giant marquee that drifts on its own, then speeds up and leans in with
 * scroll velocity. Full motion only; static (but legible) in gentle mode.
 */
export function MottoBand({ phrases, reverse = false }: MottoBandProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      return withMotion({
        full: () => {
          // Track holds REPEATS copies; looping by one copy's width is seamless.
          const loop = gsap.fromTo(
            ".motto-band__track",
            { xPercent: reverse ? -100 / REPEATS : 0 },
            { xPercent: reverse ? 0 : -100 / REPEATS, duration: 24, ease: "none", repeat: -1 },
          );
          const skewTo = gsap.quickTo(".motto-band__track", "skewX", { duration: 0.5, ease: "power3" });

          ScrollTrigger.create({
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const velocity = self.getVelocity();
              const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(velocity) / 400);
              gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
              skewTo(gsap.utils.clamp(-12, 12, velocity / -200));
            },
            onLeave: () => loop.pause(),
            onEnterBack: () => loop.play(),
            onLeaveBack: () => loop.pause(),
            onEnter: () => loop.play(),
          });

          // Ease back to cruising speed when scrolling stops.
          const settle = () => {
            gsap.to(loop, { timeScale: 1, duration: 1.2, ease: "power2.out" });
            skewTo(0);
          };
          ScrollTrigger.addEventListener("scrollEnd", settle);
          return () => ScrollTrigger.removeEventListener("scrollEnd", settle);
        },
      });
    },
    { scope: root },
  );

  const sequence = phrases.join(" · ") + " · ";

  return (
    <div ref={root} aria-hidden className="motto-band">
      <div className="motto-band__track">
        {Array.from({ length: REPEATS }, (_, i) => (
          <span key={i} className="motto-band__item">
            {sequence}
          </span>
        ))}
      </div>
    </div>
  );
}
