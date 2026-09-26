"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, withMotion } from "./gsap";

/** Pulls its child toward the pointer while hovered, then springs back. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const node = el.current;
    if (!node) return;
    return withMotion({
      query: "(pointer: fine)",
      full: () => {
        const x = gsap.quickTo(node, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const y = gsap.quickTo(node, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const move = (e: PointerEvent) => {
          const r = node.getBoundingClientRect();
          x((e.clientX - (r.left + r.width / 2)) * strength);
          y((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        node.addEventListener("pointermove", move);
        node.addEventListener("pointerleave", leave);
        return () => {
          node.removeEventListener("pointermove", move);
          node.removeEventListener("pointerleave", leave);
        };
      },
    });
  });

  return (
    <span ref={el} className="inline-block">
      {children}
    </span>
  );
}
