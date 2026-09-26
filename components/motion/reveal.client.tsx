"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Animate these descendants in sequence instead of the wrapper itself. */
  stagger?: { selector: string; each?: number };
  /** Vertical travel in px. */
  y?: number;
  delay?: number;
}

/**
 * Fades and lifts content in as it scrolls into view. Content is visible by
 * default (no-JS / reduced motion); the hidden start state is applied by GSAP.
 */
export function Reveal({ children, className, stagger, y = 48, delay = 0 }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = stagger ? el.querySelectorAll(stagger.selector) : el;
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          stagger: stagger?.each ?? 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
