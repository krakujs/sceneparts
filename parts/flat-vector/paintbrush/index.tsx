import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Decorator's flat paintbrush lying on the floor: wooden handle, metal ferrule and a wide flat bristle head
// with paint on the tips. Origin = floor centre under the handle. Hero size: about 490 px long at s = 1.
// anim "sway": the brush sweeps gently to and fro around the ferrule.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "sway") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 50) * 5)} 0 -50)`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paint = p.color && p.color !== "none" ? p.color : C.blue;
  const handle = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={20} cy={0} rx={280} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-240} y={-70} width={200} height={46} rx={23} fill={handle} />
        <rect x={-226} y={-62} width={170} height={8} rx={4} fill={C.white} opacity={0.25} />
        <rect x={-56} y={-86} width={40} height={78} rx={6} fill={C.greyDark} />
        <polygon points="-16,-104 96,-118 96,-2 -16,-10" fill={C.grey} />
        <circle cx={10} cy={-62} r={6} fill={C.greyDark} />
        <circle cx={10} cy={-30} r={6} fill={C.greyDark} />
        <polygon points="96,-118 250,-150 250,-6 96,-2" fill={C.sand} />
        <rect x={130} y={-120} width={8} height={110} fill={shade(C.sand, 0.2)} opacity={0.6} />
        <polygon points="190,-146 250,-150 250,-6 190,-4" fill={paint} />
        <circle cx={232} cy={-10} r={22} fill={paint} />
        <rect x={236} y={-6} width={12} height={34} rx={6} fill={paint} />
        <circle cx={242} cy={32} r={8} fill={paint} />
      </g>
    </g>
  );
}
