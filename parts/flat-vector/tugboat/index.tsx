import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stubby harbour tug, side view facing right. Origin = waterline centre. Room scale: about 580 px wide, 330 px tall.
// Deep hull with a raised bow, a dark rubber bumper along the gunwale, tyre fenders hanging on short ropes,
// a tall wheelhouse in the middle and a shorter funnel behind it. anim "drive" rocks it on the waves.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 80) * 2.0)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 40} y={8} width={80} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 120} y={18} width={80} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const hull = p.color && p.color !== "none" ? p.color : C.red;
  const house = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const fenders = [-230, 40, 150];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* deep hull with a raised bow and a darker band */}
        <path d="M -270 -130 L 210 -130 L 300 -70 L 290 12 L -270 12 Z" fill={hull} />
        <rect x={-270} y={-74} width={560} height={12} fill={shade(hull, 0.25)} />
        {/* dark rubber bumper strip along the gunwale */}
        <rect x={-280} y={-140} width={580} height={16} rx={8} fill={C.ink} />
        {/* funnel behind the wheelhouse, shorter than the wheelhouse */}
        <rect x={-196} y={-262} width={78} height={132} rx={12} fill={hull} />
        <rect x={-202} y={-274} width={90} height={16} rx={6} fill={C.ink} />
        {/* tall wheelhouse with windows */}
        <rect x={-90} y={-300} width={140} height={170} rx={10} fill={house} />
        <rect x={-100} y={-314} width={160} height={18} rx={8} fill={C.greyLight} />
        {[-72, -22, 28].map((wx) => (
          <rect key={wx} x={wx} y={-272} width={38} height={52} rx={6} fill={C.sky} />
        ))}
        <rect x={-72} y={-200} width={38} height={70} rx={4} fill={C.greyLight} />
        {/* tyre fenders hanging on short ropes, edge-on, half over the gunwale */}
        {fenders.map((fx) => (
          <g key={fx}>
            <rect x={fx - 2} y={-166} width={4} height={26} fill={C.sand} />
            <ellipse cx={fx} cy={-112} rx={16} ry={32} fill={C.ink} />
            <ellipse cx={fx} cy={-112} rx={7} ry={15} fill={C.greyDark} />
          </g>
        ))}
      </g>
      <Water w={640} />
    </g>
  );
}
