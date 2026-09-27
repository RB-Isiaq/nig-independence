import type { AnniversaryState } from "@/lib/anniversary";

export interface TodayCopy {
  title: string;
  body: string;
}

/** Wording for the timeline's final, derived "today" entry. Pure, so every phase is tested. */
export function getTodayCopy(state: AnniversaryState): TodayCopy {
  const { age, next, featured, phase } = state;
  if (phase === "celebration") {
    return {
      title: `Nigeria at ${age}`,
      body: `Today, 1 October ${featured.year}, Nigeria celebrates ${age} years of independence.`,
    };
  }
  return {
    title: `Nigeria at ${age}`,
    body: `${age} years on, the story is still being written, and the ${next.ordinal} anniversary arrives on 1 October ${next.year}.`,
  };
}
