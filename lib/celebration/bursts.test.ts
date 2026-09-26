import { describe, expect, it } from "vitest";
import {
  burstAt,
  celebrationPalette,
  finaleShow,
  firework,
  nextAmbientDelayMs,
  openingShow,
  sideCannons,
} from "./bursts";

/** Deterministic PRNG (mulberry32) so the choreography is testable. */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const inUnit = (n: number | undefined) => n !== undefined && n >= 0 && n <= 1;

describe("celebration bursts", () => {
  it("uses flag colours, adding gold only for jubilees", () => {
    expect(celebrationPalette(false)).not.toContain("#d4a64a");
    expect(celebrationPalette(true)).toContain("#d4a64a");
  });

  it("fires cannons inward from both corners", () => {
    const [left, right] = sideCannons(celebrationPalette(false));
    expect(left.origin).toEqual({ x: 0, y: 0.75 });
    expect(right.origin).toEqual({ x: 1, y: 0.75 });
    expect(left.angle).toBeLessThan(90);
    expect(right.angle).toBeGreaterThan(90);
  });

  it("keeps every firework on screen", () => {
    const rand = seeded(1);
    for (let i = 0; i < 200; i++) {
      const { origin } = firework(rand, ["#000"]);
      expect(inUnit(origin?.x) && inUnit(origin?.y)).toBe(true);
    }
  });

  it("clamps tap bursts to the viewport", () => {
    expect(burstAt(-0.2, 1.4, ["#000"]).origin).toEqual({ x: 0, y: 1 });
  });

  it("orders the shows in time and keeps them short", () => {
    for (const [show, maxMs] of [
      [openingShow, 3_500],
      [finaleShow, 7_000],
    ] as const) {
      const cues = show(seeded(7), celebrationPalette(false));
      const times = cues.map((c) => c.atMs);
      expect(times).toEqual([...times].sort((a, b) => a - b));
      expect(Math.max(...times)).toBeLessThanOrEqual(maxMs);
    }
    expect(finaleShow(seeded(7), []).length).toBeGreaterThan(openingShow(seeded(7), []).length);
  });

  it("spaces ambient fireworks 4.5–8 seconds apart", () => {
    const rand = seeded(3);
    for (let i = 0; i < 100; i++) {
      const ms = nextAmbientDelayMs(rand);
      expect(ms).toBeGreaterThanOrEqual(4_500);
      expect(ms).toBeLessThanOrEqual(8_000);
    }
  });
});
