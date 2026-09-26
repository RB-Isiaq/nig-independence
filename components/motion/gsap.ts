"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// The single place GSAP plugins are registered. Always import GSAP from here.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
// Sections render optional elements (e.g. the countdown), so empty selectors are expected.
gsap.config({ nullTargetWarn: false });

/** Media query under which motion is allowed. Use with `gsap.matchMedia()`. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
