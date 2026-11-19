import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wizard hat: a wide brim and a tall cone that bends over at the tip. Stars and a moon decorate the cone.
// Origin = centre of the brim's bottom edge. About 420 px wide and 700 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const STARS = [
  { x: -60, y: -330, r: 24, c: C.yellow, ph: 0 },
  { x: 70, y: -220, r: 16, c: C.white, ph: 1.3 },
  { x: -20, y: -110, r: 20, c: C.yellow, ph: 2.6 },
];
const star = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2, rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${f1(cx + Math.cos(a) * rr)} ${f1(cy + Math.sin(a) * rr)}`);
  }
  return `M ${pts.join(" L ")} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1.2, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.purple;
  const anim: string = p.anim ?? "none";
  const tipX = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 14 : 0;
  const tw = (i: number) => (anim === "twinkle" ? 0.45 + 0.55 * Math.max(0, Math.sin(f * 0.15 + STARS[i].ph)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={230} ry={18} fill={C.shadow} />
      {/* cone with a bent tip */}
      <path d={`M -150 -90 Q -120 -330 ${f1(tipX - 40)} -560 Q ${f1(tipX + 20)} -470 ${f1(tipX + 150)} -90 Z`} fill={body} />
      <path d={`M 40 -90 Q 60 -330 ${f1(tipX - 40)} -560 Q ${f1(tipX + 20)} -470 ${f1(tipX + 150)} -90 Z`} fill={shade(body, 0.2)} opacity={0.7} />
      {/* brim */}
      <ellipse cx={0} cy={-90} rx={210} ry={44} fill={shade(body, 0.12)} />
      <ellipse cx={0} cy={-100} rx={210} ry={40} fill={body} />
      <ellipse cx={0} cy={-100} rx={120} ry={22} fill={shade(body, 0.25)} opacity={0.5} />
      {/* band */}
      <path d="M -148 -146 Q 0 -120 148 -146 L 150 -118 Q 0 -94 -150 -118 Z" fill={C.yellow} />
      {/* moon */}
      <path d="M 90 -300 A 40 40 0 1 0 110 -236 A 32 32 0 1 1 90 -300 Z" fill={C.yellow} />
      {/* stars */}
      {STARS.map((st, i) => (
        <path key={i} d={star(st.x, st.y, st.r)} fill={st.c} opacity={tw(i)} />
      ))}
    </g>
  );
}
