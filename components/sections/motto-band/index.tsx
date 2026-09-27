import { MottoBand as Band } from "./motto-band.client";

const MOTTO = ["Unity and Faith", "Peace and Progress"] as const;
// Flag meaning per "Flag of Nigeria": green for agriculture, white for peace and unity.
const COLOURS = ["Green for agriculture", "White for peace and unity", "Green for agriculture"] as const;

/** Two counter-scrolling bands: the national motto and the meaning of the flag. */
export function MottoBand() {
  return (
    <div className="border-y border-snow/10 py-10 sm:py-14">
      <Band phrases={MOTTO} />
      <Band phrases={COLOURS} reverse />
    </div>
  );
}
