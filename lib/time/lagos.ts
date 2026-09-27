import { MS_PER_HOUR } from "./units";

/**
 * West Africa Time is a fixed UTC+1 with no daylight saving, so a constant
 * offset is exact and keeps date logic deterministic (see plan ADR-001).
 */
export const LAGOS_UTC_OFFSET_MS = 1 * MS_PER_HOUR;

export interface CalendarDate {
  year: number;
  /** 1–12 */
  month: number;
  /** 1–31 */
  day: number;
}

/** The calendar date it is in Lagos at the given instant. */
export function toLagosDate(instant: Date): CalendarDate {
  const shifted = new Date(instant.getTime() + LAGOS_UTC_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  };
}

/** The instant of 00:00:00 Lagos time on the given calendar date. */
export function lagosMidnight({ year, month, day }: CalendarDate): Date {
  return new Date(Date.UTC(year, month - 1, day) - LAGOS_UTC_OFFSET_MS);
}

/** Orders two calendar dates within the same year by month/day only. */
export function compareMonthDay(a: Omit<CalendarDate, "year">, b: Omit<CalendarDate, "year">): number {
  return a.month - b.month || a.day - b.day;
}
