import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pillar candle: wax body with a few melted drips, a dark wick and a flame that flickers with anim "flicker".
// Origin = base centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
/** Flame with its base at (0,0) and its tip at (0,-h). */
const flamePath = (w: number, h: number) => `M ${f1(-w / 2)} 0 C ${f1(-w / 2)} ${f1(-h * 0.4)} ${f1(-w * 0.1)} ${f1(-h * 0.55)} 0 ${f1(-h)} C ${f1(w * 0.1)} ${f1(-h * 0.55)} ${f1(w / 2)} ${f1(-h * 0.4)} ${f1(w / 2)} 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.paper;
  const dk = shade(c, 0.18);
  const anim: string = p.anim ?? "none";
  const flicker = anim === "flicker";
  const fx = flicker ? 1 + 0.05 * Math.sin(f * 1.7) + 0.02 * Math.sin(f * 3.1) : 1;
  const fy = flicker ? 1 + 0.08 * Math.sin(f * 2.3) + 0.04 * Math.sin(f * 0.9 + 4) : 1;
  const lean = flicker ? 2.5 * Math.sin(f * 1.1 + 1) : 0;
  const halo = flicker ? 0.14 + 0.06 * Math.sin(f * 2.3) : 0.1;
  const base = -404;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={120} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <circle cx={0} cy={-470} r={170} fill="#FFE08A" opacity={halo} />
        <rect x={-88} y={-380} width={176} height={380} rx={14} fill={c} />
        <rect x={52} y={-380} width={36} height={380} rx={14} fill={dk} />
        <rect x={-80} y={-380} width={30} height={46} rx={14} fill={shade(c, 0.08)} />
        <rect x={20} y={-380} width={18} height={70} rx={9} fill={shade(c, 0.08)} />
        <ellipse cx={0} cy={-380} rx={88} ry={16} fill={shade(c, 0.1)} />
        <rect x={-4} y={-408} width={8} height={28} rx={3} fill={C.ink} />
        <g transform={`translate(0 ${base}) rotate(${f1(lean)}) scale(${f1(fx)} ${f1(fy)})`}>
          <path d={flamePath(64, 130)} fill={C.orange} />
          <path d={flamePath(36, 80)} fill={C.yellow} />
          <ellipse cx={0} cy={-12} rx={8} ry={16} fill={C.white} opacity={0.85} />
        </g>
      </g>
    </g>
  );
}
