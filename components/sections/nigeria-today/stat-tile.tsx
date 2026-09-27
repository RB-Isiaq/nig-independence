import { CountUp } from "@/components/motion/count-up.client";
import type { IndicatorKey, ThenAndNow } from "@/lib/sources/worldbank";
import { toCompact } from "@/lib/format";

interface Formatted {
  value: number;
  decimals: number;
  /** Shown beside the big number. */
  unit: string;
  /** Compact text for the "in 1960" comparison. */
  short: string;
}

/** How each indicator is labelled and formatted. Presentation only; the numbers come from the data. */
const DISPLAY: Record<IndicatorKey, { label: string; format: (n: number) => Formatted }> = {
  population: {
    label: "People",
    format: (n) => {
      const { value, unit } = toCompact(n);
      return { value, decimals: 1, unit, short: `${value.toFixed(1)}${unit}` };
    },
  },
  lifeExpectancy: {
    label: "Life expectancy",
    format: (n) => {
      const value = Math.round(n * 10) / 10;
      return { value, decimals: 1, unit: " yrs", short: value.toFixed(1) };
    },
  },
  urbanShare: {
    label: "Live in cities",
    format: (n) => {
      const value = Math.round(n);
      return { value, decimals: 0, unit: "%", short: `${value}%` };
    },
  },
};

export function StatTile({ stat }: { stat: ThenAndNow }) {
  const { label, format } = DISPLAY[stat.key];
  const now = format(stat.now.value);
  const then = format(stat.then.value);
  const direction = stat.now.value >= stat.then.value ? "up from" : "down from";

  return (
    <article data-reveal className="glass flex flex-col rounded-3xl p-6">
      <h3 className="eyebrow">{label}</h3>
      <p className="mt-4 font-display text-6xl font-bold tracking-tight tabular-nums">
        <CountUp value={now.value} decimals={now.decimals} start="scroll" duration={2} />
        <span className="text-3xl text-snow/70">{now.unit}</span>
      </p>
      <p className="mt-2 text-sm text-snow/60">
        {stat.now.year} · {direction} <strong className="font-semibold text-snow/80">{then.short}</strong> in{" "}
        {stat.then.year}
      </p>
      <a
        href={stat.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link mt-6 text-xs uppercase tracking-[0.15em] text-snow/45"
        title={stat.label}
      >
        World Bank
      </a>
    </article>
  );
}
