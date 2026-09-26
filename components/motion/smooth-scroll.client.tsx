"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "./gsap";
import { setLenis } from "./lenis-instance";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in
 * sync. Renders nothing; skipped entirely for reduced-motion users.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;

    const lenis = new Lenis({ autoRaf: false, anchors: true });
    const raf = (time: number) => lenis.raf(time * 1000);

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
