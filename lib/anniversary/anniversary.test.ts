import { describe, expect, it } from "vitest";
import { getAnniversaryState } from "./anniversary";

/** Build an instant from a WAT (UTC+1) wall-clock time. */
const wat = (iso: string) => new Date(`${iso}+01:00`);

describe("getAnniversaryState", () => {
  describe("the 2026 (66th) celebration boundary", () => {
    it("one second before midnight WAT is still 'approaching'", () => {
      const s = getAnniversaryState(wat("2026-09-30T23:59:59"));
      expect(s.phase).toBe("approaching");
      expect(s.age).toBe(65);
      expect(s.next.number).toBe(66);
      expect(s.next.ordinal).toBe("66th");
      expect(s.countdown).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 1 });
    });

    it("midnight WAT flips to 'celebration'", () => {
      const s = getAnniversaryState(wat("2026-10-01T00:00:00"));
      expect(s.phase).toBe("celebration");
      expect(s.age).toBe(66);
      expect(s.featured.number).toBe(66);
      expect(s.next.year).toBe(2026);
      expect(s.countdown).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    });

    it("uses Lagos time, not UTC: 23:30 UTC on 30 Sep is already 1 Oct in Lagos", () => {
      const s = getAnniversaryState(new Date("2026-09-30T23:30:00Z"));
      expect(s.phase).toBe("celebration");
    });

    it("the last second of 1 Oct is still 'celebration'", () => {
      expect(getAnniversaryState(wat("2026-10-01T23:59:59")).phase).toBe("celebration");
    });

    it("2 Oct starts the afterglow and targets next year", () => {
      const s = getAnniversaryState(wat("2026-10-02T00:00:00"));
      expect(s.phase).toBe("afterglow");
      expect(s.featured.number).toBe(66);
      expect(s.next.number).toBe(67);
      expect(s.next.year).toBe(2027);
    });
  });

  describe("phases across the year", () => {
    it("31 Oct is the last afterglow day", () => {
      expect(getAnniversaryState(wat("2026-10-31T12:00:00")).phase).toBe("afterglow");
      expect(getAnniversaryState(wat("2026-11-01T00:00:00")).phase).toBe("year-round");
    });

    it("exactly 30 days out enters 'approaching'", () => {
      expect(getAnniversaryState(wat("2026-09-01T00:00:00")).phase).toBe("approaching");
      expect(getAnniversaryState(wat("2026-08-31T23:59:59")).phase).toBe("year-round");
    });

    it("mid-year counts down to this year's anniversary", () => {
      const s = getAnniversaryState(wat("2027-03-15T10:00:00"));
      expect(s.phase).toBe("year-round");
      expect(s.age).toBe(66);
      expect(s.featured.number).toBe(67);
      expect(s.next.number).toBe(67);
    });

    it("New Year's Eve is year-round and targets the coming October", () => {
      const s = getAnniversaryState(wat("2026-12-31T23:59:59"));
      expect(s.phase).toBe("year-round");
      expect(s.next.year).toBe(2027);
    });
  });

  describe("elapsed time since independence", () => {
    it("is zero at the moment of independence", () => {
      const s = getAnniversaryState(wat("1960-10-01T00:00:00"));
      expect(s.elapsed).toMatchObject({ years: 0, totalDays: 0, days: 0, hours: 0 });
    });

    it("counts days since the most recent anniversary", () => {
      const s = getAnniversaryState(wat("2026-10-11T06:30:15"));
      expect(s.elapsed).toMatchObject({ years: 66, days: 10, hours: 6, minutes: 30, seconds: 15 });
    });

    it("handles leap years when counting days since the last anniversary", () => {
      // 1 Oct 2027 → 30 Sep 2028 spans 29 Feb 2028: 365 whole days.
      const s = getAnniversaryState(wat("2028-09-30T00:00:00"));
      expect(s.elapsed.years).toBe(67);
      expect(s.elapsed.days).toBe(365);
    });

    it("totalDays matches a known value", () => {
      // 1960-10-01 → 2026-10-01 is 66 years with 16 leap days (29 Feb 1964…2024).
      expect(getAnniversaryState(wat("2026-10-01T00:00:00")).elapsed.totalDays).toBe(66 * 365 + 16);
    });
  });

  describe("far future milestones", () => {
    it("2030 is the 70th, Platinum Jubilee", () => {
      const s = getAnniversaryState(wat("2030-10-01T09:00:00"));
      expect(s.featured.ordinal).toBe("70th");
      expect(s.featured.milestone?.label).toBe("Platinum Jubilee");
    });

    it("2060 is the Centenary", () => {
      const s = getAnniversaryState(wat("2060-10-01T09:00:00"));
      expect(s.featured.ordinal).toBe("100th");
      expect(s.featured.milestone?.label).toBe("Centenary");
    });

    it("2073 is the 113th", () => {
      expect(getAnniversaryState(wat("2073-10-01T09:00:00")).featured.ordinal).toBe("113th");
    });
  });
});
