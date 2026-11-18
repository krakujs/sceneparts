import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Discus lying on the ground, seen at an angle: a metal rim ring, a pale face with a faint inner ring
// and a hub. anim "spin" squeezes the disc horizontally to show it turning over on its edge.
// Origin = ground centre (the bottom of the rim touches y). About 660 px wide and 380 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const RX = 320, RY = 170; // outer rim radii

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const face = p.color && p.color !== "none" ? p.color : C.greyLight;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const turn = anim === "spin" ? Math.max(0.14, Math.abs(Math.cos((f * 2 * Math.PI) / 50))) : 1;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(${f1(pop)})`}>
      <ellipse cx={0} cy={0} rx={RX + 30} ry={22} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob - RY)}) scale(${f1(turn)} 1)`}>
        {/* metal rim: the outer ring, with a darker lower edge for thickness */}
        <ellipse cx={0} cy={18} rx={RX} ry={RY} fill={shade(rim, 0.25)} />
        <ellipse cx={0} cy={0} rx={RX} ry={RY} fill={rim} />
        {/* pale face inside the rim */}
        <ellipse cx={0} cy={-6} rx={RX - 26} ry={RY - 22} fill={face} />
        <ellipse cx={0} cy={-6} rx={RX - 26} ry={RY - 22} fill="none" stroke={shade(face, 0.12)} strokeWidth={8} />
        {/* inner ring and hub */}
        <ellipse cx={0} cy={-6} rx={RX * 0.62} ry={(RY - 22) * 0.62} fill="none" stroke={shade(face, 0.1)} strokeWidth={6} />
        <ellipse cx={0} cy={-6} rx={44} ry={24} fill={rim} />
        <ellipse cx={0} cy={-6} rx={18} ry={9} fill={shade(rim, 0.3)} />
        {/* highlight on the rim */}
        <path d={`M -220 -110 Q -150 -150 -40 -158`} stroke={C.white} strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.45} />
      </g>
    </g>
  );
}
