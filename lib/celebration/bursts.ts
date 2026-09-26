import type { Options } from "canvas-confetti";

/** Pure burst "choreography" for canvas-confetti. `rand` is injectable for tests. */
export type Rand = () => number;
export interface Cue {
  atMs: number;
  options: Options;
}

const GREEN = "#008751";
const BRIGHT = "#19b374";
const SNOW = "#f7f5ef";
const GOLD = "#d4a64a";

/** Flag colours; jubilee years (60th, 70th, 100th…) add gold. */
export function celebrationPalette(jubilee: boolean): string[] {
  return jubilee ? [GREEN, BRIGHT, SNOW, GOLD, GOLD] : [GREEN, BRIGHT, SNOW, SNOW];
}

const between = (rand: Rand, min: number, max: number) => min + rand() * (max - min);

/** Confetti cannons from both lower corners, aimed inward. */
export function sideCannons(colors: string[], power = 1): Options[] {
  const base = { particleCount: Math.round(70 * power), spread: 60, startVelocity: 55 * power, ticks: 260, colors };
  return [
    { ...base, angle: 60, origin: { x: 0, y: 0.75 } },
    { ...base, angle: 120, origin: { x: 1, y: 0.75 } },
  ];
}

/** A round firework burst somewhere across the upper part of the screen. */
export function firework(rand: Rand, colors: string[]): Options {
  return burstAt(between(rand, 0.15, 0.85), between(rand, 0.12, 0.38), colors);
}

/** A firework at a given point, in 0–1 viewport coordinates (e.g. where the user tapped). */
export function burstAt(x: number, y: number, colors: string[]): Options {
  return {
    particleCount: 60,
    spread: 360,
    startVelocity: 26,
    gravity: 0.7,
    decay: 0.92,
    ticks: 110,
    scalar: 0.9,
    shapes: ["circle"],
    colors,
    origin: { x: clamp01(x), y: clamp01(y) },
  };
}

/** Plays when the page opens on 1 October. About 3 seconds. */
export function openingShow(rand: Rand, colors: string[]): Cue[] {
  return [
    ...sideCannons(colors).map((options) => ({ atMs: 0, options })),
    ...sideCannons(colors, 0.8).map((options) => ({ atMs: 350, options })),
    ...[700, 1100, 1450, 1900, 2400, 2900].map((atMs) => ({ atMs, options: firework(rand, colors) })),
  ];
}

/** The midnight moment: a bigger, longer show, about 6 seconds. */
export function finaleShow(rand: Rand, colors: string[]): Cue[] {
  const cannons = [0, 400, 900, 1600].flatMap((atMs, i) =>
    sideCannons(colors, 1.2 - i * 0.1).map((options) => ({ atMs, options })),
  );
  const fireworks = Array.from({ length: 22 }, (_, i) => ({ atMs: 300 + i * 260, options: firework(rand, colors) }));
  return inTimeOrder([...cannons, ...fireworks]);
}

/** Gap before the next ambient firework while the hero is on screen. */
export function nextAmbientDelayMs(rand: Rand): number {
  return Math.round(between(rand, 4500, 8000));
}

function inTimeOrder(cues: Cue[]): Cue[] {
  return cues.sort((a, b) => a.atMs - b.atMs);
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}
