import { describe, expect, it } from "vitest";
import { getAnniversaryState } from "@/lib/anniversary";
import { getTodayCopy } from "./today-copy";

const copyAt = (watIso: string) => getTodayCopy(getAnniversaryState(new Date(`${watIso}+01:00`)));

describe("getTodayCopy", () => {
  it("before 1 October: 65, with the 66th still to come", () => {
    const c = copyAt("2026-09-27T12:00:00");
    expect(c.title).toBe("Nigeria at 65");
    expect(c.body).toContain("66th anniversary arrives on 1 October 2026");
  });

  it("on 1 October: celebrates today instead of saying it 'arrives'", () => {
    const c = copyAt("2026-10-01T00:00:00");
    expect(c.title).toBe("Nigeria at 66");
    expect(c.body).toBe("Today, 1 October 2026, Nigeria celebrates 66 years of independence.");
    expect(c.body).not.toContain("arrives");
  });

  it("after 1 October: 66, pointing at next year's 67th", () => {
    const c = copyAt("2026-10-02T09:00:00");
    expect(c.title).toBe("Nigeria at 66");
    expect(c.body).toContain("67th anniversary arrives on 1 October 2027");
  });

  it("keeps working decades ahead", () => {
    expect(copyAt("2060-10-01T09:00:00").title).toBe("Nigeria at 100");
    expect(copyAt("2061-03-01T09:00:00").body).toContain("101st anniversary arrives on 1 October 2061");
  });
});
