import React from "react";
import type { Style } from "@sceneparts/core";

// Ink sketch style: hand-drawn black ink line on warm off-white paper, one loose watercolour accent wash.
// Parts draw outlines in INK, fill with PAPER (hides overlaps) and add soft washes with <Wash>.
// The engine adds the line wobble (boil), so no boil is set here.

export const INK = "#1f1c1a";
export const PAPER = "#f7f2e7";
export const ACCENT = "#e86f51";
export const LW = 7;

export const WASH: Record<string, string> = {
  coral: "#e8836a", red: "#c9463d", orange: "#e9963f", yellow: "#f0cf5a", green: "#7fae6a", teal: "#4f9c97",
  blue: "#5b86c4", navy: "#34497a", violet: "#8c6bb3", pink: "#eb9ab5", brown: "#8a6246", grey: "#9a9790", black: "#3a3634",
};
export const SKIN: Record<string, string> = { light: "#f6dcc4", fair: "#ecc49f", tan: "#d9a077", medium: "#bb8059", brown: "#8d5a3b", dark: "#5e3b26" };
export const HAIR: Record<string, string> = {
  black: "#2a2624", brown: "#6e4a2e", auburn: "#8f3f22", blonde: "#e2c070", red: "#c4582f", grey: "#a9a7a2",
  white: "#d6d2c8", blue: "#5b86c4", pink: "#eb9ab5", green: "#7fae6a", purple: "#8c6bb3",
};
// Pixel-art palette chars map to their nearest ink-sketch wash so translated presets keep their meaning.
const PAL_MAP: Record<string, string> = {
  k: INK, w: PAPER, g: WASH.grey, d: "#5d5a55", r: WASH.red, o: WASH.orange, y: WASH.yellow, e: WASH.green,
  f: "#4a6e45", c: "#8fbfe0", b: WASH.blue, n: WASH.navy, p: WASH.violet, m: WASH.pink, u: WASH.brown, x: "#c59a6a",
};

/** Resolve a colour param: a named wash / skin / hair, a pixel-art palette char, or a hex colour. */
export const col = (v: string | undefined, fallback: string, named?: Record<string, string>) => {
  if (!v || v === "none") return fallback;
  if (named && named[v]) return named[v];
  if (WASH[v]) return WASH[v];
  if (v.length === 1 && PAL_MAP[v]) return PAL_MAP[v];
  return v;
};

/** SVG props for an ink line. */
export const line = (w = LW) => ({ fill: "none", stroke: INK, strokeWidth: w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });
/** Props for a loose wash (fill colour at ~0.55 opacity). */
export const wash = (color: string) => ({ fill: color, opacity: 0.55, stroke: "none" });

/** A loose, mis-registered watercolour fill, offset from the line it belongs to. */
export const Wash: React.FC<{ d: string; color: string; dx?: number; dy?: number; o?: number }> = ({ d, color, dx = 6, dy = 5, o = 0.6 }) => (
  <path d={d} fill={color} opacity={o} stroke="none" transform={`translate(${dx} ${dy})`} />
);

