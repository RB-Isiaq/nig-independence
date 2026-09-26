import { describe, expect, it } from "vitest";
import { toOrdinal } from "./ordinal";

describe("toOrdinal", () => {
  it.each([
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
    [4, "4th"],
    [11, "11th"],
    [12, "12th"],
    [13, "13th"],
    [21, "21st"],
    [62, "62nd"],
    [63, "63rd"],
    [66, "66th"],
    [100, "100th"],
    [101, "101st"],
    [111, "111th"],
    [112, "112th"],
    [113, "113th"],
    [122, "122nd"],
  ])("%i → %s", (n, expected) => {
    expect(toOrdinal(n)).toBe(expected);
  });
});
