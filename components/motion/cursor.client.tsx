"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

const FINE_POINTER = `(pointer: fine) and ${MOTION_OK}`;
const INTERACTIVE = "a, button, summary, [data-cursor]";

/**
 * A dot + trailing ring that swells over interactive elements.
 * Mouse/trackpad only; touch devices and reduced-motion users keep the OS cursor.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(FINE_POINTER, () => {
      document.documentElement.classList.add("has-cursor");
      const dotX = gsap.quickTo(dot.current, "x", { duration: 0.1 });
      const dotY = gsap.quickTo(dot.current, "y", { duration: 0.1 });
      const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
      const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

      let shown = false;
      const move = (e: PointerEvent) => {
        if (!shown) {
          // Jump into place on first movement instead of flying in from the corner.
          gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY, autoAlpha: 1 });
          shown = true;
        }
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      };
      const over = (e: PointerEvent) => {
        const active = (e.target as Element | null)?.closest(INTERACTIVE);
        gsap.to(ring.current, { scale: active ? 2.4 : 1, duration: 0.35, ease: "power3.out" });
        gsap.to(dot.current, { scale: active ? 0 : 1, duration: 0.2 });
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerover", over);
      return () => {
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerover", over);
      };
    });
    return () => mm.revert();
  });

  return (
    <>
      <div ref={ring} aria-hidden className="cursor cursor--ring" />
      <div ref={dot} aria-hidden className="cursor cursor--dot" />
    </>
  );
}
