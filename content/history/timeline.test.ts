import { describe, expect, it } from "vitest";
import { TIMELINE } from "./timeline";

const sortKey = ({ year, month = 0, day = 0 }: { year: number; month?: number; day?: number }) =>
  year * 10_000 + month * 100 + day;

describe("TIMELINE content integrity", () => {
  it("has unique ids", () => {
    const ids = TIMELINE.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("is in chronological order", () => {
    const keys = TIMELINE.map((e) => sortKey(e.date));
    expect(keys).toEqual([...keys].sort((a, b) => a - b));
  });

  it("cites https sources for every event", () => {
    for (const event of TIMELINE) {
      expect(event.sources.length).toBeGreaterThan(0);
      for (const source of event.sources) expect(source.url).toMatch(/^https:\/\//);
    }
  });
});
