import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Handbag: generic shoulder handbag with a rounded body, a front flap, a gold clasp and an arched strap. No logos.
// Origin = bottom centre; faces the viewer, honours flip, s and anim. Hero size.
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
  const c = p.color && p.color !== "none" ? p.color : C.purple;
  const dk = shade(c, 0.2);
  const strapC = shade(c, -0.1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* arched shoulder strap */}
        <path d="M -120 -300 Q 0 -520 120 -300" fill="none" stroke={strapC} strokeWidth={22} strokeLinecap="round" />
        {/* body */}
        <path d="M -200 -300 L 200 -300 Q 214 -300 212 -284 L 186 -28 Q 182 0 152 0 L -152 0 Q -182 0 -186 -28 L -212 -284 Q -214 -300 -200 -300 Z" fill={c} />
        <path d="M 110 -296 L 200 -296 L 186 -28 Q 182 0 152 0 L 98 0 Z" fill={dk} opacity={0.6} />
        {/* front flap */}
        <path d="M -206 -300 L 206 -300 L 206 -196 Q 0 -150 -206 -196 Z" fill={dk} />
        {/* gold clasp */}
        <rect x={-30} y={-196} width={60} height={60} rx={14} fill={C.yellow} />
        <circle cx={0} cy={-166} r={9} fill={C.yellowDark} />
      </g>
    </g>
  );
}
