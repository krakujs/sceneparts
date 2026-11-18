import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Big rounded boulder with cracks and a moss patch on top. Origin = centre of its base. About 600 px wide and 330 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = col(p.color, C.grey);
  const moss = col(p.color2, C.green);
  const anim: string = p.anim ?? "none";
  const crack = shade(body, 0.35);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={330} ry={22} fill={C.shadow} />
        <path d="M -300 0 C -325 -150 -250 -285 -110 -312 C -30 -328 60 -322 165 -282 C 268 -244 312 -140 300 0 Z" fill={body} />
        <path d="M 40 -322 C 150 -300 250 -250 290 -160 C 305 -120 305 -60 300 0 L 60 0 C 90 -120 60 -240 40 -322 Z" fill={shade(body, 0.2)} />
        {/* cracks */}
        <path d="M -150 -250 L -110 -200 L -130 -150 L -80 -110" stroke={crack} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 90 -230 L 120 -190 L 100 -140" stroke={crack} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 200 -150 L 240 -120 L 225 -70" stroke={crack} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* moss patch */}
        <path d="M -235 -268 C -200 -296 -120 -306 -72 -284 C -44 -262 -62 -240 -100 -234 C -150 -226 -206 -230 -235 -268 Z" fill={moss} />
        <path d="M -200 -250 C -170 -262 -120 -264 -96 -250 C -130 -240 -170 -240 -200 -250 Z" fill={shade(moss, 0.2)} />
        <circle cx={-210} cy={-282} r={8} fill={C.lime} />
        <circle cx={-120} cy={-292} r={7} fill={C.lime} />
        <circle cx={-80} cy={-262} r={6} fill={C.lime} />
      </g>
    </g>
  );
}