/** Hand-lettered title: Caveat-style words in ink with a scribbled accent wash behind the accent line. */
export const titleFont = "'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive";
export const Title: React.FC<{ x: number; y: number; lines: string[]; accent?: string; size?: number; pop?: number }> = ({ x, y, lines, accent, size = 120, pop = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${pop})`}>
    {lines.map((l, i) => {
      const cy = (i - (lines.length - 1) / 2) * size * 1.05;
      const hi = l === accent;
      return (
        <g key={i}>
          {hi ? <path d={`M ${-size * 2.4} ${cy + size * 0.02} Q 0 ${cy - size * 0.26} ${size * 2.4} ${cy - size * 0.04} Q 0 ${cy + size * 0.16} ${-size * 2.2} ${cy + size * 0.1} Z`} fill={ACCENT} opacity={0.45} /> : null}
          <text x={0} y={cy} textAnchor="middle" dominantBaseline="middle" fontFamily={titleFont} fontSize={size} fill={INK}>{l}</text>
        </g>
      );
    })}
  </g>
);

/** Single hand-drawn ground line with a few short hatch strokes beneath it. */
const Ground: React.FC<{ y: number }> = ({ y }) => (
  <g {...line(LW)}>
    <path d={`M -20 ${y} Q 120 ${y - 8} 300 ${y + 3} T 620 ${y - 2} T 1100 ${y + 4}`} />
    {[140, 230, 360, 470, 560, 690, 790, 880, 980].map((x, i) => (
      <path key={i} d={`M ${x} ${y + 18 + (i % 2) * 6} l ${-22 - (i % 3) * 6} ${14}`} strokeWidth={LW * 0.6} />
    ))}
  </g>
);

const style: Style = {
  id: "ink-sketch",
  ink: INK,
  accent: ACCENT,
  font: titleFont,
  paper: { base: PAPER, fibre: "#e9e0cc", stain: "#ddd0b4" },
  decor: { groundY: 1600, ground: (y: number) => <Ground y={y} /> },
  title: (p) => <Title {...p} />,
};
export default style;

// ---- Inking helper -------------------------------------------------------------------------------
// ink(tree) redraws a flat-filled SVG element tree in this style. Each "unit" gets four passes:
// 1 ink outline (shapes fattened by 2 × w in INK), 2 PAPER body (hides what is behind), 3 loose colour
// wash (opacity 0.6, nudged by 4,3 like a mis-registered watercolour), 4 small dark/white details (eyes,
// nostrils, dark lines) drawn crisp on top. A <g data-split> makes each of its children its own unit
// (so legs, body, head and ears each get their own contour); any other element is one unit.
/* eslint-disable @typescript-eslint/no-explicit-any */
type InkCtx = { fill?: string; stroke?: string; sw?: number };
const SHAPES: Record<string, 1> = { path: 1, circle: 1, ellipse: 1, rect: 1, polygon: 1, polyline: 1, line: 1 };
const rgbOf = (c?: string): [number, number, number] | null => {
  if (!c) return null;
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split("").map((q) => q + q).join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const r = /^rgba?\(([^)]+)\)/i.exec(c);
  return r ? (r[1].split(",").map((v) => parseFloat(v)).slice(0, 3) as [number, number, number]) : null;
};
const lum = (c?: string) => { const v = rgbOf(c); return v ? (0.299 * v[0] + 0.587 * v[1] + 0.114 * v[2]) / 255 : 0.5; };
const isOn = (c?: string) => !!c && c !== "none" && c !== "transparent";
const isDark = (c?: string) => lum(c) < 0.2;
const isLight = (c?: string) => c === PAPER || lum(c) > 0.98;
const isRgba = (c?: string) => !!c && /^rgba/i.test(c);
const smallDot = (t: string, pr: any) => (t === "circle" && +pr.r < 15) || (t === "ellipse" && Math.max(+pr.rx, +pr.ry) < 15);
/** Soften a flat colour into a wash colour (pull 15% towards paper). */
export const washOf = (c: string) => {
  const v = rgbOf(c), pv = rgbOf(PAPER)!;
  if (!v || isRgba(c)) return c;
  if (lum(c) > 0.95) return PAPER;
  const h = (i: number) => Math.round(v[i] + (pv[i] - v[i]) * 0.15).toString(16).padStart(2, "0");
  return `#${h(0)}${h(1)}${h(2)}`;
};
type Pass = "line" | "paper" | "wash" | "detail";
const kidsOf = (c: any): any[] => {
  const out: any[] = [];
  React.Children.forEach(c, (k: any) => { if (k !== null && k !== undefined && typeof k !== "boolean") out.push(k); });
  return out;
};
const expand = (n: any): any => {
  let el = n, guard = 0;
  while (React.isValidElement(el) && typeof el.type === "function" && guard++ < 20) el = (el.type as any)(el.props);
  return el;
};
const washCol = (c: string) => (isDark(c) ? INK : washOf(c));
function passEl(n: any, pass: Pass, ctx: InkCtx, w: number, key: React.Key): any {
  const el = expand(n);
  if (el === null || el === undefined || typeof el === "boolean" || typeof el === "string" || typeof el === "number") return null;
  if (Array.isArray(el)) return el.map((c, i) => passEl(c, pass, ctx, w, i));
  if (!React.isValidElement(el)) return null;
  const t = el.type as any, pr: any = el.props;
  if (t === React.Fragment || t === "g") {
    const c2: InkCtx = { fill: pr.fill ?? ctx.fill, stroke: pr.stroke ?? ctx.stroke, sw: pr.strokeWidth ?? ctx.sw };
    const op = pass === "detail" || pass === "wash" ? pr.opacity : undefined;
    return <g key={key} transform={pr.transform} opacity={op}>{kidsOf(pr.children).map((c, i) => passEl(c, pass, c2, w, i))}</g>;
  }
  if (typeof t !== "string") return null;
  if (!SHAPES[t]) return pass === "detail" ? React.cloneElement(el as React.ReactElement<any>, { key }) : null;
  const fill: string = pr.fill ?? ctx.fill ?? "#000000", stroke: string | undefined = pr.stroke ?? ctx.stroke;
  const sw = +(pr.strokeWidth ?? ctx.sw ?? 1);
  const hasF = isOn(fill) && t !== "line" && t !== "polyline", hasS = isOn(stroke);
  if (hasF && isRgba(fill) && !hasS) return null; // flat drop shadows are not inked
  const detail = hasF ? smallDot(t, pr) : !hasS || isDark(stroke) || sw < 5;
  if ((pass === "detail") !== detail) return null;
  const base = { key, opacity: undefined as any, strokeLinejoin: "round" as const, strokeLinecap: (pr.strokeLinecap ?? "round") as any };
  if (pass === "line") return React.cloneElement(el as React.ReactElement<any>, { ...base, fill: hasF ? INK : "none", stroke: INK, strokeWidth: (hasS ? sw : 0) + 2 * w });
  if (pass === "paper") return React.cloneElement(el as React.ReactElement<any>, { ...base, fill: hasF ? PAPER : "none", stroke: hasS ? PAPER : "none", strokeWidth: sw });
  if (pass === "wash") return React.cloneElement(el as React.ReactElement<any>, { ...base, opacity: pr.opacity, fill: hasF ? washCol(fill) : "none", stroke: hasS ? washCol(stroke!) : "none" });
  const dc = (c: string) => (isDark(c) ? INK : isLight(c) ? PAPER : washOf(c));
  return React.cloneElement(el as React.ReactElement<any>, { key, fill: hasF ? dc(fill) : "none", stroke: hasS ? dc(stroke!) : undefined });
}
/** Redraw a flat SVG tree as ink line + paper + loose wash (see above). w = visible line width. */
export function ink(n: any, w = 6, key?: React.Key): any {
  const el = expand(n);
  if (el === null || el === undefined || typeof el === "boolean") return null;
  if (Array.isArray(el)) return el.map((c, i) => ink(c, w, i));
  if (!React.isValidElement(el)) return null;
  const pr: any = el.props;
  if ((el.type === "g" || el.type === React.Fragment) && pr["data-split"]) {
    return <g key={key} transform={pr.transform}>{kidsOf(pr.children).map((c, i) => ink(c, w, i))}</g>;
  }
  return (
    <g key={key}>
      {passEl(el, "line", {}, w, "l")}
      {passEl(el, "paper", {}, w, "p")}
      <g opacity={0.6} transform={`translate(${(w * 0.67).toFixed(1)} ${(w * 0.5).toFixed(1)})`}>{passEl(el, "wash", {}, w, "w")}</g>
      {passEl(el, "detail", {}, w, "d")}
    </g>
  );
}
