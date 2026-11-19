import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tipper (dump) truck facing right: cab over the front axle, chassis, open tipping bed hinged at the back.
// Room scale, about 540 px tall and 820 px wide at s = 1. Origin = floor centre under the chassis.
// anim "tip": the bed tips up at the front, hinged at the back, then settles again.
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
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const tip = anim === "tip" ? (22 * (1 - Math.cos((f * 2 * Math.PI) / 120))) / 2 : 0;
  const wheel = (cx: number) => (
    <g key={cx}>
      <circle cx={cx} cy={-90} r={90} fill={C.ink} />
      <circle cx={cx} cy={-90} r={36} fill={C.greyLight} />
      <circle cx={cx} cy={-90} r={12} fill={frame} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={420} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* chassis */}
        <rect x={-370} y={-250} width={820} height={60} rx={12} fill={frame} />
        {/* tipping bed, hinged at its back-bottom corner (-360, -250) */}
        <g transform={`rotate(${f1(-tip)} -360 -250)`}>
          <rect x={-360} y={-420} width={440} height={170} rx={12} fill={body} />
          <rect x={-346} y={-420} width={412} height={22} rx={6} fill={shade(body, 0.35)} />
          <rect x={-360} y={-330} width={440} height={16} fill={shade(body, 0.2)} />
          <rect x={-372} y={-262} width={30} height={24} rx={6} fill={C.inkSoft} />
        </g>
        {/* cab and bonnet */}
        <rect x={130} y={-520} width={200} height={270} rx={40} fill={body} />
        <rect x={120} y={-540} width={220} height={30} rx={14} fill={shade(body, 0.2)} />
        <rect x={200} y={-490} width={110} height={120} rx={14} fill={C.sky} />
        <rect x={320} y={-360} width={130} height={110} rx={30} fill={body} />
        <rect x={430} y={-345} width={22} height={75} rx={6} fill={frame} />
        {wheel(-260)}
        {wheel(-170)}
        {wheel(330)}
      </g>
    </g>
  );
}
