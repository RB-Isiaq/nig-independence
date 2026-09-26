"use client";

import { useRef } from "react";
import { gsap, useGSAP, withMotion } from "./gsap";

/**
 * A thin green-white-green bar across the top that fills as you scroll.
 * It only tracks the viewer's own scrolling, so gentle mode keeps it.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const progress = () => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
      );
    };
    return withMotion({ full: progress, gentle: progress });
  });

  return <div ref={bar} aria-hidden className="scroll-progress" />;
}
