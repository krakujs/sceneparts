import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Presentation board on a tripod easel showing a rising line chart with dots and an arrow.
// anim "draw": the line is drawn from left to right. Frame 0 already shows the first quarter of
// the line, so it is never empty.
// Origin = floor centre under the easel. 1 m ~ 560 px; the easel is about 1.6 m tall.
const f1 = (v: number) => v.toFixed(1);

// Easel and board frame. The same code is in the presentation, pie and bar chart boards so they match.
// Board: x -250..250, y -880..-400. Screen: x -226..226, y -856..-424.
const Easel = ({ children }: { children: React.ReactNode }) => (
  <g>
    <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
    <path d="M -24 -380 L -262 -4" stroke={shade(C.brown, 0.2)} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 24 -380 L 262 -4" stroke={C.brown} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 0 -380 L 0 -40" stroke={shade(C.brown, 0.2)} strokeWidth={20} strokeLinecap="round" fill="none" />
    <rect x={-250} y={-880} width={500} height={480} rx={22} fill={C.navy} />
    <rect x={-226} y={-856} width={452} height={432} rx={8} fill={C.white} />
    {children}
    <rect x={-150} y={-398} width={300} height={22} rx={9} fill={C.brownDark} />
  </g>
);

const PX = [-150, -90, -30, 30, 90, 150];
const PY = [-560, -600, -580, -650, -690, -740];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  // draw: 25 % of the line at frame 0, the rest drawn over 70 frames.
  const t = Math.min(1, f / 70);
  const u = anim === "draw" ? 0.25 + 0.75 * (1 - (1 - t) * (1 - t)) : 1;
  const d = PX.map((px, i) => `${i ? "L" : "M"} ${px} ${PY[i]}`).join(" ");
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Easel>
        {[-560, -650, -740].map((gy) => (
          <path key={gy} d={`M -170 ${gy} H 200`} stroke={C.greyLight} strokeWidth={4} fill="none" />
        ))}
        {/* axes */}
        <path d="M -170 -800 V -470 H 200" stroke={C.greyDark} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* the line, drawn with a dash trick: pathLength 1, dash offset shrinks to 0 */}
        <path d={d} pathLength={1} stroke={C.teal} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" fill="none"
          strokeDasharray="1 1" strokeDashoffset={f1(1 - u)} />
        {/* arrow pointing up and to the right, along the trend */}
        <g transform="translate(176 -764) rotate(-45)">
          <rect x={-4} y={-7} width={40} height={14} rx={7} fill={C.ink} />
          <path d="M 30 -22 L 52 0 L 30 22 Z" fill={C.ink} />
        </g>
        {PX.map((px, i) => (
          <g key={i}>
            <circle cx={px} cy={PY[i]} r={18} fill={C.blue} />
            <circle cx={px} cy={PY[i]} r={8} fill={C.white} />
          </g>
        ))}
      </Easel>
    </g>
  );
}
