import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stand-up sign with a decorative QR-like pattern. The grid is hand-made and fixed: it is not a real, scannable code.
// Origin = bottom centre (feet on y). Hero size, about 340 px wide and 500 px tall at s = 1.
// anim "scan": a light bar sweeps down over the pattern.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const GRID = [
  "101001011010010", "110110100101101", "001011011001010", "101100100110111",
  "011010111001001", "100111010110100", "110001101011011", "010110010100101",
  "101011101101010", "011100110010110", "110101001011001", "001011110100111",
  "100110011011000", "011001101100101", "110100010111010",
];
const M = 18, X0 = -135, Y0 = -445;
// Three corner finder squares: top-left, top-right and bottom-left. Data cells skip those areas.
const inFinder = (r: number, c: number) => (r <= 7 && c <= 7) || (r <= 6 && c >= 7) || (r >= 7 && c <= 6);
const finder = (c0: number, r0: number) => (
  <g key={`f${c0}${r0}`}>
    <rect x={X0 + c0 * M} y={Y0 + r0 * M} width={7 * M} height={7 * M} fill={C.ink} />
    <rect x={X0 + (c0 + 1) * M} y={Y0 + (r0 + 1) * M} width={5 * M} height={5 * M} fill={C.white} />
    <rect x={X0 + (c0 + 2) * M} y={Y0 + (r0 + 2) * M} width={3 * M} height={3 * M} fill={C.ink} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : C.blue;
  const code = p.code && p.code !== "none" ? p.code : C.ink;
  const anim: string = p.anim ?? "none";
  const sweepY = -455 + ((f * 3) % 260);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={180} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* A-frame legs */}
        <line x1={-20} y1={-120} x2={-110} y2={-4} stroke={shade(frame, 0.2)} strokeWidth={18} strokeLinecap="round" />
        <line x1={20} y1={-120} x2={110} y2={-4} stroke={shade(frame, 0.2)} strokeWidth={18} strokeLinecap="round" />
        <ellipse cx={-110} cy={-4} rx={22} ry={8} fill={C.inkSoft} />
        <ellipse cx={110} cy={-4} rx={22} ry={8} fill={C.inkSoft} />
        {/* board */}
        <rect x={-170} y={-500} width={340} height={380} rx={24} fill={frame} />
        <rect x={-160} y={-490} width={120} height={10} rx={5} fill={C.white} opacity={0.25} />
        <rect x={-140} y={-470} width={280} height={320} rx={12} fill={C.white} />
        {GRID.map((row, r) => row.split("").map((ch, c) => (ch === "1" && !inFinder(r, c) ? (
          <rect key={`${r}-${c}`} x={X0 + c * M} y={Y0 + r * M} width={M} height={M} fill={code} />
        ) : null)))}
        {finder(0, 0)}
        {finder(8, 0)}
        {finder(0, 8)}
        {anim === "scan" && <rect x={-136} y={sweepY} width={272} height={5} rx={2} fill={C.blue} opacity={0.55} />}
      </g>
    </g>
  );
}
