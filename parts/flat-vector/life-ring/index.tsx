import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Red-and-white striped life ring with a coil of rope, front view. Origin = bottom centre.
// About 444 px wide and 460 px tall. anim "bob" gently bobs it up and down.
const f1 = (v: number) => v.toFixed(1);
const CY = -232, R = 222, r = 118, SEG = 8;
const pt = (rad: number, a: number) => `${f1(rad * Math.cos(a))} ${f1(CY + rad * Math.sin(a))}`;
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 10)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 80) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const white = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const segs = Array.from({ length: SEG }, (_, k) => {
    const a0 = (k * 2 * Math.PI) / SEG, a1 = ((k + 1) * 2 * Math.PI) / SEG;
    const d = `M ${pt(R, a0)} A ${R} ${R} 0 0 1 ${pt(R, a1)} L ${pt(r, a1)} A ${r} ${r} 0 0 0 ${pt(r, a0)} Z`;
    return <path key={k} d={d} fill={k % 2 ? white : red} />;
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* rope running from the ring down to a coil on the ground */}
        <path d="M -60 -18 Q -120 -2 -180 -10" fill="none" stroke={C.sand} strokeWidth={16} strokeLinecap="round" />
        <ellipse cx={-210} cy={-8} rx={50} ry={12} fill={C.sand} />
        <ellipse cx={-210} cy={-18} rx={42} ry={10} fill={shade(C.sand, 0.2)} />
        <ellipse cx={-210} cy={-28} rx={32} ry={8} fill={C.sand} />
        {segs}
      </g>
    </g>
  );
}
