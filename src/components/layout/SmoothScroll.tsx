"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Inertial scrolling for wheel and trackpad; touch keeps native scrolling. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // `anchors` makes same-page #links glide instead of jump.
    const lenis = new Lenis({ autoRaf: true, anchors: { duration: 1.6 } });
    return () => lenis.destroy();
  }, []);

  return null;
}
