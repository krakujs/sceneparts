import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Smooth curved sand dunes with ripple lines. Origin = centre of the base line. About 1000 px wide and 380 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const sand = col(p.color, C.sand);
  const ripple = shade(sand, 0.2);
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* far dune, a little darker */}
        <path d="M -500 0 C -380 -180 -220 -380 -60 -380 C 80 -380 220 -220 500 0 Z" fill={shade(sand, 0.1)} />
        <path d="M -300 -120 Q -240 -140 -180 -120" stroke={ripple} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M 100 -200 Q 160 -222 220 -200" stroke={ripple} strokeWidth={8} fill="none" strokeLinecap="round" />
        {/* near dune */}
        <path d="M -340 0 C -180 -120 0 -180 200 -220 C 330 -240 420 -110 480 0 Z" fill={sand} />
        <path d="M 200 -220 C 330 -240 420 -110 480 0 L 260 0 C 260 -90 240 -170 200 -220 Z" fill={shade(sand, 0.18)} />
        {/* ripples */}
        <path d="M -220 -30 Q -170 -48 -120 -32" stroke={ripple} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M -60 -90 Q -10 -110 40 -92" stroke={ripple} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M 60 -140 Q 110 -158 160 -140" stroke={ripple} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M 120 -40 Q 180 -58 230 -40" stroke={ripple} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M 280 -60 Q 330 -76 380 -60" stroke={ripple} strokeWidth={8} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
