import { describe, expect, it } from "vitest";
import { DEFAULT_RECORD_SPEED, parseRecordMode } from "./record-mode";

describe("parseRecordMode", () => {
  it("is off without ?record, even if other params are present", () => {
    expect(parseRecordMode("?autoplay&date=2026-10-01")).toMatchObject({ enabled: false, autoplay: false, date: null });
  });

  it("enables a clean frame with ?record", () => {
    expect(parseRecordMode("?record")).toEqual({
      enabled: true,
      autoplay: false,
      speed: DEFAULT_RECORD_SPEED,
      date: null,
    });
  });

  it("reads autoplay and clamps speed", () => {
    expect(parseRecordMode("?record&autoplay&speed=200")).toMatchObject({ autoplay: true, speed: 200 });
    expect(parseRecordMode("?record&speed=5").speed).toBe(40);
    expect(parseRecordMode("?record&speed=9999").speed).toBe(600);
    expect(parseRecordMode("?record&speed=abc").speed).toBe(DEFAULT_RECORD_SPEED);
  });

  it("treats zone-less dates as WAT", () => {
    expect(parseRecordMode("?record&date=2026-10-01T00:00:05").date?.toISOString()).toBe("2026-09-30T23:00:05.000Z");
    expect(parseRecordMode("?record&date=2026-10-01").date?.toISOString()).toBe("2026-09-30T23:00:00.000Z");
  });

  it("respects explicit zones and rejects garbage", () => {
    expect(parseRecordMode("?record&date=2026-10-01T00:00:00Z").date?.toISOString()).toBe("2026-10-01T00:00:00.000Z");
    expect(parseRecordMode("?record&date=nope").date).toBeNull();
  });
});
