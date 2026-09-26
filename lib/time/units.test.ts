import { describe, expect, it } from "vitest";
import { MS_PER_DAY, MS_PER_HOUR, toDurationParts } from "./units";

describe("toDurationParts", () => {
  it("splits a duration", () => {
    expect(toDurationParts(2 * MS_PER_DAY + 3 * MS_PER_HOUR + 4_000)).toEqual({
      days: 2,
      hours: 3,
      minutes: 0,
      seconds: 4,
    });
  });

  it("drops sub-second remainders", () => {
    expect(toDurationParts(1_999).seconds).toBe(1);
  });

  it("clamps negatives to zero", () => {
    expect(toDurationParts(-5_000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
