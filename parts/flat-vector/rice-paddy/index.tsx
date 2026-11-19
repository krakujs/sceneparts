import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Rice paddy (flat-vector scenery): a green hillside at a 3/4 angle with five stepped, curved terraces.
// The terraces follow the hill's contour: each has a brown retaining edge, a blue-grey water surface and
// rows of bright rice tufts. Palms stand on the crest and a farmer's hat sits in the water. Origin = centre of
// the near edge. About 1000 px wide and 720 px tall at s = 1. anim: sway = tufts move, shimmer = water glints.
const f1 = (v: number) => (Math.round(v * 10) / 10).toString();
const K = 5; // number of terraces
const BASE = (k: number) => -500 + k * 100; // ridge height of curve k (0 = top, K = front)
const HALF = (k: number) => 330 + 170 * (k / K); // half-width of curve k: narrow at the crest, wide at the front
// Point on curve k at u in -1..1: an arch with a small wave so the steps look hand-shaped
const cv = (k: number, u: number): [number, number] => [HALF(k) * u, BASE(k) - 80 * (1 - u * u) + 12 * Math.sin(u * 2.5 + k * 1.3) * (1 - u * u)];
const U = Array.from({ length: 41 }, (_, i) => -1 + i / 20);
const line = (ps: number[][]) => ps.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(" L ");
const curve = (k: number, dy: number) => U.map((u) => { const [x, y] = cv(k, u); return [x, y + dy]; });
const band = (top: number[][], bot: number[][]) => `M ${line(top)} L ${line([...bot].reverse())} Z`;
// Point between curve k (top) and curve k+1 (bottom) at fraction t, below the retaining edge
const EDGE = 24;
const at = (k: number, u: number, t: number): [number, number] => {
  const [ax, ay] = cv(k, u), [bx, by] = cv(k + 1, u);
  const top = ay + EDGE;
  return [ax * (1 - t) + bx * t, top + (by - top) * t];
};

const WATER = "#7FA7BD", WATER_HI = "#E4F3FC", EARTH = "#8A5A3C", EARTH_HI = "#B07B4F", RICE = "#9BE06F", RICE_DK = "#2F7A3E";

