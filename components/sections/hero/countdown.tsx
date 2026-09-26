import { RollingNumber } from "@/components/motion/rolling-number";
import { pad2 } from "@/lib/format";
import type { DurationParts } from "@/lib/time/units";

const UNITS: readonly { key: keyof DurationParts; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

interface CountdownProps {
  parts: DurationParts;
  /** Human sentence for assistive tech, e.g. "5 days until 1 October 2026". */
  label: string;
}

/** Presentational countdown. The ticking lives in the parent. */
export function Countdown({ parts, label }: CountdownProps) {
  return (
    <div>
      <p className="sr-only">{label}</p>
      <dl aria-hidden className="flex gap-2 sm:gap-3">
        {UNITS.map(({ key, label: unitLabel }) => (
          <div key={key} data-hero="cell" className="glass flex min-w-[4.5rem] flex-col-reverse items-center rounded-2xl px-3 py-3 sm:min-w-24 sm:px-5 sm:py-4">
            <dt className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-snow/60 sm:text-xs">{unitLabel}</dt>
            <dd className="font-display text-3xl font-bold tabular-nums sm:text-5xl">
              <RollingNumber value={key === "days" ? String(parts.days) : pad2(parts[key])} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
