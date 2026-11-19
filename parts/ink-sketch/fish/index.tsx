import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ink, INK, PAPER } from "../style/index";

// Ink sketch fish generator (ink line + loose wash; geometry shared with flat-vector/fish).
const C = { ink: INK, inkSoft: "#3a3634", white: PAPER, shadow: "rgba(31,28,26,0.12)" };
export const shade = (hex: string, k = 0.18) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(v * (1 - k)))).toString(16).padStart(2, "0");
  return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
};

// Ink sketch fish generator. Origin = body centre (x, y), faces right, honours flip. Sizes in px at s = 1.
// Overall length ~ len + 0.6 x tailSize. The body outline is sampled from a top/bottom half-height profile;
// fins are teardrops and fan paths. Motion comes only from p.f (swim, dart, idle, puffed).

export type FPose = "swim" | "idle" | "dart" | "puffed";
export type FShape = "torpedo" | "oval" | "round" | "tall" | "long" | "flat-top";
export type FHead = "normal" | "hammer" | "bill" | "whiskers";
export type FTail = "fan" | "fork" | "crescent" | "round" | "double" | "point";
export type FDorsal = "none" | "small" | "tall" | "long" | "sail";
export type FPattern = "none" | "bands" | "stripes" | "spots" | "speckles" | "scales";
export type FMouth = "closed" | "open" | "smile";

export type FishSpec = {
  pose?: FPose; len?: number; bodyH?: number; shape?: FShape; head?: FHead;
  color?: string; belly?: string; back?: string; finColor?: string;
  tail?: FTail; tailSize?: number; dorsal?: FDorsal;
  pattern?: FPattern; patternColor?: string; bandColor?: string; bandEdge?: string;
  spikes?: boolean; eyeSize?: number; eyeType?: "eye" | "dot"; mouth?: FMouth; gills?: boolean; bubbles?: boolean;
};

const N = 48;
const ell = (u: number) => Math.sqrt(Math.max(0, 1 - u * u));
const n1 = (v: number) => v.toFixed(1);
const span = (a: number, b: number, n = N) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);

/** Half-height profile [top, bottom] as fractions of bodyH / 2. t = 0 at the nose, 1 at the tail base. */
function profile(shape: FShape, t: number): [number, number] {
  switch (shape) {
    case "torpedo": {
      const h = t < 0.3 ? ell((0.3 - t) / 0.3) : Math.max(0.1, 1 - 0.9 * Math.pow((t - 0.3) / 0.7, 1.7));
      return [h, h];
    }
    case "round": { const h = Math.max(0.2, Math.pow(ell((t - 0.5) / 0.5), 0.6)); return [h, h]; }
    case "tall": { const h = Math.max(0.12, Math.pow(ell((t - 0.5) / 0.5), 0.45)); return [h, h]; }
    case "long": {
      const h = t < 0.1 ? ell((0.1 - t) / 0.1) : Math.max(0.1, 1 - 0.85 * Math.pow((t - 0.1) / 0.9, 1.5));
      return [h, h];
    }
    case "flat-top": {
      const top = (t < 0.1 ? 0.55 + 0.45 * ell((0.1 - t) / 0.1) : 1) * (t < 0.7 ? 1 : Math.max(0.2, 1 - (0.8 * (t - 0.7)) / 0.3));
      return [top, Math.max(0.15, ell((t - 0.45) / 0.55))];
    }
    default: { const h = Math.max(0.12, ell((t - 0.5) / 0.5)); return [h, h]; }
  }
}

/** Teardrop fin from base b towards tip tp, half width w at the base. */
function teardrop(b: [number, number], tp: [number, number], w: number) {
  const dx = tp[0] - b[0], dy = tp[1] - b[1], m = Math.hypot(dx, dy) || 1;
  const nx = (-dy / m) * w, ny = (dx / m) * w, mx = (b[0] + tp[0]) / 2, my = (b[1] + tp[1]) / 2;
  return `M ${n1(b[0] + nx)} ${n1(b[1] + ny)} Q ${n1(mx + nx * 1.3)} ${n1(my + ny * 1.3)} ${n1(tp[0])} ${n1(tp[1])} Q ${n1(mx - nx * 0.6)} ${n1(my - ny * 0.6)} ${n1(b[0] - nx)} ${n1(b[1] - ny)} Z`;
}

