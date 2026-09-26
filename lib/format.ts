import type { HistoricDate } from "@/content/types";

// Fixed English month names: avoids server/client Intl differences during hydration.
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** "1 October 1960", "October 1960" or "1960", depending on precision. */
export function formatHistoricDate({ year, month, day }: HistoricDate): string {
  if (!month) return String(year);
  const monthName = MONTHS[month - 1];
  return day ? `${day} ${monthName} ${year}` : `${monthName} ${year}`;
}

/** Zero-pads to two digits for clock displays. */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Thousands separators without locale variance: 24_107 → "24,107". */
export function formatInteger(n: number): string {
  return String(Math.trunc(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
