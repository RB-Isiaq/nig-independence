/** English ordinal suffix: 1 → "st", 12 → "th", 22 → "nd", 113 → "th". */
export function ordinalSuffix(n: number): "st" | "nd" | "rd" | "th" {
  const lastTwo = Math.abs(n) % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return "th";
  switch (Math.abs(n) % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function toOrdinal(n: number): string {
  return `${n}${ordinalSuffix(n)}`;
}
