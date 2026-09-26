"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { getMotionLevel, gsap, ScrollTrigger } from "./gsap";
import { setLenis } from "./lenis-instance";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in
 * sync. Renders nothing; full motion only (smooth scroll is a vestibular trigger).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (getMotionLevel() !== "full") return;

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
