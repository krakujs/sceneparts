import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Magnifying glass: a round lens with a glass shine and a handle at 45 degrees.
// Origin = the bottom tip of the handle (the grip rests on y). About 520 px across at s = 1.
// anim "search": the lens moves in a small circle while the handle stays still.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const rim = p.color && p.color !== "none" ? p.color : C.blue;
  const handle = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const a = (Math.PI * 2 * f) / 90;
  const lx = anim === "search" ? Math.cos(a) * 26 : 0;
  const ly = anim === "search" ? Math.sin(a) * 26 : 0;
  // Geometry: the lens centre sits 470 px from the grip along the 45-degree diagonal.
  const L = -332, R = 140, RIM = 170;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-40} cy={0} rx={90} ry={11} fill={C.shadow} />
      {/* handle: from the rim to the grip, with a darker collar and a grip end */}
      <path d="M -212 -212 L 0 0" stroke={handle} strokeWidth={50} strokeLinecap="round" fill="none" />
      <path d="M -212 -212 L -150 -150" stroke={shade(handle, 0.25)} strokeWidth={60} strokeLinecap="round" fill="none" />
      <path d="M -40 -40 L 0 0" stroke={shade(handle, 0.25)} strokeWidth={56} strokeLinecap="round" fill="none" />
      <g transform={`translate(${f1(lx)} ${f1(ly)})`}>
        {/* rim, then the glass, then the shine */}
        <circle cx={L} cy={L} r={RIM} fill={rim} />
        <circle cx={L} cy={L} r={RIM - 18} fill={shade(rim, 0.15)} />
        <circle cx={L} cy={L} r={R} fill={C.sky} />
        <path d={`M ${L - 80} ${L + 40} A 100 100 0 0 0 ${L + 40} ${L - 100}`} stroke={C.white} strokeWidth={22} strokeLinecap="round" fill="none" opacity={0.85} />
        <circle cx={L + 60} cy={L + 70} r={16} fill={C.white} opacity={0.5} />
      </g>
    </g>
  );
}
