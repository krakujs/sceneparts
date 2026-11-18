import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Shallow glass petri dish seen from a 3/4 top angle, with its lid tilted beside it and small coloured colonies.
// Origin = bottom centre (the dish rests on y). About 500 px wide and 260 px tall at s = 1.
// anim "grow": the colonies swell and settle in turn.
const f1 = (v: number) => v.toFixed(1);
const COLONIES: { x: number; y: number; r: number; k: 1 | 2 }[] = [
  { x: -120, y: -176, r: 22, k: 1 }, { x: -60, y: -132, r: 14, k: 2 }, { x: -30, y: -190, r: 18, k: 1 },
  { x: 40, y: -140, r: 26, k: 2 }, { x: 100, y: -182, r: 16, k: 1 }, { x: 150, y: -150, r: 20, k: 2 },
  { x: -160, y: -140, r: 12, k: 1 }, { x: 10, y: -192, r: 10, k: 2 }, { x: 80, y: -118, r: 12, k: 1 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c1 = p.color && p.color !== "none" ? p.color : C.lime;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.pink;
  const anim: string = p.anim ?? "none";
  const glass = "#E4F5FB";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={14} fill={C.shadow} />
      {/* lid tilted beside the dish, leaning out to the right */}
      <g transform="translate(345 -82) rotate(-26)">
        <ellipse cx={0} cy={14} rx={150} ry={80} fill={shade(glass, 0.14)} />
        <ellipse cx={0} cy={0} rx={150} ry={80} fill={glass} />
        <ellipse cx={0} cy={0} rx={128} ry={66} fill="#FFFFFF" opacity={0.35} />
      </g>
      {/* dish: thick base, top rim and agar */}
      <ellipse cx={0} cy={-126} rx={240} ry={125} fill={shade(glass, 0.16)} />
      <ellipse cx={0} cy={-150} rx={240} ry={125} fill={glass} />
      <ellipse cx={0} cy={-150} rx={206} ry={100} fill="#FBEFD0" />
      <ellipse cx={-70} cy={-196} rx={80} ry={30} fill={C.white} opacity={0.45} />
      {/* colonies */}
      {COLONIES.map((c, i) => {
        const k = anim === "grow" ? 1 + 0.12 * Math.sin((f * 2 * Math.PI) / 60 - i * 0.7) : 1;
        const col = c.k === 1 ? c1 : c2;
        return (
          <g key={i} transform={`translate(${c.x} ${c.y}) scale(${f1(k)})`}>
            <circle cx={0} cy={0} r={c.r} fill={shade(col, 0.2)} />
            <circle cx={-c.r * 0.2} cy={-c.r * 0.2} r={c.r * 0.7} fill={col} />
          </g>
        );
      })}
    </g>
  );
}
