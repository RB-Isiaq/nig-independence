import { MottoBand as Band } from "./motto-band.client";

const MOTTO = ["Unity and Faith", "Peace and Progress"] as const;
const COLOURS = ["Green for the land", "White for peace", "Green for the land"] as const;

/** Two counter-scrolling bands: the national motto and the meaning of the flag. */
export function MottoBand() {
  return (
    <div className="border-y border-snow/10 py-10 sm:py-14">
      <Band phrases={MOTTO} />
      <Band phrases={COLOURS} reverse />
    </div>
  );
}
