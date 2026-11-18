import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pleated surgical face mask, front view, with ear loops. Origin = bottom centre (the mask rests on y).
// About 400 px wide and 320 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 50) * 3)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : "#8EC5E8";
  const d = shade(c, 0.22);
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* ear loops, behind the mask */}
        <path d="M -176 -250 C -300 -270 -320 -90 -176 -70" stroke={d} strokeWidth={12} fill="none" strokeLinecap="round" />
        <path d="M 176 -250 C 300 -270 320 -90 176 -70" stroke={d} strokeWidth={12} fill="none" strokeLinecap="round" />
        {/* body with a curved bottom edge */}
        <path d="M -170 -300 Q 0 -330 170 -300 Q 190 -300 190 -270 L 190 -70 Q 190 -20 0 -4 Q -190 -20 -190 -70 L -190 -270 Q -190 -300 -170 -300 Z" fill={c} />
        {/* pleats */}
        <path d="M -186 -235 Q 0 -213 186 -235" stroke={d} strokeWidth={9} fill="none" />
        <path d="M -186 -170 Q 0 -148 186 -170" stroke={d} strokeWidth={9} fill="none" />
        <path d="M -186 -105 Q 0 -83 186 -105" stroke={d} strokeWidth={9} fill="none" />
        {/* nose wire along the top */}
        <rect x={-120} y={-312} width={240} height={16} rx={8} fill={d} />
        {/* shine */}
        <path d="M -140 -250 Q -152 -200 -140 -160" stroke={C.white} strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.4} />
      </g>
    </g>
  );
}
