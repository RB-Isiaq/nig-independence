/**
 * Recording mode for social content (IG / TikTok screen captures).
 *   ?record                         clean frame, intro replays every load
 *   ?record&autoplay                steady auto-scroll after the intro
 *   ?record&autoplay&speed=160      scroll speed in px/s (40–600)
 *   ?record&date=2026-10-01T00:00   preview another moment (WAT if no offset)
 * Params other than `record` are ignored unless `record` is present.
 */
export interface RecordMode {
  enabled: boolean;
  autoplay: boolean;
  /** px per second */
  speed: number;
  /** Instant to pretend it is when the page loads, if overridden. */
  date: Date | null;
}

export const DEFAULT_RECORD_SPEED = 140;
const MIN_SPEED = 40;
const MAX_SPEED = 600;

const OFF: RecordMode = { enabled: false, autoplay: false, speed: DEFAULT_RECORD_SPEED, date: null };

export function parseRecordMode(search: string): RecordMode {
  const params = new URLSearchParams(search);
  if (!params.has("record")) return OFF;

  const speed = Number(params.get("speed"));
  return {
    enabled: true,
    autoplay: params.has("autoplay"),
    speed: Number.isFinite(speed) && speed > 0 ? Math.min(MAX_SPEED, Math.max(MIN_SPEED, speed)) : DEFAULT_RECORD_SPEED,
    date: parseWatDate(params.get("date")),
  };
}

/** ISO-ish date; assumes WAT (+01:00) when no timezone is given. */
function parseWatDate(raw: string | null): Date | null {
  if (!raw) return null;
  const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(raw);
  const withTime = raw.includes("T") ? raw : `${raw}T00:00:00`;
  const date = new Date(hasZone ? withTime : `${withTime}+01:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}
