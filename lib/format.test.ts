import { describe, expect, it } from "vitest";
import { formatHistoricDate, formatInteger, formatIsoDate, pad2, toCompact } from "./format";

describe("formatHistoricDate", () => {
  it("formats by precision", () => {
    expect(formatHistoricDate({ year: 1960, month: 10, day: 1 })).toBe("1 October 1960");
    expect(formatHistoricDate({ year: 1973, month: 1 })).toBe("January 1973");
    expect(formatHistoricDate({ year: 1986 })).toBe("1986");
  });
});

describe("pad2 / formatInteger", () => {
  it("pads and groups", () => {
    expect(pad2(7)).toBe("07");
    expect(pad2(42)).toBe("42");
    expect(formatInteger(24107)).toBe("24,107");
    expect(formatInteger(999)).toBe("999");
    expect(formatInteger(1234567)).toBe("1,234,567");
  });
});

describe("toCompact / formatIsoDate", () => {
  it("compacts large numbers to one decimal", () => {
    expect(toCompact(237_527_782)).toEqual({ value: 237.5, unit: "M" });
    expect(toCompact(45_053_782)).toEqual({ value: 45.1, unit: "M" });
    expect(toCompact(1_250_000_000)).toEqual({ value: 1.3, unit: "B" });
    expect(toCompact(54.635)).toEqual({ value: 54.6, unit: "" });
  });

  it("formats ISO dates", () => {
    expect(formatIsoDate("2023-05-29")).toBe("29 May 2023");
  });
});
