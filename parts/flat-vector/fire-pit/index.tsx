import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stone fire pit in side view: a ring of stones, two crossed logs and a tall flame. About 600 px wide and 460 px tall at s = 1.
// Origin = bottom centre (stones rest on y). anim "flicker": the flames sway and pulse with p.f.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const flick = (f: number) => 0.5 + 0.5 * Math.sin(f * 0.9) * 0.6 + 0.5 * Math.sin(f * 2.3) * 0.4;
const STONES = [-250, -170, -90, -10, 70, 150, 230];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const stone = p.color && p.color !== "none" ? p.color : C.grey;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const flicker = anim === "flicker";
  const k = flicker ? flick(f) : 0.5;
  const fh = 1 + (flicker ? (k - 0.5) * 0.35 : 0);
  const fx = flicker ? Math.sin(f * 1.6) * 8 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={16} fill={C.shadow} />
      <g transform={motion(anim === "flicker" ? "none" : anim, f)}>
        {/* logs, crossed, behind the flames */}
        <rect x={-170} y={-100} width={340} height={40} rx={18} fill={wood} transform="rotate(-6 0 -80)" />
        <rect x={-150} y={-110} width={300} height={38} rx={18} fill={shade(wood, 0.2)} transform="rotate(7 0 -90)" />
        {/* flames */}
        <g transform={`translate(${f1(fx)} -110) scale(1 ${f1(fh)}) translate(0 110)`}>
          <path d="M-120 -110 Q-150 -200 -100 -250 Q-100 -210 -70 -190 Q-60 -260 -20 -320 Q-10 -250 20 -230 Q60 -280 50 -350 Q120 -270 110 -200 Q130 -160 120 -110 Z" fill={C.orange} />
          <path d="M-60 -110 Q-70 -170 -30 -210 Q-20 -170 10 -170 Q40 -200 30 -240 Q80 -190 60 -110 Z" fill={C.yellow} />
        </g>
        {/* stone ring: back row darker, front row lighter */}
        {STONES.map((sx, i) => (
          <g key={sx}>
            <ellipse cx={sx} cy={-60} rx={70} ry={58} fill={i % 2 ? shade(stone, 0.12) : stone} />
            <ellipse cx={sx - 14} cy={-84} rx={22} ry={12} fill={C.white} opacity={0.18} />
          </g>
        ))}
        {/* ash bed */}
        <ellipse cx={0} cy={-4} rx={300} ry={14} fill={C.greyDark} opacity={0.5} />
      </g>
    </g>
  );
}
