import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Glass bulb clinical or lab thermometer with a red column and tick marks (no numbers). Origin = bottom centre (the bulb rests on y).
// About 130 px wide and 740 px tall at s = 1. anim "rise": the red column climbs over 90 frames; "none" shows it at a set height.
const f1 = (v: number) => v.toFixed(1);
const TICKS = Array.from({ length: 14 }, (_, i) => -150 - i * 40);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const glass = "#E3F3FA";
  const t = Math.min(1, f / 90), e = 1 - (1 - t) ** 3;
  const frac = anim === "rise" ? 0.1 + 0.7 * e : 0.75;
  const top = -110 - frac * 500; // y of the top of the red column
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={90} ry={10} fill={C.shadow} />
      {/* glass stem with a rounded top, and a cap */}
      <rect x={-24} y={-720} width={48} height={680} rx={24} fill={glass} />
      <rect x={6} y={-700} width={18} height={620} rx={8} fill="#C4E0EF" />
      <rect x={-30} y={-736} width={60} height={18} rx={8} fill={C.grey} />
      {/* tick marks: lines only */}
      {TICKS.map((ty, i) => {
        const long = i % 5 === 0;
        return <path key={i} d={`M 34 ${ty} L ${long ? 60 : 50} ${ty}`} stroke={C.greyDark} strokeWidth={7} strokeLinecap="round" />;
      })}
      {/* red column rising from the bulb */}
      <rect x={-12} y={f1(top)} width={24} height={f1(-62 - top)} rx={6} fill={red} />
      {/* glass bulb with a red core */}
      <circle cx={0} cy={-62} r={62} fill={glass} />
      <circle cx={0} cy={-62} r={46} fill={red} />
      <circle cx={-16} cy={-80} r={11} fill={C.white} opacity={0.55} />
      <rect x={-16} y={-690} width={8} height={230} rx={4} fill={C.white} opacity={0.7} />
    </g>
  );
}
