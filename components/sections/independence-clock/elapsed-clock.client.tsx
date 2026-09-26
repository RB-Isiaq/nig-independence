"use client";

import { RollingNumber } from "@/components/motion/rolling-number";
import { useNow } from "@/hooks/use-now";
import { getAnniversaryState } from "@/lib/anniversary";
import { formatInteger, pad2 } from "@/lib/format";

/** Live years · days · h:m:s since 00:00 WAT, 1 October 1960. */
export function ElapsedClock({ serverNow }: { serverNow: string }) {
  const { elapsed } = getAnniversaryState(new Date(useNow(serverNow)));

  const cells = [
    { value: String(elapsed.years), label: "Years" },
    { value: String(elapsed.days), label: "Days" },
    { value: pad2(elapsed.hours), label: "Hours" },
    { value: pad2(elapsed.minutes), label: "Minutes" },
    { value: pad2(elapsed.seconds), label: "Seconds" },
  ];

  return (
    <div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
        {cells.map(({ value, label }, i) => (
          <div
            key={label}
            data-reveal
            className={`glass rounded-3xl p-5 sm:p-6 ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <dt className="text-xs uppercase tracking-[0.2em] text-snow/60">{label}</dt>
            <dd className="mt-2 font-display text-5xl font-bold tabular-nums sm:text-6xl">
              <RollingNumber value={value} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm text-snow/60">
        That is <strong className="text-snow">{formatInteger(elapsed.totalDays)}</strong> days of independence, and
        counting.
      </p>
    </div>
  );
}
