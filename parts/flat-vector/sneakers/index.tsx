import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Lace-up trainers: a pair in side view, pointing right. The near shoe is in front; the far shoe sits behind and
// to the right, a shade darker. Origin = bottom centre (soles rest on y). About 560 px wide, 230 px tall at s = 1.
// anim "bob": the pair bounces; "walk": the far shoe lifts and steps.
const f1 = (v: number) => v.toFixed(1);

const Shoe = ({ c, sole }: { c: string; sole: string }) => (
  <g transform="scale(0.85)">
    {/* upper: heel counter, collar, tongue slope and toe */}
    <path d="M -262 -62 L -262 -218 Q -262 -262 -218 -262 L -150 -262 Q -126 -196 -96 -176 Q 40 -150 150 -128 Q 250 -110 270 -78 Q 280 -66 266 -62 Z" fill={c} />
    <path d="M -262 -62 L -262 -218 Q -262 -262 -218 -262 L -200 -262 L -200 -62 Z" fill={shade(c, 0.2)} />
    <path d="M 150 -128 Q 250 -110 270 -78 Q 280 -66 266 -62 L 150 -62 Z" fill={shade(c, 0.15)} />
    {/* tongue */}
    <path d="M -150 -262 L -118 -262 Q -104 -214 -92 -178 L -122 -172 Q -146 -206 -150 -262 Z" fill={C.white} />
    {/* laces */}
    {[-70, -18, 34, 86].map((lx) => (
      <line key={lx} x1={lx - 16} y1={-138} x2={lx + 16} y2={-118} stroke={C.white} strokeWidth={8} strokeLinecap="round" />
    ))}
    {/* thick sole with a darker base */}
    <rect x={-272} y={-64} width={556} height={64} rx={28} fill={sole} />
    <rect x={-272} y={-24} width={556} height={24} rx={12} fill={shade(sole, 0.15)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const upper = p.color && p.color !== "none" ? p.color : C.orange;
  const sole = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * Math.PI) / 30)) * 10 : 0;
  const lift = anim === "walk" ? Math.max(0, Math.sin((f * Math.PI) / 30)) * 24 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={14} fill={C.shadow} />
      <g transform={`translate(-53 ${f1(bob)})`}>
        <g transform={`translate(96 ${f1(-20 - lift)})`}>
          <Shoe c={shade(upper, 0.22)} sole={shade(sole, 0.1)} />
        </g>
        <Shoe c={upper} sole={sole} />
      </g>
    </g>
  );
}