/** Caudal fin in local space: base at x = 8 (inside the body), spreading to x = -L; q = peduncle half height, Hh = fin half height. */
function tailPath(k: FTail, L: number, Hh: number, q: number) {
  const B = 8, a = n1(-q), b = n1(q);
  switch (k) {
    case "fork":
      return `M ${B} ${a} C ${n1(-L * 0.3)} ${n1(-Hh * 0.7)} ${n1(-L * 0.75)} ${n1(-Hh)} ${n1(-L)} ${n1(-Hh)} L ${n1(-L * 0.72)} 0 L ${n1(-L)} ${n1(Hh)} C ${n1(-L * 0.75)} ${n1(Hh)} ${n1(-L * 0.3)} ${n1(Hh * 0.7)} ${B} ${b} Z`;
    case "crescent":
      return `M ${B} ${a} Q ${n1(-L * 0.45)} ${n1(-Hh * 0.95)} ${n1(-L)} ${n1(-Hh)} Q ${n1(-L * 0.42)} 0 ${n1(-L)} ${n1(Hh)} Q ${n1(-L * 0.45)} ${n1(Hh * 0.95)} ${B} ${b} Z`;
    case "round":
      return `M ${B} ${a} C ${n1(-L * 0.4)} ${n1(-Hh * 1.25)} ${n1(-L * 1.02)} ${n1(-Hh * 0.9)} ${n1(-L * 0.9)} 0 C ${n1(-L * 1.02)} ${n1(Hh * 0.9)} ${n1(-L * 0.4)} ${n1(Hh * 1.25)} ${B} ${b} Z`;
    case "double":
      return `M ${B} ${a} C ${n1(-L * 0.35)} ${n1(-Hh * 1.35)} ${n1(-L * 0.8)} ${n1(-Hh * 1.35)} ${n1(-L)} ${n1(-Hh)} C ${n1(-L * 0.9)} ${n1(-Hh * 0.4)} ${n1(-L * 0.7)} ${n1(-Hh * 0.2)} ${n1(-L * 0.55)} 0 C ${n1(-L * 0.7)} ${n1(Hh * 0.2)} ${n1(-L * 0.9)} ${n1(Hh * 0.5)} ${n1(-L * 0.95)} ${n1(Hh)} C ${n1(-L * 0.6)} ${n1(Hh * 1.25)} ${n1(-L * 0.3)} ${n1(Hh * 1.1)} ${B} ${b} Z`;
    case "point":
      return `M ${B} ${a} Q ${n1(-L * 0.45)} ${n1(-Hh * 0.5)} ${n1(-L)} 0 Q ${n1(-L * 0.45)} ${n1(Hh * 0.5)} ${B} ${b} Z`;
    default: // fan
      return `M ${B} ${a} Q ${n1(-L * 0.5)} ${n1(-Hh * 1.2)} ${n1(-L)} ${n1(-Hh)} Q ${n1(-L * 1.1)} 0 ${n1(-L)} ${n1(Hh)} Q ${n1(-L * 0.5)} ${n1(Hh * 1.2)} ${B} ${b} Z`;
  }
}

const DORSAL: Record<string, { t0: number; t1: number; ta: number; dh: number; kind: "round" | "tall" | "sail" }> = {
  small: { t0: 0.3, t1: 0.5, ta: 0.38, dh: 0.24, kind: "round" },
  tall: { t0: 0.2, t1: 0.56, ta: 0.3, dh: 0.85, kind: "tall" },
  long: { t0: 0.1, t1: 0.86, ta: 0.4, dh: 0.2, kind: "round" },
  sail: { t0: 0.2, t1: 0.62, ta: 0.32, dh: 0.7, kind: "sail" },
};

