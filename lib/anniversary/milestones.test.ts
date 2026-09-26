import { describe, expect, it } from "vitest";
import { getMilestone, getNextNamedMilestone } from "./milestones";

describe("getMilestone", () => {
  it("names jubilees", () => {
    expect(getMilestone(50)).toEqual({ tier: "named", label: "Golden Jubilee" });
    expect(getMilestone(60)).toEqual({ tier: "named", label: "Diamond Jubilee" });
    expect(getMilestone(70)).toEqual({ tier: "named", label: "Platinum Jubilee" });
    expect(getMilestone(100)).toEqual({ tier: "named", label: "Centenary" });
  });

  it("marks other multiples of five as landmarks", () => {
    expect(getMilestone(65)?.tier).toBe("landmark");
    expect(getMilestone(75)?.tier).toBe("landmark");
  });

  it("returns null for ordinary years", () => {
    expect(getMilestone(66)).toBeNull();
    expect(getMilestone(0)).toBeNull();
  });
});

describe("getNextNamedMilestone", () => {
  it("finds the next jubilee after 66", () => {
    expect(getNextNamedMilestone(66)).toEqual({ anniversary: 70, label: "Platinum Jubilee" });
  });

  it("is exclusive of the current anniversary", () => {
    expect(getNextNamedMilestone(70)?.anniversary).toBe(100);
  });

  it("returns null past the last defined milestone", () => {
    expect(getNextNamedMilestone(100)).toBeNull();
  });
});
