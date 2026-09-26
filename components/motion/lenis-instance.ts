"use client";

import type Lenis from "lenis";

/** The page's Lenis instance, if smooth scrolling is active (null for reduced motion). */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
