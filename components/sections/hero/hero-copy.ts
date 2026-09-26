import { ordinalSuffix, type AnniversaryState } from "@/lib/anniversary";

export interface HeroCopy {
  eyebrow: string;
  /** Line above the big number, e.g. "Nigeria turns". */
  lead: string;
  /** The big number. */
  number: number;
  /** Ordinal suffix shown beside the number ("th"), or "" for a plain count. */
  suffix: string;
  /** Optional line below the number, e.g. "Independence Day". */
  trail: string;
  subtitle: string;
  showCountdown: boolean;
}

/** Phase-aware hero wording. Pure, so every phase is unit-tested. */
export function getHeroCopy(state: AnniversaryState): HeroCopy {
  const { featured, next, age, phase } = state;
  const jubilee = featured.milestone?.tier === "named" ? ` · ${featured.milestone.label}` : "";

  switch (phase) {
    case "celebration":
      return {
        eyebrow: `1 October ${featured.year}${jubilee}`,
        lead: "Happy",
        number: featured.number,
        suffix: ordinalSuffix(featured.number),
        trail: "Independence Day",
        subtitle: `${featured.number} years ago today, the green-white-green was raised over a free Nigeria.`,
        showCountdown: false,
      };
    case "approaching":
      return {
        eyebrow: `Counting down to 1 October ${next.year}${jubilee}`,
        lead: "Nigeria turns",
        number: next.number,
        suffix: "",
        trail: "",
        subtitle: `The ${next.ordinal} anniversary of independence is almost here.`,
        showCountdown: true,
      };
    case "afterglow":
      return {
        eyebrow: `Celebrating the ${featured.ordinal}${jubilee}`,
        lead: "Nigeria at",
        number: age,
        suffix: "",
        trail: "",
        subtitle: `${age} years of nationhood, since 1 October 1960.`,
        showCountdown: false,
      };
    case "year-round":
      return {
        eyebrow: "Independent since 1 October 1960",
        lead: "Nigeria at",
        number: age,
        suffix: "",
        trail: "",
        subtitle: `Counting down to the ${next.ordinal} Independence Day, 1 October ${next.year}.`,
        showCountdown: true,
      };
  }
}
