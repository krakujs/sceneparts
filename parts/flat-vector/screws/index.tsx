import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Three big screws lying on the floor: domed slotted heads, threaded shafts and pointed tips.
// Origin = floor centre. Hero size: about 470 px across at s = 1. anim "turn": the threads run along the shaft.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

const SCREWS = [
  { x: -60, y: -60, a: -5 },
  { x: 80, y: -110, a: 7 },
  { x: -10, y: -30, a: -16 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = p.color && p.color !== "none" ? p.color : C.grey;
  const head = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const off = anim === "turn" ? (f * 2) % 24 : 0;
  const threads = Array.from({ length: 9 }, (_, i) => -100 + ((i * 24 + off) % 216));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "turn" ? "none" : anim, f)}>
        {SCREWS.map((sc, i) => (
          <g key={i} transform={`translate(${sc.x} ${sc.y}) rotate(${sc.a})`}>
            <rect x={-150} y={-34} width={44} height={68} rx={16} fill={head} />
            <rect x={-150} y={-22} width={10} height={44} rx={3} fill={shade(head, 0.5)} />
            <rect x={-106} y={-16} width={250} height={32} rx={6} fill={steel} />
            {threads.map((tx, j) => (
              <polygon key={j} points={`${tx},-16 ${tx + 8},-16 ${tx + 14},16 ${tx + 6},16`} fill={shade(steel, 0.3)} />
            ))}
            <polygon points="144,-16 186,0 144,16" fill={steel} />
          </g>
        ))}
      </g>
    </g>
  );
}
