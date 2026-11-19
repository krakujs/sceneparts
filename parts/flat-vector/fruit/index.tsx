import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector fruit / vegetable generator. Origin = resting point (bottom centre), faces the viewer, honours flip.
// The silhouette is a half-width profile g(u) sampled from bottom (u = 0) to top (u = 1); every shape is one profile.
// Every size is px at s = 1 (hero size, roughly 350 px wide).

export type FruitShape = "round" | "oval" | "pear" | "teardrop" | "long" | "squat" | "heart" | "bell";
export type FruitTexture = "none" | "dots" | "ribs" | "segments" | "fuzz" | "peel" | "seeds";
export type FruitStem = "none" | "short" | "curly" | "thick" | "calyx" | "crown";
export type FruitPit = "none" | "stone" | "seeds" | "ring" | "segments";
export type FruitAnim = "none" | "bob" | "wobble" | "bounce" | "roll" | "pop";
export type FruitSpec = {
  shape?: FruitShape; w?: number; h?: number; color?: string; color2?: string;
  texture?: FruitTexture; textureColor?: string;
  stem?: FruitStem; stemColor?: string; leaves?: number; leafColor?: string;
  cut?: "none" | "half"; fleshColor?: string; pit?: FruitPit;
  shine?: boolean; anim?: FruitAnim; rot?: number; flip?: boolean;
};

type P2 = [number, number];
const f1 = (v: number) => v.toFixed(1);
const pt = (q: P2) => `${f1(q[0])} ${f1(q[1])}`;
const DEF_H: Record<FruitShape, number> = { round: 300, oval: 360, pear: 400, teardrop: 380, long: 420, squat: 230, heart: 320, bell: 340 };
const sq0 = (v: number) => Math.sqrt(Math.max(0, v));
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Half-width fraction at height fraction u (0 = bottom, 1 = top). */
export function profile(shape: FruitShape, u: number): number {
  if (shape === "pear") {
    if (u < 0.45) return sq0(1 - ((u - 0.3) / 0.3) ** 2);
    const t = (u - 0.45) / 0.55;
    return (0.87 - 0.37 * t) * sq0(1 - t ** 4);
  }
  if (shape === "teardrop") {
    if (u < 0.4) return sq0(1 - ((u - 0.4) / 0.4) ** 2);
    return Math.max(0, 1 - (u - 0.4) / 0.6) ** 0.9;
  }
  if (shape === "heart") {
    const top = sq0(1 - ((u - 0.7) / 0.5) ** 2);
    const taper = u <= 0.6 ? 0.9 * (u / 0.6) ** 0.9 : 0;
    return Math.max(top, taper);
  }
  if (shape === "bell") {
    const a = Math.abs(2 * u - 1);
    return Math.max(0, 1 - a ** 3) ** (1 / 3) * (0.9 + 0.1 * u);
  }
  if (shape === "long") return Math.pow(sq0(1 - (2 * u - 1) ** 2), 0.7) * (1.08 - 0.32 * u);
  // round, oval, squat: ellipse
  return sq0(1 - (2 * u - 1) ** 2);
}

const N = 36;
/** Gentle sideways arch of the long shape (in local x, it becomes a curve once rotated). */
const bendAt = (shape: FruitShape, hw: number, u: number) => (shape === "long" ? -hw * 0.22 * Math.sin(Math.PI * u) : 0);
const outlinePath = (shape: FruitShape, hw: number, h: number) => {
  const R: P2[] = [], L: P2[] = [];
  for (let i = 0; i <= N; i++) { const u = i / N, b = bendAt(shape, hw, u), g = hw * profile(shape, u); R.push([g + b, -u * h]); L.push([-g + b, -u * h]); }
  let d = `M ${pt(R[0])}`;
  for (let i = 1; i <= N; i++) d += ` L ${pt(R[i])}`;
  for (let i = N; i >= 1; i--) d += ` L ${pt(L[i])}`;
  return d + " Z";
};

