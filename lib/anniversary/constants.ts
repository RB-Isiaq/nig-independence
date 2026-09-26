import { lagosMidnight, type CalendarDate } from "@/lib/time/lagos";

export const INDEPENDENCE_DATE: CalendarDate = { year: 1960, month: 10, day: 1 };
export const INDEPENDENCE_INSTANT = lagosMidnight(INDEPENDENCE_DATE);

/** Days before 1 October during which the site is in "approaching" mode. */
export const APPROACHING_WINDOW_DAYS = 30;

/** Last day (inclusive) of the post-celebration "afterglow". */
export const AFTERGLOW_END = { month: 10, day: 31 } as const;
