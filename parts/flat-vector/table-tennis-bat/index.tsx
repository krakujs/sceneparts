import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Table tennis bat standing upright: a round rubber face with a wooden rim, a short neck and a wooden handle.
// Origin = bottom centre of the handle; the handle rests on y. Hero size about 340 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const rubber = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 40) + 1) * 8 : 0;
  const rot = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 50) * 8 : 0;
  const cy = -470, r = 160;
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rot)})`}>
      <ellipse cx={0} cy={0} rx={80} ry={8} fill={C.shadow} />
      {/* handle: wood with a grip shade, tapering into the neck */}
      <path d="M -22 -316 L 22 -316 L 28 -150 Q 30 -40 26 0 Q 0 6 -26 0 Q -30 -40 -28 -150 Z" fill={C.brown} />
      <path d="M 4 -316 L 22 -316 L 28 -150 Q 30 -40 26 0 Q 6 3 4 -316 Z" fill={C.brownDark} opacity={0.5} />
      <rect x={-15} y={-330} width={30} height={34} rx={6} fill={shade(C.brown, 0.1)} />
      {/* head: wooden rim and rubber face */}
      <circle cx={0} cy={cy} r={r} fill={C.brownDark} />
      <circle cx={0} cy={cy} r={r - 14} fill={rubber} />
      <circle cx={-18} cy={cy - 18} r={r - 90} fill={C.white} opacity={0.18} />
      <path d={`M ${f1(-r + 14)} ${cy} Q 0 ${cy + 40} ${f1(r - 14)} ${cy}`} fill="none" stroke={shade(rubber, 0.2)} strokeWidth={6} />
    </g>
  );
}
