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

// Wood-chopping axe lying on the floor in side view: long wooden handle to the left, steel head at the right end
// with a broad curved cutting edge. Origin = floor centre. Hero size: about 500 px long at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = col(p.color, C.grey), wood = col(p.color2, C.brown);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        <path d="M-270,-62 Q-60,-104 150,-96 L150,-58 Q-60,-66 -270,-28 Z" fill={wood} />
        <path d="M-270,-40 Q-60,-76 150,-70 L150,-58 Q-60,-66 -270,-28 Z" fill={shade(wood, 0.2)} />
        <rect x={92} y={-132} width={22} height={86} rx={8} fill={shade(steel, 0.25)} />
        <rect x={110} y={-142} width={66} height={110} rx={10} fill={steel} />
        <path d="M170,-140 L232,-178 Q276,-92 232,-6 L170,-36 Z" fill={steel} />
        <path d="M232,-178 Q276,-92 232,-6 L222,-12 Q262,-92 222,-170 Z" fill={C.white} opacity={0.6} />
        <rect x={120} y={-130} width={14} height={86} rx={6} fill={C.white} opacity={0.3} />
      </g>
    </g>
  );
}
