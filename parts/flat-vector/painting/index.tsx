import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Framed landscape painting for a wall: abstract hills and a sun under a pale sky. Wall item: centred on (x, y).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const frame = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <rect x={-242} y={-182} width={500} height={380} rx={10} fill={shade(frame, 0.25)} />
        <rect x={-250} y={-190} width={500} height={380} rx={10} fill={frame} />
        <rect x={-214} y={-154} width={428} height={308} rx={4} fill={C.sky} />
        <circle cx={110} cy={-70} r={40} fill={C.yellow} />
        <path d="M -214 0 Q -100 -60 -20 -10 T 214 -30 L 214 154 L -214 154 Z" fill={C.skyDeep} />
        <path d="M -214 60 Q -80 -10 40 40 T 214 20 L 214 154 L -214 154 Z" fill={C.teal} />
        <path d="M -214 110 Q -60 50 60 100 T 214 90 L 214 154 L -214 154 Z" fill={C.greenDark} />
        <rect x={-214} y={-154} width={428} height={10} rx={4} fill={C.white} opacity={0.2} />
      </g>
    </g>
  );
}
