"use client";

import { useSyncExternalStore } from "react";
import { parseRecordMode } from "@/lib/record-mode";
import { MS_PER_SECOND } from "@/lib/time/units";

/**
 * A single shared ticking clock for every component on the page.
 * The clock only starts once something subscribes (i.e. after hydration),
 * so server rendering never reads the time.
 */
const listeners = new Set<() => void>();
let current: number | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
/** Non-zero only in recording mode with `&date=` (preview another moment). */
let offset: number | null = null;

function clockOffset() {
  if (offset === null) {
    const { date } = parseRecordMode(window.location.search);
    offset = date ? date.getTime() - Date.now() : 0;
  }
  return offset;
}

function tick() {
  current = Date.now() + clockOffset();
  listeners.forEach((listener) => listener());
  // Re-align to the next whole second so every display flips together.
  timer = setTimeout(tick, MS_PER_SECOND - (Date.now() % MS_PER_SECOND));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) tick();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clearTimeout(timer);
      current = null;
    }
  };
}

const getSnapshot = () => current;
const getServerSnapshot = () => null;

/**
 * Current time in ms. Renders `serverNow` during SSR and hydration (no
 * mismatch), then ticks live every second.
 */
export function useNow(serverNow: string): number {
  const live = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return live ?? Date.parse(serverNow);
}
