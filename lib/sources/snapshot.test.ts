import { describe, expect, it } from "vitest";
import type { DataSnapshot } from "./snapshot";
import snapshotJson from "./snapshot.json";
import { INDICATORS } from "./worldbank";

const snapshot = snapshotJson as DataSnapshot;

describe("committed data snapshot (the offline fallback)", () => {
  it("has every indicator the site shows, with plausible values", () => {
    for (const [key, { min, max }] of Object.entries(INDICATORS)) {
      const entry = snapshot.indicators.find((i) => i.key === key);
      expect(entry, key).toBeDefined();
      for (const p of [entry!.then, entry!.now]) {
        expect(p.value, key).toBeGreaterThanOrEqual(min);
        expect(p.value, key).toBeLessThanOrEqual(max);
      }
      expect(entry!.now.year).toBeGreaterThan(entry!.then.year);
    }
  });

  it("has a titled, named head of state with a start date", () => {
    expect(snapshot.headOfState.title).toBe("President");
    expect(snapshot.headOfState.name).not.toMatch(/^Q\d+$/);
    expect(snapshot.headOfState.since).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
