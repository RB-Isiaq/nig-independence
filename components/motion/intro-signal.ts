"use client";

/**
 * Lets the hero wait for the intro sequence without coupling the two.
 * Resolves immediately when the intro is skipped (already seen / reduced motion).
 */
let done = false;
const waiters = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  waiters.forEach((resolve) => resolve());
  waiters.clear();
}

/** Calls `cb` once the intro has finished (or right away). Returns an unsubscribe. */
export function onIntroDone(cb: () => void): () => void {
  if (done) {
    cb();
    return () => {};
  }
  waiters.add(cb);
  return () => waiters.delete(cb);
}
