import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open spiral-bound sketchbook lying flat: a coloured cover, two cream pages with a simple sun and hill
// drawn in pencil, and a row of spiral rings along the top edge. Origin = bottom centre. Hero size: about 520 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cover = p.cover && p.cover !== "none" ? p.cover : C.blue;
  const anim: string = p.anim ?? "none";
  const rock = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 1.5 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.06 : 1;
  const rings = [-220, -150, -80, -10, 60, 130, 200];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={290} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) rotate(${f1(rock)}) scale(${f1(pop)})`}>
        {/* cover (slightly larger than the pages) */}
        <rect x={-270} y={-370} width={540} height={370} rx={20} fill={cover} />
        <rect x={-270} y={-30} width={540} height={30} rx={12} fill={shade(cover, 0.25)} />
        {/* page block */}
        <rect x={-250} y={-350} width={500} height={320} rx={10} fill="#FFFFFF" />
        <rect x={-250} y={-350} width={500} height={320} rx={10} fill="none" stroke={C.greyLight} strokeWidth={4} />
        <line x1={0} y1={-350} x2={0} y2={-30} stroke={C.greyLight} strokeWidth={6} />
        {/* left page: a sun and a hill in pencil */}
        <g>
          <circle cx={-130} cy={-250} r={34} fill={C.yellow} />
          <path d="M -220 -110 Q -170 -200 -110 -130 Q -70 -170 -30 -110 Z" fill={C.greyDark} opacity={0.8} />
          <path d="M -210 -90 L -40 -90" stroke={C.greyDark} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
        </g>
        {/* right page: scribbled lines and a little house */}
        <g>
          <rect x={60} y={-160} width={90} height={60} fill="none" stroke={C.greyDark} strokeWidth={5} />
          <path d="M 50 -160 L 105 -210 L 160 -160 Z" fill="none" stroke={C.greyDark} strokeWidth={5} strokeLinejoin="round" />
          <path d="M 80 -110 L 80 -140 L 110 -140 L 110 -110" fill="none" stroke={C.greyDark} strokeWidth={4} opacity={0.6} />
          <path d="M 40 -70 Q 110 -80 180 -70" fill="none" stroke={C.greyDark} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
        </g>
        {/* spiral rings along the top of the page block */}
        {rings.map((rx, i) => (
          <ellipse key={i} cx={rx} cy={-352} rx={9} ry={20} fill="none" stroke={C.greyDark} strokeWidth={6} />
        ))}
      </g>
    </g>
  );
}
