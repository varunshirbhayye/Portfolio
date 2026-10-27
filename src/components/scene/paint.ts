// Procedural art for the stage: a lamplit desk, a monitor, and a rainy city
// through the window. Everything is drawn in a 1600 × 900 design space and
// cover-fitted to each layer, so the composition crops like object-fit: cover.

export const DESIGN_W = 1600;
export const DESIGN_H = 900;

export interface Mapping {
  s: number;
  ox: number;
  oy: number;
}

/** Cover-fit of the design space into a w × h box, anchored on a focal point. */
export function coverMap(w: number, h: number, focalX = 0.56, focalY = 0.5): Mapping {
  const s = Math.max(w / DESIGN_W, h / DESIGN_H);
  return { s, ox: (w - DESIGN_W * s) * focalX, oy: (h - DESIGN_H * s) * focalY };
}

// Deterministic randomness keeps the skyline identical between paints.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T>(r: () => number, weighted: [T, number][]) => {
  let v = r();
  for (const [item, w] of weighted) {
    if ((v -= w) <= 0) return item;
  }
  return weighted[weighted.length - 1][0];
};

// ─── Geometry (design px) ───

export const WINDOW = { left: 690, top: 40, sill: 712, frame: 26, mullion: 1172, mullionW: 22 };
export const PANES = [
  { x: WINDOW.left + WINDOW.frame, y: WINDOW.top + WINDOW.frame, w: WINDOW.mullion - WINDOW.left - WINDOW.frame, h: WINDOW.sill - WINDOW.top - WINDOW.frame },
  { x: WINDOW.mullion + WINDOW.mullionW, y: WINDOW.top + WINDOW.frame, w: 520, h: WINDOW.sill - WINDOW.top - WINDOW.frame },
];
export const MONITOR = { x: 210, y: 486, w: 330, h: 208 };
const DESK_TOP = 772;

function clipToPanes(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  for (const p of PANES) ctx.rect(p.x, p.y, p.w, p.h);
  ctx.clip();
}

// ─── City ───

interface Building {
  x: number;
  w: number;
  top: number;
  far: boolean;
}

let cachedBuildings: Building[] | null = null;

function buildings() {
  if (cachedBuildings) return cachedBuildings;
  const r = rng(2347);
  const list: Building[] = [];
  for (let x = 660; x < 1760; ) {
    const w = 34 + r() * 70;
    list.push({ x, w, top: 400 + r() * 210, far: true });
    x += w + r() * 10;
  }
  for (let x = 640; x < 1760; ) {
    const w = 52 + r() * 96;
    const tower = r() < 0.22;
    list.push({ x, w, top: tower ? 170 + r() * 120 : 330 + r() * 250, far: false });
    x += w + 6 + r() * 34;
  }
  cachedBuildings = list;
  return list;
}

export function paintCity(ctx: CanvasRenderingContext2D) {
  const all = buildings();
  for (const b of all.filter((b) => b.far)) {
    ctx.fillStyle = "#0b0f19";
    ctx.fillRect(b.x, b.top, b.w, DESIGN_H - b.top);
  }
  // Haze between the rows sells the depth.
  const haze = ctx.createLinearGradient(0, 430, 0, 720);
  haze.addColorStop(0, "rgba(70, 64, 70, 0)");
  haze.addColorStop(1, "rgba(70, 58, 50, 0.32)");
  ctx.fillStyle = haze;
  ctx.fillRect(640, 430, 1120, 290);
  for (const b of all.filter((b) => !b.far)) {
    ctx.fillStyle = "#06070c";
    ctx.fillRect(b.x, b.top, b.w, DESIGN_H - b.top);
    // A faint cold rim where the sky catches the roofline.
    ctx.fillStyle = "rgba(120, 140, 180, 0.08)";
    ctx.fillRect(b.x, b.top, b.w, 1.5);
  }
}

