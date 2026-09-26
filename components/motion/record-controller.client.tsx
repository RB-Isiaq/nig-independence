"use client";

import { useEffect } from "react";
import { parseRecordMode } from "@/lib/record-mode";
import { gsap } from "./gsap";
import { onIntroDone } from "./intro-signal";
import { getLenis } from "./lenis-instance";

/** Pause after the intro before auto-scrolling, so the hero reads on camera. */
const HOLD_AFTER_INTRO_S = 2.5;

function scrollToY(y: number) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
}

/**
 * Recording mode (`?record`): steady auto-scroll and keyboard controls for
 * clean screen captures. Space = pause/resume, R = restart. Renders nothing.
 */
export function RecordController() {
  useEffect(() => {
    const mode = parseRecordMode(window.location.search);
    if (!mode.enabled) return;

    // Always start recordings from the top, including after R / reload.
    history.scrollRestoration = "manual";

    let paused = false;
    let running = false;
    let y = window.scrollY;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    const step = (_time: number, deltaMs: number) => {
      if (paused || !running) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      y = Math.min(max, y + (mode.speed * deltaMs) / 1000);
      scrollToY(y);
      if (y >= max) running = false;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        paused = !paused;
        y = window.scrollY; // resume from wherever the viewer left it
      } else if (e.key.toLowerCase() === "r") {
        scrollToY(0);
        window.location.reload();
      }
    };

    const unsubscribe = mode.autoplay
      ? onIntroDone(() => {
          holdTimer = setTimeout(() => {
            y = window.scrollY;
            running = true;
          }, HOLD_AFTER_INTRO_S * 1000);
        })
      : () => {};

    gsap.ticker.add(step);
    window.addEventListener("keydown", onKey);
    return () => {
      unsubscribe();
      clearTimeout(holdTimer);
      gsap.ticker.remove(step);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
