"use client";

import { setMotionPreference, useMotionPreference } from "@/hooks/use-motion-preference";

/**
 * Shown only when motion was reduced automatically because of the device's
 * setting, so visitors know the full experience exists. Either choice is
 * remembered, so it never shows again.
 */
export function MotionNotice() {
  const state = useMotionPreference();
  if (state?.level !== "gentle" || state.preference !== "system") return null;

  return (
    <div role="status" className="glass fixed inset-x-4 bottom-4 z-[70] mx-auto flex max-w-md flex-col gap-3 rounded-2xl p-4 text-sm sm:flex-row sm:items-center">
      <p className="flex-1 text-snow/80">Your device asks for less motion, so animations are calmed.</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMotionPreference("full")}
          className="rounded-full bg-nigeria px-4 py-2 font-semibold text-snow transition hover:bg-nigeria-bright"
        >
          Show full motion
        </button>
        <button
          type="button"
          onClick={() => setMotionPreference("gentle")}
          className="rounded-full px-4 py-2 text-snow/70 transition hover:bg-snow/10 hover:text-snow"
        >
          Keep calm
        </button>
      </div>
    </div>
  );
}
