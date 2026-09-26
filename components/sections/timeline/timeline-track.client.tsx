"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, withMotion } from "@/components/motion/gsap";

/**
 * Draws the vertical line as you scroll, reveals each item, parallaxes the
 * years and highlights the item being read.
 * Gentle mode: items fade in, the line is simply drawn, no parallax.
 */
export function TimelineTrack({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = () => gsap.utils.toArray<HTMLElement>("[data-timeline-item]");
      // Light the dot while the item is the one being read (a colour change, fine in both modes).
      const highlight = (item: HTMLElement) =>
        ScrollTrigger.create({ trigger: item, start: "top 60%", end: "bottom 60%", toggleClass: "is-active" });

      return withMotion({
        full: () => {
          gsap.from(".timeline-line__fill", {
            scaleY: 0,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 60%", scrub: 0.6 },
          });
          items().forEach((item) => {
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
              {
                yPercent: -35,
                ease: "none",
                scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
            highlight(item);
          });
        },
        gentle: () => {
          items().forEach((item) => {
            gsap.from(item, {
              autoAlpha: 0,
              duration: 0.8,
              scrollTrigger: { trigger: item, start: "top 85%", once: true },
            });
            highlight(item);
          });
        },
      });
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
