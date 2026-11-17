import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// 3D printer: open-frame printer with a gantry, a moving nozzle and a printed object on the bed.
// Origin = bottom centre. anim "print": the nozzle travels back and forth and the object grows.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : C.orange;
  const anim: string = p.anim ?? "none";
  const printing = anim === "print";
  const tri = (t: number) => 1 - Math.abs(((t % 2) + 2) % 2 - 1); // 0..1..0 sweep
  const sweep = printing ? (tri(f / 80) - 0.5) * 220 : 0;
  const layers = printing ? Math.min(5, 1 + Math.floor((f % 200) / 40)) : 3;
  const gantryY = -560;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      <g transform={motion(anim === "print" ? "none" : anim, f)}>
        {/* base frame */}
        <rect x={-300} y={-60} width={600} height={40} rx={12} fill={shade(frame, 0.3)} />
        {/* build plate */}
        <rect x={-210} y={-90} width={420} height={30} rx={8} fill={C.greyDark} />
        {/* printed object: stacked rounded layers */}
        {Array.from({ length: layers }, (_, i) => (
          <rect key={i} x={-120 + i * 8} y={-120 - i * 30} width={240 - i * 16} height={30} rx={10} fill={i % 2 ? C.teal : C.tealDark} />
        ))}
        {/* uprights */}
        <rect x={-270} y={-560} width={24} height={500} rx={10} fill={frame} />
        <rect x={246} y={-560} width={24} height={500} rx={10} fill={frame} />
        <rect x={-270} y={-580} width={540} height={28} rx={12} fill={shade(frame, 0.15)} />
        <rect x={-260} y={-40} width={520} height={0} fill="none" />
        {/* gantry carrying the nozzle */}
        <g transform={`translate(${f1(sweep)} 0)`}>
          <rect x={-250} y={gantryY - 20} width={500} height={22} rx={8} fill={C.greyDark} />
          <rect x={-40} y={gantryY} width={80} height={60} rx={12} fill={C.inkSoft} />
          <rect x={-18} y={gantryY + 60} width={36} height={40} rx={8} fill={C.greyDark} />
          <path d={`M 0 ${gantryY + 100} L -10 ${gantryY + 112} L 10 ${gantryY + 112} Z`} fill={C.ink} />
          {printing && <circle cx={0} cy={gantryY + 118} r={5} fill={C.orange} />}
        </g>
        {/* control screen */}
        <rect x={190} y={-210} width={70} height={46} rx={8} fill={C.ink} />
        <rect x={202} y={-196} width={46} height={8} rx={4} fill={C.green} />
        <rect x={202} y={-182} width={28} height={6} rx={3} fill={C.greyDark} />
      </g>
    </g>
  );
}
