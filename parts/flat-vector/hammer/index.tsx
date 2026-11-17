import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};
const col = (v: unknown, d: string) => (typeof v === "string" && v && v !== "none" ? v : d);

// Claw hammer lying on the floor in side view: wooden handle to the left, steel head upright at the right end
// (striking face down, curved split claw up). Origin = floor centre. Hero size: about 460 px long at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = col(p.color, C.brown), steel = col(p.color2, C.grey);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-20} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        <rect x={-260} y={-84} width={400} height={46} rx={22} fill={wood} />
        <rect x={-260} y={-50} width={400} height={12} rx={6} fill={shade(wood, 0.2)} />
        <rect x={-262} y={-88} width={110} height={54} rx={24} fill={shade(wood, 0.28)} />
        <path d="M112,-118 L188,-118 C190,-178 160,-222 98,-246 L84,-222 C126,-196 130,-160 112,-118 Z" fill={steel} />
        <path d="M150,-122 C152,-170 132,-200 96,-232" fill="none" stroke={shade(steel, 0.35)} strokeWidth={8} strokeLinecap="round" />
        <rect x={112} y={-130} width={76} height={110} rx={8} fill={steel} />
        <rect x={102} y={-30} width={96} height={30} rx={8} fill={shade(steel, 0.22)} />
        <rect x={124} y={-120} width={14} height={86} rx={6} fill={C.white} opacity={0.35} />
      </g>
    </g>
  );
}