const Eye = ({ x, y, r, type }: { x: number; y: number; r: number; type: "eye" | "dot" }) =>
  type === "dot" ? (
    <circle cx={n1(x)} cy={n1(y)} r={n1(r)} fill={C.ink} />
  ) : (
    <g>
      <circle cx={n1(x)} cy={n1(y)} r={n1(r)} fill={C.white} />
      <circle cx={n1(x + r * 0.22)} cy={n1(y)} r={n1(r * 0.6)} fill={C.ink} />
      <circle cx={n1(x + r * 0.02)} cy={n1(y - r * 0.3)} r={n1(r * 0.2)} fill={C.white} />
    </g>
  );

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Fish(p: PartProps<any> & FishSpec) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const pose: FPose = p.pose ?? "swim";
  const puffed = pose === "puffed";
  const len = p.len ?? 120;
  const H = p.bodyH ?? (puffed ? len * 0.9 : len * 0.55), H2 = H / 2;
  const shape: FShape = p.shape ?? "torpedo";
  const col = p.color ?? "#F2A33A";
  const finC = p.finColor ?? shade(col, 0.12), finFar = shade(finC, 0.2);
  const belly = p.belly ?? "none", back = p.back ?? "none";
  const tailK: FTail = p.tail ?? "fan";
  const tailSize = p.tailSize ?? H * 0.9, TL = tailSize * 0.6, TH = tailSize / 2;
  const dorsal: FDorsal = p.dorsal ?? "small";
  const pat: FPattern = p.pattern ?? "none", patC = p.patternColor ?? shade(col, 0.3);
  const bandC = p.bandColor ?? C.white, bandE = p.bandEdge ?? C.ink;
  const eyeK = p.eyeSize ?? 1, head: FHead = p.head ?? "normal", mouth: FMouth = p.mouth ?? "closed";
  const flip = !!p.flip, x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1000;
  const hx = len / 2, X = (t: number) => hx - t * len;

  // motion (only from p.f)
  const ph = pose === "dart" ? f * 0.5 : pose === "swim" ? f * 0.2 : f * 0.05;
  const waveA = pose === "dart" ? len * 0.07 : pose === "swim" ? len * 0.035 : pose === "idle" ? len * 0.012 : 0;
  const wave = (t: number) => waveA * Math.pow(t, 1.6) * Math.sin(ph - t * 2.4);
  const beat = Math.sin(ph - 2.4) * (pose === "dart" ? 24 : pose === "swim" ? 14 : 5);
  const flutter = Math.sin(f * (pose === "idle" ? 0.22 : pose === "dart" ? 0.6 : 0.3)) * (pose === "idle" ? 14 : pose === "dart" ? 5 : 8);
  const bob = pose === "idle" ? Math.sin(f * 0.05) * 6 : puffed ? Math.sin(f * 0.04) * 4 : 0;

  // outline
  const prof = (t: number): [number, number] => {
    if (!puffed) return profile(shape, t);
    const h = Math.pow(ell((t - 0.5) / 0.5), 0.5), k = t > 0.5 ? Math.max(0.22, h) : h;
    return [k, k];
  };
  const topY = (t: number) => -prof(t)[0] * H2 + wave(t);
  const botY = (t: number) => prof(t)[1] * H2 + wave(t);
  const midY = (t: number) => (topY(t) + botY(t)) / 2;
  const halfH = (t: number) => (botY(t) - topY(t)) / 2;
  const path = (ts: number[], a: (t: number) => number, b: (t: number) => number) => {
    const fwd = ts.map((t) => `${n1(X(t))} ${n1(a(t))}`);
    const rev = [...ts].reverse().map((t) => `${n1(X(t))} ${n1(b(t))}`);
    return `M ${fwd.join(" L ")} L ${rev.join(" L ")} Z`;
  };
  const bodyD = path(span(0, 1), topY, botY);

  // tail (rotates about the tail base)
  const pedQ = Math.max(2, prof(1)[0] * H2);
  const tailEl = (
    <g transform={`translate(${n1(X(1))} ${n1(wave(1))}) rotate(${n1(beat)})`}>
      <path d={tailPath(tailK, TL, TH, pedQ)} fill={finC} />
    </g>
  );

  // dorsal fin
  let dorsalD = "";
  const dd = dorsal !== "none" ? DORSAL[dorsal] : undefined;
  if (dd) {
    const P0: [number, number] = [X(dd.t0), topY(dd.t0) + 4];
    const P1: [number, number] = [X(dd.t1), topY(dd.t1) + 4];
    const A: [number, number] = [X(dd.ta), topY(dd.ta) - dd.dh * H];
    if (dd.kind === "tall") {
      const mid: [number, number] = [(A[0] + P1[0]) / 2, (A[1] + P1[1]) / 2];
      const c2: [number, number] = [mid[0] + (P0[0] - mid[0]) * 0.35, mid[1] + (P0[1] - mid[1]) * 0.35];
      dorsalD = `M ${n1(P0[0])} ${n1(P0[1])} Q ${n1(P0[0])} ${n1(A[1])} ${n1(A[0])} ${n1(A[1])} Q ${n1(c2[0])} ${n1(c2[1])} ${n1(P1[0])} ${n1(P1[1])} Z`;
    } else if (dd.kind === "sail") {
      dorsalD = `M ${n1(P0[0])} ${n1(P0[1])} C ${n1(P0[0])} ${n1(A[1])} ${n1(P1[0])} ${n1(A[1])} ${n1(P1[0])} ${n1(P1[1])} Z`;
    } else {
      const cy = 2 * A[1] - (P0[1] + P1[1]) / 2;
      dorsalD = `M ${n1(P0[0])} ${n1(P0[1])} Q ${n1(A[0])} ${n1(cy)} ${n1(P1[0])} ${n1(P1[1])} Z`;
    }
  }

  // paired and anal fins
  const pecB: [number, number] = [X(0.27), H * 0.12], pecT: [number, number] = [X(0.27) - len * 0.17, H * 0.42];
  const pecFarB: [number, number] = [X(0.3) - 2, H * 0.16], pecFarT: [number, number] = [X(0.3) - len * 0.15, H * 0.5];
  const analD = teardrop([X(0.68), botY(0.68) - 6], [X(0.8), botY(0.8) + H * 0.22], H * 0.07);

  // spikes (puffed)
  let spikeEls: React.ReactNode = null;
  if (p.spikes) {
    const cx = X(0.5), cy = midY(0.5), w = H * 0.05, L = H * 0.2, sp: React.ReactNode[] = [];
    for (let side = 0; side < 2; side++) {
      for (let i = 2; i < N - 1; i += 3) {
        const t = i / N, yy = side ? botY(t) : topY(t);
        const px = X(t), dx = px - cx, dy = yy - cy, m = Math.hypot(dx, dy) || 1;
        const ux = dx / m, uy = dy / m, tx = -uy * w, ty = ux * w;
        sp.push(<path key={`${side}-${i}`} d={`M ${n1(px + tx)} ${n1(yy + ty)} L ${n1(px + ux * L)} ${n1(yy + uy * L)} L ${n1(px - tx)} ${n1(yy - ty)} Z`} fill={belly !== "none" ? belly : finC} />);
      }
    }
    spikeEls = <g>{sp}</g>;
  }

  // head parts drawn behind the body
  let headBack: React.ReactNode = null;
  if (head === "hammer") headBack = <rect x={n1(hx - len * 0.06)} y={n1(-H * 0.55)} width={n1(len * 0.13)} height={n1(H * 1.1)} rx={n1(len * 0.05)} fill={col} />;
  if (head === "bill") headBack = <path d={`M ${n1(hx - len * 0.12)} ${n1(-H * 0.12)} Q ${n1(hx + len * 0.25)} ${n1(-H * 0.08)} ${n1(hx + len * 0.5)} 0 Q ${n1(hx + len * 0.25)} ${n1(H * 0.06)} ${n1(hx - len * 0.12)} ${n1(H * 0.1)} Z`} fill={shade(col, 0.25)} />;

  // patterns
  const patterns: React.ReactNode[] = [];
  const ts = { lo: 0.02, hi: 0.98 };
  if (pat === "bands") {
    for (const c of [0.3, 0.58, 0.86]) {
      const w = 0.045, e = 0.02;
      patterns.push(<path key={`be${c}`} d={path(span(Math.max(0, c - w - e), Math.min(1, c + w + e)), topY, botY)} fill={bandE} />);
      patterns.push(<path key={`bw${c}`} d={path(span(c - w, c + w), topY, botY)} fill={bandC} />);
    }
  }
  if (pat === "stripes") {
    for (const v of [-0.5, -0.12, 0.26]) {
      patterns.push(<path key={`st${v}`} d={path(span(ts.lo, ts.hi), (t) => midY(t) + (v - 0.1) * halfH(t), (t) => midY(t) + (v + 0.1) * halfH(t))} fill={patC} />);
    }
  }
  if (pat === "spots") {
    const spots: [number, number, number][] = [[0.2, -0.3, 1], [0.35, 0.25, 0.8], [0.45, -0.45, 0.7], [0.55, 0.2, 1], [0.68, -0.2, 0.8], [0.75, 0.45, 0.7], [0.85, -0.05, 0.6], [0.4, 0.6, 0.5], [0.62, 0.6, 0.5]];
    spots.forEach(([t, v, k], i) => patterns.push(<circle key={`sp${i}`} cx={n1(X(t))} cy={n1(midY(t) + v * halfH(t))} r={n1(H * 0.09 * k)} fill={patC} />));
  }
  if (pat === "speckles") {
    let k = 0;
    for (let j = 0; j < 4; j++) for (let t = 0.12; t < 0.92; t += 0.08) {
      const v = -0.6 + j * 0.4, tt = t + (j % 2 ? 0.04 : 0);
      patterns.push(<circle key={`dk${k++}`} cx={n1(X(tt))} cy={n1(midY(tt) + v * halfH(tt))} r={n1(H * 0.035)} fill={patC} />);
    }
  }
  if (pat === "scales") {
    let k = 0;
    for (let j = 0; j < 3; j++) for (let t = 0.1; t < 0.95; t += 0.1) {
      const tt = t + (j % 2 ? 0.05 : 0), cx = X(tt), cy = midY(tt) + (j - 1) * halfH(tt) * 0.6, r = H * 0.08;
      patterns.push(<path key={`sc${k++}`} d={`M ${n1(cx - r)} ${n1(cy)} A ${n1(r)} ${n1(r)} 0 0 0 ${n1(cx + r)} ${n1(cy)} Z`} fill={patC} />);
    }
  }

  // gills
  const gillN = p.gills ? (len > 300 ? 5 : 3) : 0;
  const gills: React.ReactNode[] = [];
  for (let k = 0; k < gillN; k++) {
    const t = 0.18 + k * 0.028, gx = X(t), y1 = topY(t) + (botY(t) - topY(t)) * 0.22, y2 = topY(t) + (botY(t) - topY(t)) * 0.62, w = len * 0.012, ym = (y1 + y2) / 2;
    gills.push(<path key={`g${k}`} d={`M ${n1(gx)} ${n1(y1)} Q ${n1(gx - w)} ${n1(ym)} ${n1(gx)} ${n1(y2)} Q ${n1(gx - w * 0.35)} ${n1(ym)} ${n1(gx)} ${n1(y1)} Z`} fill={shade(col, 0.4)} />);
  }

  // eye and mouth
  const ET = 0.16, eyeR = Math.max(2.5, Math.min(H * 0.13, len * 0.07)) * eyeK;
  const eyeY = midY(ET) - H * 0.06;
  const mw = Math.max(2, len * 0.02);
  let mouthEl: React.ReactNode = null;
  if (mouth === "closed") mouthEl = <path d={`M ${n1(hx - len * 0.1)} ${n1(H * 0.1)} Q ${n1(hx - len * 0.05)} ${n1(H * 0.14)} ${n1(hx - 1)} ${n1(H * 0.09)}`} stroke={C.ink} strokeWidth={n1(Math.max(1.5, len * 0.012))} fill="none" strokeLinecap="round" />;
  if (mouth === "smile") mouthEl = <path d={`M ${n1(hx - len * 0.1)} ${n1(H * 0.05)} Q ${n1(hx - len * 0.05)} ${n1(H * 0.13)} ${n1(hx - len * 0.01)} ${n1(H * 0.06)}`} stroke={C.ink} strokeWidth={n1(mw)} fill="none" strokeLinecap="round" />;
  if (mouth === "open") mouthEl = <ellipse cx={n1(hx - len * 0.04)} cy={n1(H * 0.15)} rx={n1(Math.max(2, len * 0.03))} ry={n1(Math.max(2.5, len * 0.035))} fill={C.ink} />;

  // head: normal eyes, or two eyes at the hammer ends
  const headEyes = head === "hammer"
    ? <g><Eye x={hx + len * 0.02} y={-H * 0.36} r={eyeR} type={p.eyeType ?? "eye"} /><Eye x={hx + len * 0.02} y={H * 0.36} r={eyeR} type={p.eyeType ?? "eye"} /></g>
    : <Eye x={X(ET)} y={eyeY} r={eyeR} type={p.eyeType ?? "eye"} />;

  // whiskers (catfish barbels)
  const whisk = head === "whiskers" ? (
    <g fill="none" stroke={shade(col, 0.35)} strokeWidth={n1(Math.max(2.5, len * 0.025))} strokeLinecap="round">
      <path d={`M ${n1(hx - len * 0.02)} ${n1(H * 0.1)} Q ${n1(hx + len * 0.03)} ${n1(H * 0.25)} ${n1(hx + len * 0.02)} ${n1(H * 0.42)}`} />
      <path d={`M ${n1(hx - len * 0.04)} ${n1(H * 0.12)} Q ${n1(hx)} ${n1(H * 0.3)} ${n1(hx - len * 0.06)} ${n1(H * 0.5)}`} />
    </g>
  ) : null;

  // rising bubbles from the mouth (local space, trail the fish)
  const bubbles = p.bubbles ? [0, 1, 2].map((i) => {
    const rise = (f * 1.3 + i * 80) % 240;
    return <circle key={`b${i}`} cx={n1(hx + len * 0.02 + Math.sin((f + i * 40) / 20) * 4)} cy={n1(-rise - H * 0.05)} r={n1(2.5 + rise / 60)} fill={C.white} opacity={0.8} />;
  }) : null;

  const inkW = Math.min(6, Math.max(3, len * 0.025)); // line width follows the fish size
  return (
    <g transform={`translate(${n1(x)} ${n1(y + bob)}) scale(${flip ? -s : s} ${s})`}>
      {ink(
        <g data-split>
      <g transform={`rotate(${n1(flutter)} ${n1(pecFarB[0])} ${n1(pecFarB[1])})`}>
        <path d={teardrop(pecFarB, pecFarT, H * 0.12)} fill={finFar} />
      </g>
      {dorsalD && <path d={dorsalD} fill={finC} />}
      <path d={analD} fill={finC} />
      {spikeEls}
      {headBack}
      <path d={bodyD} fill={col} />
      {back !== "none" && <path d={path(span(0, 1), topY, (t) => midY(t) - halfH(t) * 0.35)} fill={back} />}
      {belly !== "none" && <path d={path(span(0, 1), (t) => midY(t) + halfH(t) * 0.35, botY)} fill={belly} />}
      {patterns}
      {tailEl}
      {gills}
      <g transform={`rotate(${n1(flutter)} ${n1(pecB[0])} ${n1(pecB[1])})`}>
        <path d={teardrop(pecB, pecT, H * 0.12)} fill={finC} />
      </g>
      {headEyes}
      {mouthEl}
      {whisk}
      {bubbles}
        </g>,
        inkW,
      )}
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Fish {...p} />;
}
