"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { markIntroDone } from "@/components/motion/intro-signal";
import { INDEPENDENCE_DATE } from "@/lib/anniversary";
import { toLagosDate } from "@/lib/time/lagos";
import { INTRO_SEEN_KEY } from "./intro-gate-script";

/**
 * Full-screen opener: the year counts 1960 → today, then three flag-coloured
 * panels sweep up to reveal the page. Plays once per browser session.
 */
export function Intro({ serverNow }: { serverNow: string }) {
  const root = useRef<HTMLDivElement>(null);
  const year = useRef<HTMLSpanElement>(null);
  const [finished, setFinished] = useState(false);
  const targetYear = toLagosDate(new Date(serverNow)).year;

  useGSAP(
    () => {
      const skip = document.documentElement.classList.contains("intro-skip");
      const finish = () => {
        markIntroDone();
        setFinished(true);
      };
      if (skip) return finish();

      // Only a played intro counts as seen, so opting into full motion later still shows it.
      try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {}

      const text = year.current?.firstChild;
      const counter = { y: INDEPENDENCE_DATE.year };
      gsap
        .timeline({ onComplete: finish })
        .set("[data-intro=panel]", { yPercent: 100 })
        .from("[data-intro=label]", { autoAlpha: 0, y: 20, duration: 0.6, ease: "power3.out" })
        .to(
          counter,
          {
            y: targetYear,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (text) text.nodeValue = String(Math.round(counter.y));
            },
          },
          "<",
        )
        // Flag panels rise to cover the screen…
        .to("[data-intro=panel]", { yPercent: 0, duration: 0.8, ease: "expo.inOut", stagger: 0.08 }, "+=0.15")
        .addLabel("covered")
        .to("[data-intro=content]", { autoAlpha: 0, duration: 0.3 }, "covered-=0.5")
        .set(root.current, { backgroundColor: "transparent" }, "covered")
        // …then sweep away, handing over to the hero as they leave.
        .add(markIntroDone, "covered")
        .to("[data-intro=panel]", { yPercent: -100, duration: 1, ease: "expo.inOut", stagger: 0.08 }, "covered");
    },
    { scope: root },
  );

  if (finished) return null;

  return (
    <div ref={root} className="intro" aria-hidden>
      {(["green", "white", "green"] as const).map((band, i) => (
        <div key={i} data-intro="panel" data-band={band} className="intro__panel" />
      ))}
      <div data-intro="content" className="intro__content">
        <p data-intro="label" className="eyebrow">Independence · Nigeria</p>
        <span ref={year} className="intro__year font-display">
          {INDEPENDENCE_DATE.year}
        </span>
      </div>
    </div>
  );
}
