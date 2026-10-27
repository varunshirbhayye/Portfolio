"use client";

import { type CSSProperties, type MouseEvent, type ReactNode, useEffect, useRef } from "react";

/** Keep in step with --stagger and the .skill__card transition in globals.css. */
const STAGGER_MS = 45;
const FLIP_MS = 700;

interface FlipDeckProps {
  className?: string;
  style?: CSSProperties;
  /** Id of the heading that names the list. */
  labelledBy?: string;
  children: ReactNode;
}

/**
 * The list behind the skills pyramid. The first time it scrolls into view the
 * cards turn from names to logos, top card first. Hover flips a card in CSS;
 * on touch screens a tap does. The list is one Tab stop: focusing it with the
 * keyboard turns every card to its name.
 */
export function FlipDeck({ className, style, labelledBy, children }: FlipDeckProps) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const deck = ref.current;
    if (!deck || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen or scrolled past (a reload mid-page): no intro.
    if (deck.getBoundingClientRect().top < window.innerHeight) return;

    deck.dataset.intro = "hold";
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        deck.dataset.intro = "play";
        // Drop the stagger afterwards so hover flips start at once.
        timer = window.setTimeout(() => delete deck.dataset.intro, deck.children.length * STAGGER_MS + FLIP_MS);
      },
      { threshold: 0.3 },
    );
    io.observe(deck);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      delete deck.dataset.intro;
    };
  }, []);

  const tap = (e: MouseEvent<HTMLUListElement>) => {
    if (window.matchMedia("(hover: hover)").matches) return;
    (e.target as Element).closest(".skill")?.toggleAttribute("data-flipped");
  };

  return (
    <ul ref={ref} className={className} style={style} aria-labelledby={labelledBy} tabIndex={0} onClick={tap}>
      {children}
    </ul>
  );
}
