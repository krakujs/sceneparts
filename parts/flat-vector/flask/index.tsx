import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Conical (Erlenmeyer) lab flask with a narrow neck and coloured liquid. Origin = bottom centre.
// About 320 px wide and 400 px tall at s = 1. anim "bubbles": fizz rises from the liquid in a 50-frame loop.
const f1 = (v: number) => v.toFixed(1);
const BUBBLES = [
  { x: -70, r: 6, o: 0 }, { x: -20, r: 9, o: 13 }, { x: 40, r: 5, o: 27 }, { x: 75, r: 8, o: 38 }, { x: 5, r: 4, o: 6 }, { x: -95, r: 5, o: 33 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const liquid = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "none";
  const glass = "#E3F3FA";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={165} ry={12} fill={C.shadow} />
      {/* conical body and narrow neck */}
      <path d="M -28 -300 L -150 -12 Q -158 0 -140 0 L 140 0 Q 158 0 150 -12 L 28 -300 Z" fill={glass} />
      <rect x={-28} y={-372} width={56} height={80} fill={glass} />
      {/* liquid up to about a third of the cone */}
      <path d="M -101 -120 L 101 -120 L 146 -12 Q 150 0 138 0 L -138 0 Q -150 0 -146 -12 Z" fill={liquid} />
      <rect x={-101} y={-120} width={202} height={10} fill={shade(liquid, 0.2)} />
      {anim === "bubbles" && BUBBLES.map((b, i) => {
        const ph = ((f + b.o) % 50) / 50;
        return <circle key={i} cx={b.x} cy={f1(-20 - ph * 100)} r={b.r} fill={C.white} opacity={(0.8 * (1 - ph * 0.6)).toFixed(2)} />;
      })}
      <path d="M -96 -100 L -120 -30" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.5} />
      <rect x={-22} y={-350} width={8} height={60} rx={4} fill={C.white} opacity={0.7} />
      {/* rim */}
      <rect x={-44} y={-380} width={88} height={14} rx={7} fill={C.grey} />
    </g>
  );
}
