import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Lab beaker with a pouring lip, measuring marks (lines only) and coloured liquid.
// Origin = bottom centre (the beaker stands on y). About 300 px wide and 400 px tall at s = 1.
// anim "bubbles": bubbles rise through the liquid in a 60-frame loop.
const f1 = (v: number) => v.toFixed(1);
const BUBBLES = [
  { x: -60, r: 8, o: 0 }, { x: 20, r: 6, o: 22 }, { x: 65, r: 9, o: 40 }, { x: -20, r: 5, o: 11 }, { x: 95, r: 5, o: 33 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const liquid = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const glass = "#E3F3FA";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={175} ry={12} fill={C.shadow} />
      {/* glass body with a spout on the top-left corner */}
      <path d="M -150 -372 L -130 -340 L -130 -26 Q -130 0 -104 0 L 104 0 Q 130 0 130 -26 L 130 -372 Z" fill={glass} />
      {/* liquid */}
      <path d="M -122 -120 L 122 -120 L 122 -26 Q 122 -8 104 -8 L -104 -8 Q -122 -8 -122 -26 Z" fill={liquid} />
      <rect x={-122} y={-120} width={244} height={12} fill={shade(liquid, 0.2)} />
      {anim === "bubbles" && BUBBLES.map((b, i) => {
        const ph = ((f + b.o) % 60) / 60;
        return <circle key={i} cx={b.x} cy={f1(-30 - ph * 80)} r={b.r} fill={C.white} opacity={(0.75 * (1 - ph * 0.5)).toFixed(2)} />;
      })}
      {/* measuring marks: lines only */}
      {[-200, -260, -320].map((yy, i) => (
        <path key={yy} d={`M 88 ${yy} L ${i === 1 ? 118 : 108} ${yy}`} stroke={C.greyDark} strokeWidth={7} strokeLinecap="round" />
      ))}
      <path d="M -88 -200 L -108 -200" stroke={C.greyDark} strokeWidth={7} strokeLinecap="round" />
      <rect x={-108} y={-330} width={12} height={180} rx={6} fill={C.white} opacity={0.7} />
      {/* rim */}
      <rect x={-152} y={-380} width={286} height={14} rx={7} fill={C.grey} />
    </g>
  );
}
