import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Medium grey faceted rock, a single stone. Origin = centre of its base. About 300 px wide and 215 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = col(p.color, C.grey);
  const dark = col(p.color2, shade(body, 0.22));
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={170} ry={14} fill={C.shadow} />
        <path d="M -150 0 L -128 -120 L -70 -190 L 0 -214 L 70 -186 L 136 -112 L 150 0 Z" fill={body} />
        <path d="M 0 -214 L 70 -186 L 136 -112 L 150 0 L 36 0 L 22 -110 Z" fill={dark} />
        <path d="M -128 -120 L -70 -190 L 0 -214 L -6 -150 L -70 -110 Z" fill={C.white} opacity={0.25} />
        <path d="M -70 -110 L -6 -150 L 22 -110 L 36 0" stroke={shade(body, 0.3)} strokeWidth={6} fill="none" strokeLinejoin="round" />
      </g>
    </g>
  );
}
