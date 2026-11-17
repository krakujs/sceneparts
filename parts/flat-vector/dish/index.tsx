import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector dish generator: a vessel (plate, bowl, pan, board, ...) with a food fill and optional garnish.
// Origin = resting point (bottom centre), faces the viewer slightly from above, honours flip.
// Vessel geometry is in units of w (the vessel width). Food sits on the top surface ellipse of the vessel.

export type DishVessel = "plate" | "bowl" | "deepbowl" | "tray" | "board" | "pan" | "basket" | "cup";
export type DishFill = "none" | "liquid" | "mound" | "grains" | "strands" | "chunks" | "leafy" | "pieces" | "balls";
export type DishGarnish = "none" | "herbs" | "egg" | "chopsticks" | "spoon" | "fork" | "lemon";
export type DishSpec = {
  vessel?: DishVessel; w?: number; vesselColor?: string; rimColor?: string;
  fill?: DishFill; fillColor?: string; fillColor2?: string; garnish?: DishGarnish;
  steam?: boolean; anim?: "none" | "bob" | "pop"; flip?: boolean;
};

type P2 = [number, number];
const f1 = (v: number) => v.toFixed(1);
const pt = (q: P2) => `${f1(q[0])} ${f1(q[1])}`;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

type Geom = { R: number; Ry: number; Rb: number; Ryb: number; yb: number; yc: number };
/** Round vessel: top rim ellipse (R, Ry) at yc, foot ellipse (Rb, Ryb) at yb; the foot touches the ground at y = 0. */
const roundGeom = (w: number, R: number, Ry: number, depth: number, Rb: number, Ryb: number): Geom => {
  const yb = -Ryb * w, yc = yb - depth * w;
  return { R: R * w, Ry: Ry * w, Rb: Rb * w, Ryb: Ryb * w, yb, yc };
};
const GEOM: Record<Exclude<DishVessel, "tray" | "board">, (w: number) => Geom> = {
  plate: (w) => roundGeom(w, 0.5, 0.15, 0.06, 0.34, 0.1),
  bowl: (w) => roundGeom(w, 0.5, 0.2, 0.22, 0.24, 0.07),
  deepbowl: (w) => roundGeom(w, 0.46, 0.2, 0.36, 0.2, 0.08),
  cup: (w) => roundGeom(w, 0.34, 0.12, 0.2, 0.2, 0.06),
  pan: (w) => roundGeom(w, 0.42, 0.2, 0.1, 0.34, 0.1),
  basket: (w) => roundGeom(w, 0.44, 0.16, 0.26, 0.32, 0.1),
};

/** Front band of a round vessel's side wall (the back is hidden by the rim ellipse drawn over it). */
const sidePath = (g: Geom) => {
  const N = 24, pts: P2[] = [];
  for (let k = 0; k <= N; k++) { const t = Math.PI - (k * Math.PI) / N; pts.push([g.R * Math.cos(t), g.yc + g.Ry * Math.sin(t)]); }
  for (let k = 0; k <= N; k++) { const t = (k * Math.PI) / N; pts.push([g.Rb * Math.cos(t), g.yb + g.Ryb * Math.sin(t)]); }
  return "M " + pts.map(pt).join(" L ") + " Z";
};

