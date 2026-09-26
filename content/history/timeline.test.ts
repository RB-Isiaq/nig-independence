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

  it("keeps summaries to one skimmable line", () => {
    for (const event of TIMELINE) expect(event.summary.length, event.id).toBeLessThanOrEqual(120);
  });

  it("credits every image properly", () => {
    for (const { id, image } of TIMELINE) {
      if (!image) continue;
      expect(image.alt.length, id).toBeGreaterThan(10);
      expect(image.credit.author, id).not.toBe("");
      expect(image.credit.sourceUrl, id).toMatch(/^https:\/\//);
      // Creative Commons licences require a link to the licence.
      if (image.credit.license.startsWith("CC")) expect(image.credit.licenseUrl, id).toMatch(/^https:\/\/creativecommons\.org\//);
    }
  });
});
