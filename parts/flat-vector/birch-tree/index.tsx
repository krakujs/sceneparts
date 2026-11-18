import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Birch: a slim white trunk with black dashes and an airy crown of small yellow-green clumps. Origin = centre of the trunk base.
// About 680 px wide and 1170 px tall at s = 1. anim sway moves the crown gently.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const hash = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;

// Crown clumps scattered over an ellipse (golden-angle spiral), fixed positions.
const CLUMPS = Array.from({ length: 40 }, (_, i) => {
  const a = i * 2.39996, r = Math.sqrt((i + 0.5) / 40);
  return { x: Math.cos(a) * r * 270, y: -860 + Math.sin(a) * r * 230, rad: 30 + 26 * hash(i) };
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.lime;
  const trunkC = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? 1.5 * Math.sin((f * 2 * Math.PI) / 100) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <path d="M -30 0 C -34 -300 -26 -600 -22 -1000 L 22 -1000 C 26 -600 34 -300 30 0 Z" fill={trunkC} />
        <path d="M 8 0 C 12 -300 10 -600 8 -1000 L 22 -1000 C 26 -600 34 -300 30 0 Z" fill={shade(trunkC, 0.12)} />
        <path d="M -20 -760 Q -90 -840 -130 -900" stroke={trunkC} strokeWidth={16} strokeLinecap="round" fill="none" />
        <path d="M 20 -700 Q 90 -780 120 -840" stroke={trunkC} strokeWidth={14} strokeLinecap="round" fill="none" />
        {Array.from({ length: 14 }, (_, i) => {
          const dx = (i % 2 ? 8 : -10) + (hash(i + 3) - 0.5) * 8;
          const dy = -90 - i * 68;
          const rot = (i % 3 - 1) * 25;
          return <rect key={i} x={dx - 8} y={dy - 4} width={16} height={8} rx={4} fill={C.ink} transform={`rotate(${f1(rot)} ${f1(dx)} ${f1(dy)})`} />;
        })}
        <g transform={`rotate(${f1(sway)} 0 -700)`}>
          {CLUMPS.map((c, i) => <circle key={`s${i}`} cx={c.x + 14} cy={c.y + 18} r={c.rad} fill={shade(leaf, 0.18)} />)}
          {CLUMPS.map((c, i) => <circle key={`m${i}`} cx={c.x} cy={c.y} r={c.rad} fill={leaf} />)}
        </g>
      </g>
    </g>
  );
}
