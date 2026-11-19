import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Arched road bridge spanning the whole frame: a deck with a road surface, dashed centre marks, and railings.
// The arch opening is cut out of the solid body with an even-odd fill, so the background shows through.
// Origin = ground under the centre of the span; the piers stand on y. Room scale: 1040 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const concrete = p.color && p.color !== "none" ? p.color : C.grey;
  const rail = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const posts = [-500, -400, -300, -200, -100, 0, 100, 200, 300, 400, 500];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* solid body with the arch cut out */}
        <path d="M -500 -300 H 500 V 0 H -500 Z M -300 0 A 300 170 0 0 1 300 0 Z" fillRule="evenodd" fill={concrete} />
        <rect x={-300} y={-20} width={600} height={20} fill={shade(concrete, 0.15)} />
        {/* road deck */}
        <rect x={-520} y={-330} width={1040} height={30} rx={6} fill={C.greyDark} />
        {[-480, -360, -240, -120, 0, 120, 240, 360, 480].map((dx) => (
          <rect key={dx} x={dx - 30} y={-322} width={60} height={8} rx={4} fill={C.white} />
        ))}
        {/* railings */}
        {posts.map((px) => (
          <rect key={px} x={px - 5} y={-430} width={10} height={100} fill={rail} />
        ))}
        <rect x={-520} y={-440} width={1040} height={12} rx={6} fill={rail} />
        <rect x={-520} y={-390} width={1040} height={8} rx={4} fill={rail} />
      </g>
    </g>
  );
}
