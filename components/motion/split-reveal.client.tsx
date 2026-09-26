"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, withMotion } from "./gsap";

interface SplitRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * An <h2> whose words rise out of a line mask as it scrolls into view
 * (gentle mode: a simple fade). Only for static text: SplitText rewrites DOM
 * nodes (plan ADR-007).
 */
export function SplitReveal({ children, className, id }: SplitRevealProps) {
  const el = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const trigger = { trigger: el.current, start: "top 85%", once: true };
      return withMotion({
        full: () => {
          const split = SplitText.create(el.current!, {
            type: "lines,words",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.words, {
                yPercent: 110,
                rotate: 4,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.04,
                scrollTrigger: trigger,
              }),
          });
          return () => split.revert();
        },
        gentle: () => {
          gsap.from(el.current, { autoAlpha: 0, duration: 0.8, ease: "power2.out", scrollTrigger: trigger });
        },
      });
    },
    { scope: el },
  );

  return (
    <h2 ref={el} id={id} className={className}>
      {children}
    </h2>
  );
}
