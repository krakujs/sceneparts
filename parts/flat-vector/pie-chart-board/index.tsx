import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Presentation board on a tripod easel showing a 4-slice pie chart. anim "grow": the slices sweep in
// clockwise. Frame 0 already shows about 35 % of the pie, so it is never empty.
// Origin = floor centre under the easel. 1 m ~ 560 px; the easel is about 1.6 m tall.
const f1 = (v: number) => v.toFixed(1);

// Easel and board frame. The same code is in the presentation, bar and line chart boards so they match.
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

// Pie slice from angle a0 to a1 (radians, 0 = 12 o'clock, clockwise).
const wedge = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const pt = (a: number) => `${f1(cx + r * Math.sin(a))} ${f1(cy - r * Math.cos(a))}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${f1(cx)} ${f1(cy)} L ${pt(a0)} A ${f1(r)} ${f1(r)} 0 ${large} 1 ${pt(a1)} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const cx = 0, cy = -640, r = 165;
  const vals = [0.4, 0.25, 0.2, 0.15];
  const cols = [C.blue, C.teal, C.yellow, C.orange];
  // grow: start at 35 % of the sweep and open to the full pie over 60 frames.
  const t = Math.min(1, f / 60);
  const g = anim === "grow" ? 0.35 + 0.65 * (1 - (1 - t) * (1 - t)) : 1;
  const A = Math.PI * 2 * g;
  let cum = 0;
  const slices = vals.map((v, i) => {
    const s0 = cum * Math.PI * 2, s1 = (cum + v) * Math.PI * 2;
    cum += v;
    const a1 = Math.min(s1, A - 0.0001);
    if (s0 >= A || a1 <= s0) return null;
    return <path key={i} d={wedge(cx, cy, r, s0, a1)} fill={cols[i]} />;
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Easel>
        {/* faint grid and the pie's shadow disc */}
        {[-560, -650, -740].map((gy) => (
          <path key={gy} d={`M -170 ${gy} H 200`} stroke={C.greyLight} strokeWidth={4} fill="none" />
        ))}
        <circle cx={cx + 6} cy={cy + 12} r={r} fill={C.greyLight} />
        {slices}
      </Easel>
    </g>
  );
}
