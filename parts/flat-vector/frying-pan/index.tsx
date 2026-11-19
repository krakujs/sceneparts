import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Frying pan: empty pan seen from 3/4 above, lying on its base with a long handle to the right.
// Origin = bottom centre of the pan body (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : "#3A4157";
  const rim = shade(c, -0.25), inside = "#5D6578", handle = C.brownDark;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* long handle, behind the pan */}
        <rect x={150} y={-152} width={240} height={26} rx={13} fill={handle} />
        <circle cx={364} cy={-139} r={8} fill={shade(handle, 0.45)} />
        {/* pan wall */}
        <path d="M -170 -140 L -146 -40 A 146 40 0 0 0 146 -40 L 170 -140 A 170 66 0 0 1 -170 -140 Z" fill={c} />
        {/* shaded right side of the wall */}
        <path d="M 170 -140 A 170 66 0 0 1 60 -78 L 60 -3.5 A 146 40 0 0 0 146 -40 Z" fill={shade(c, 0.2)} />
        {/* rim and cooking surface */}
        <ellipse cx={0} cy={-140} rx={170} ry={66} fill={rim} />
        <ellipse cx={0} cy={-140} rx={152} ry={54} fill={inside} />
      </g>
    </g>
  );
}
