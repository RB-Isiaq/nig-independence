export type MilestoneTier = "named" | "landmark";

export interface Milestone {
  tier: MilestoneTier;
  label: string;
}

const NAMED_MILESTONES: Readonly<Record<number, string>> = {
  25: "Silver Jubilee",
  40: "Ruby Jubilee",
  50: "Golden Jubilee",
  60: "Diamond Jubilee",
  70: "Platinum Jubilee",
  100: "Centenary",
};

/** Named jubilees, or "landmark" for other multiples of five; otherwise null. */
export function getMilestone(anniversary: number): Milestone | null {
  const named = NAMED_MILESTONES[anniversary];
  if (named) return { tier: "named", label: named };
  if (anniversary > 0 && anniversary % 5 === 0) {
    return { tier: "landmark", label: "Landmark Anniversary" };
  }
  return null;
}

/** The next named jubilee strictly after the given anniversary, if any. */
export function getNextNamedMilestone(after: number): { anniversary: number; label: string } | null {
  const next = Object.keys(NAMED_MILESTONES)
    .map(Number)
    .sort((a, b) => a - b)
    .find((n) => n > after);
  return next === undefined ? null : { anniversary: next, label: NAMED_MILESTONES[next] };
}
