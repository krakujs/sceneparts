import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector drink / container generator: cups, glasses, bottles and packaging.
// Origin = resting point (bottom centre), faces the viewer slightly from above, honours flip.
// Every container is a half-width profile g(u) from bottom (u = 0) to top (u = 1), scaled by hw and h.

export type DrinkVessel = "mug" | "cup" | "teacup" | "glass" | "tall" | "tumbler" | "wine" | "stemmed" | "bottle" | "can" | "carton" | "jar" | "takeaway";
export type DrinkGarnish = "none" | "lemon" | "cherry" | "mint";
export type DrinkAnim = "none" | "bob" | "wobble" | "pop" | "slosh";
export type DrinkSpec = {
  vessel?: DrinkVessel; h?: number; color?: string; liquid?: string; level?: number; foam?: string; straw?: string;
  ice?: boolean; garnish?: DrinkGarnish; steam?: boolean; label?: string; lid?: string; anim?: DrinkAnim; flip?: boolean;
};

type P2 = [number, number];
const f1 = (v: number) => v.toFixed(1);
const pt = (q: P2) => `${f1(q[0])} ${f1(q[1])}`;
const sq0 = (v: number) => Math.sqrt(Math.max(0, v));
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const lighten = (hex: string, k: number) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const ch = (v: number) => Math.round(v + (255 - v) * k).toString(16).padStart(2, "0");
  return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
};
const table = (tab: P2[]) => (u: number) => {
  for (let i = 1; i < tab.length; i++) {
    const [u0, g0] = tab[i - 1], [u1, g1] = tab[i];
    if (u <= u1) return u1 === u0 ? g1 : g0 + ((g1 - g0) * (u - u0)) / (u1 - u0);
  }
  return tab[tab.length - 1][1];
};
/** Rounded bottom corner used by cylinders. */
const base = (u: number, r: number) => (u < r ? sq0(1 - ((r - u) / r) ** 2) : 1);
/** Bowl of a stemmed glass: t = 0 at its bottom, 1 at the rim. */
const bowl = (u: number, topScale: number, u0: number) => { const t = clamp01((u - u0) / (1 - u0)); return sq0(t * (2 - t)) * (1 - (1 - topScale) * t); };

const GLASS: DrinkVessel[] = ["glass", "tall", "tumbler", "wine", "stemmed", "jar"];
const DEF: Record<DrinkVessel, { w: number; h: number; col: string }> = {
  mug: { w: 230, h: 300, col: C.blue }, cup: { w: 210, h: 200, col: "#FFFFFF" }, teacup: { w: 190, h: 170, col: "#F2C4A0" },
  glass: { w: 180, h: 280, col: "#DDEFF8" }, tall: { w: 150, h: 380, col: "#DDEFF8" }, tumbler: { w: 130, h: 200, col: "#DDEFF8" },
  wine: { w: 190, h: 340, col: "#DDEFF8" }, stemmed: { w: 200, h: 400, col: "#DDEFF8" }, bottle: { w: 130, h: 480, col: C.green },
  can: { w: 130, h: 330, col: C.red }, carton: { w: 170, h: 340, col: C.blue }, jar: { w: 200, h: 320, col: "#DDEFF8" },
  takeaway: { w: 180, h: 280, col: "#F4F1EA" },
};
const PROF: Record<DrinkVessel, (u: number) => number> = {
  mug: (u) => base(u, 0.05),
  cup: (u) => base(u, 0.05) * (0.84 + 0.16 * u),
  teacup: (u) => (u < 0.4 ? 0.5 + 0.5 * sq0(1 - ((0.4 - u) / 0.4) ** 2) : 1),
  glass: (u) => base(u, 0.06) * (0.92 + 0.08 * u),
  tall: (u) => base(u, 0.04) * (0.82 + 0.18 * u),
  tumbler: (u) => base(u, 0.06) * (0.76 + 0.24 * u),
  wine: (u) => bowl(u, 0.82, 0.4),
  stemmed: (u) => bowl(u, 1, 0.4),
  bottle: table([[0, 0], [0.03, 0.8], [0.07, 1], [0.66, 1], [0.8, 0.48], [0.85, 0.3], [0.95, 0.3], [0.96, 0.36], [1, 0.36]]),
  can: table([[0, 0.88], [0.02, 1], [0.92, 1], [0.96, 0.9], [1, 0.9]]),
  carton: table([[0, 1], [1, 1]]),
  jar: table([[0, 0.86], [0.04, 1], [0.92, 1], [1, 1]]),
  takeaway: (u) => 0.72 + 0.26 * u,
};

