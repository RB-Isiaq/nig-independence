"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

/**
 * Draws the vertical line as you scroll, reveals each item, parallaxes the
 * years and highlights the item being read.
 * The line is fully drawn by default (no-JS / reduced motion).
 */
export function TimelineTrack({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".timeline-line__fill", {
          scaleY: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 60%", scrub: 0.6 },
        });

        gsap.utils.toArray<HTMLElement>("[data-timeline-item]").forEach((item) => {
          gsap.from(item, {
            autoAlpha: 0,
            x: 60,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%", once: true },
          });
          // Years travel slower than the text for depth.
          gsap.fromTo(
            item.querySelector("[data-timeline-year]"),
            { yPercent: 35 },
            { yPercent: -35, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true } },
          );
          // Light the dot while the item is the one being read.
          ScrollTrigger.create({ trigger: item, start: "top 60%", end: "bottom 60%", toggleClass: "is-active" });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <div aria-hidden className="timeline-line">
        <div className="timeline-line__fill" />
      </div>
      {children}
    </div>
  );
}
