import { describe, expect, it } from "vitest";
import { fetchThenAndNow, toThenAndNow } from "./worldbank";

const row = (date: string, value: number | null, name = "Population, total") => ({
  indicator: { id: "SP.POP.TOTL", value: name },
  country: { id: "NG", value: "Nigeria" },
  date,
  value,
});
const response = (...rows: ReturnType<typeof row>[]) => [{ page: 1, pages: 1, per_page: 200, total: rows.length }, rows];

describe("World Bank then-and-now", () => {
  it("picks 1960 and the latest non-empty year, whatever the order", () => {
    const result = toThenAndNow(
      "population",
      response(row("2026", null), row("2025", 237_527_782), row("1961", 46_000_000), row("1960", 45_053_782)),
    );
    expect(result.then).toEqual({ year: 1960, value: 45_053_782 });
    expect(result.now).toEqual({ year: 2025, value: 237_527_782 });
    expect(result.label).toBe("Population, total");
    expect(result.sourceUrl).toBe("https://data.worldbank.org/indicator/SP.POP.TOTL?locations=NG");
  });

  it("falls back to the earliest year when 1960 is missing", () => {
    const result = toThenAndNow("lifeExpectancy", response(row("2024", 54.6), row("1962", 38.1)));
    expect(result.then.year).toBe(1962);
  });

  it("rejects implausible values (e.g. a unit mix-up)", () => {
    expect(() => toThenAndNow("urbanShare", response(row("2025", 6377), row("1960", 14.2)))).toThrow(/implausible/);
    expect(() => toThenAndNow("population", response(row("2025", 237.5), row("1960", 45_053_782)))).toThrow(/implausible/);
  });

  it("rejects too little data and error payloads", () => {
    expect(() => toThenAndNow("population", response(row("2025", 237_527_782)))).toThrow(/not enough/);
    expect(() => toThenAndNow("population", [{ message: [{ id: "120", value: "Invalid value" }] }])).toThrow();
  });

  it("fetches the right indicator URL", async () => {
    let requested = "";
    await fetchThenAndNow("urbanShare", async (url) => {
      requested = url;
      return response(row("2025", 63.8), row("1960", 14.2));
    });
    expect(requested).toContain("/country/NGA/indicator/SP.URB.TOTL.IN.ZS");
  });
});
