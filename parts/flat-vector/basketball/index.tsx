import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Basketball, generic: orange ball with black seam lines (a vertical, a horizontal and two curved seams).
// Origin = bottom centre; the ball rests on y. Hero size about 300 px across at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const R = 150, cy = -R - 4;
  const ball = p.color && p.color !== "none" ? p.color : C.orange;
  const anim: string = p.anim ?? "none";
  const lift = anim === "bounce" ? Math.abs(Math.sin((f * 2 * Math.PI) / 30)) * 90 : 0;
  const spin = anim === "spin" ? f * 6 : 0;
  const k = 1 - 0.3 * (lift / 90);
  const seam = C.ink, w = 10, e = R - 6, q = R * 0.72;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130 * k} ry={11 * k} fill={C.shadow} />
      <g transform={`translate(0 ${f1(cy - lift)}) rotate(${f1(spin)})`}>
        <circle cx={0} cy={0} r={R} fill={shade(ball, 0.22)} />
        <circle cx={-6} cy={-8} r={R - 6} fill={ball} />
        <line x1={0} y1={-e} x2={0} y2={e} stroke={seam} strokeWidth={w} />
        <line x1={-e} y1={0} x2={e} y2={0} stroke={seam} strokeWidth={w} />
        <path d={`M ${f1(-q)} ${f1(-q)} Q ${f1(-R * 0.05)} 0 ${f1(-q)} ${f1(q)}`} stroke={seam} strokeWidth={w} fill="none" strokeLinecap="round" />
        <path d={`M ${f1(q)} ${f1(-q)} Q ${f1(R * 0.05)} 0 ${f1(q)} ${f1(q)}`} stroke={seam} strokeWidth={w} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
