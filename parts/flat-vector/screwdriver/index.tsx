import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Screwdriver lying on the floor: chunky coloured grip on the left, steel shank and tip on the right.
// Origin = floor centre. Hero size: about 470 px long at s = 1.
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
  const grip = p.color && p.color !== "none" ? p.color : C.teal;
  const steel = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-4} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-240} y={-112} width={220} height={112} rx={56} fill={grip} />
        <rect x={-150} y={-112} width={22} height={112} fill={shade(grip, 0.15)} />
        <rect x={-206} y={-98} width={150} height={14} rx={7} fill={C.white} opacity={0.3} />
        <rect x={-20} y={-84} width={30} height={56} rx={8} fill={shade(steel, 0.15)} />
        <rect x={8} y={-70} width={202} height={28} rx={10} fill={steel} />
        <rect x={8} y={-70} width={202} height={8} rx={4} fill={C.white} opacity={0.3} />
        <polygon points="210,-70 232,-64 232,-48 210,-42" fill={shade(steel, 0.3)} />
      </g>
    </g>
  );
}
