import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wizard tower: a slender tapering stone tower with round glowing windows, a band of trim, a pointed purple cone
// roof and a flag on the spire. Origin = floor centre. About 340 px wide and 1300 px tall at s = 1.
// anim "glow": the round windows light up in turn; "flag": the pennant waves.
const f1 = (v: number) => v.toFixed(1);
const WINDOWS = [-560, -400, -240];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : "#E9E3F5";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.purple;
  const anim: string = p.anim ?? "glow";
  const lit = (i: number) => (anim === "glow" && Math.floor(f / 12) % WINDOWS.length === i ? C.yellow : C.navy);
  const wave = anim === "flag" ? Math.sin((f * 2 * Math.PI) / 40) * 14 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={200} ry={18} fill={C.shadow} />
      {/* tapering body */}
      <path d="M -130 0 L -110 -820 L 110 -820 L 130 0 Z" fill={stone} />
      <path d="M 40 -820 L 110 -820 L 130 0 L 40 0 Z" fill={shade(stone, 0.15)} opacity={0.7} />
      {/* ledge and trim band */}
      <rect x={-140} y={-840} width={280} height={24} rx={8} fill={shade(stone, 0.12)} />
      {[-200, -460, -700].map((by) => <rect key={by} x={-122 + (by + 200) * 0.02} y={by} width={244 - (by + 200) * 0.04} height={10} fill={shade(stone, 0.18)} />)}
      {/* round windows, glowing */}
      {WINDOWS.map((wy, i) => (
        <g key={wy}>
          <circle cx={0} cy={wy} r={34} fill={shade(stone, 0.4)} />
          <circle cx={0} cy={wy} r={24} fill={lit(i)} />
        </g>
      ))}
      {/* arched door */}
      <path d="M -40 0 L -40 -120 Q -40 -160 0 -160 Q 40 -160 40 -120 L 40 0 Z" fill={shade(roof, 0.4)} />
      {/* pointed purple cone roof */}
      <path d="M -170 -840 Q -60 -1000 0 -1220 Q 60 -1000 170 -840 Z" fill={roof} />
      <path d="M 20 -850 Q 60 -1000 0 -1220 Q 60 -1000 170 -840 Z" fill={shade(roof, 0.25)} opacity={0.7} />
      {/* spire and flag */}
      <rect x={-5} y={-1290} width={10} height={80} fill={C.greyDark} />
      <path d={`M 5 -1290 Q ${f1(60 + wave)} -1270 ${f1(100 + wave)} -1300 L 100 -1250 Q ${f1(60 + wave)} -1230 5 -1250 Z`} fill={C.red} />
      <circle cx={0} cy={-1300} r={9} fill={C.yellow} />
    </g>
  );
}
