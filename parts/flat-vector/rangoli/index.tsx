import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Rangoli: a floor pattern seen from slightly above, drawn as a flat circle squashed to an ellipse.
// Origin = bottom centre (the pattern lies on y). About 660 px wide and 330 px tall at s = 1.
// Concentric rings of petals and dots. anim "bloom": the rings open outward from the centre in turn
// (frame 0 is the complete pattern, held at 85% size and growing to full size).
const f1 = (v: number) => v.toFixed(1);
// Petal from radius r0 to r1 along the up axis, bulging by w.
const petal = (r0: number, r1: number, w: number) => {
  const m = (r0 + r1) / 2;
  return `M 0 ${-r0} Q ${w} ${-m} 0 ${-r1} Q ${-w} ${-m} 0 ${-r0} Z`;
};
const ease = (t: number) => 1 - (1 - t) ** 3;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c1 = p.color && p.color !== "none" ? p.color : C.red;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const c3 = p.color3 && p.color3 !== "none" ? p.color3 : C.blue;
  const anim: string = p.anim ?? "none";
  const grow = (delay: number) => {
    if (anim !== "bloom") return 1;
    return 0.85 + 0.15 * ease(Math.min(1, Math.max(0, (f - delay) / 30)));
  };
  const outer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const mid = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform="translate(0 -165) scale(1 0.5)">
        {/* outer ring: 12 petals and a dotted edge */}
        <g transform={`scale(${f1(grow(20))})`}>
          {outer.map((k) => (
            <path key={`o${k}`} d={petal(170, 300, 46)} fill={k % 2 ? c2 : c1} transform={`rotate(${k * 30})`} />
          ))}
          {outer.map((k) => {
            const a = ((k * 30 + 15) * Math.PI) / 180;
            return <circle key={`d${k}`} cx={f1(Math.sin(a) * 318) as any} cy={f1(-Math.cos(a) * 318) as any} r={12} fill={k % 2 ? c1 : c3} />;
          })}
        </g>
        {/* middle ring: 8 petals */}
        <g transform={`scale(${f1(grow(10))})`}>
          {mid.map((k) => (
            <path key={`m${k}`} d={petal(70, 170, 30)} fill={k % 2 ? c3 : c2} transform={`rotate(${k * 45 + 22.5})`} />
          ))}
        </g>
        {/* centre: a disc, a ring of white dots and a yellow eye */}
        <g transform={`scale(${f1(grow(0))})`}>
          <circle cx={0} cy={0} r={70} fill={C.teal} />
          <circle cx={0} cy={0} r={70} fill="none" stroke={shade(C.teal, 0.2)} strokeWidth={6} />
          {mid.map((k) => {
            const a = (k * 45 * Math.PI) / 180;
            return <circle key={`c${k}`} cx={f1(Math.sin(a) * 48) as any} cy={f1(-Math.cos(a) * 48) as any} r={9} fill={C.white} />;
          })}
          <circle cx={0} cy={0} r={22} fill={C.yellow} />
        </g>
      </g>
    </g>
  );
}