/** Deterministic pseudo-random in 0..1 from an index. */
const hash = (i: number) => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Dish(p: PartProps<any> & DishSpec) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const vessel: DishVessel = p.vessel ?? "bowl";
  const w = p.w ?? 420;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const vC = p.vesselColor ?? (vessel === "pan" ? "#3A3F4D" : vessel === "board" ? "#C58A55" : vessel === "basket" ? C.sand : vessel === "cup" ? "#B8C2CE" : C.white);
  const rimC = p.rimColor ?? (vessel === "pan" ? "#5A6175" : vessel === "board" ? "#D9A674" : vessel === "basket" ? "#B8935C" : vessel === "cup" ? "#E9EEF3" : vessel === "plate" ? "#DDE2EA" : "#E9EEF3");
  const fill: DishFill = p.fill ?? "none";
  const fC = p.fillColor ?? C.yellow, fC2 = p.fillColor2 ?? C.yellowDark;
  const garnish: DishGarnish = p.garnish ?? "none";
  const anim = p.anim ?? "none";

  // food surface (centre + radii) and the vessel body
  const flat = vessel === "tray" || vessel === "board";
  const g = flat ? null : GEOM[vessel](w);
  const sc = g ? { cx: 0, cy: g.yc, rx: g.R * 0.86, ry: g.Ry * 0.86 } : vessel === "board" ? { cx: 0, cy: -0.17 * w, rx: 0.4 * w, ry: 0.12 * w } : { cx: 0, cy: -0.2 * w, rx: 0.4 * w, ry: 0.11 * w };

  let body: React.ReactNode;
  if (vessel === "tray") {
    body = (
      <g>
        <rect x={-w * 0.5} y={-0.06 * w} width={w} height={0.06 * w} rx={0.02 * w} fill={shade(vC, 0.2)} />
        <rect x={-w * 0.5} y={-0.34 * w} width={w} height={0.28 * w} rx={0.06 * w} fill={vC} />
        <rect x={-w * 0.44} y={-0.31 * w} width={w * 0.88} height={0.22 * w} rx={0.04 * w} fill={rimC} />
      </g>
    );
  } else if (vessel === "board") {
    body = (
      <g>
        <rect x={-w * 0.5} y={-0.05 * w} width={w} height={0.05 * w} rx={0.02 * w} fill={shade(vC, 0.22)} />
        <rect x={-w * 0.5} y={-0.29 * w} width={w} height={0.24 * w} rx={0.05 * w} fill={vC} />
        <ellipse cx={w * 0.42} cy={-0.17 * w} rx={0.025 * w} ry={0.025 * w} fill={shade(vC, 0.3)} />
      </g>
    );
  } else if (g) {
    const handle = vessel === "pan" ? (
      <rect x={g.R * 0.8} y={g.yc - 0.035 * w} width={0.594 * w} height={0.07 * w} rx={0.035 * w} fill={shade(vC, 0.35)} />
    ) : null;
    const weave: React.ReactNode[] = [];
    if (vessel === "basket") for (let k = 1; k <= 4; k++) {
      const t = k / 5, Rt = g.R + (g.Rb - g.R) * t, yt = g.yc + (g.yb - g.yc) * t, Ryt = g.Ry + (g.Ryb - g.Ry) * t;
      weave.push(<path key={k} d={`M ${f1(-Rt)} ${f1(yt)} A ${f1(Rt)} ${f1(Ryt)} 0 0 0 ${f1(Rt)} ${f1(yt)}`} stroke={shade(vC, 0.25)} strokeWidth={0.012 * w} fill="none" />);
    }
    body = (
      <g>
        {handle}
        <path d={sidePath(g)} fill={vC} />
        {weave}
        <ellipse cx={0} cy={g.yc} rx={g.R} ry={g.Ry} fill={vessel === "basket" ? shade(vC, 0.12) : vC} />
        <ellipse cx={0} cy={g.yc} rx={g.R * 0.86} ry={g.Ry * 0.86} fill={rimC} />
      </g>
    );
  }

  // food: all fills are placed inside the surface ellipse (sc), mounds rise above it
  const { cx, cy, rx, ry } = sc;
  const dome = (cxx: number, cyy: number, rxx: number, ryy: number) => <ellipse cx={cxx} cy={cyy} rx={rxx} ry={ryy} />;
  let food: React.ReactNode = null;
  if (fill === "liquid") food = <g><ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fC} /><ellipse cx={cx - rx * 0.4} cy={cy - ry * 0.15} rx={rx * 0.22} ry={ry * 0.22} fill="#FFFFFF" opacity={0.25} /></g>;
  if (fill === "mound" || fill === "grains") {
    food = (
      <g>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={shade(rimC, 0.1)} />
        <g fill={fC}>{dome(cx, cy - ry * 0.3, rx * 0.8, ry * 1.25)}{dome(cx, cy - ry * 1.4, rx * 0.5, ry * 0.9)}</g>
        {fill === "grains" && Array.from({ length: 46 }, (_, i) => {
          const a = hash(i) * Math.PI * 2, r = Math.sqrt(hash(i + 99)) * 0.7;
          return <ellipse key={i} cx={cx + Math.cos(a) * rx * r * 0.85} cy={cy - ry * 0.3 + Math.sin(a) * ry * r * 1.1 - ry * 0.2} rx={w * 0.011} ry={w * 0.006} fill={fC2 === C.yellowDark ? shade(fC, 0.18) : fC2} transform={`rotate(${f1(hash(i + 7) * 180)} ${f1(cx)} ${f1(cy)})`} />;
        })}
      </g>
    );
  }
  if (fill === "strands") {
    const broth = p.fillColor2 ?? "#D98E3A";
    const noodle = p.fillColor ?? "#F7E3A1";
    const edge = shade(noodle, 0.22);
    const lines: React.ReactNode[] = [];
    for (let i = 0; i < 8; i++) {
      const k = -0.6 + (i / 7) * 1.2, y0 = cy + k * ry;
      const lifted = i % 3 === 0;
      const dd = lifted
        ? `M ${f1(-rx * 0.7)} ${f1(y0)} Q ${f1(-rx * 0.1)} ${f1(cy - w * 0.24)} ${f1(rx * 0.35)} ${f1(cy - w * 0.14)} T ${f1(rx * 0.75)} ${f1(y0 - ry * 0.2)}`
        : `M ${f1(-rx * 0.85)} ${f1(y0)} C ${f1(-rx * 0.45)} ${f1(y0 - ry * 0.9)} ${f1(rx * 0.1)} ${f1(y0 + ry * 0.8)} ${f1(rx * 0.85)} ${f1(y0 - ry * 0.3)}`;
      lines.push(<path key={"e" + i} d={dd} stroke={edge} strokeWidth={w * 0.024} strokeLinecap="round" fill="none" />);
      lines.push(<path key={"n" + i} d={dd} stroke={noodle} strokeWidth={w * 0.018} strokeLinecap="round" fill="none" />);
    }
    food = (
      <g>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={broth} />
        {lines}
      </g>
    );
  }
  if (fill === "chunks") {
    food = (
      <g>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fC} />
        {Array.from({ length: 8 }, (_, i) => {
          const a = hash(i + 3) * Math.PI * 2, r = 0.25 + hash(i + 11) * 0.5;
          return <ellipse key={i} cx={cx + Math.cos(a) * rx * r} cy={cy + Math.sin(a) * ry * r} rx={w * 0.03} ry={w * 0.022} fill={fC2} transform={`rotate(${f1(hash(i + 5) * 160)} ${f1(cx + Math.cos(a) * rx * r)} ${f1(cy + Math.sin(a) * ry * r)})`} />;
        })}
      </g>
    );
  }
  if (fill === "leafy") {
    food = (
      <g>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={shade(rimC, 0.1)} />
        <ellipse cx={cx} cy={cy - ry * 0.5} rx={rx * 0.9} ry={ry * 1.3} fill={shade(fC, 0.25)} />
        {Array.from({ length: 12 }, (_, i) => {
          const a = Math.PI + (i / 11) * Math.PI + (hash(i) - 0.5) * 0.3, r = 0.5 + hash(i + 30) * 0.4;
          const lx = cx + Math.cos(a) * rx * r * 0.85, ly = cy - ry * 0.6 + Math.sin(a) * ry * r * 0.9;
          const col = i % 3 === 1 ? (p.fillColor2 ?? shade(fC, 0.12)) : fC;
          return (
            <g key={i} transform={`translate(${f1(lx)} ${f1(ly)}) rotate(${f1((a * 180) / Math.PI + 90 + (hash(i + 2) - 0.5) * 60)})`}>
              <ellipse cx={0} cy={0} rx={w * 0.12} ry={w * 0.045} fill={col} />
              <line x1={-w * 0.09} y1={0} x2={w * 0.09} y2={0} stroke={shade(col, 0.3)} strokeWidth={w * 0.01} strokeLinecap="round" />
            </g>
          );
        })}
      </g>
    );
  }
  if (fill === "pieces") {
    // a heaped dome: base colour fills the bowl and rises above the rim, bits overlap on top
    const dc = cy - w * 0.08, dr = w * 0.28;
    const bits = Array.from({ length: 40 }, (_, i) => {
      const a = hash(i) * Math.PI * 2, rr = Math.sqrt(hash(i + 50)) * 0.9;
      return { x: cx + Math.cos(a) * rx * 0.95 * rr, y: dc + Math.sin(a) * dr * rr, r: w * (0.035 + hash(i + 9) * 0.02), k: hash(i + 20) * 6.28, col: i % 3 === 0 ? fC2 : i % 3 === 1 ? shade(fC, 0.15) : fC };
    }).sort((b1, b2) => b1.y - b2.y);
    food = (
      <g>
        <ellipse cx={cx} cy={dc} rx={rx * 0.95} ry={dr} fill={fC} />
        {bits.map((b, i) => {
          const pts: P2[] = [0, 1, 2, 3, 4].map((j) => { const aa = b.k + (j * Math.PI * 2) / 5, rr2 = b.r * (0.75 + 0.25 * hash(i * 5 + j)); return [b.x + Math.cos(aa) * rr2, b.y + Math.sin(aa) * rr2 * 0.8]; });
          return <path key={i} d={`M ${pts.map(pt).join(" L ")} Z`} fill={b.col} />;
        })}
      </g>
    );
  }
  if (fill === "balls") {
    const r = w * 0.068, rows = [5, 4, 3, 2];
    const items: React.ReactNode[] = [];
    let n = 0;
    rows.forEach((count, ri) => {
      const yy = cy - ry * 0.3 - ri * r * 1.6;
      for (let i = 0; i < count; i++) {
        const xx = (i - (count - 1) / 2) * r * 2.02 + (ri % 2 ? r * 0.2 : 0);
        const col = n % 3 === 2 ? fC2 : fC;
        items.push(<g key={n}><circle cx={xx} cy={yy} r={r} fill={col} /><circle cx={xx - r * 0.35} cy={yy - r * 0.35} r={r * 0.25} fill="#FFFFFF" opacity={0.4} /></g>);
        n++;
      }
    });
    food = <g><ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={shade(rimC, 0.1)} />{items}</g>;
  }

  // garnish (on top)
  let garn: React.ReactNode = null;
  if (garnish === "egg") garn = (
    <g>
      <ellipse cx={cx + rx * 0.3} cy={cy - ry * 0.3} rx={w * 0.1} ry={w * 0.07} fill="#FFFFFF" />
      <ellipse cx={cx + rx * 0.3} cy={cy - ry * 0.3} rx={w * 0.05} ry={w * 0.04} fill="#FFB23F" />
    </g>
  );
  if (garnish === "herbs") garn = (
    <g fill={C.green}>
      {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={cx - rx * 0.35 + hash(i) * rx * 0.7} cy={cy - ry * 0.2 - hash(i + 4) * ry * 0.8} rx={w * 0.03} ry={w * 0.013} transform={`rotate(${f1(hash(i + 8) * 180)} ${f1(cx)} ${f1(cy)})`} />)}
    </g>
  );
  if (garnish === "lemon") garn = (
    <g transform={`translate(${f1(w * 0.56)} ${f1(sc.cy - w * 0.04)}) rotate(-12)`}>
      <path d={`M ${f1(-w * 0.1)} 0 A ${f1(w * 0.1)} ${f1(w * 0.1)} 0 0 0 ${f1(w * 0.1)} 0 Z`} fill={C.yellow} />
      <path d={`M ${f1(-w * 0.08)} 0 A ${f1(w * 0.08)} ${f1(w * 0.08)} 0 0 0 ${f1(w * 0.08)} 0 Z`} fill="#FFF3B0" />
      {[-0.04, 0, 0.04].map((k, i) => <line key={i} x1={k * w} y1={0} x2={k * w * 0.5} y2={-w * 0.07} stroke={C.yellow} strokeWidth={w * 0.008} />)}
    </g>
  );
  if (garnish === "chopsticks") garn = (
    <g stroke="#B5814F" strokeWidth={w * 0.018} strokeLinecap="round">
      <line x1={cx + rx * 0.2} y1={cy} x2={w * 0.62} y2={-w * 0.62} />
      <line x1={cx + rx * 0.05} y1={cy} x2={w * 0.66} y2={-w * 0.6} />
    </g>
  );
  if (garnish === "spoon") garn = (
    <g>
      <line x1={cx - rx * 0.2} y1={cy + ry * 0.3} x2={w * 0.5} y2={-w * 0.5} stroke={C.greyLight} strokeWidth={w * 0.022} strokeLinecap="round" />
      <ellipse cx={cx - rx * 0.2} cy={cy + ry * 0.3} rx={w * 0.07} ry={w * 0.045} fill={C.greyLight} />
    </g>
  );
  if (garnish === "fork") garn = (
    <g stroke={C.greyLight} strokeWidth={w * 0.014} strokeLinecap="round">
      <line x1={-w * 0.5} y1={-w * 0.6} x2={-w * 0.14} y2={-w * 0.12} />
      {[-0.05, 0, 0.05].map((k, i) => <line key={i} x1={-w * 0.14 + k * w * 0.5} y1={-w * 0.12} x2={-w * 0.14 + k * w * 0.5} y2={-w * 0.27} />)}
    </g>
  );

  // steam: three curls rising and fading (animated from f)
  let steamEl: React.ReactNode = null;
  if (p.steam) {
    const topY = (g ? g.yc - g.Ry : -0.36 * w) - w * 0.05;
    steamEl = (
      <g fill="none" stroke="#FFFFFF" strokeWidth={w * 0.014} strokeLinecap="round">
        {[0, 1, 2].map((i) => {
          const ph = (f / 70 + i / 3) % 1;
          return (
            <path key={i} transform={`translate(${f1((i - 1) * w * 0.17)} ${f1(topY - ph * w * 0.35)})`} opacity={Math.sin(ph * Math.PI) * 0.8}
              d={`M 0 0 C ${f1(w * 0.03)} ${f1(-w * 0.05)} ${f1(-w * 0.03)} ${f1(-w * 0.1)} 0 ${f1(-w * 0.15)} S ${f1(w * 0.03)} ${f1(-w * 0.23)} 0 ${f1(-w * 0.27)}`} />
          );
        })}
      </g>
    );
  }

  // motion
  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  const shadowRx = flat ? w * 0.56 : w * 0.5;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={shadowRx} ry={w * 0.05} fill={C.shadow} />
      <g transform={tr}>
        <g transform={vessel === "pan" ? `translate(${f1(-w * 0.255)} 0)` : undefined}>
          {body}
          {food}
          {garn}
        </g>
        {steamEl}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Dish {...p} />;
}
