import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round archery target on a two-leg wooden stand, with an arrow stuck in the centre.
// Origin = bottom centre (stand feet on y). About 460 px wide, 620 px tall at s = 1.
// anim "hit": the arrow flies in during the first 20 frames and then the target wobbles.
const f1 = (v: number) => v.toFixed(1);
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  if (anim === "hit") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 30) * 1.5 * Math.exp(-f / 40) * (f > 20 ? 1 : 0))})`;
  return "";
};
const RINGS: [number, string][] = [[200, "#F4F1EA"], [164, C.ink], [128, C.blue], [92, C.red], [56, C.yellow], [22, C.white]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const outer = p.color && p.color !== "none" ? p.color : C.paper;
  const anim: string = p.anim ?? "none";
  const cy = -400;
  const flight = anim === "hit" ? easeOut(Math.min(1, f / 20)) : 1;
  const arrowY = cy + (1 - flight) * -260;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      {/* stand */}
      <line x1={-30} y1={-200} x2={-150} y2={-6} stroke={C.brown} strokeWidth={22} strokeLinecap="round" />
      <line x1={30} y1={-200} x2={150} y2={-6} stroke={C.brown} strokeWidth={22} strokeLinecap="round" />
      <line x1={-30} y1={-200} x2={150} y2={-6} stroke={C.brownDark} strokeWidth={6} strokeLinecap="round" opacity={0} />
      <rect x={-6} y={-220} width={12} height={40} rx={4} fill={C.brownDark} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${cy})`}>
          <circle cx={0} cy={0} r={200} fill={shade(outer, 0.12)} />
          <circle cx={0} cy={0} r={190} fill={outer} />
          {RINGS.slice(1).map(([r, c], i) => <circle key={i} cx={0} cy={0} r={r} fill={c} />)}
          {/* outer ring is the base colour; tiny highlight */}
          <circle cx={-70} cy={-80} r={18} fill={C.white} opacity={0.35} />
          <circle cx={0} cy={0} r={22} fill={C.white} />
          <circle cx={0} cy={0} r={12} fill={C.red} />
          {/* arrow shaft, fletching and tip */}
          <g transform={`translate(0 ${f1(arrowY - cy)})`}>
            <line x1={0} y1={-170} x2={0} y2={0} stroke={C.brownDark} strokeWidth={8} strokeLinecap="round" />
            <path d="M 0 -170 L -14 -146 L 14 -146 Z" fill={C.greyDark} />
            <path d="M -6 -168 L -26 -190 L -20 -168 Z M 6 -168 L 26 -190 L 20 -168 Z" fill={C.orange} />
          </g>
        </g>
      </g>
    </g>
  );
}
