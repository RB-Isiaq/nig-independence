import { describe, expect, it } from "vitest";
import { formatHistoricDate, formatInteger, pad2 } from "./format";

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
