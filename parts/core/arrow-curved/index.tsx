import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn } from "../stat-card/index";

// Curved arrow from (ax,ay) to (bx,by) that bows by `bend` (0 = straight, 0.4 = a clear arc, negative flips it).
// The curve draws itself, then the head pops in at the end, pointing along the curve.
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];
const qAt = (A: V, C: V, B: V, t: number): V => {
  const m = 1 - t;
  return [m * m * A[0] + 2 * m * t * C[0] + t * t * B[0], m * m * A[1] + 2 * m * t * C[1] + t * t * B[1]];
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const A: V = [p.ax ?? 240, p.ay ?? 1000];
  const B: V = [p.bx ?? 840, p.by ?? 900];
  const bend = p.bend ?? 0.4;
  const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
  const C: V = [mx - 2 * bend * (B[1] - A[1]), my + 2 * bend * (B[0] - A[0])];
  let Lc = 0;
  let prev = A;
  for (let i = 1; i <= 80; i++) {
    const q = qAt(A, C, B, i / 80);
    Lc += Math.hypot(q[0] - prev[0], q[1] - prev[1]);
    prev = q;
  }
  const prog = enter(p.f, at, 26);
  const T: V = [B[0] - C[0], B[1] - C[1]];
  const headAng = (Math.atan2(T[1], T[0]) * 180) / Math.PI;
  const headK = popIn(p.f, at + 24, 10);
  return (
    <g transform={`translate(0 0) scale(${s})`}>
      <path d={`M${A[0]} ${A[1]} Q${C[0]} ${C[1]} ${B[0]} ${B[1]}`} fill="none" stroke={u.accent} strokeWidth={22} strokeLinecap="round"
        strokeDasharray={`${Lc} ${Lc * 2}`} strokeDashoffset={Lc * (1 - prog)} />
      <path d="M0 0 L-58 -38 L-58 38 Z" fill={u.accent} stroke={u.accent} strokeWidth={8} strokeLinejoin="round"
        transform={`translate(${B[0]} ${B[1]}) rotate(${headAng}) scale(${headK})`} />
    </g>
  );
}
