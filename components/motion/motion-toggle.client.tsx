"use client";

import { setMotionPreference, useMotionPreference } from "@/hooks/use-motion-preference";

/** Header switch between full and gentle motion. */
export function MotionToggle() {
  const state = useMotionPreference();
  const full = state?.level !== "gentle";

  return (
    <button
      type="button"
      aria-pressed={state ? full : undefined}
      disabled={!state}
      onClick={() => setMotionPreference(full ? "gentle" : "full")}
      className="flex items-center gap-2 rounded-full px-4 py-2 text-snow/80 transition hover:bg-snow/10 hover:text-snow disabled:opacity-60"
    >
      <span aria-hidden className={`size-2 rounded-full ${full ? "bg-nigeria-bright" : "bg-snow/40"}`} />
      <span>
        Motion<span className="sr-only">: {full ? "full" : "reduced"}</span>
      </span>
    </button>
  );
}
