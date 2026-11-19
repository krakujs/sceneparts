import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tall rocky peak with a snow cap, and a smaller peak beside it. Origin = centre of the base. About 1000 px wide and 1060 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const rock = col(p.color, C.grey);
  const snow = col(p.color2, C.white);
  const anim: string = p.anim ?? "none";
  const crack = shade(rock, 0.3);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={480} ry={18} fill={C.shadow} />
        {/* smaller peak, behind */}
        <path d="M 150 0 L 330 -560 L 500 0 Z" fill={shade(rock, 0.1)} />
        <path d="M 330 -560 L 500 0 L 380 0 Z" fill={shade(rock, 0.3)} />
        <path d="M 330 -560 L 312 -500 L 324 -508 L 336 -478 L 346 -496 L 352 -486 Z" fill={snow} />
        {/* main peak */}
        <path d="M -500 0 L -90 -1060 L 300 0 Z" fill={rock} />
        <path d="M -90 -1060 L 300 0 L 120 0 L 40 -520 Z" fill={shade(rock, 0.22)} />
        <path d="M -120 -640 L -60 -600 L -90 -540" stroke={crack} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M -320 -300 L -250 -270 L -270 -200" stroke={crack} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 90 -420 L 140 -380 L 130 -330" stroke={crack} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* snow cap */}
        <path d="M -90 -1060 L -138 -930 L -106 -948 L -76 -900 L -48 -936 L -30 -884 Z" fill={snow} />
      </g>
    </g>
  );
}
