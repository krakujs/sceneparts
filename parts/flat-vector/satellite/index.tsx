import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Orbiting satellite: a box body with a lens and an antenna, and two solar-panel wings. It floats: x,y is the centre of the body,
// no ground shadow. anim "drift": slow float and rotation.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  if (anim === "drift") return `translate(0 ${f1(Math.sin((f * 2 * Math.PI) / 120) * 10)}) rotate(${f1(Math.sin((f * 2 * Math.PI) / 160) * 6)})`;
  return "";
};

const panel = (x0: number, colour: string) => (
  <g>
    <rect x={x0} y={-80} width={110} height={160} rx={8} fill={colour} />
    {[36, 73].map((dx) => <rect key={dx} x={x0 + dx} y={-80} width={3} height={160} fill={shade(colour, 0.3)} />)}
    {[-40, 0, 40].map((dy) => <rect key={dy} x={x0} y={dy - 1.5} width={110} height={3} fill={shade(colour, 0.3)} />)}
    <rect x={x0 + 8} y={-72} width={24} height={6} rx={3} fill={C.white} opacity={0.35} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 640;
  const body = p.color && p.color !== "none" ? p.color : C.greyLight;
  const wing = p.panel && p.panel !== "none" ? p.panel : C.blue;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {panel(-250, wing)}
        {panel(140, wing)}
        <rect x={-140} y={-12} width={80} height={24} rx={6} fill={C.greyDark} />
        <rect x={60} y={-12} width={80} height={24} rx={6} fill={C.greyDark} />
        <rect x={-4} y={-112} width={8} height={44} fill={C.greyDark} />
        <circle cx={0} cy={-120} r={10} fill={C.red} />
        <rect x={-22} y={70} width={44} height={30} rx={8} fill={C.greyDark} />
        <rect x={-70} y={-70} width={140} height={140} rx={24} fill={body} />
        <rect x={-70} y={34} width={140} height={36} rx={16} fill={shade(body, 0.15)} />
        <rect x={-56} y={-58} width={60} height={8} rx={4} fill={C.white} opacity={0.5} />
        <circle cx={0} cy={0} r={26} fill={C.navy} />
        <circle cx={0} cy={0} r={16} fill={C.skyDeep} />
        <circle cx={-5} cy={-5} r={6} fill={C.white} opacity={0.7} />
      </g>
    </g>
  );
}
