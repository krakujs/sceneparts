/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Acorn: brown nut with a textured cap and a short stalk. Origin = bottom tip of the nut.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const nut = p.color && p.color !== "none" ? p.color : "#D9A05B";
  const cap = shade("#8A5A3C", 0.05);
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const scales: React.ReactNode[] = [];
  for (let r = 0; r < 3; r++) for (let c = -3; c <= 3; c++) {
    const cx = c * 30 + (r % 2 ? 15 : 0), cy = -150 + r * 26;
    scales.push(<circle key={`${r}${c}`} cx={cx} cy={cy} r={9} fill={shade(cap, 0.25)} />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={70} ry={8} fill={C.shadow} />
      <g transform={`scale(${f1(pop * 1.25)})`}>
        <path d="M -60 -120 C -76 -60 -50 -12 0 0 C 50 -12 76 -60 60 -120 Z" fill={nut} />
        <path d="M 20 -110 C 40 -60 30 -20 0 0 C 40 -20 58 -60 60 -120 Z" fill={shade(nut, 0.2)} />
        <path d="M -80 -120 C -80 -170 80 -170 80 -120 C 60 -100 -60 -100 -80 -120 Z" fill={cap} />
        <path d="M -80 -122 C -80 -176 80 -176 80 -122 C 60 -104 -60 -104 -80 -122 Z" fill={cap} />
        {scales}
        <rect x={-8} y={-210} width={16} height={44} rx={6} fill={shade(cap, 0.1)} />
        <path d="M -4 -210 L 0 -224" stroke={shade(cap, 0.1)} strokeWidth={6} strokeLinecap="round" />
      </g>
    </g>
  );
}
