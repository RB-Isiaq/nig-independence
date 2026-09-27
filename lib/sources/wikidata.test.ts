import { describe, expect, it } from "vitest";
import { toCurrentHeadOfState, toTitle } from "./wikidata";

const binding = (id: string, name: string, start?: string, end?: string) => ({
  person: { type: "uri", value: `http://www.wikidata.org/entity/${id}` },
  personLabel: { type: "literal", value: name },
  officeLabel: { type: "literal", value: "President of Nigeria" },
  ...(start && { start: { type: "literal", value: `${start}T00:00:00Z` } }),
  ...(end && { end: { type: "literal", value: `${end}T00:00:00Z` } }),
});
const response = (...bindings: ReturnType<typeof binding>[]) => ({ head: { vars: [] }, results: { bindings } });

describe("current head of state from Wikidata", () => {
  it("returns the one statement without an end date", () => {
    const result = toCurrentHeadOfState(
      response(
        binding("Q3510872", "Bola Tinubu", "2023-05-29"),
        binding("Q57541", "Muhammadu Buhari", "2015-05-29", "2023-05-29"),
      ),
    );
    expect(result).toEqual({
      title: "President",
      name: "Bola Tinubu",
      since: "2023-05-29",
      sourceUrl: "http://www.wikidata.org/wiki/Q3510872",
    });
  });

  it("picks up a successor automatically once the old term has an end date", () => {
    const result = toCurrentHeadOfState(
      response(
        binding("Q1", "Next President", "2027-05-29"),
        binding("Q3510872", "Bola Tinubu", "2023-05-29", "2027-05-29"),
      ),
    );
    expect(result.name).toBe("Next President");
  });

  it("rejects ambiguous or missing data (e.g. mid-edit or vandalism)", () => {
    expect(() =>
      toCurrentHeadOfState(response(binding("Q1", "A", "2023-05-29"), binding("Q2", "B", "2024-01-01"))),
    ).toThrow(/exactly one/);
    expect(() => toCurrentHeadOfState(response(binding("Q1", "A", "2015-05-29", "2023-05-29")))).toThrow(/exactly one/);
  });

  it("rejects entries without a readable name or with a nonsense date", () => {
    expect(() => toCurrentHeadOfState(response(binding("Q3510872", "Q3510872", "2023-05-29")))).toThrow(/label/);
    expect(() => toCurrentHeadOfState(response(binding("Q1", "A", "1066-10-14")))).toThrow(/start date/);
  });

  it("takes the office title from Wikidata, defaulting to President", () => {
    expect(toTitle("President of Nigeria")).toBe("President");
    expect(toTitle("President of the Federal Republic of Nigeria")).toBe("President");
    expect(toTitle(undefined)).toBe("President");
    expect(toTitle("Q500282")).toBe("President");
  });
});
