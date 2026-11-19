import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Closed great-helm: a flat-topped steel cylinder with a visor of slits, rivets and a plume of feathers on top.
// Origin = bottom centre. About 420 px wide and 560 px tall at s = 1 (plume included).
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1.2, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = p.color && p.color !== "none" ? p.color : "#B8C2D3";
  const plume = p.plume && p.plume !== "none" ? p.plume : C.red;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={200} ry={16} fill={C.shadow} />
      {/* plume: three feather lobes curling back */}
      <path d="M -40 -420 Q -150 -520 -90 -620 Q -40 -560 -10 -530 Q 40 -600 110 -580 Q 60 -500 40 -420 Z" fill={plume} />
      <path d="M -40 -420 Q -10 -520 -90 -620 Q -40 -560 -10 -530 Z" fill={shade(plume, 0.25)} />
      {/* helm body */}
      <path d="M -170 -180 L -170 -400 Q -170 -450 -120 -450 L 120 -450 Q 170 -450 170 -400 L 170 -180 Q 170 0 0 0 Q -170 0 -170 -180 Z" fill={steel} />
      <path d="M 60 -440 L 120 -440 Q 170 -440 170 -400 L 170 -180 Q 170 -40 90 -10 Q 150 -90 150 -200 Z" fill={shade(steel, 0.25)} opacity={0.8} />
      {/* top ridge and crown */}
      <rect x={-130} y={-470} width={260} height={30} rx={12} fill={shade(steel, 0.12)} />
      {/* visor: horizontal slits with a cross bar */}
      <rect x={-130} y={-340} width={260} height={92} rx={20} fill={shade(steel, 0.45)} />
      <rect x={-112} y={-320} width={224} height={12} rx={6} fill="#1F2433" opacity={0.9} />
      <rect x={-112} y={-292} width={224} height={12} rx={6} fill="#1F2433" opacity={0.9} />
      <rect x={-112} y={-264} width={224} height={12} rx={6} fill="#1F2433" opacity={0.9} />
      {/* breathing holes below the visor */}
      {[-90, -50, -10, 30, 70].map((bx) => <circle key={bx} cx={bx} cy={-196} r={7} fill={shade(steel, 0.5)} />)}
      {/* rivets around the edge */}
      {[-150, -120, 120, 150].map((rx) => <circle key={rx} cx={rx} cy={-410} r={7} fill={C.white} opacity={0.6} />)}
      {/* bottom rim */}
      <rect x={-180} y={-40} width={360} height={40} rx={14} fill={shade(steel, 0.18)} />
      {/* highlight */}
      <path d="M -138 -420 L -138 -210" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.35} />
    </g>
  );
}
