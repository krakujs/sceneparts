import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Red wheel valve on a pipe section, standing on a flange base. anim spin turns the handwheel.
// Origin = bottom centre (the floor line). Hero scale: at s = 1 about 430 px wide and 570 px tall. Use s about 0.3–0.4 next to a person.
const f1 = (v: number) => v.toFixed(1);
const rad = (d: number) => (d * Math.PI) / 180;
const WHEEL_Y = -470;
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wheel = p.color && p.color !== "none" ? p.color : C.red;
  const metal = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const turn = anim === "spin" ? (f * 6) % 360 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={16} fill={C.shadow} />
      <g transform={motion(anim === "spin" ? "none" : anim, f)}>
        {/* base flange, vertical body, horizontal pipe with end flanges */}
        <rect x={-80} y={-40} width={160} height={40} rx={10} fill={shade(metal, 0.2)} />
        <rect x={-40} y={-240} width={80} height={200} fill={metal} />
        <rect x={-200} y={-300} width={400} height={70} rx={12} fill={metal} />
        <rect x={-214} y={-322} width={28} height={114} rx={8} fill={shade(metal, 0.2)} />
        <rect x={186} y={-322} width={28} height={114} rx={8} fill={shade(metal, 0.2)} />
        {/* bonnet and stem */}
        <rect x={-54} y={-350} width={108} height={56} rx={14} fill={metal} />
        <rect x={-14} y={-430} width={28} height={90} fill={shade(metal, 0.2)} />
        {/* handwheel: rim, three spokes and hub */}
        <g transform={`translate(0 ${WHEEL_Y}) rotate(${f1(turn)})`}>
          <circle cx={0} cy={0} r={100} fill="none" stroke={wheel} strokeWidth={24} />
          {[0, 60, 120].map((d) => (
            <line key={d} x1={100 * Math.sin(rad(d)) * -1} y1={100 * Math.cos(rad(d))} x2={100 * Math.sin(rad(d))} y2={-100 * Math.cos(rad(d))} stroke={wheel} strokeWidth={16} strokeLinecap="round" />
          ))}
          <circle cx={0} cy={0} r={26} fill={shade(wheel, 0.25)} />
        </g>
      </g>
    </g>
  );
}
