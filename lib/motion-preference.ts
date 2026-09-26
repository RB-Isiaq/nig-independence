/**
 * Motion levels:
 *   full   — everything: intro, pinning, parallax, smooth scroll, marquees
 *   gentle — soft fades and count-ups only; no pinning, zooming, parallax or
 *            smooth scroll (the vestibular triggers)
 *
 * The OS "reduce motion" setting picks `gentle` by default; the visitor can
 * override it with the header toggle, and recording mode always gets `full`.
 */
export type MotionLevel = "full" | "gentle";
export type MotionPreference = "system" | "full" | "gentle";

export const MOTION_PREF_KEY = "ng-motion";

export function parseMotionPreference(raw: string | null | undefined): MotionPreference {
  return raw === "full" || raw === "gentle" ? raw : "system";
}

export function resolveMotionLevel(input: {
  preference: MotionPreference;
  systemReducesMotion: boolean;
  recording: boolean;
}): MotionLevel {
  if (input.recording) return "full";
  if (input.preference !== "system") return input.preference;
  return input.systemReducesMotion ? "gentle" : "full";
}
