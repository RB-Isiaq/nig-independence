"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, withMotion } from "./gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Animate these descendants in sequence instead of the wrapper itself. */
  stagger?: { selector: string; each?: number };
  /** Vertical travel in px (full motion only). */
  y?: number;
  delay?: number;
}

/**
 * Fades (and, with full motion, lifts) content in as it scrolls into view.
 * Content is visible by default (no-JS); the hidden start state is applied by GSAP.
 */
export function Reveal({ children, className, stagger, y = 48, delay = 0 }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const reveal = (travel: number) => () => {
        gsap.from(stagger ? el.querySelectorAll(stagger.selector) : el, {
          y: travel,
          autoAlpha: 0,
          duration: travel ? 1 : 0.8,
          delay,
          ease: "power3.out",
          stagger: stagger?.each ?? 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      };
      return withMotion({ full: reveal(y), gentle: reveal(0) });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
