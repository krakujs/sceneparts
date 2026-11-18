/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Single green leaf with a midrib and side veins. Origin = where the stalk meets the ground; anim fall makes it drift and swing.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const BLADE = "M 0 0 C -120 -40 -130 -200 0 -320 C 130 -200 120 -40 0 0 Z";

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const green = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const t = (2 * Math.PI * f) / 90;
  const drift = anim === "fall" ? `translate(${f1(Math.sin(t) * 60)} ${f1(-Math.abs(Math.cos(t / 2)) * 20)}) rotate(${f1(Math.sin(t) * 18)})` : "";
  const veins: React.ReactNode[] = [];
  for (let i = 0; i < 5; i++) {
    const vy = -70 - i * 50;
    veins.push(<path key={`l${i}`} d={`M 0 ${vy} Q -50 ${vy - 30} -90 ${vy - 70}`} stroke={shade(green, 0.3)} strokeWidth={5} strokeLinecap="round" fill="none" />);
    veins.push(<path key={`r${i}`} d={`M 0 ${vy} Q 50 ${vy - 30} 90 ${vy - 70}`} stroke={shade(green, 0.3)} strokeWidth={5} strokeLinecap="round" fill="none" />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {anim !== "fall" && <ellipse cx={0} cy={0} rx={110} ry={10} fill={C.shadow} />}
      <g transform={`${drift} scale(${f1(pop)})`}>
        <path d="M 0 0 L 0 -20" stroke={shade(green, 0.3)} strokeWidth={8} strokeLinecap="round" />
        <g transform="translate(0 -20) rotate(8)">
          <path d={BLADE} fill={green} />
          <path d="M 0 0 C 120 -40 130 -200 0 -320 C -30 -200 -20 -60 0 0 Z" fill={shade(green, 0.14)} />
          <path d="M 0 0 L 0 -310" stroke={shade(green, 0.35)} strokeWidth={7} strokeLinecap="round" />
          {veins}
        </g>
      </g>
    </g>
  );
}
