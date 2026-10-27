"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { navItems, profile } from "@/content/profile";
import { asset } from "@/lib/site";
import { PaperButton } from "../ui/PaperButton";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/**
 * True once the hero copy scrolls up to the bar (always, on other pages). The
 * margin covers the bar's fade, so the name never shows through the links.
 */
function pastHero() {
  const copy = document.querySelector("#about .hero__content");
  const bar = document.querySelector(".nav");
  return !copy || !bar || copy.getBoundingClientRect().top < bar.getBoundingClientRect().bottom + 24;
}

/** The section at the top third of the screen; at the very bottom, the last one. */
function currentSection() {
  const last = navItems.at(-1)!.id;
  const root = document.documentElement;
  if (document.getElementById(last) && window.scrollY + window.innerHeight >= root.scrollHeight - 4) return last;
  let current = "";
  for (const { id } of navItems) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight / 3) current = id;
  }
  return current;
}

export function Nav() {
  const solid = useSyncExternalStore(subscribeScroll, pastHero, () => false);
  const active = useSyncExternalStore(subscribeScroll, currentSection, () => "");
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);

  // The phone menu closes on Escape, on a tap outside it, and when the screen
  // grows wide enough for the inline links.
  useEffect(() => {
    if (!open) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onPointer = (e: PointerEvent) => !header.current?.contains(e.target as Node) && close();
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    wide.addEventListener("change", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      wide.removeEventListener("change", close);
    };
  }, [open]);

  // Plain anchors: Lenis glides to same-page hashes.
  const links = (className: string) =>
    navItems.map(({ id, label }) => (
      <a
        key={id}
        href={asset(`/#${id}`)}
        className={className}
        aria-current={active === id ? "location" : undefined}
        onClick={() => setOpen(false)}
      >
        {label}
      </a>
    ));

  return (
    <header ref={header} className={`nav${solid || open ? " nav--solid" : ""}`}>
      <Link href="/" className="nav__logo-link">
        <span className="nav__name">{profile.name}</span>
        <span className="nav__logo-suffix">/portfolio</span>
      </Link>
      <div className="nav__right">
        <nav aria-label="Primary" className="nav__links">
          {links("nav__link")}
        </nav>
        <PaperButton href={asset(profile.resume.href)} download={profile.resume.fileName} small>
          Resume
        </PaperButton>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
        </button>
      </div>
      <nav id="nav-menu" aria-label="Primary" className="nav__menu" hidden={!open}>
        {links("nav__menu-link")}
      </nav>
    </header>
  );
}
