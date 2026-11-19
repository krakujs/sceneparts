import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Digital pen (stylus) at hero scale with a slight diagonal. Origin = the nib (the tip touches x, y).
// About 480 px tall at s = 1. anim "tap": the pen taps and its status light pulses.
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
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const tap = anim === "tap" ? 4 * Math.sin((f * 2 * Math.PI) / 30) : 0;
  const led = anim === "tap" && Math.sin((f * 2 * Math.PI) / 30) > 0 ? C.green : C.greenDark;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) rotate(12)`}>
      <ellipse cx={0} cy={0} rx={40} ry={7} fill={C.shadow} />
      <g transform={`${motion(anim, f)} rotate(${f1(tap)})`}>
        <polygon points="-16,-70 16,-70 4,-14 0,0 -4,-14" fill={C.greyDark} />
        <rect x={-20} y={-150} width={40} height={90} rx={8} fill={C.inkSoft} />
        <rect x={-14} y={-140} width={28} height={6} rx={3} fill={C.grey} />
        <rect x={-14} y={-124} width={28} height={6} rx={3} fill={C.grey} />
        <rect x={-24} y={-420} width={48} height={290} rx={22} fill={body} />
        <rect x={-24} y={-470} width={48} height={60} rx={20} fill={shade(body, 0.25)} />
        <circle cx={0} cy={-440} r={5} fill={led} />
        <rect x={-16} y={-410} width={8} height={260} rx={4} fill={C.white} opacity={0.35} />
        <rect x={24} y={-330} width={6} height={30} rx={3} fill={shade(body, 0.3)} />
        <rect x={14} y={-450} width={6} height={150} rx={3} fill={shade(body, 0.3)} />
      </g>
    </g>
  );
}
