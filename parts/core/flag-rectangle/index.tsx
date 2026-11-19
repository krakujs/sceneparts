import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter } from "../stat-card/index";

// Generic waving flag on a pole. It is not any real flag: pick a layout and colours.
// layout: h2 | h3 (horizontal stripes), v3 (vertical stripes), cross, circle, plain. colors = array of hex (default: accent, white, series 1).
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];
type Field = { pts: V[]; col: string };

const rectPoly = (u0: number, v0: number, u1: number, v1: number): V[] => {
  const out: V[] = [];
  for (let i = 0; i <= 12; i++) out.push([u0 + ((u1 - u0) * i) / 12, v0]);
  for (let i = 12; i >= 0; i--) out.push([u0 + ((u1 - u0) * i) / 12, v1]);
  return out;
};
const circlePoly = (cu: number, cv: number, ru: number, rv: number): V[] => {
  const out: V[] = [];
  for (let i = 0; i < 56; i++) {
    const a = (i / 56) * Math.PI * 2;
    out.push([cu + ru * Math.cos(a), cv + rv * Math.sin(a)]);
  }
  return out;
};

const fieldsFor = (layout: string, cols: string[], W: number, H: number): Field[] => {
  const c = (i: number) => cols[i % cols.length];
  if (layout === "h2" || layout === "h3") {
    const n = layout === "h2" ? 2 : 3;
    return Array.from({ length: n }, (_, i) => ({ pts: rectPoly(0, i / n, 1, (i + 1) / n), col: c(i) }));
  }
  if (layout === "v3") return [0, 1, 2].map((i) => ({ pts: rectPoly(i / 3, 0, (i + 1) / 3, 1), col: c(i) }));
  if (layout === "cross") {
    return [
      { pts: rectPoly(0, 0, 1, 1), col: c(0) },
      { pts: rectPoly(0.28, 0, 0.38, 1), col: c(1) },
      { pts: rectPoly(0, 0.42, 1, 0.58), col: c(1) },
    ];
  }
  if (layout === "circle") {
    const R = 0.3 * H;
    return [{ pts: rectPoly(0, 0, 1, 1), col: c(0) }, { pts: circlePoly(0.5, 0.5, R / W, R / H), col: c(1) }];
  }
  return [{ pts: rectPoly(0, 0, 1, 1), col: c(0) }];
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const cols: string[] = Array.isArray(p.colors) && p.colors.length ? p.colors : [u.accent, u.white, u.series[1]];
  const W = p.w ?? 520, H = p.h ?? 340;
  const e = enter(p.f, at, 22); // unfurl
  const amp = 24 * e;
  const phase = (p.f - at) * 0.1;
  const sx = 0.55 + 0.45 * e;
  const wave = (uu: number) => amp * Math.sin(uu * Math.PI * 2.4 - phase) * (0.15 + 0.85 * uu);
  const warp = ([uu, vv]: V): V => [-W / 2 + uu * W * sx, (vv - 0.5) * H + wave(uu)];
  const toD = (pts: V[]) => `M${pts.map(warp).map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")} Z`;
  const fields = fieldsFor(String(p.layout ?? "h3"), cols, W, H);
  // Soft shading that follows the folds of the cloth.
  const slices = Array.from({ length: 10 }, (_, i) => {
    const u0 = i / 10, u1 = (i + 1) / 10, mid = (u0 + u1) / 2;
    const shade = 0.16 * (0.5 - 0.5 * Math.cos(mid * Math.PI * 2.4 - phase)) * e;
    return { d: toD(rectPoly(u0, 0, u1, 1)), shade };
  });
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s})`}>
      <rect x={-W / 2 - 24} y={-H / 2 - 80} width={12} height={H + 160} rx={6} fill={u.ink} />
      <circle cx={-W / 2 - 18} cy={-H / 2 - 80} r={14} fill={u.warn} stroke={u.ink} strokeWidth={4} />
      {fields.map((f, i) => (
        <path key={i} d={toD(f.pts)} fill={f.col} />
      ))}
      {slices.map((sl, i) => (
        <path key={`s${i}`} d={sl.d} fill={`rgba(0,0,0,${sl.shade.toFixed(3)})`} />
      ))}
      <path d={toD(rectPoly(0, 0, 1, 1))} fill="none" stroke={u.ink} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
}
