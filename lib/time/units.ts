export const MS_PER_SECOND = 1_000;
export const MS_PER_MINUTE = 60 * MS_PER_SECOND;
export const MS_PER_HOUR = 60 * MS_PER_MINUTE;
export const MS_PER_DAY = 24 * MS_PER_HOUR;

export interface DurationParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Splits a non-negative millisecond duration into whole d/h/m/s. Negative input clamps to zero. */
export function toDurationParts(ms: number): DurationParts {
  const safe = Math.max(0, Math.floor(ms / MS_PER_SECOND) * MS_PER_SECOND);
  return {
    days: Math.floor(safe / MS_PER_DAY),
    hours: Math.floor((safe % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((safe % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((safe % MS_PER_MINUTE) / MS_PER_SECOND),
  };
}
