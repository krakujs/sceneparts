import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Empty suit of plate armour on a wooden stand, drawn front-on with a slight side turn (the right side is
// shaded, the left side has a light edge). Origin = floor centre under the stand. About 400 px wide and
// 1000 px tall at s = 1, about a person's height.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = p.color && p.color !== "none" ? p.color : "#B8C2D3";
  const dark = shade(steel, 0.3), light = shade(steel, -0.12);
  // Front-on suit with a slight turn: the body is shifted 14 px right, and the right half is shaded.
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={210} ry={16} fill={C.shadow} />
      {/* wooden stand: foot, pole and the shoulder bar */}
      <rect x={-150} y={-30} width={300} height={30} rx={10} fill={C.brownDark} />
      <rect x={-14} y={-920} width={28} height={900} fill={C.brown} />
      <rect x={-120} y={-920} width={240} height={22} rx={8} fill={C.brownDark} />
      {/* legs */}
      <path d="M -120 -520 L -130 -90 L -70 -90 L -40 -520 Z" fill={steel} />
      <path d="M 40 -520 L 70 -90 L 130 -90 L 120 -520 Z" fill={dark} />
      <rect x={-140} y={-100} width={80} height={28} rx={10} fill={dark} />
      <rect x={60} y={-100} width={84} height={28} rx={10} fill={dark} />
      {/* skirt / fauld */}
      <path d="M -150 -560 Q 0 -500 150 -560 L 160 -500 Q 0 -440 -160 -500 Z" fill={steel} />
      {/* cuirass with a shaded right side and a ridge */}
      <path d="M -150 -560 Q -160 -740 -110 -800 L 110 -800 Q 160 -740 150 -560 Q 0 -500 -150 -560 Z" fill={steel} />
      <path d="M 40 -790 Q 150 -740 150 -560 Q 0 -500 0 -520 Q 40 -640 40 -790 Z" fill={dark} />
      <path d="M 0 -790 L 0 -520" stroke={light} strokeWidth={10} strokeLinecap="round" />
      {/* pauldrons */}
      <path d="M -150 -790 Q -230 -770 -220 -700 L -150 -700 Z" fill={steel} />
      <path d="M 150 -790 Q 230 -770 220 -700 L 150 -700 Z" fill={dark} />
      {/* arms, from shoulder to gauntlet */}
      <path d="M -150 -730 L -210 -530 L -170 -520 L -120 -700 Z" fill={steel} />
      <path d="M 150 -730 L 200 -540 L 160 -530 L 120 -700 Z" fill={dark} />
      <rect x={-200} y={-540} width={44} height={60} rx={12} fill={steel} />
      <rect x={160} y={-550} width={44} height={60} rx={12} fill={dark} />
      {/* empty neck and helmet, with the visor slit */}
      <rect x={-34} y={-820} width={68} height={28} fill={dark} />
      <path d="M -90 -880 Q -90 -960 0 -970 Q 90 -960 90 -880 L 90 -840 Q 0 -810 -90 -840 Z" fill={steel} />
      <path d="M 40 -950 Q 90 -920 90 -840 L 40 -840 Z" fill={dark} />
      <rect x={-70} y={-900} width={140} height={14} rx={6} fill="#2B2F3A" />
      <path d="M -40 -960 Q 0 -1000 40 -960 L 40 -972 Q 0 -984 -40 -972 Z" fill={light} opacity={0.6} />
    </g>
  );
}
