import { describe, expect, it } from "vitest";
import { parseMotionPreference, resolveMotionLevel, MOTION_PREF_KEY } from "@/lib/motion-preference";
import { GATE_SCRIPT, INTRO_SEEN_KEY } from "./intro-gate-script";

interface Env {
  search?: string;
  pref?: string | null;
  seen?: boolean;
  systemReduces?: boolean;
  storageThrows?: boolean;
}

/** Executes the real inline script against a fake browser and returns the <html> classes. */
function runGate({ search = "", pref = null, seen = false, systemReduces = false, storageThrows = false }: Env) {
  const classes = new Set<string>();
  const storage = (value: string | null) => ({
    getItem: () => {
      if (storageThrows) throw new Error("blocked");
      return value;
    },
  });
  const run = new Function("document", "location", "localStorage", "sessionStorage", "matchMedia", GATE_SCRIPT);
  run(
    { documentElement: { classList: { add: (c: string) => classes.add(c) } } },
    { search },
    storage(pref),
    storage(seen ? "1" : null),
    () => ({ matches: systemReduces }),
  );
  return classes;
}

describe("gate script", () => {
  it("default visitor: full motion, intro plays", () => {
    expect([...runGate({})]).toEqual(["js"]);
  });

  it("OS reduce-motion: gentle, intro skipped", () => {
    const c = runGate({ systemReduces: true });
    expect(c.has("motion-gentle")).toBe(true);
    expect(c.has("intro-skip")).toBe(true);
  });

  it("visitor opted into full motion despite the OS setting", () => {
    const c = runGate({ systemReduces: true, pref: "full" });
    expect(c.has("motion-full")).toBe(true);
    expect(c.has("motion-gentle")).toBe(false);
    expect(c.has("intro-skip")).toBe(false);
  });

  it("visitor opted into gentle motion", () => {
    expect(runGate({ pref: "gentle" }).has("motion-gentle")).toBe(true);
  });

  it("intro only once per session", () => {
    expect(runGate({ seen: true }).has("intro-skip")).toBe(true);
  });

  it("recording mode: full motion and intro, whatever the settings", () => {
    const c = runGate({ search: "?record", systemReduces: true, pref: "gentle", seen: true });
    expect(c.has("record")).toBe(true);
    expect(c.has("motion-gentle")).toBe(false);
    expect(c.has("intro-skip")).toBe(false);
  });

  it("blocked storage still resolves motion from the OS setting", () => {
    expect(runGate({ storageThrows: true, systemReduces: true }).has("motion-gentle")).toBe(true);
    expect(runGate({ storageThrows: true }).has("motion-gentle")).toBe(false);
  });

  it("uses the shared storage keys", () => {
    expect(GATE_SCRIPT).toContain(MOTION_PREF_KEY);
    expect(GATE_SCRIPT).toContain(INTRO_SEEN_KEY);
  });

  it("agrees with resolveMotionLevel for every combination", () => {
    for (const pref of [null, "full", "gentle", "junk"]) {
      for (const systemReduces of [false, true]) {
        for (const recording of [false, true]) {
          const script = runGate({ pref, systemReduces, search: recording ? "?record" : "" }).has("motion-gentle");
          const lib =
            resolveMotionLevel({ preference: parseMotionPreference(pref), systemReducesMotion: systemReduces, recording }) ===
            "gentle";
          expect(script, `pref=${pref} sys=${systemReduces} rec=${recording}`).toBe(lib);
        }
      }
    }
  });
});
