import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, fitSize, Txt } from "../stat-card/index";

// Two-headed arrow between (ax,ay) and (bx,by), for exchange or distance. The shaft grows out from the middle and both heads pop.
// label = optional text in a pill at the middle.
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];
const HL = 58, HW = 38;

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const A: V = [p.ax ?? 240, p.ay ?? 960], B: V = [p.bx ?? 840, p.by ?? 960];
  const M: V = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const L = Math.hypot(B[0] - A[0], B[1] - A[1]) || 1;
  const ang = (Math.atan2(B[1] - A[1], B[0] - A[0]) * 180) / Math.PI;
  const prog = enter(p.f, at, 18);
  const headA = popIn(p.f, at + 16, 10), headB = popIn(p.f, at + 16, 10);
  // shafts run from the middle to a point just inside each head
  const sa: V = [M[0] + ((A[0] - M[0]) / (L / 2)) * (L / 2 - HL * 0.6) * prog, M[1] + ((A[1] - M[1]) / (L / 2)) * (L / 2 - HL * 0.6) * prog];
  const sb: V = [M[0] + ((B[0] - M[0]) / (L / 2)) * (L / 2 - HL * 0.6) * prog, M[1] + ((B[1] - M[1]) / (L / 2)) * (L / 2 - HL * 0.6) * prog];
  const headD = `M0 0 L${-HL} ${-HW} L${-HL} ${HW} Z`;
  const lab = String(p.label ?? "");
  const pillW = Math.max(120, lab.length * 24 + 56);
  const pillK = popIn(p.f, at + 24, 12);
  return (
    <g transform={`translate(0 0) scale(${s})`}>
      <line x1={M[0]} y1={M[1]} x2={sa[0]} y2={sa[1]} stroke={u.accent} strokeWidth={22} strokeLinecap="round" />
      <line x1={M[0]} y1={M[1]} x2={sb[0]} y2={sb[1]} stroke={u.accent} strokeWidth={22} strokeLinecap="round" />
      <path d={headD} fill={u.accent} stroke={u.accent} strokeWidth={8} strokeLinejoin="round"
        transform={`translate(${A[0]} ${A[1]}) rotate(${ang + 180}) scale(${headA})`} />
      <path d={headD} fill={u.accent} stroke={u.accent} strokeWidth={8} strokeLinejoin="round"
        transform={`translate(${B[0]} ${B[1]}) rotate(${ang}) scale(${headB})`} />
      {lab ? (
        <g transform={`translate(${M[0]} ${M[1]}) scale(${pillK})`}>
          <rect x={-pillW / 2} y={-34} width={pillW} height={68} rx={34} fill={u.card} stroke={u.ink} strokeWidth={5} />
          <Txt x={0} y={13} u={u} size={fitSize(lab, 38, pillW - 30)} weight={800}>{lab}</Txt>
        </g>
      ) : null}
    </g>
  );
}
