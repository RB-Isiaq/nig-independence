"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "./gsap";
import { onIntroDone } from "./intro-signal";

interface CountUpProps {
  value: number;
  className?: string;
  duration?: number;
  delay?: number;
}

/**
 * Renders the final number on the server (correct without JS), then counts up
 * from zero once the intro has finished. Later value changes (e.g. at midnight) snap.
 */
export function CountUp({ value, className, duration = 2.2, delay = 0 }: CountUpProps) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Mutate React's own text node (not textContent) so React can still update it.
      const text = el.current?.firstChild;
      if (!text || text.nodeType !== Node.TEXT_NODE) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const counter = { n: 0 };
        text.nodeValue = "0";
        const tween = gsap.to(counter, {
          paused: true,
          n: value,
          duration,
          delay,
          ease: "expo.out",
          onUpdate: () => {
            text.nodeValue = String(Math.round(counter.n));
          },
        });
        const unsubscribe = onIntroDone(() => tween.play());
        return () => {
          unsubscribe();
          text.nodeValue = String(value);
        };
      });
      return () => mm.revert();
    },
    // Intro only: re-running on value change would replay the count.
    { scope: el, dependencies: [] },
  );

  return (
    <span ref={el} className={className}>
      {value}
    </span>
  );
}
