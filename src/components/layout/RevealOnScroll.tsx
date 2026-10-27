"use client";

import { useEffect } from "react";

/**
 * Fades [data-reveal] blocks up the first time they scroll into view. Blocks
 * already on screen are left alone, and without JavaScript or with reduced
 * motion everything is simply visible.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "shown");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of document.querySelectorAll("[data-reveal]")) {
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      el.setAttribute("data-reveal", "hidden");
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return null;
}
