import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Shuttlecock: a round cork base with a white feather skirt that flares out upward. Origin = bottom centre;
// the cork rests on y. Hero size about 340 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const feather = p.color && p.color !== "none" ? p.color : C.white;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 40) + 1) * 8 : 0;
  const rot = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 2 : 0;
  const topY = -330, topRx = 160, topRy = 30;
  const feathers = [-140, -105, -70, -35, 0, 35, 70, 105, 140];
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rot)})`}>
      <ellipse cx={0} cy={0} rx={70} ry={9} fill={C.shadow} />
      {/* skirt: back edge of the opening, the cone, then the front lip */}
      <ellipse cx={0} cy={topY} rx={topRx} ry={topRy} fill={shade(feather, 0.22)} />
      <path d={`M -34 -90 Q -190 -190 -${topRx} ${topY} L ${topRx} ${topY} Q 190 -190 34 -90 Z`} fill={feather} />
      <path d={`M -34 -90 Q -190 -190 -${topRx} ${topY} L -${topRx - 40} ${topY} Q -120 -170 -20 -90 Z`} fill={shade(feather, 0.12)} />
      {feathers.map((fx) => (
        <line key={fx} x1={f1(fx * 0.22)} y1={-90} x2={f1(fx)} y2={topY + 6} stroke={C.greyLight} strokeWidth={3} strokeLinecap="round" />
      ))}
      <ellipse cx={0} cy={topY} rx={topRx} ry={topRy} fill="none" stroke={feather} strokeWidth={0} />
      <path d={`M -${topRx} ${topY} Q 0 ${topY + topRy * 2.2} ${topRx} ${topY}`} fill={feather} stroke={shade(feather, 0.12)} strokeWidth={4} />
      {/* cork base */}
      <circle cx={0} cy={-46} r={46} fill={C.sand} />
      <circle cx={-8} cy={-52} r={38} fill={C.yellow} opacity={0.0} />
      <path d="M -46 -46 A 46 46 0 0 0 46 -46 A 46 40 0 0 1 -46 -46 Z" fill={shade(C.sand, 0.2)} />
      <ellipse cx={0} cy={-48} rx={40} ry={8} fill={shade(C.sand, 0.1)} opacity={0.6} />
    </g>
  );
}
