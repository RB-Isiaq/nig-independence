"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, withMotion } from "@/components/motion/gsap";

/**
 * Pins the hero and scrubs a scroll scene: copy lifts away, the big number
 * swells to fill the screen and the flag drifts to centre stage.
 * Full motion only: pinning and zooming are vestibular triggers.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      return withMotion({
        full: () => {
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: { trigger: root.current, start: "top top", end: "+=110%", pin: true, scrub: 0.8 },
            })
            .to("[data-scroll=top]", { yPercent: -120, autoAlpha: 0, duration: 0.35 }, 0)
            .to("[data-scroll=bottom]", { y: 120, autoAlpha: 0, duration: 0.35 }, 0)
            .to("[data-scroll=number]", { scale: 5.5, xPercent: 60, duration: 1 }, 0)
            // Fade early so the growing number becomes a faint watermark, not a grey veil.
            .to("[data-scroll=number]", { autoAlpha: 0.07, duration: 0.3 }, 0.05)
            .to(".hero__flag", { xPercent: -35, scale: 1.25, rotate: -4, opacity: 1, duration: 1 }, 0)
            .to(".hero__glow", { scale: 1.4, duration: 1 }, 0);
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Independence Day"
      className="hero relative isolate flex min-h-svh items-center overflow-hidden pb-24 pt-32"
    >
      {children}
    </section>
  );
}
