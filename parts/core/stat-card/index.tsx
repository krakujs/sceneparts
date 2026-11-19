import React from "react";
import { clamp, ease, pop, type PartProps, type Style } from "@sceneparts/core";

// Stat card + the shared infographic kit for core/ UI parts (charts, counters, badges, lower thirds…).
// Other core infographic parts import { ui, enter, popIn, count, fmt, fitSize, Card, Txt, startFrame } from "../stat-card/index".
// Everything is style-aware: ink, accent and font come from p.style, so the same part fits any style.

/* eslint-disable @typescript-eslint/no-explicit-any */
export type UI = {
  ink: string; accent: string; font: string; card: string; cardEdge: string; muted: string; soft: string;
  good: string; bad: string; warn: string; white: string; series: string[];
};

const lighten = (hex: string, k: number) => {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return hex;
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).map((v) => Math.round(v + (255 - v) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};

/** Palette for UI parts, built from the style. `series` = 6 chart colours starting with the style's accent. */
export const ui = (style: Style, accent?: string): UI => {
  const a = accent || style.accent || "#c8413a";
  const ink = style.ink || "#1a1410";
  return {
    ink, accent: a, font: style.font || "Inter, Arial, sans-serif",
    card: "#FFFDF8", cardEdge: ink, muted: lighten(ink, 0.45), soft: lighten(ink, 0.88),
    good: "#2EAD6B", bad: "#E0453A", warn: "#F2A93B", white: "#FFFFFF",
    series: [a, "#2F7FD8", "#F2B33D", "#2EAD6B", "#8A5AD0", "#F07F3A", "#1FB5B0", "#E35D9A"],
  };
};

/** Start frame from `at` (0..1 fraction of the shot, like core/text) or `atFrame`. */
export const startFrame = (p: any) => (typeof p.atFrame === "number" ? p.atFrame : clamp(p.at ?? 0) * (p.d || 0));
/** 0..1 eased entrance that starts at frame `at` and lasts `len` frames. */
export const enter = (f: number, at = 0, len = 14) => ease(clamp((f - at) / len));
/** Pop-in scale with a little overshoot (core pop). */
export const popIn = (f: number, at = 0, len = 10) => pop(f, at, len);
/** Value counting from `from` to `to`, starting at frame `at` for `len` frames (ease-out). */
export const count = (f: number, from: number, to: number, at = 0, len = 40) => from + (to - from) * ease(clamp((f - at) / len));
/** Number formatting: thousands separators, fixed decimals, prefix/suffix; `short` gives 1.2K / 3.4M. */
export const fmt = (n: number, decimals = 0, prefix = "", suffix = "", short = false) => {
  let v = n, unit = "";
  if (short) {
    const a = Math.abs(n);
    if (a >= 1e9) { v = n / 1e9; unit = "B"; } else if (a >= 1e6) { v = n / 1e6; unit = "M"; } else if (a >= 1e4) { v = n / 1e3; unit = "K"; }
    if (unit && decimals === 0) decimals = Math.abs(v) < 10 ? 1 : 0;
  }
  const s = Math.abs(v).toFixed(decimals);
  const [i, d] = s.split(".");
  const withSep = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${v < 0 ? "-" : ""}${prefix}${withSep}${d ? "." + d : ""}${unit}${suffix}`;
};
/** Font size that keeps `text` within `maxW` px (approximate, bold sans/serif ≈ 0.58 em per glyph). */
export const fitSize = (text: string, size: number, maxW: number, em = 0.58) => {
  const w = String(text).length * size * em;
  return w > maxW ? Math.max(10, (size * maxW) / w) : size;
};

/** Rounded card with a soft drop shadow and the style's ink outline (top-left at x,y). */
export function Card(q: { x: number; y: number; w: number; h: number; u: UI; r?: number; fill?: string; stroke?: string; sw?: number; shadow?: boolean; opacity?: number }) {
  const r = q.r ?? 28, sw = q.sw ?? 5;
  return (
    <g opacity={q.opacity ?? 1}>
      {q.shadow !== false ? <rect x={q.x + 10} y={q.y + 14} width={q.w} height={q.h} rx={r} fill="rgba(0,0,0,0.18)" /> : null}
      <rect x={q.x} y={q.y} width={q.w} height={q.h} rx={r} fill={q.fill ?? q.u.card} stroke={q.stroke ?? q.u.cardEdge} strokeWidth={sw} />
    </g>
  );
}

/** Text in the style's font; `maxW` shrinks it to fit. */
export function Txt(q: { x: number; y: number; u: UI; size?: number; weight?: number; anchor?: "start" | "middle" | "end"; fill?: string; maxW?: number; children: any; opacity?: number; ls?: number; stroke?: string; sw?: number }) {
  const t = String(q.children ?? "");
  const size = q.maxW ? fitSize(t, q.size ?? 40, q.maxW) : q.size ?? 40;
  return (
    <text x={q.x} y={q.y} fontFamily={q.u.font} fontSize={size} fontWeight={q.weight ?? 800} textAnchor={q.anchor ?? "middle"} fill={q.fill ?? q.u.ink}
      opacity={q.opacity ?? 1} letterSpacing={q.ls ?? 0} stroke={q.stroke} strokeWidth={q.sw} paintOrder={q.stroke ? "stroke" : undefined}>{t}</text>
  );
}


/** Approximate length of a path made of absolute M/L/H/V/Q/C/A/Z commands (renderers like resvg ignore pathLength). */
export const pathLen = (d: string) => {
  const tk = d.match(/[MLHVQCAZmlhvqcaz]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  let i = 0, x = 0, y = 0, sx = 0, sy = 0, L = 0, cmd = "M";
  const n = () => parseFloat(tk[i++]);
  const dist = (a: number, b: number, c: number, e: number) => Math.hypot(c - a, e - b);
  while (i < tk.length) {
    if (/[A-Za-z]/.test(tk[i])) cmd = tk[i++].toUpperCase();
    if (cmd === "Z") { L += dist(x, y, sx, sy); x = sx; y = sy; continue; }
    if (cmd === "M") { x = n(); y = n(); sx = x; sy = y; cmd = "L"; continue; }
    if (cmd === "L") { const a = n(), b = n(); L += dist(x, y, a, b); x = a; y = b; }
    else if (cmd === "H") { const a = n(); L += Math.abs(a - x); x = a; }
    else if (cmd === "V") { const b = n(); L += Math.abs(b - y); y = b; }
    else if (cmd === "Q") { const c1 = n(), c2 = n(), a = n(), b = n(); L += (dist(x, y, a, b) + dist(x, y, c1, c2) + dist(c1, c2, a, b)) / 2; x = a; y = b; }
    else if (cmd === "C") { const c1 = n(), c2 = n(), c3 = n(), c4 = n(), a = n(), b = n(); L += (dist(x, y, a, b) + dist(x, y, c1, c2) + dist(c1, c2, c3, c4) + dist(c3, c4, a, b)) / 2; x = a; y = b; }
    else if (cmd === "A") {
      const rx = n(), ry = n(); n(); const large = n(); n(); const a = n(), b = n();
      const r = (Math.abs(rx) + Math.abs(ry)) / 2, ch = dist(x, y, a, b);
      const th = 2 * Math.asin(Math.min(1, ch / (2 * Math.max(r, ch / 2, 1e-6))));
      L += r * (large ? 2 * Math.PI - th : th); x = a; y = b;
    } else i++;
  }
  return L;
};

/** Stroke dash props that draw a stroke of length `len` from 0 to fraction k (works in every renderer). */
export const drawDash = (len: number, k: number) => {
  const l = Math.max(1, len) + 2;
  return { strokeDasharray: `${l} ${l}`, strokeDashoffset: l * (1 - clamp(k)) };
};

/** <path> that draws itself on: k = 0..1. */
export function DrawPath(q: any) {
  const { k, d, ...rest } = q;
  return <path d={d} {...rest} {...drawDash(pathLen(String(d)), k ?? 1)} />;
}

// ---------- the stat card itself ----------
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = 640, H = 400;
  const k = popIn(p.f, at, 12);
  const to = Number(p.value ?? 0);
  const v = count(p.f, Number(p.from ?? 0), to, at + 6, p.len ?? 40);
  const num = fmt(v, p.decimals ?? 0, p.prefix ?? "", p.suffix ?? "", !!p.short);
  const delta = p.delta == null || p.delta === "" ? null : String(p.delta);
  const up = delta ? !delta.trim().startsWith("-") : true;
  const dIn = enter(p.f, at + 30, 12);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <Card x={-W / 2} y={-H / 2} w={W} h={H} u={u} />
      <rect x={-W / 2 + 36} y={-H / 2 + 40} width={14} height={64} rx={7} fill={u.accent} />
      <Txt x={-W / 2 + 70} y={-H / 2 + 86} u={u} size={40} weight={700} anchor="start" fill={u.muted} maxW={W - 110}>{p.label ?? "Monthly users"}</Txt>
      <Txt x={-W / 2 + 36} y={H / 2 - 110} u={u} size={150} weight={900} anchor="start" maxW={W - 72}>{num}</Txt>
      {delta ? (
        <g transform={`translate(${-W / 2 + 36} ${H / 2 - 78})`} opacity={dIn}>
          <rect x={0} y={0} width={Math.max(150, delta.length * 26 + 80)} height={52} rx={26} fill={up ? u.good : u.bad} />
          <path d={up ? "M24 36 L38 16 L52 36 Z" : "M24 16 L38 36 L52 16 Z"} fill={u.white} />
          <Txt x={64} y={38} u={u} size={32} anchor="start" fill={u.white}>{delta}</Txt>
          {p.note ? <Txt x={Math.max(150, delta.length * 26 + 80) + 18} y={38} u={u} size={30} weight={600} anchor="start" fill={u.muted} maxW={W - 72 - Math.max(150, delta.length * 26 + 80) - 18}>{p.note}</Txt> : null}
        </g>
      ) : null}
    </g>
  );
}
