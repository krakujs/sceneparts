import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Soccer goal, front view at a slight angle: a white frame (two posts and a crossbar) in front, with the
// mesh net receding behind it to the upper right. Origin = bottom centre; the posts stand on y.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : C.white;
  const anim: string = p.anim ?? "none";
  const rot = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 1.5 : 0;
  const sc = anim === "pop" ? easeOutBack(Math.min(1, Math.max(0, f / 20))) : 1;
  // front opening
  const L = -260, Rt = 260, T = -340;
  // back of the goal, offset up and right for depth
  const bL = -190, bR = 330, bT = -390, bB = -50;
  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => bL + (i * (bR - bL)) / 8);
  const rows = [0, 1, 2, 3, 4, 5, 6].map((j) => bT + (j * (bB - bT)) / 6);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      <g transform={`rotate(${f1(rot)}) scale(${f1(sc)})`}>
        {/* net: back panel and connecting sides */}
        <polygon points={`${L},${T} ${Rt},${T} ${Rt},0 ${L},0`} fill={C.greyLight} opacity={0.35} />
        <polygon points={`${bL},${bT} ${bR},${bT} ${bR},${bB} ${bL},${bB}`} fill={C.greyLight} opacity={0.6} />
        {cols.map((cx, i) => <line key={`c${i}`} x1={cx} y1={bT} x2={cx} y2={bB} stroke={C.grey} strokeWidth={3} />)}
        {rows.map((ry, j) => <line key={`r${j}`} x1={bL} y1={ry} x2={bR} y2={ry} stroke={C.grey} strokeWidth={3} />)}
        <line x1={L} y1={T} x2={bL} y2={bT} stroke={C.grey} strokeWidth={3} />
        <line x1={Rt} y1={T} x2={bR} y2={bT} stroke={C.grey} strokeWidth={3} />
        <line x1={L} y1={0} x2={bL} y2={bB} stroke={C.grey} strokeWidth={3} />
        <line x1={Rt} y1={0} x2={bR} y2={bB} stroke={C.grey} strokeWidth={3} />
        {/* back frame, in shade for depth */}
        <line x1={bL} y1={bT} x2={bR} y2={bT} stroke={shade(frame, 0.15)} strokeWidth={14} strokeLinecap="round" />
        <line x1={bL} y1={bT} x2={bL} y2={bB} stroke={shade(frame, 0.15)} strokeWidth={14} strokeLinecap="round" />
        <line x1={bR} y1={bT} x2={bR} y2={bB} stroke={shade(frame, 0.15)} strokeWidth={14} strokeLinecap="round" />
        {/* front frame */}
        <rect x={L - 14} y={T - 14} width={Rt - L + 28} height={28} rx={10} fill={frame} />
        <rect x={L - 14} y={T + 10} width={Rt - L + 28} height={8} fill={shade(frame, 0.15)} />
        <rect x={L - 14} y={T - 14} width={28} height={354} rx={8} fill={frame} />
        <rect x={Rt - 14} y={T - 14} width={28} height={354} rx={8} fill={frame} />
        <rect x={Rt + 2} y={T - 14} width={12} height={354} rx={4} fill={shade(frame, 0.15)} />
        <rect x={L - 14} y={-14} width={Rt - L + 28} height={14} rx={4} fill={C.greyLight} />
      </g>
    </g>
  );
}
