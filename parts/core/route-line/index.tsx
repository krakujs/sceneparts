import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn } from "../stat-card/index";

// Route line: a dashed curved path from A to B that draws itself, with a start dot, an end flag and a dot that travels along it.
// ax,ay = start, bx,by = end, bend = how far the curve bows (0 = straight, 0.35 = gentle, negative flips the side).
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
  const A: V = [p.ax ?? 250, p.ay ?? 1250];
  const B: V = [p.bx ?? 830, p.by ?? 650];
  const bend = p.bend ?? 0.35;
  const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
  const C: V = [mx - 2 * bend * (B[1] - A[1]), my + 2 * bend * (B[0] - A[0])];
  // Draw-on: the curve from A up to the moving point E (de Casteljau split), so the dashes stay even.
  const prog = enter(p.f, at, 30);
  const E = qAt(A, C, B, prog);
  const K: V = [(1 - prog) * A[0] + prog * C[0], (1 - prog) * A[1] + prog * C[1]];
  const partial = `M${A[0]} ${A[1]} Q${K[0]} ${K[1]} ${E[0]} ${E[1]}`;
  const startK = popIn(p.f, at, 10);
  const flagK = popIn(p.f, at + 28, 12);
  const dotOn = enter(p.f, at + 30, 8);
  const mt = (((p.f - at - 30) % 60) + 60) % 60 / 60;
  const D = qAt(A, C, B, mt);
  return (
    <g transform={`translate(${0} ${0}) scale(${s})`}>
      <path d={partial} fill="none" stroke={u.accent} strokeWidth={10} strokeDasharray="20 16" strokeLinecap="butt" />
      <circle cx={A[0]} cy={A[1]} r={18 * startK} fill={u.white} stroke={u.ink} strokeWidth={5} />
      <g transform={`translate(${B[0]} ${B[1]}) scale(${flagK})`}>
        <path d="M0 0 L0 -120" stroke={u.ink} strokeWidth={7} strokeLinecap="round" />
        <path d="M0 -120 L78 -98 L0 -76 Z" fill={u.accent} stroke={u.ink} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={0} cy={0} r={13} fill={u.ink} />
      </g>
      <circle cx={D[0]} cy={D[1]} r={12} fill={u.warn} stroke={u.ink} strokeWidth={4} opacity={dotOn} />
    </g>
  );
}
