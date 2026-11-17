import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cylindrical battery with a raised plus terminal and a charge band. The band lights up segments by level:
// green above half, yellow above a fifth, red below. Origin = centre of the flat bottom on the floor.
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
  const body = p.color && p.color !== "none" ? p.color : C.navy;
  const level = Math.max(0, Math.min(1, typeof p.level === "number" ? p.level : 0.75));
  const lit = Math.round(level * 5);
  const lvlC = level > 0.5 ? C.green : level > 0.2 ? C.yellow : C.red;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-40} y={-404} width={80} height={36} rx={12} fill={shade(body, 0.3)} />
        <rect x={-105} y={-370} width={210} height={370} rx={40} fill={body} />
        <rect x={62} y={-330} width={43} height={290} rx={20} fill={shade(body, 0.2)} />
        <rect x={-30} y={-307} width={60} height={14} rx={7} fill={C.white} />
        <rect x={-7} y={-330} width={14} height={60} rx={7} fill={C.white} />
        <rect x={-84} y={-230} width={168} height={90} rx={14} fill={shade(body, 0.4)} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={-67 + i * 28} y={-216} width={22} height={62} rx={6}
            fill={i < lit ? lvlC : C.white} opacity={i < lit ? 1 : 0.18} />
        ))}
        <rect x={-105} y={-70} width={210} height={6} rx={3} fill={shade(body, 0.3)} />
      </g>
    </g>
  );
}
