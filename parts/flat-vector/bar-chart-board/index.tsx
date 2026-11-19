import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Presentation board on a tripod easel showing five coloured bars with axes. anim "grow": the bars rise
// one after another. Frame 0 already shows every bar at 30 % or more of its height, so it is never empty.
// Origin = floor centre under the easel. 1 m ~ 560 px; the easel is about 1.6 m tall.
const f1 = (v: number) => v.toFixed(1);

// Easel and board frame. The same code is in the presentation, pie and line chart boards so they match.
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const base = -470;
  const vals = [0.55, 0.8, 0.45, 0.95, 0.7];
  const xs = [-130, -65, 0, 65, 130];
  const cols = [C.teal, C.blue, C.yellow, C.orange, C.purple];
  const bars = vals.map((v, i) => {
    const prog = anim === "grow" ? Math.min(1, Math.max(0, (f - i * 6) / 50)) : 1;
    const ease = 1 - (1 - prog) * (1 - prog) * (1 - prog);
    const k = 0.3 + 0.7 * ease;
    const h = v * 260 * k;
    return (
      <g key={i}>
        <rect x={xs[i] - 22} y={base - h} width={44} height={h} rx={6} fill={cols[i]} />
        <rect x={xs[i] - 22} y={base - 12} width={44} height={12} rx={4} fill={shade(cols[i], 0.2)} opacity={0.6} />
      </g>
    );
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Easel>
        {[-560, -650, -740].map((gy) => (
          <path key={gy} d={`M -170 ${gy} H 200`} stroke={C.greyLight} strokeWidth={4} fill="none" />
        ))}
        {/* axes */}
        <path d="M -170 -800 V -470 H 200" stroke={C.greyDark} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {bars}
      </Easel>
    </g>
  );
}
