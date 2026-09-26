"use client";

import { useSyncExternalStore } from "react";
import { MOTION_PREF_KEY, parseMotionPreference, type MotionLevel, type MotionPreference } from "@/lib/motion-preference";

export interface MotionState {
  level: MotionLevel;
  preference: MotionPreference;
}

// The level is fixed per page load (decided by the gate script), so there is nothing to subscribe to.
const subscribe = () => () => {};
let cached: MotionState | null = null;

function read(): MotionState {
  if (!cached) {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(MOTION_PREF_KEY);
    } catch {}
    cached = {
      level: document.documentElement.classList.contains("motion-gentle") ? "gentle" : "full",
      preference: parseMotionPreference(stored),
    };
  }
  return cached;
}

/** The visitor's motion level and stored preference; null during SSR/hydration. */
export function useMotionPreference(): MotionState | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

/** Saves the choice and reloads so every animation is set up from scratch. */
export function setMotionPreference(preference: Exclude<MotionPreference, "system">) {
  try {
    localStorage.setItem(MOTION_PREF_KEY, preference);
  } catch {}
  window.location.reload();
}
