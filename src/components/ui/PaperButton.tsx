"use client";

import Link from "next/link";
import { type MouseEventHandler, type ReactNode, useEffect, useRef } from "react";

interface PaperButtonProps {
  href: string;
  children: ReactNode;
  /** "ghost" is the quieter outline for secondary actions. */
  variant?: "paper" | "ghost";
  small?: boolean;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  /** Suggested filename; forces a download instead of navigation. */
  download?: string;
  className?: string;
  tabIndex?: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
}

/** The one CTA treatment: a slip of paper that tilts toward the pointer. */
export function PaperButton({
  href,
  children,
  variant = "paper",
  small,
  external,
  download,
  className = "",
  ...rest
}: PaperButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const glare = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: none)").matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-y * 20).toFixed(2)}deg) rotateY(${(x * 20).toFixed(2)}deg) scale(1.04)`;
      if (glare.current) {
        glare.current.style.opacity = "1";
        glare.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255, 255, 255, 0.28), transparent 60%)`;
      }
    };
    const leave = () => {
      el.style.transform = "";
      if (glare.current) glare.current.style.opacity = "0";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  const classes = `paper-btn paper-btn--${variant}${small ? " paper-btn--small" : ""} ${className}`;
  const inner = (
    <>
      {children}
      <span ref={glare} className="paper-btn__glare" aria-hidden="true" />
    </>
  );

  if (external || download || href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={classes} {...rest}>
      {inner}
    </Link>
  );
}
