/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tall saguaro-style cactus in the ground: ribbed trunk, two upturned arms joined to it, spines. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const ARM_W = 72, TRUNK_W = 124;
// Arms are one thick rounded stroke each: out from the trunk, then up.
const LEFT_ARM = "M -20 -430 H -165 V -640";
const RIGHT_ARM = "M 20 -520 H 170 V -700";
const spineDots = (pts: [number, number][]) => pts.map(([x, y], i) => (
  <line key={i} x1={x} y1={y} x2={x + (i % 2 ? 12 : -12)} y2={y - 6} stroke="#F4F1EA" strokeWidth={4} strokeLinecap="round" />
));

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : "#4BB46A";
  const dark = shade(body, 0.2);
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const sw = anim === "sway" ? 1.2 * Math.sin((f * 2 * Math.PI) / 120) : 0;
  const trunkSpines: [number, number][] = [];
  for (let i = 0; i < 9; i++) trunkSpines.push([(i % 2 ? 1 : -1) * 40, -90 - i * 90]);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={16} fill={C.shadow} />
      <g transform={`rotate(${f1(sw)}) scale(${f1(pop)})`}>
        <path d={LEFT_ARM} fill="none" stroke={body} strokeWidth={ARM_W} strokeLinecap="round" strokeLinejoin="round" />
        <path d={RIGHT_ARM} fill="none" stroke={body} strokeWidth={ARM_W} strokeLinecap="round" strokeLinejoin="round" />
        <path d={LEFT_ARM} fill="none" stroke={dark} strokeWidth={ARM_W * 0.22} strokeLinecap="round" strokeLinejoin="round" transform="translate(14 0)" opacity={0.6} />
        <path d={RIGHT_ARM} fill="none" stroke={dark} strokeWidth={ARM_W * 0.22} strokeLinecap="round" strokeLinejoin="round" transform="translate(14 0)" opacity={0.6} />
        <rect x={-TRUNK_W / 2} y={-860} width={TRUNK_W} height={860} rx={TRUNK_W / 2} fill={body} />
        {[-0.3, 0.3].map((k, i) => (
          <line key={i} x1={k * TRUNK_W} y1={-820} x2={k * TRUNK_W} y2={-20} stroke={dark} strokeWidth={6} strokeLinecap="round" opacity={0.7} />
        ))}
        {spineDots(trunkSpines)}
        {spineDots([[-150, -470], [-150, -560], [150, -560], [150, -640]])}
        <ellipse cx={0} cy={-860} rx={TRUNK_W / 2} ry={14} fill={dark} />
      </g>
    </g>
  );
}
