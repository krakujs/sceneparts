import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sanding block resting on a sheet of sandpaper, with grit dots. Origin = floor centre.
// Hero size: about 430 px long at s = 1. anim "sand": the block slides back and forth over the paper.
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
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const paper = p.color2 && p.color2 !== "none" ? p.color2 : C.sand;
  const anim: string = p.anim ?? "none";
  const slide = anim === "sand" ? f1(Math.sin((f * 2 * Math.PI) / 50) * 30) : "0";
  const dots = [0, 1].flatMap((r) => Array.from({ length: 14 }, (_, i) => ({ cx: -200 + i * 30 + r * 15, cy: r ? -14 : -28 })));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-5} cy={0} rx={225} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "sand" ? "none" : anim, f)}>
        <rect x={-220} y={-40} width={430} height={40} rx={6} fill={paper} />
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={5} fill={shade(paper, 0.45)} />
        ))}
        <g transform={`translate(${slide} 0)`}>
          <rect x={-120} y={-150} width={240} height={110} rx={26} fill={wood} />
          <rect x={-100} y={-140} width={200} height={12} rx={6} fill={C.white} opacity={0.25} />
          <rect x={-120} y={-56} width={240} height={16} rx={8} fill={shade(wood, 0.25)} />
        </g>
      </g>
    </g>
  );
}
