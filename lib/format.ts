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

/** 237_527_782 → { value: 237.5, unit: "M" }; small numbers pass through with one decimal. */
export function toCompact(n: number): { value: number; unit: "" | "K" | "M" | "B" } {
  const scales = [
    { unit: "B", size: 1e9 },
    { unit: "M", size: 1e6 },
    { unit: "K", size: 1e3 },
  ] as const;
  for (const { unit, size } of scales) {
    if (Math.abs(n) >= size) return { value: Math.round((n / size) * 10) / 10, unit };
  }
  return { value: Math.round(n * 10) / 10, unit: "" };
}

/** "2023-05-29" → "29 May 2023" */
export function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return formatHistoricDate({ year, month, day });
}