/** Closed outline of a container between heights u0 and u1 (ins scales the walls, tilt tilts the top edge). */
const solid = (prof: (u: number) => number, hw: number, h: number, u0: number, u1: number, ins = 1, tilt = 0) => {
  const N = 40, R: P2[] = [], L: P2[] = [];
  for (let i = 0; i <= N; i++) {
    const u = u0 + ((u1 - u0) * i) / N, g = prof(u) * hw * ins, dy = i === N ? tilt : 0;
    R.push([g, -u * h + dy]); L.push([-g, -u * h - dy]);
  }
  let d = `M ${pt(R[0])}`;
  for (let i = 1; i <= N; i++) d += ` L ${pt(R[i])}`;
  for (let i = N; i >= 0; i--) d += ` L ${pt(L[i])}`;
  return d + " Z";
};
/** Shaded crescent on the right-hand side of a solid. */
const crescent = (prof: (u: number) => number, hw: number, h: number, u0: number, u1: number) => {
  const N = 40, outer: P2[] = [], inner: P2[] = [];
  for (let i = 0; i <= N; i++) { const u = u0 + ((u1 - u0) * i) / N, g = prof(u) * hw; outer.push([g, -u * h]); inner.push([g * 0.45, -u * h]); }
  let d = `M ${pt(outer[0])}`;
  for (let i = 1; i <= N; i++) d += ` L ${pt(outer[i])}`;
  for (let i = N; i >= 0; i--) d += ` L ${pt(inner[i])}`;
  return d + " Z";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Drink(p: PartProps<any> & DrinkSpec) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const vessel: DrinkVessel = p.vessel ?? "mug";
  const d = DEF[vessel];
  const x = p.x ?? 540, y = p.y ?? 1560;
  const h = p.h ?? d.h, w = d.w, hw = w / 2;
  const prof = PROF[vessel];
  const isGlass = GLASS.includes(vessel);
  const vC = p.color && p.color !== "none" ? p.color : d.col;
  const liquid = p.liquid && p.liquid !== "none" ? p.liquid : null;
  const level = clamp01(p.level ?? 0.75);
  const foam = p.foam && p.foam !== "none" ? p.foam : null;
  const straw = p.straw && p.straw !== "none" ? p.straw : null;
  const lid = p.lid && p.lid !== "none" ? p.lid : null;
  const label = p.label && p.label !== "none" ? p.label : null;
  const anim: DrinkAnim = p.anim ?? "none";
  const saucer = vessel === "cup" || vessel === "teacup";
  const hb = saucer ? h - hw * 0.2 : h, by = saucer ? -hw * 0.2 : 0;
  const u0 = vessel === "wine" || vessel === "stemmed" ? 0.4 : 0;
  const topG = prof(1) * hw;

  // motion (only from f)
  let tr = "";
  let tilt = 0;
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;
  else if (anim === "slosh") tilt = Math.sin((f * 2 * Math.PI) / 50) * hw * 0.12;

  // parts
  let saucerEl: React.ReactNode = null;
  if (saucer) saucerEl = <g><ellipse cx={0} cy={-hw * 0.1} rx={hw * 1.45} ry={hw * 0.24} fill={shade("#FFFFFF", 0.06)} /><ellipse cx={0} cy={-hw * 0.14} rx={hw * 1.0} ry={hw * 0.16} fill={shade("#FFFFFF", 0.14)} /></g>;
  let stemEl: React.ReactNode = null;
  if (vessel === "wine" || vessel === "stemmed") stemEl = (
    <g fill={vC}>
      <rect x={-hw * 0.045} y={-h * 0.42} width={hw * 0.09} height={h * 0.42 - hw * 0.02} rx={hw * 0.04} />
      <ellipse cx={0} cy={-hw * 0.08} rx={hw * 0.6} ry={hw * 0.13} />
    </g>
  );
  const handle = vessel === "mug" || vessel === "cup" || vessel === "teacup" ? (
    <path d={`M ${f1(hw * 0.8)} ${f1(-hb * 0.78)} C ${f1(hw * 1.5)} ${f1(-hb * 0.78)} ${f1(hw * 1.5)} ${f1(-hb * 0.32)} ${f1(hw * 0.8)} ${f1(-hb * 0.32)}`} stroke={vC} strokeWidth={hw * 0.2} strokeLinecap="round" fill="none" />
  ) : null;

  // body
  const bodyEl = <path d={solid(prof, hw, hb, u0, 1)} fill={vC} opacity={isGlass ? 0.88 : 1} />;
  const shadeEl = !isGlass ? <path d={crescent(prof, hw, hb, u0, 1)} fill={shade(vC, 0.16)} /> : null;
  const glassHi = isGlass ? (
    <rect x={-hw * 0.62} y={-hb * 0.82} width={hw * 0.12} height={hb * 0.6} rx={hw * 0.06} fill="#FFFFFF" opacity={0.7} />
  ) : null;

  // label band (a plain band, no text)
  const labelEl = label ? <path d={solid(prof, hw, hb, 0.36, 0.62)} fill={label} /> : null;
  const sleeveEl = vessel === "takeaway" ? <path d={solid(prof, hw, hb, 0.3, 0.58)} fill={label ?? shade("#D9A66B", 0.05)} /> : null;

  // liquid with optional slosh, light surface band
  const liquidEl = liquid && isGlass && level > u0 ? (
    <g>
      <path d={solid(prof, hw, hb, u0, level, 0.9, tilt)} fill={liquid} />
      <path d={solid(prof, hw, hb, Math.max(u0, level - 0.035), level, 0.9, tilt)} fill={lighten(liquid, 0.28)} />
    </g>
  ) : null;

  const surfaceEl = liquid && !isGlass ? <ellipse cx={0} cy={-hb + topG * 0.02} rx={topG * 0.84} ry={topG * 0.17} fill={liquid} /> : null;

  // ice cubes (rounded squares with a light inner glint)
  const iceEl = p.ice && level > 0.35 ? (
    <g>
      {[[-0.28, 0.5, 0.2], [0.22, 0.34, -0.15], [-0.02, 0.78, 0.1]].map(([xo, uo, rot], i) => {
        const cx = xo * hw, cy = -uo * hb, sz = hw * 0.34;
        return (
          <g key={i} transform={`translate(${f1(cx)} ${f1(cy)}) rotate(${f1(rot * 60)})`}>
            <rect x={-sz / 2} y={-sz / 2} width={sz} height={sz} rx={sz * 0.18} fill="#EAF7FF" opacity={0.9} />
            <rect x={-sz * 0.3} y={-sz * 0.3} width={sz * 0.22} height={sz * 0.4} rx={sz * 0.08} fill="#FFFFFF" opacity={0.8} />
          </g>
        );
      })}
    </g>
  ) : null;

  // opening: the rim ellipse (open vessels only)
  const openTop = !(vessel === "bottle" || vessel === "can" || vessel === "carton" || lid || vessel === "takeaway");
  const rimEl = openTop ? <ellipse cx={0} cy={-hb} rx={topG} ry={topG * 0.2} fill={isGlass ? "#B9DCEE" : shade(vC, 0.28)} /> : null;

  // foam / cream dome on top of the drink
  const foamBase = liquid ? level : 0.82;
  const foamEl = foam ? (
    <g>
      <path d={solid(prof, hw, hb, foamBase, 1)} fill={foam} />
      <ellipse cx={0} cy={-hb - hw * 0.05} rx={topG * 1.02} ry={hw * 0.3} fill={foam} />
      <ellipse cx={-hw * 0.2} cy={-hb - hw * 0.12} rx={topG * 0.5} ry={hw * 0.15} fill="#FFFFFF" opacity={0.35} />
    </g>
  ) : null;

  // lids and caps
  let lidEl: React.ReactNode = null;
  if (lid && vessel === "bottle") lidEl = <rect x={-hw * 0.42} y={-hb - hb * 0.04} width={hw * 0.84} height={hb * 0.08} rx={hw * 0.1} fill={lid} />;
  if (lid && vessel === "jar") lidEl = <rect x={-hw * 1.04} y={-hb - hb * 0.06} width={hw * 2.08} height={hb * 0.1} rx={hw * 0.12} fill={lid} />;
  if (lid && vessel === "can") lidEl = <ellipse cx={0} cy={-hb} rx={topG} ry={topG * 0.2} fill={lid} />;
  if (lid && vessel === "takeaway") lidEl = (
    <g>
      <path d={`M ${f1(-topG * 1.05)} ${f1(-hb)} Q ${f1(0)} ${f1(-hb - hw * 0.3)} ${f1(topG * 1.05)} ${f1(-hb)} Z`} fill={lid} />
      <ellipse cx={0} cy={-hb} rx={topG * 1.05} ry={topG * 0.2} fill={shade(lid, 0.15)} />
    </g>
  );
  if (vessel === "takeaway" && !lid) lidEl = <ellipse cx={0} cy={-hb} rx={topG * 0.96} ry={topG * 0.2} fill={shade(vC, 0.3)} />;
  if (vessel === "can" && !lid) lidEl = <ellipse cx={0} cy={-hb} rx={topG} ry={topG * 0.2} fill={shade(vC, 0.3)} />;

  // carton roof (gable top)
  const cartonRoof = vessel === "carton" ? (
    <path d={`M ${f1(-hw)} ${f1(-hb * 0.84)} L 0 ${f1(-hb)} L ${f1(hw)} ${f1(-hb * 0.84)} Z`} fill={shade(vC, 0.12)} />
  ) : null;

  // garnish, straw and steam sit above the top
  const topY = -h - (foam ? hw * 0.25 : 0);
  let garnishEl: React.ReactNode = null;
  if (p.garnish === "lemon") garnishEl = (
    <g transform={`translate(${f1(topG * 0.8)} ${f1(-h - w * 0.02)}) rotate(-20)`}>
      <path d={`M ${f1(-w * 0.12)} 0 A ${f1(w * 0.12)} ${f1(w * 0.12)} 0 0 0 ${f1(w * 0.12)} 0 Z`} fill={C.yellow} />
      <path d={`M ${f1(-w * 0.09)} 0 A ${f1(w * 0.09)} ${f1(w * 0.09)} 0 0 0 ${f1(w * 0.09)} 0 Z`} fill="#FFF3B0" />
      {[-0.05, 0, 0.05].map((k, i) => <line key={i} x1={k * w} y1={0} x2={k * w * 0.4} y2={-w * 0.08} stroke={C.yellow} strokeWidth={w * 0.01} />)}
    </g>
  );
  if (p.garnish === "cherry") garnishEl = (
    <g>
      <path d={`M 0 ${f1(topY + w * 0.02)} Q ${f1(w * 0.06)} ${f1(topY - w * 0.12)} ${f1(w * 0.02)} ${f1(topY - w * 0.18)}`} stroke={C.green} strokeWidth={w * 0.014} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={topY} r={w * 0.07} fill={C.red} />
      <circle cx={-w * 0.025} cy={topY - w * 0.025} r={w * 0.02} fill="#FFFFFF" opacity={0.6} />
    </g>
  );
  if (p.garnish === "mint") garnishEl = (
    <g fill={C.green}>
      {[-38, 0, 38].map((a, i) => <ellipse key={i} cx={-w * 0.05} cy={topY} rx={w * 0.09} ry={w * 0.035} transform={`rotate(${a} ${f1(-w * 0.05)} ${f1(topY)})`} />)}
    </g>
  );
  const strawEl = straw ? (
    <path d={`M ${f1(hw * 0.15)} ${f1(-h * Math.max(0.3, level) * 0.9)} L ${f1(hw * 0.2)} ${f1(-h - h * 0.12)} L ${f1(hw * 0.55)} ${f1(-h - h * 0.22)}`} stroke={straw} strokeWidth={w * 0.05} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ) : null;

  let steamEl: React.ReactNode = null;
  if (p.steam) {
    const top = -h - w * 0.06;
    steamEl = (
      <g fill="none" stroke="#FFFFFF" strokeWidth={w * 0.03} strokeLinecap="round">
        {[0, 1, 2].map((i) => {
          const ph = (f / 70 + i / 3) % 1;
          return (
            <path key={i} transform={`translate(${f1((i - 1) * w * 0.22)} ${f1(top - ph * w * 0.3)})`} opacity={Math.sin(ph * Math.PI) * 0.8}
              d={`M 0 0 C ${f1(w * 0.06)} ${f1(-w * 0.07)} ${f1(-w * 0.06)} ${f1(-w * 0.13)} 0 ${f1(-w * 0.2)} S ${f1(w * 0.06)} ${f1(-w * 0.3)} 0 ${f1(-w * 0.36)}`} />
          );
        })}
      </g>
    );
  }

  const shadowRx = saucer ? hw * 1.4 : Math.max(hw * 0.85, 30);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={shadowRx} ry={Math.max(5, hw * 0.1)} fill={C.shadow} />
      <g transform={tr}>
        {strawEl}
        <g transform={`translate(0 ${f1(by)})`}>
          {saucerEl}
          {stemEl}
          {handle}
          {bodyEl}
          {shadeEl}
          {glassHi}
          {cartonRoof}
          {sleeveEl}
          {liquidEl}
          {labelEl}
          {iceEl}
          {rimEl}
          {foamEl}
          {lidEl}
          {surfaceEl}
        </g>
        {garnishEl}
        {steamEl}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Drink {...p} />;
}
