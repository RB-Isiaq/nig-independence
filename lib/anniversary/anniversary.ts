import { compareMonthDay, lagosMidnight, toLagosDate } from "@/lib/time/lagos";
import { MS_PER_DAY, toDurationParts, type DurationParts } from "@/lib/time/units";
import { AFTERGLOW_END, APPROACHING_WINDOW_DAYS, INDEPENDENCE_DATE, INDEPENDENCE_INSTANT } from "./constants";
import { getMilestone, type Milestone } from "./milestones";
import { toOrdinal } from "./ordinal";

export type CelebrationPhase = "celebration" | "approaching" | "afterglow" | "year-round";

export interface AnniversaryInfo {
  /** The anniversary count, e.g. 66 for 2026. */
  number: number;
  /** e.g. "66th" */
  ordinal: string;
  year: number;
  /** 00:00 WAT on 1 October of `year`. */
  instant: Date;
  milestone: Milestone | null;
}

export interface AnniversaryState {
  phase: CelebrationPhase;
  /** Completed years of independence (Nigeria's age). */
  age: number;
  /** This calendar year's anniversary (upcoming, today, or just held). */
  featured: AnniversaryInfo;
  /** The next 1 October at or after today (today itself during celebration). */
  next: AnniversaryInfo;
  /** Time left until `next`; all zeros during celebration. */
  countdown: DurationParts;
  /** Time since the most recent anniversary, with years = age. */
  elapsed: DurationParts & { years: number; totalDays: number };
}

const CELEBRATION_DAY = { month: INDEPENDENCE_DATE.month, day: INDEPENDENCE_DATE.day };

export function anniversaryFor(year: number): AnniversaryInfo {
  const number = year - INDEPENDENCE_DATE.year;
  return {
    number,
    ordinal: toOrdinal(number),
    year,
    instant: lagosMidnight({ year, ...CELEBRATION_DAY }),
    milestone: getMilestone(number),
  };
}

/** Every date-derived fact the site needs, computed for a single instant. */
export function getAnniversaryState(now: Date): AnniversaryState {
  const today = toLagosDate(now);
  const vsCelebration = compareMonthDay(today, CELEBRATION_DAY);
  const thisYear = anniversaryFor(today.year);

  const next = vsCelebration <= 0 ? thisYear : anniversaryFor(today.year + 1);
  const lastHeld = vsCelebration >= 0 ? thisYear : anniversaryFor(today.year - 1);
  const phase = getPhase(now, today, vsCelebration, thisYear.instant);

  const sinceLast = now.getTime() - lastHeld.instant.getTime();

  return {
    phase,
    age: lastHeld.number,
    featured: thisYear,
    next,
    countdown: toDurationParts(phase === "celebration" ? 0 : next.instant.getTime() - now.getTime()),
    elapsed: {
      years: lastHeld.number,
      totalDays: Math.floor((now.getTime() - INDEPENDENCE_INSTANT.getTime()) / MS_PER_DAY),
      ...toDurationParts(sinceLast),
    },
  };
}

function getPhase(
  now: Date,
  today: { month: number; day: number },
  vsCelebration: number,
  thisYearsInstant: Date,
): CelebrationPhase {
  if (vsCelebration === 0) return "celebration";
  if (vsCelebration > 0) {
    return compareMonthDay(today, AFTERGLOW_END) <= 0 ? "afterglow" : "year-round";
  }
  const daysUntil = (thisYearsInstant.getTime() - now.getTime()) / MS_PER_DAY;
  return daysUntil <= APPROACHING_WINDOW_DAYS ? "approaching" : "year-round";
}
