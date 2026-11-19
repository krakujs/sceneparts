import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open-end spanner lying on the floor: long handle, ring-shaped head with an open jaw facing right.
// Origin = floor centre. Hero size: about 460 px long at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-10} cy={0} rx={230} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-230} y={-90} width={340} height={36} rx={18} fill={steel} />
        <rect x={-210} y={-84} width={300} height={8} rx={4} fill={C.white} opacity={0.25} />
        <path d="M225.5,-102 A72,72 0 1 0 225.5,-42 L179.9,-42 A36,36 0 1 1 179.9,-102 Z" fill={shade(steel, 0.1)} />
      </g>
    </g>
  );
}
