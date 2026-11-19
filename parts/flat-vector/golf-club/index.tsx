import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Golf club (iron) standing upright: a rubber grip at the top, a steel shaft, and a flat-soled metal iron head
// on the ground with its face to the right. Origin = bottom centre of the sole; the sole rests on y.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const grip = p.color && p.color !== "none" ? p.color : C.ink;
  const metal = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const rot = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 60) * 10 : anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rot)})`}>
      <ellipse cx={0} cy={0} rx={110} ry={8} fill={C.shadow} />
      {/* shaft */}
      <rect x={-8} y={-700} width={16} height={660} fill={C.grey} />
      <rect x={2} y={-700} width={6} height={660} fill={C.greyDark} />
      {/* grip */}
      <rect x={-20} y={-800} width={40} height={250} rx={18} fill={grip} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={-20} y={-770 + i * 40} width={40} height={8} fill={shade(grip, -0.3)} opacity={0.5} />)}
      {/* hosel and iron head, sole flat on the ground */}
      <path d="M -26 -70 L 2 -70 L 6 -40 L -22 -40 Z" fill={shade(metal, 0.15)} />
      <path d="M -100 0 L 84 0 Q 102 0 98 -22 L 66 -62 Q 58 -74 40 -76 L -46 -76 Q -66 -74 -76 -54 L -100 -18 Q -106 0 -100 0 Z" fill={metal} />
      <path d="M 20 -70 L 96 -22 Q 100 -12 92 -8 L 84 0 L 60 -4 Q 64 -40 20 -70 Z" fill={shade(metal, 0.2)} />
      <path d="M -70 -54 L 40 -68" stroke={C.white} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
    </g>
  );
}
