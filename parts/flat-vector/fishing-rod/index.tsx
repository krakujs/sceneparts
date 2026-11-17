import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fishing rod lying on the floor: cork grip at the left, reel under the grip, rod tip raised to the right with a line and red-and-white float.
// Hero scale: about 500 px long at s = 1; use about 0.25 next to a person. Origin = floor under the grip.
// anim "float": the float bobs up and down on the line.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};
const B = [-190, -22], G = [-110, -86], T = [200, -270], F = [262, -128];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const rod = p.color && p.color !== "none" ? p.color : C.greyDark;
  const grip = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const bob = anim === "float" ? Math.sin((f * 2 * Math.PI) / 50) * 8 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={20} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <circle cx={-124} cy={-50} r={30} fill={C.greyDark} />
        <circle cx={-124} cy={-50} r={16} fill={C.grey} />
        <line x1={-124} y1={-50} x2={-96} y2={-30} stroke={C.greyDark} strokeWidth={8} strokeLinecap="round" />
        <line x1={T[0]} y1={T[1]} x2={F[0]} y2={F[1]} stroke={C.inkSoft} strokeWidth={6} strokeLinecap="round" />
        <g transform={`translate(0 ${f1(bob)})`}>
          <path d={`M ${F[0] - 26} ${F[1]} A 26 26 0 0 1 ${F[0] + 26} ${F[1]} Z`} fill={C.red} />
          <path d={`M ${F[0] - 26} ${F[1]} A 26 26 0 0 0 ${F[0] + 26} ${F[1]} Z`} fill={C.white} />
        </g>
        <line x1={B[0]} y1={B[1]} x2={G[0]} y2={G[1]} stroke={grip} strokeWidth={30} strokeLinecap="round" />
        <line x1={G[0]} y1={G[1]} x2={T[0]} y2={T[1]} stroke={rod} strokeWidth={18} strokeLinecap="round" />
        <circle cx={60} cy={-186} r={5} fill={C.greyDark} />
        <circle cx={130} cy={-230} r={4} fill={C.greyDark} />
        <circle cx={T[0]} cy={T[1]} r={6} fill={shade(rod, 0.2)} />
      </g>
    </g>
  );
}
