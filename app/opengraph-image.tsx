import { ImageResponse } from "next/og";
import { getHeroCopy } from "@/components/sections/hero/hero-copy";
import { getAnniversaryState } from "@/lib/anniversary";
import { getSnapshotTime } from "@/lib/snapshot";

export const alt = "Nigeria Independence Day: the anniversary, always up to date";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GREEN = "#008751";
const INK = "#03140c";
const SNOW = "#f7f5ef";

/** Share image that always shows the current anniversary (≤ ~15 min stale). */
export default async function OpengraphImage() {
  const copy = getHeroCopy(getAnniversaryState(new Date(await getSnapshotTime())));

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: INK, color: SNOW }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 72, flex: 1 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#19b374", textTransform: "uppercase" }}>
            {copy.eyebrow}
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24 }}>{copy.lead}</div>
          <div style={{ display: "flex", alignItems: "flex-start", fontSize: 260, fontWeight: 800, lineHeight: 0.9 }}>
            {copy.number}
            {copy.suffix && <span style={{ fontSize: 80, marginTop: 30 }}>{copy.suffix}</span>}
          </div>
          <div style={{ fontSize: 40, marginTop: 12, opacity: 0.8 }}>{copy.trail || "Independent since 1 October 1960"}</div>
        </div>
        <div style={{ display: "flex", width: 360, height: "100%" }}>
          <div style={{ flex: 1, background: GREEN }} />
          <div style={{ flex: 1, background: SNOW }} />
          <div style={{ flex: 1, background: GREEN }} />
        </div>
      </div>
    ),
    size,
  );
}
