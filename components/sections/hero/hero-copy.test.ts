import { describe, expect, it } from "vitest";
import { getAnniversaryState } from "@/lib/anniversary";
import { getHeroCopy } from "./hero-copy";

const copyAt = (watIso: string) => getHeroCopy(getAnniversaryState(new Date(`${watIso}+01:00`)));

describe("getHeroCopy", () => {
  it("approaching: 'Nigeria turns 66' with countdown", () => {
    const c = copyAt("2026-09-26T12:00:00");
    expect(c).toMatchObject({ lead: "Nigeria turns", number: 66, showCountdown: true });
    expect(c.subtitle).toContain("66th");
  });

  it("celebration: 'Happy 66th Independence Day', no countdown", () => {
    const c = copyAt("2026-10-01T08:00:00");
    expect(`${c.lead} ${c.number}${c.suffix} ${c.trail}`).toBe("Happy 66th Independence Day");
    expect(c.showCountdown).toBe(false);
  });

  it("afterglow: 'Nigeria at 66'", () => {
    expect(copyAt("2026-10-15T08:00:00")).toMatchObject({ lead: "Nigeria at", number: 66, showCountdown: false });
  });

  it("year-round before October: shows age and counts down to the next", () => {
    const c = copyAt("2027-02-01T08:00:00");
    expect(c).toMatchObject({ lead: "Nigeria at", number: 66, showCountdown: true });
    expect(c.subtitle).toContain("67th");
    expect(c.subtitle).toContain("2027");
  });

  it("names jubilees", () => {
    expect(copyAt("2030-10-01T08:00:00").eyebrow).toContain("Platinum Jubilee");
    expect(copyAt("2060-10-01T08:00:00").eyebrow).toContain("Centenary");
  });

  it("uses the right suffix on the celebration day in odd years", () => {
    const c = copyAt("2033-10-01T08:00:00");
    expect(`${c.number}${c.suffix} ${c.trail}`).toBe("73rd Independence Day");
  });
});
