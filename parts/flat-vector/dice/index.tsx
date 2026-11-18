import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Two white dice side by side, drawn as front faces with a top face for depth. Origin = bottom centre.
// About 460 px wide and 230 px tall at s = 1. anim "roll": both dice hop and turn, then settle on new faces.
const f1 = (v: number) => v.toFixed(1);
// Pip grid positions on a 3x3 layout, in units of half the face.
const PIPS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};
const easeOut = (t: number) => 1 - (1 - t) ** 3;

function Die({ cx, cy, size, face, body, pip, tilt }: { cx: number; cy: number; size: number; face: number; body: string; pip: string; tilt: number }) {
  const h = size / 2, d = size * 0.14, r = size * 0.16;
  const q = size * 0.25;
  return (
    <g transform={`translate(${f1(cx)} ${f1(cy)}) rotate(${f1(tilt)})`}>
      {/* top face (depth) */}
      <path d={`M ${-h + r} ${-h} L ${h - r} ${-h} L ${h - r + d} ${-h - d} L ${-h + r + d} ${-h - d} Z`} fill={shade(body, 0.06)} />
      <path d={`M ${h} ${-h + r} L ${h + d} ${-h - d + r} L ${h + d} ${h - r - d} L ${h} ${h - r} Z`} fill={shade(body, 0.22)} />
      <rect x={-h} y={-h} width={size} height={size} rx={r} fill={body} />
      <rect x={-h} y={h - size * 0.1} width={size} height={size * 0.1} rx={r * 0.5} fill={shade(body, 0.12)} />
      {(PIPS[face] ?? PIPS[1]).map(([px, py], i) => (
        <circle key={i} cx={f1(px * q)} cy={f1(py * q)} r={size * 0.09} fill={pip} />
      ))}
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const pip = p.accent && p.accent !== "none" ? p.accent : C.red;
  const anim: string = p.anim ?? "none";
  const size = 200;
  const rolling = anim === "roll";
  // Hop while rolling, then settle; faces change every 15 frames during the roll.
  const t = Math.min(1, f / 45);
  const hop = rolling ? Math.abs(Math.sin(Math.min(f, 45) * Math.PI / 22)) * (1 - easeOut(t)) * 90 : 0;
  const spin1 = rolling ? (1 - easeOut(t)) * 360 * 2 : 0;
  const spin2 = rolling ? -(1 - easeOut(t)) * 360 * 2.5 : 0;
  const face1 = rolling && f < 45 ? (Math.floor(f / 6) % 6) + 1 : 3;
  const face2 = rolling && f < 45 ? (Math.floor(f / 7 + 2) % 6) + 1 : 5;
  const bobY = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const popS = anim === "pop" ? (() => { const tt = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (tt - 1) ** 3 + c1 * (tt - 1) ** 2; })() : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bobY)}) scale(${f1(popS)})`}>
        <g transform={`translate(0 ${f1(-hop * 0.6)})`}>
          <Die cx={-125} cy={-size / 2 - 4} size={size} face={face1} body={body} pip={pip} tilt={spin1 % 360} />
        </g>
        <g transform={`translate(0 ${f1(-hop)})`}>
          <Die cx={125} cy={-size / 2 - 4} size={size} face={face2} body={body} pip={pip} tilt={spin2 % 360} />
        </g>
      </g>
    </g>
  );
}
