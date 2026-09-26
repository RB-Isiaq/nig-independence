import type { CSSProperties } from "react";

/** One strip per state — a small nod to the 36 states. */
const STRIPS = 36;

type Band = "green" | "white";
const bandFor = (i: number): Band => (i >= STRIPS / 3 && i < (STRIPS * 2) / 3 ? "white" : "green");

interface WavingFlagProps {
  className?: string;
}

/**
 * The Nigerian flag (1:2, green-white-green vertical bands) built from strips
 * whose staggered CSS animation produces a wave. Pure CSS: zero JS cost, and
 * the wave stops in gentle motion mode (see globals.css).
 */
export function WavingFlag({ className }: WavingFlagProps) {
  return (
    <div role="img" aria-label="The flag of Nigeria: green, white, green" className={`flag ${className ?? ""}`}>
      {Array.from({ length: STRIPS }, (_, i) => (
        <span
          key={i}
          className="flag__strip"
          data-band={bandFor(i)}
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </div>
  );
}