export function paintCityLights(ctx: CanvasRenderingContext2D) {
  const r = rng(611);
  const colours: [string, number][] = [
    ["243, 197, 126", 0.56],
    ["246, 231, 200", 0.3],
    ["159, 188, 255", 0.11],
    ["127, 224, 208", 0.03],
  ];
  for (const b of buildings()) {
    const sx = b.far ? 7 : 10;
    const sy = b.far ? 9 : 13;
    const ww = b.far ? 2.6 : 3.6;
    const wh = b.far ? 3.6 : 5.4;
    // Some towers are nearly dark, others still have whole floors working late.
    let odds = b.far ? 0.08 + r() * 0.16 : 0.05 + r() * 0.26;
    if (r() < 0.22) odds *= 0.3;
    for (let y = b.top + 8; y < WINDOW.sill + 10; y += sy) {
      const litFloor = r() < 0.03;
      for (let x = b.x + 5; x < b.x + b.w - ww - 3; x += sx) {
        if (!litFloor && r() > odds) continue;
        ctx.fillStyle = `rgba(${pick(r, colours)}, ${(0.35 + r() * 0.6) * (b.far ? 0.7 : 1)})`;
        ctx.fillRect(x, y, ww, wh);
      }
    }
  }
  // Street-level glitter along the horizon.
  for (let i = 0; i < 170; i++) {
    const x = 700 + r() * 1000;
    const y = 600 + r() * 120;
    ctx.fillStyle = `rgba(${pick(r, colours.slice(0, 2))}, ${0.25 + r() * 0.55})`;
    ctx.beginPath();
    ctx.arc(x, y, 0.6 + r() * 1.1, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Red aircraft-warning lights on the tallest towers. */
export function paintBeacons(ctx: CanvasRenderingContext2D) {
  const towers = buildings()
    .filter((b) => !b.far)
    .sort((a, b) => a.top - b.top)
    .slice(0, 3);
  for (const t of towers) {
    const x = t.x + t.w / 2;
    const y = t.top - 4;
    const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
    g.addColorStop(0, "rgba(255, 90, 70, 0.9)");
    g.addColorStop(0.25, "rgba(255, 70, 50, 0.35)");
    g.addColorStop(1, "rgba(255, 60, 40, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - 14, y - 14, 28, 28);
  }
}

/** Out-of-focus street lights, soft discs added on top of each other. */
export function paintBokeh(ctx: CanvasRenderingContext2D) {
  const r = rng(905);
  const colours: [string, number][] = [
    ["232, 168, 90", 0.42],
    ["243, 214, 160", 0.22],
    ["255, 150, 74", 0.14],
    ["143, 176, 255", 0.14],
    ["255, 90, 74", 0.08],
  ];
  ctx.save();
  clipToPanes(ctx);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 40; i++) {
    const x = 700 + r() * 1000;
    const y = 520 + r() * 210;
    const rad = 8 + r() * 24;
    const a = 0.07 + r() * 0.14;
    const c = pick(r, colours);
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, `rgba(${c}, ${a * 0.8})`);
    g.addColorStop(0.72, `rgba(${c}, ${a})`);
    g.addColorStop(0.86, `rgba(${c}, ${a * 0.55})`);
    g.addColorStop(1, `rgba(${c}, 0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/** Water on the glass: beads that catch the lamp, a few with trails. */
export function paintGlass(ctx: CanvasRenderingContext2D) {
  const r = rng(77);
  ctx.save();
  clipToPanes(ctx);
  for (let i = 0; i < 280; i++) {
    const p = PANES[i % 2];
    const x = p.x + r() * p.w;
    const y = p.y + r() * p.h;
    const rad = 0.8 + r() * r() * 3.4;
    if (i < 16) {
      const len = 30 + r() * 110;
      const trail = ctx.createLinearGradient(x, y - len, x, y);
      trail.addColorStop(0, "rgba(200, 215, 240, 0)");
      trail.addColorStop(1, "rgba(200, 215, 240, 0.07)");
      ctx.strokeStyle = trail;
      ctx.lineWidth = rad * 0.9;
      ctx.beginPath();
      ctx.moveTo(x + (r() - 0.5) * 6, y - len);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(4, 5, 9, 0.28)";
    ctx.beginPath();
    ctx.arc(x, y + rad * 0.25, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(205, 218, 240, 0.09)";
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(250, 228, 190, ${0.18 + r() * 0.3})`;
    ctx.beginPath();
    ctx.arc(x - rad * 0.35, y - rad * 0.35, Math.max(0.5, rad * 0.32), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ─── The room ───

export function paintRoom(ctx: CanvasRenderingContext2D) {
  // Wall, warmer near the lamp.
  const wall = ctx.createLinearGradient(0, 0, DESIGN_W, 0);
  wall.addColorStop(0, "#21170e");
  wall.addColorStop(0.35, "#150f09");
  wall.addColorStop(1, "#0c0906");
  ctx.fillStyle = wall;
  ctx.fillRect(-600, -400, DESIGN_W + 1200, DESIGN_H + 800);
  const ceiling = ctx.createLinearGradient(0, -400, 0, 420);
  ceiling.addColorStop(0, "rgba(5, 3, 2, 0.9)");
  ceiling.addColorStop(1, "rgba(5, 3, 2, 0)");
  ctx.fillStyle = ceiling;
  ctx.fillRect(-600, -400, DESIGN_W + 1200, 820);

  // Window: cut the panes out, then draw the frame around them.
  for (const p of PANES) ctx.clearRect(p.x, p.y, p.w, p.h);
  const { left, top, sill, frame, mullion, mullionW } = WINDOW;
  ctx.fillStyle = "#0a0705";
  ctx.fillRect(left, top, DESIGN_W + 600 - left, frame);
  ctx.fillRect(left, top, frame, sill - top);
  ctx.fillRect(mullion, top, mullionW, sill - top);
  // Lamp light grazing the frame faces that point back into the room.
  const rim = ctx.createLinearGradient(0, sill, 0, top);
  rim.addColorStop(0, "rgba(217, 163, 83, 0.4)");
  rim.addColorStop(1, "rgba(217, 163, 83, 0.04)");
  ctx.fillStyle = rim;
  ctx.fillRect(mullion, top + frame, 2, sill - top - frame);
  ctx.fillRect(left, top, 2, sill - top);
  // Inner shadow where the glass meets the frame.
  for (const p of PANES) {
    const shade = ctx.createLinearGradient(p.x, 0, p.x + 26, 0);
    shade.addColorStop(0, "rgba(0, 0, 0, 0.55)");
    shade.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = shade;
    ctx.fillRect(p.x, p.y, 26, p.h);
  }
  // Sill, lit along its top face.
  ctx.fillStyle = "#0d0906";
  ctx.fillRect(left - 18, sill, DESIGN_W + 600 - left, 30);
  const sillLight = ctx.createLinearGradient(left, 0, DESIGN_W, 0);
  sillLight.addColorStop(0, "rgba(217, 163, 83, 0.34)");
  sillLight.addColorStop(1, "rgba(217, 163, 83, 0.04)");
  ctx.fillStyle = sillLight;
  ctx.fillRect(left - 18, sill, DESIGN_W + 600 - left, 3);

  // Monitor glow spilling onto the wall.
  const glow = ctx.createRadialGradient(375, 590, 20, 375, 590, 320);
  glow.addColorStop(0, "rgba(60, 110, 230, 0.22)");
  glow.addColorStop(1, "rgba(60, 110, 230, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(40, 260, 680, 640);

  paintLampFixture(ctx);
  paintDesk(ctx);
  paintMonitor(ctx);
}

function paintLampFixture(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "#090604";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-60, 210);
  ctx.lineTo(48, 312);
  ctx.stroke();
  ctx.fillStyle = "#0b0805";
  ctx.beginPath();
  ctx.moveTo(26, 318);
  ctx.lineTo(96, 296);
  ctx.lineTo(176, 420);
  ctx.quadraticCurveTo(110, 452, 38, 440);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(217, 163, 83, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(96, 296);
  ctx.lineTo(176, 420);
  ctx.stroke();
  // The bulb's mouth.
  ctx.save();
  ctx.shadowColor = "rgba(255, 190, 110, 0.9)";
  ctx.shadowBlur = 40;
  ctx.fillStyle = "rgba(255, 226, 170, 0.95)";
  ctx.beginPath();
  ctx.ellipse(108, 432, 66, 10, -0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function paintDesk(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#0f0a06";
  ctx.fillRect(-600, DESK_TOP, DESIGN_W + 1200, DESIGN_H + 400 - DESK_TOP);
  const edge = ctx.createLinearGradient(0, 0, DESIGN_W, 0);
  edge.addColorStop(0, "rgba(217, 163, 83, 0.42)");
  edge.addColorStop(0.6, "rgba(217, 163, 83, 0.1)");
  edge.addColorStop(1, "rgba(217, 163, 83, 0.03)");
  ctx.fillStyle = edge;
  ctx.fillRect(-600, DESK_TOP, DESIGN_W + 1200, 2);
  const pool = ctx.createRadialGradient(170, 820, 10, 170, 820, 520);
  pool.addColorStop(0, "rgba(236, 168, 88, 0.3)");
  pool.addColorStop(1, "rgba(236, 168, 88, 0)");
  ctx.fillStyle = pool;
  ctx.fillRect(-400, DESK_TOP, 1200, 500);

  // Keyboard, faintly backlit.
  ctx.fillStyle = "#0a0a0d";
  ctx.beginPath();
  ctx.moveTo(246, 800);
  ctx.lineTo(506, 800);
  ctx.lineTo(526, 828);
  ctx.lineTo(226, 828);
  ctx.closePath();
  ctx.fill();
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 18; col++) {
      const x = 254 + col * 14.2 - row * 2.6;
      const y = 804 + row * 6.4;
      ctx.fillStyle = `rgba(120, 165, 255, ${0.1 + ((col * 7 + row * 3) % 5) * 0.025})`;
      ctx.fillRect(x, y, 10, 3);
    }
  }
  ctx.fillStyle = "#0a0a0d";
  ctx.beginPath();
  ctx.ellipse(568, 814, 14, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mug.
  const mug = ctx.createLinearGradient(640, 0, 694, 0);
  mug.addColorStop(0, "#3a2a19");
  mug.addColorStop(0.3, "#140e09");
  mug.addColorStop(1, "#090604");
  ctx.fillStyle = mug;
  ctx.fillRect(640, 712, 54, 62);
  ctx.strokeStyle = "#0b0805";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(698, 742, 14, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();
  ctx.fillStyle = "#1c140c";
  ctx.beginPath();
  ctx.ellipse(667, 712, 27, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#070503";
  ctx.beginPath();
  ctx.ellipse(667, 713, 22, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Open notebook and pen.
  ctx.fillStyle = "#1d150c";
  ctx.beginPath();
  ctx.moveTo(1176, 792);
  ctx.lineTo(1414, 788);
  ctx.lineTo(1438, 836);
  ctx.lineTo(1154, 840);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(217, 163, 83, 0.12)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 6; i++) {
    const y = 792 + i * 8;
    ctx.beginPath();
    ctx.moveTo(1176 - i * 3.6, y);
    ctx.lineTo(1414 + i * 4, y - 0.6);
    ctx.stroke();
  }
  ctx.strokeStyle = "#060403";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(1250, 806);
  ctx.lineTo(1370, 826);
  ctx.stroke();
  ctx.strokeStyle = "rgba(217, 163, 83, 0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(1250, 804);
  ctx.lineTo(1370, 824);
  ctx.stroke();
}

function paintMonitor(ctx: CanvasRenderingContext2D) {
  const { x, y, w, h } = MONITOR;
  const cx = x + w / 2;
  // Stand.
  ctx.fillStyle = "#070606";
  ctx.fillRect(cx - 13, y + h, 26, DESK_TOP - (y + h) + 4);
  ctx.beginPath();
  ctx.ellipse(cx, DESK_TOP + 4, 70, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  // Body and screen.
  ctx.fillStyle = "#060606";
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 8);
  ctx.fill();
  const sx = x + 9;
  const sy = y + 9;
  const sw = w - 18;
  const sh = h - 18;
  const screen = ctx.createRadialGradient(cx, y + h * 0.42, 10, cx, y + h * 0.42, w * 0.7);
  screen.addColorStop(0, "#21489a");
  screen.addColorStop(0.55, "#112c66");
  screen.addColorStop(1, "#08142f");
  ctx.fillStyle = screen;
  ctx.fillRect(sx, sy, sw, sh);
  // Code, too small to read from the chair.
  const r = rng(4711);
  for (let i = 0; i < 15; i++) {
    let lx = sx + 14 + Math.floor(r() * 4) * 11;
    const ly = sy + 12 + i * 11.2;
    const parts = 1 + Math.floor(r() * 4);
    for (let p = 0; p < parts && lx < sx + sw - 30; p++) {
      const len = 12 + r() * 52;
      const tint = r();
      ctx.fillStyle =
        tint < 0.12 ? "rgba(240, 190, 110, 0.45)" : tint < 0.2 ? "rgba(130, 230, 210, 0.36)" : "rgba(200, 220, 255, 0.36)";
      ctx.fillRect(lx, ly, Math.min(len, sx + sw - 16 - lx), 2.8);
      lx += len + 6;
    }
  }
  const glare = ctx.createLinearGradient(sx, sy, sx + sw, sy + sh);
  glare.addColorStop(0, "rgba(255, 255, 255, 0.07)");
  glare.addColorStop(0.45, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = glare;
  ctx.fillRect(sx, sy, sw, sh);
}

/** The desk lamp's light, kept on its own layer so dawn can dim it. */
export function paintLampGlow(ctx: CanvasRenderingContext2D) {
  const g = ctx.createRadialGradient(110, 470, 20, 110, 470, 820);
  g.addColorStop(0, "rgba(240, 172, 92, 0.42)");
  g.addColorStop(0.4, "rgba(217, 140, 64, 0.14)");
  g.addColorStop(1, "rgba(217, 140, 64, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(-700, -400, 1900, 1700);
  const cone = ctx.createRadialGradient(150, 780, 10, 150, 780, 420);
  cone.addColorStop(0, "rgba(255, 196, 120, 0.22)");
  cone.addColorStop(1, "rgba(255, 196, 120, 0)");
  ctx.fillStyle = cone;
  ctx.fillRect(-300, 360, 900, 840);
}

// ─── Rain ───

export interface Drop {
  x: number;
  y: number;
  len: number;
  speed: number;
  drift: number;
  alpha: number;
}

export function resetDrop(d: Drop, r: () => number, anywhere: boolean) {
  const p = PANES[r() < 0.48 ? 0 : 1];
  d.x = p.x + r() * p.w;
  d.y = anywhere ? p.y + r() * p.h : p.y - 40;
  d.len = 14 + r() * 42;
  d.speed = 1.6 + r() * 4.4;
  d.drift = (r() - 0.5) * 0.3;
  d.alpha = 0.05 + r() * 0.12;
}

export function paintRain(ctx: CanvasRenderingContext2D, drops: Drop[], intensity: number, r: () => number) {
  ctx.save();
  clipToPanes(ctx);
  ctx.strokeStyle = "rgb(190, 205, 228)";
  ctx.lineWidth = 1;
  for (const d of drops) {
    ctx.globalAlpha = d.alpha * intensity;
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x + d.drift * d.len * 0.2, d.y + d.len);
    ctx.stroke();
    d.y += d.speed;
    d.x += d.drift;
    if (d.y - d.len > WINDOW.sill) resetDrop(d, r, false);
  }
  ctx.restore();
}
