interface RollingNumberProps {
  value: string;
  className?: string;
}

/**
 * Odometer-style digits: each character is keyed by position + value, so a
 * changed digit remounts and plays the CSS `digit-in` roll (see globals.css).
 * No JS animation cost; static under reduced motion.
 */
export function RollingNumber({ value, className }: RollingNumberProps) {
  return (
    <span className={`rolling ${className ?? ""}`}>
      {[...value].map((char, i) => (
        <span key={i} className="rolling__slot">
          <span key={`${i}-${char}`} className="rolling__digit">
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}
