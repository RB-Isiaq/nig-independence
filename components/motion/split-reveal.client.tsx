"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "./gsap";

interface SplitRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * An <h2> whose lines rise out of a mask as it scrolls into view.
 * Only for static text: SplitText rewrites DOM nodes (plan ADR-007).
 */
export function SplitReveal({ children, className, id }: SplitRevealProps) {
  const el = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
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
              scrollTrigger: { trigger: el.current, start: "top 85%", once: true },
            }),
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: el },
  );

  return (
    <h2 ref={el} id={id} className={className}>
      {children}
    </h2>
  );
}
