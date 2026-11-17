import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Three steel tent pegs standing point-down on the floor, with a small wooden mallet lying beside them.
// Hero scale: about 560 px wide and 340 px tall at s = 1. Origin = floor centre under the middle peg.
// anim "tap": the mallet head lifts and drops as if driving a peg in.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  return "";
};
const PEGS: [number, number][] = [[-200, -4], [-80, 3], [40, -2]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = p.color && p.color !== "none" ? p.color : C.grey;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const tap = anim === "tap" ? Math.sin((f * 2 * Math.PI) / 30) * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={60} cy={0} rx={300} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {PEGS.map(([px, a], i) => (
          <g key={i} transform={`rotate(${a} ${px} 0)`}>
            <path d={`M ${px - 14} -270 L ${px + 14} -270 L ${px + 6} -20 L ${px} 0 L ${px - 6} -20 Z`} fill={steel} />
            <path d={`M ${px + 2} -262 L ${px + 8} -262 L ${px + 2} -30 Z`} fill={C.white} opacity={0.35} />
            <circle cx={px} cy={-288} r={18} fill="none" stroke={shade(steel, 0.25)} strokeWidth={10} />
          </g>
        ))}
        <g transform={`rotate(${f1(tap)} 120 -27)`}>
          <rect x={110} y={-40} width={200} height={26} rx={13} fill={wood} />
          <rect x={290} y={-62} width={96} height={62} rx={14} fill={shade(wood, 0.15)} />
          <rect x={300} y={-54} width={16} height={46} rx={6} fill={C.white} opacity={0.2} />
        </g>
      </g>
    </g>
  );
}