const Palm: React.FC<{ x: number; y: number; h: number; lean: number; f: number; anim: string; i: number }> = ({ x, y, h, lean, f, anim, i }) => {
  const cx = x + lean, cy = y - h;
  const sw = anim === "sway" ? Math.sin(f / 25 + i) * 4 : 0;
  const leaves = [-165, -125, -85, -45, -5, 35];
  return (
    <g>
      <path d={`M ${f1(x)} ${f1(y)} Q ${f1(x + lean * 0.9)} ${f1(y - h * 0.5)} ${f1(cx)} ${f1(cy)}`} stroke={C.brownDark} strokeWidth={14} fill="none" strokeLinecap="round" />
      <g transform={`rotate(${f1(sw)} ${f1(cx)} ${f1(cy)})`}>
        {leaves.map((a, j) => (
          <path key={j} transform={`translate(${f1(cx)} ${f1(cy)}) rotate(${a})`} d="M 0 0 Q 50 -44 120 -10 Q 60 -18 0 0 Z" fill={j % 2 ? C.green : C.greenDark} />
        ))}
        <circle cx={f1(cx)} cy={f1(cy + 6)} r={9} fill={C.brownDark} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const anim: string = p.anim ?? "sway";
  const water = p.water && p.water !== "none" ? p.water : WATER;
  const tufts: React.ReactNode[] = [];
  const bands: React.ReactNode[] = [];
  for (let k = 0; k < K; k++) {
    const wall = curve(k, EDGE), bot = curve(k + 1, 0);
    bands.push(
      <g key={`t${k}`}>
        <path d={band(curve(k, 0), wall)} fill={shade(EARTH, 0.05 * k)} />
        <path d={`M ${line(curve(k, 0))}`} stroke={EARTH_HI} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d={band(wall, bot)} fill={shade(water, 0.03 * k)} />
        <path d={band(curve(k, EDGE + 14), curve(k, EDGE + 26))} fill={WATER_HI} opacity={0.5} />
      </g>,
    );
    // rice tufts: three perspective rows across each terrace, nearer rows bigger
    [0.32, 0.6, 0.84].forEach((t, row) => {
      const size = 12 + 10 * t;
      let d = "";
      for (let u = -0.8 + (row % 2) * 0.06; u <= 0.8; u += 0.16) {
        const [px, py] = at(k, u, t);
        d += `M ${f1(px - size)} ${f1(py - size * 1.4)} L ${f1(px)} ${f1(py)} L ${f1(px + size)} ${f1(py - size * 1.4)} `;
      }
      const [cx, cy] = at(k, 0, t);
      const sw = anim === "sway" ? Math.sin(f / 18 + k * 0.9 + row * 1.7) * 5 : 0;
      tufts.push(
        <g key={`r${k}-${row}`} transform={`rotate(${f1(sw)} ${f1(cx)} ${f1(cy)})`}>
          <path d={d} stroke={RICE_DK} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} stroke={RICE} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 -2)" />
        </g>,
      );
    });
  }
  const glint = (fr: number) => (anim === "shimmer" ? 0.35 + 0.5 * Math.sin(fr / 14) : 0.6);
  const crest = cv(0, -1), crestR = cv(0, 1);
  // green hillside silhouette: a dome over the crest, sides following the terrace ends, grass at the front
  const sides = Array.from({ length: K + 1 }, (_, k) => cv(k, 1));
  const left = Array.from({ length: K + 1 }, (_, k) => cv(K - k, -1));
  const hill = `M ${f1(crest[0])} ${f1(crest[1])} Q 0 ${BASE(0) - 170} ${f1(crestR[0])} ${f1(crestR[1])} L ${line(sides.slice(1))} L ${f1(HALF(K))} 0 L ${f1(-HALF(K))} 0 L ${line(left.slice(0, K))} Z`;
  const palmA = cv(0, -0.6), palmB = cv(0, 0.45);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={520} ry={14} fill={C.shadow} />
      <path d={hill} fill={C.green} />
      <path d={`M ${f1(crestR[0] * 0.3)} ${f1(BASE(0) - 160)} Q ${f1(HALF(K) * 0.7)} ${f1(BASE(0) - 40)} ${f1(HALF(K))} 0 L 0 0 Z`} fill={shade(C.green, 0.14)} opacity={0.7} />
      {bands}
      {[0, 1, 2, 3, 4].map((k) => {
        const [gx, gy] = at(k, -0.35 + (k % 2) * 0.5, 0.45);
        return <line key={`g${k}`} x1={f1(gx - 30)} y1={f1(gy)} x2={f1(gx + 30)} y2={f1(gy)} stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" opacity={f1(glint(f + k * 9))} />;
      })}
      {tufts}
      {/* farmer's conical hat in the water */}
      {(() => {
        const [hx, hy] = at(2, 0.4, 0.5);
        return (
          <g transform={`translate(${f1(hx)} ${f1(hy)}) scale(1.4)`}>
            <ellipse cx={0} cy={0} rx={46} ry={11} fill={shade(C.yellowDark, 0.1)} />
            <path d="M -30 0 Q -4 -58 0 -62 Q 4 -58 30 0 Z" fill={C.yellow} />
            <path d="M -30 0 L 30 0" stroke={C.yellowDark} strokeWidth={4} />
          </g>
        );
      })()}
      <Palm x={palmA[0]} y={palmA[1]} h={180} lean={18} f={f} anim={anim} i={0} />
      <Palm x={palmB[0]} y={palmB[1]} h={130} lean={-14} f={f} anim={anim} i={1} />
    </g>
  );
}
