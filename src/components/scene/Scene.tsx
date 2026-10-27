"use client";

import { useEffect, useRef } from "react";
import {
  coverMap,
  type Drop,
  type Mapping,
  paintBeacons,
  paintBokeh,
  paintCity,
  paintCityLights,
  paintGlass,
  paintLampGlow,
  paintRain,
  paintRoom,
  resetDrop,
} from "./paint";

/** Layers overhang the scene by this fraction on every side (see .scene__layer). */
const BLEED = 0.04;

interface LayerSpec {
  name: string;
  /** 0 is the far skyline, 1 is the desk; nearer layers move more. */
  depth: number;
  paint?: (ctx: CanvasRenderingContext2D) => void;
  /** Resolution relative to the screen; soft layers render small. */
  res?: number;
}

const LAYERS: LayerSpec[] = [
  { name: "sky", depth: 0.2 },
  { name: "city", depth: 0.4, paint: paintCity },
  { name: "lights", depth: 0.4, paint: paintCityLights },
  { name: "beacons", depth: 0.4, paint: paintBeacons, res: 0.5 },
  { name: "bokeh", depth: 0.65, paint: paintBokeh, res: 0.5 },
  { name: "glass", depth: 1, paint: paintGlass },
  { name: "rain", depth: 1, res: 0.8 },
  { name: "room", depth: 1, paint: paintRoom },
  { name: "lamp", depth: 1, paint: paintLampGlow, res: 0.35 },
];

/** The lamplit desk and rainy city behind the first screen. */
export function Scene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    const layers = LAYERS.map((spec) => {
      const el = root.querySelector<HTMLElement>(`[data-layer="${spec.name}"]`)!;
      return { spec, el, canvas: el.querySelector("canvas") };
    });
    const rain = layers.find((l) => l.spec.name === "rain")!.canvas!;
    const rainCtx = rain.getContext("2d")!;
    let rainMap: Mapping = { s: 1, ox: 0, oy: 0 };
    let rainRes = 1;
    let painted = { w: 0, h: 0 };

    const paint = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      painted = { w, h };
      const bw = w * (1 + 2 * BLEED);
      const bh = h * (1 + 2 * BLEED);
      const map = coverMap(bw, bh);
      const base = Math.min(window.devicePixelRatio || 1, 1.5);
      for (const { spec, canvas } of layers) {
        if (!canvas) continue;
        const res = base * (spec.res ?? 1);
        canvas.width = Math.round(bw * res);
        canvas.height = Math.round(bh * res);
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.setTransform(res * map.s, 0, 0, res * map.s, res * map.ox, res * map.oy);
        spec.paint?.(ctx);
        if (canvas === rain) {
          rainMap = map;
          rainRes = res;
        }
      }
    };
    paint();

    // Mobile URL bars nudge the height; only repaint for real resizes.
    const resize = new ResizeObserver(() => {
      if (root.clientWidth !== painted.w || Math.abs(root.clientHeight - painted.h) > 120) paint();
    });
    resize.observe(root);

    if (reduced) return () => resize.disconnect();

    const drops: Drop[] = Array.from({ length: 80 }, () => {
      const d = { x: 0, y: 0, len: 0, speed: 0, drift: 0, alpha: 0 };
      resetDrop(d, Math.random, true);
      return d;
    });

    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!touch) window.addEventListener("mousemove", onMouse, { passive: true });

    // Only animate while the scene is on screen.
    let frame: number | null = null;
    let easedX = 0;
    let easedY = 0;
    let lastRain = 0;
    const start = performance.now();

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      easedX += 0.04 * (mouseX - easedX);
      easedY += 0.04 * (mouseY - easedY);
      // A slow settle as the page opens.
      const settle = 1 + 0.06 * (1 - Math.min(1, (now - start) / 1700)) ** 3;
      for (const { spec, el } of layers) {
        const k = spec.depth;
        const scale = 1 + (settle - 1) * (0.55 + 0.45 * k);
        el.style.transform = `scale(${scale.toFixed(4)}) translate(${(-7 * easedX * k).toFixed(1)}px, ${(-5 * easedY * k).toFixed(1)}px)`;
      }
      if (now - lastRain < 1000 / 30) return;
      lastRain = now;
      rainCtx.setTransform(1, 0, 0, 1, 0, 0);
      rainCtx.clearRect(0, 0, rain.width, rain.height);
      rainCtx.setTransform(rainRes * rainMap.s, 0, 0, rainRes * rainMap.s, rainRes * rainMap.ox, rainRes * rainMap.oy);
      paintRain(rainCtx, drops, 0.85, Math.random);
    };

    const visible = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && frame === null) frame = requestAnimationFrame(tick);
      if (!entry.isIntersecting && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    });
    visible.observe(root);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      visible.disconnect();
      resize.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div ref={rootRef} className="scene" aria-hidden="true">
      {LAYERS.map(({ name }) => (
        <div key={name} data-layer={name} className="scene__layer">
          {name === "sky" ? <div className="scene__sky" /> : <canvas />}
        </div>
      ))}
      <div className="scene__scrim" />
    </div>
  );
}
