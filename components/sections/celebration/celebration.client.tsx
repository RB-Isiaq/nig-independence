"use client";

import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import { getMotionLevel } from "@/components/motion/gsap";
import { onIntroDone } from "@/components/motion/intro-signal";
import type { CelebrationPhase } from "@/lib/anniversary";
import {
  burstAt,
  celebrationPalette,
  finaleShow,
  firework,
  nextAmbientDelayMs,
  openingShow,
  type Cue,
} from "@/lib/celebration/bursts";

interface CelebrationProps {
  phase: CelebrationPhase;
  jubilee: boolean;
}

type Fire = (options: confetti.Options) => void;

/**
 * 1 October effects (full motion only):
 * - opening show when the page opens on the day
 * - a bigger finale if the viewer is watching when the date flips at midnight
 * - an occasional firework while the hero is on screen, and one wherever the hero is tapped
 * Renders nothing: the canvas is created imperatively, because a worker-backed
 * canvas can only be transferred once (React dev mode re-runs effects).
 */
export function Celebration({ phase, jubilee }: CelebrationProps) {
  const fire = useRef<Fire | null>(null);
  const play = useRef<((cues: Cue[]) => void) | null>(null);
  const introDone = useRef(false);
  const lastPhase = useRef(phase);
  const phaseNow = useRef(phase);
  const jubileeNow = useRef(jubilee);
  const colors = () => celebrationPalette(jubileeNow.current);

  useEffect(() => {
    jubileeNow.current = jubilee;
  }, [jubilee]);

  // Canvas + opening show once the intro has finished.
  useEffect(() => {
    if (getMotionLevel() !== "full") return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.className = "pointer-events-none fixed inset-0 z-40 size-full";
    document.body.appendChild(canvas);
    const instance = confetti.create(canvas, { resize: true, useWorker: true });
    fire.current = (options) => void instance(options);

    const timers = new Set<ReturnType<typeof setTimeout>>();
    play.current = (cues: Cue[]) =>
      cues.forEach(({ atMs, options }) => {
        const t = setTimeout(() => {
          timers.delete(t);
          fire.current?.(options);
        }, atMs);
        timers.add(t);
      });

    const unsubscribe = onIntroDone(() => {
      introDone.current = true;
      lastPhase.current = phaseNow.current;
      if (phaseNow.current === "celebration") play.current?.(openingShow(Math.random, colors()));
    });

    return () => {
      unsubscribe();
      timers.forEach(clearTimeout);
      instance.reset();
      canvas.remove();
      fire.current = null;
      play.current = null;
    };
  }, []);

  // The midnight flip, seen live: approaching → celebration.
  useEffect(() => {
    phaseNow.current = phase;
    if (!introDone.current) return;
    if (phase === "celebration" && lastPhase.current !== "celebration") {
      play.current?.(finaleShow(Math.random, colors()));
    }
    lastPhase.current = phase;
  }, [phase]);

  // All day: ambient fireworks while the hero is visible, and tap-to-launch.
  useEffect(() => {
    if (phase !== "celebration" || getMotionLevel() !== "full") return;
    const hero = document.querySelector(".hero");
    if (!hero) return;

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    observer.observe(hero);

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        if (visible && !document.hidden && introDone.current) fire.current?.(firework(Math.random, colors()));
        schedule();
      }, nextAmbientDelayMs(Math.random));
    };
    schedule();

    const onTap = (e: PointerEvent) => {
      const target = e.target as Element;
      if (!target.closest(".hero") || target.closest("a, button")) return;
      fire.current?.(burstAt(e.clientX / window.innerWidth, e.clientY / window.innerHeight, colors()));
    };
    window.addEventListener("pointerdown", onTap);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("pointerdown", onTap);
    };
  }, [phase]);

  return null;
}
