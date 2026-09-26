"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { MotionLevel } from "@/lib/motion-preference";

// The single place GSAP plugins are registered. Always import GSAP from here.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
// Sections render optional elements (e.g. the countdown), so empty selectors are expected.
gsap.config({ nullTargetWarn: false });

/** The motion level decided before first paint by the gate script. */
export function getMotionLevel(): MotionLevel {
  return document.documentElement.classList.contains("motion-gentle") ? "gentle" : "full";
}

type Setup = () => void | (() => void);

/**
 * Runs `full` or `gentle` animation setup depending on the visitor's motion
 * level, scoped in a gsap.matchMedia so everything reverts on cleanup.
 * Omit `gentle` for effects that should simply not exist in gentle mode.
 * Use as the body of `useGSAP(() => withMotion({...}))`.
 */
export function withMotion({ full, gentle, query = "all" }: { full: Setup; gentle?: Setup; query?: string }) {
  const mm = gsap.matchMedia();
  const setup = getMotionLevel() === "full" ? full : gentle;
  if (setup) mm.add(query, setup);
  return () => mm.revert();
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