/** Points on a staggered grid that sit inside the silhouette. */
const gridPts = (shape: FruitShape, hw: number, h: number, sp: number): P2[] => {
  const out: P2[] = [];
  let row = 0;
  for (let yy = -h * 0.9; yy <= -h * 0.08; yy += sp * 0.9) {
    const u = -yy / h, half = hw * profile(shape, u) * 0.8, off = (row % 2) * sp * 0.5, b = bendAt(shape, hw, u);
    for (let xx = -half + off; xx <= half; xx += sp) if (Math.abs(xx) <= half) out.push([xx + b, yy]);
    row++;
  }
  return out;
};

const easeOutBounce = (t: number) => {
  const n = 7.5625, d = 2.75;
  if (t < 1 / d) return n * t * t;
  if (t < 2 / d) { const u = t - 1.5 / d; return n * u * u + 0.75; }
  if (t < 2.5 / d) { const u = t - 2.25 / d; return n * u * u + 0.9375; }
  const u = t - 2.625 / d; return n * u * u + 0.984375;
};
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

const defaultTexColour = (t: FruitTexture, color: string) => {
  if (t === "seeds") return "#FFE27A";
  if (t === "fuzz") return "#FFFFFF";
  return shade(color, 0.28);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Fruit(p: PartProps<any> & FruitSpec) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const shape: FruitShape = p.shape ?? "round";
  const h = p.h ?? DEF_H[shape];
  const w = p.w ?? (shape === "long" ? 150 : 320);
  const hw = w / 2;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const color = p.color ?? C.red;
  const crescent = p.color2 && p.color2 !== "none" ? p.color2 : shade(color, 0.16);
  const tex: FruitTexture = p.texture ?? "none";
  const texC = p.textureColor && p.textureColor !== "none" ? p.textureColor : defaultTexColour(tex, color);
  const stem: FruitStem = p.stem ?? "short";
  const stemC = p.stemColor ?? (stem === "calyx" ? C.green : "#6B4A2E");
  const leafC = p.leafColor ?? C.green;
  const nLeaves = Math.max(0, Math.min(3, Math.round(p.leaves ?? 0)));
  const fleshC = p.fleshColor ?? "#F6C65A";
  const pit: FruitPit = p.pit ?? "none";
  const anim: FruitAnim = p.anim ?? "none";
  const shine = p.shine ?? true;

  // motion (only from f)
  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  else if (anim === "bounce") { const t = f / 30; tr = `translate(0 ${f1(t < 1 ? -(1 - easeOutBounce(t)) * 400 : 0)})`; }
  else if (anim === "roll") {
    const e = 1 - (1 - clamp01(f / 50)) ** 3;
    const dx = -(1 - e) * 700, ang = (-(1 - e) * 700 / hw) * (180 / Math.PI);
    tr = `translate(${f1(dx)} 0) rotate(${f1(ang)} 0 ${f1(-h / 2)})`;
  } else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // leaves (behind the body)
  const leafAng = [38, -42, 88];
  const leafEls = Array.from({ length: nLeaves }, (_, i) => {
    const L = hw * (i === 2 ? 0.35 : 0.5), wd = hw * 0.2;
    return (
      <g key={"lf" + i} transform={`translate(${f1(i === 1 ? -hw * 0.04 : hw * 0.04)} ${f1(-h + hw * 0.04)}) rotate(${leafAng[i]})`}>
        <path d={`M 0 0 Q ${f1(wd)} ${f1(-L * 0.5)} 0 ${f1(-L)} Q ${f1(-wd)} ${f1(-L * 0.5)} 0 0 Z`} fill={leafC} />
        <line x1={0} y1={0} x2={0} y2={-L * 0.85} stroke={shade(leafC, 0.3)} strokeWidth={Math.max(1.5, hw * 0.02)} strokeLinecap="round" />
      </g>
    );
  });

  // texture (drawn on the body, positions kept inside the silhouette)
  let texEls: React.ReactNode = null;
  if (tex === "dots") texEls = gridPts(shape, hw, h, hw * 0.24).map((q, i) => <circle key={i} cx={q[0]} cy={q[1]} r={hw * 0.035} fill={texC} />);
  if (tex === "fuzz") texEls = gridPts(shape, hw, h, hw * 0.11).map((q, i) => <circle key={i} cx={q[0]} cy={q[1]} r={hw * 0.012} fill={texC} opacity={0.55} />);
  if (tex === "seeds") texEls = gridPts(shape, hw, h, hw * 0.2).map((q, i) => <ellipse key={i} cx={q[0]} cy={q[1]} rx={hw * 0.02} ry={hw * 0.035} fill={texC} />);
  if (tex === "ribs") texEls = [-0.66, -0.33, 0, 0.33, 0.66].map((k, i) => (
    <path key={i} d={`M ${f1(k * hw * 0.55)} ${f1(-h * 0.02)} Q ${f1(k * hw * 1.0)} ${f1(-h * 0.5)} ${f1(k * hw * 0.3)} ${f1(-h * 0.97)}`} stroke={texC} strokeWidth={hw * 0.05} strokeLinecap="round" fill="none" opacity={0.7} />
  ));
  if (tex === "peel") texEls = [-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8].map((k, i) => (
    <path key={i} d={`M ${f1(k * hw * 0.5)} ${f1(-h * 0.08)} Q ${f1(k * hw * 0.85)} ${f1(-h * 0.5)} ${f1(k * hw * 0.25)} ${f1(-h * 0.92)}`} stroke={texC} strokeWidth={hw * 0.02} strokeLinecap="round" fill="none" />
  ));
  if (tex === "segments") texEls = [-0.8, -0.53, -0.27, 0, 0.27, 0.53, 0.8].map((k, i) => (
    <path key={i} d={`M 0 ${f1(-h * 0.95)} Q ${f1(k * hw * 0.9)} ${f1(-h * 0.5)} ${f1(k * hw * 0.8)} ${f1(-h * 0.05)}`} stroke={texC} strokeWidth={hw * 0.02} strokeLinecap="round" fill="none" />
  ));

  // stem (on top of the body)
  let stemEl: React.ReactNode = null;
  if (stem === "short") { const L = h * 0.12; stemEl = <rect x={-hw * 0.045} y={-h - L} width={hw * 0.09} height={L + 4} rx={hw * 0.04} fill={stemC} />; }
  if (stem === "thick") { const L = h * 0.1; stemEl = <rect x={-hw * 0.1} y={-h - L} width={hw * 0.2} height={L + 4} rx={hw * 0.08} fill={stemC} />; }
  if (stem === "curly") {
    const L = h * 0.2;
    stemEl = <path d={`M 0 ${f1(-h + 4)} C ${f1(hw * 0.05)} ${f1(-h - L * 0.5)} ${f1(hw * 0.32)} ${f1(-h - L * 0.5)} ${f1(hw * 0.2)} ${f1(-h - L * 1.1)}`} stroke={stemC} strokeWidth={hw * 0.06} strokeLinecap="round" fill="none" />;
  }
  if (stem === "calyx") {
    const pts: P2[] = [];
    for (let k = 0; k < 10; k++) {
      const a = (k * Math.PI) / 5 - Math.PI / 2, r = k % 2 === 0 ? hw * 0.34 : hw * 0.14;
      pts.push([Math.cos(a) * r, Math.sin(a) * r * 0.45 - h]);
    }
    stemEl = (
      <g>
        <rect x={-hw * 0.03} y={-h - h * 0.06} width={hw * 0.06} height={h * 0.06 + 4} rx={hw * 0.03} fill={stemC} />
        <polygon points={pts.map(pt).join(" ")} fill={stemC} />
      </g>
    );
  }
  if (stem === "crown") {
    stemEl = (
      <g fill={stemC}>
        {[[-0.13, 0.12], [0, 0.16], [0.13, 0.12]].map(([xo, ht], i) => (
          <path key={i} d={`M ${f1(xo * hw - hw * 0.06)} ${f1(-h + 4)} L ${f1(xo * hw)} ${f1(-h - ht * h)} L ${f1(xo * hw + hw * 0.06)} ${f1(-h + 4)} Z`} />
        ))}
      </g>
    );
  }

  // cut face: lies in front of the base, skin ring, flesh, pit
  let faceEl: React.ReactNode = null;
  if (p.cut === "half") {
    const fcx = hw * 0.1, fcy = hw * 0.12, frx = hw * 1.0, fry = hw * 0.32;
    let pitEl: React.ReactNode = null;
    if (pit === "stone") pitEl = <ellipse cx={fcx} cy={fcy} rx={frx * 0.3} ry={fry * 0.7} fill={C.brown} />;
    if (pit === "seeds") pitEl = (
      <g fill={C.ink} opacity={0.8}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI * 2) / 12, r = frx * (i % 2 ? 0.3 : 0.5);
          return <ellipse key={i} cx={fcx + Math.cos(a) * r} cy={fcy + Math.sin(a) * r * 0.4} rx={frx * 0.04} ry={fry * 0.08} />;
        })}
      </g>
    );
    if (pit === "ring") pitEl = (
      <g fill={C.ink} opacity={0.85}>
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i * Math.PI * 2) / 16;
          return <circle key={i} cx={fcx + Math.cos(a) * frx * 0.6} cy={fcy + Math.sin(a) * fry * 0.6} r={frx * 0.045} />;
        })}
      </g>
    );
    if (pit === "segments") pitEl = (
      <g>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI * 2) / 8;
          return <line key={i} x1={fcx} y1={fcy} x2={fcx + Math.cos(a) * frx * 0.85} y2={fcy + Math.sin(a) * fry * 0.85} stroke="#FFFFFF" strokeWidth={frx * 0.06} strokeLinecap="round" />;
        })}
        <circle cx={fcx} cy={fcy} r={frx * 0.1} fill="#FFFFFF" />
      </g>
    );
    faceEl = (
      <g>
        <ellipse cx={fcx} cy={fcy} rx={frx * 1.06} ry={fry * 1.1} fill={color} />
        <ellipse cx={fcx} cy={fcy} rx={frx * 0.9} ry={fry * 0.85} fill={fleshC} />
        {pitEl}
      </g>
    );
  }

  const isLong = shape === "long";
  let maxBottom = 0;
  if (isLong) for (let i = 0; i <= N; i++) { const u = i / N; maxBottom = Math.max(maxBottom, hw * profile(shape, u) + bendAt(shape, hw, u)); }
  const orient = isLong ? `translate(${f1(-h / 2)} ${f1(-maxBottom)}) rotate(90)` : undefined;
  const bodyPath = outlinePath(shape, hw, h);
  const crescentPath = (() => {
    const outer: P2[] = [], inner: P2[] = [];
    for (let i = 0; i <= N; i++) { const u = i / N, b = bendAt(shape, hw, u), g = hw * profile(shape, u); outer.push([g + b, -u * h]); inner.push([g * 0.42 + b, -u * h]); }
    let d = `M ${pt(outer[0])}`;
    for (let i = 1; i <= N; i++) d += ` L ${pt(outer[i])}`;
    for (let i = N; i >= 0; i--) d += ` L ${pt(inner[i])}`;
    return d + " Z";
  })();

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) rotate(${p.rot ?? 0})`}>
      <ellipse cx={0} cy={0} rx={isLong ? h * 0.42 : Math.max(40, hw * 0.85)} ry={Math.max(5, hw * 0.09)} fill={C.shadow} />
      <g transform={tr}>
      <g transform={orient}>
        {leafEls}
        <path d={bodyPath} fill={color} />
        <path d={crescentPath} fill={crescent} />
        {texEls}
        {shine && <ellipse cx={-hw * 0.42} cy={-h * 0.66} rx={hw * 0.1} ry={h * 0.075} transform={`rotate(-25 ${f1(-hw * 0.42)} ${f1(-h * 0.66)})`} fill="#FFFFFF" opacity={0.55} />}
        {stemEl}
        {faceEl}
      </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Fruit {...p} />;
}
