import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Clarinet standing upright: a reed mouthpiece on top, a black body with silver keys and a flared bell.
// Origin = bottom centre. About 680 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const KEYS: [number, number][] = [[-400, -1], [-330, 1], [-260, -1], [-190, 1], [-120, -1], [-60, 1], [10, -1], [80, 1]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.ink;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={90} ry={8} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* bell, flared */}
        <path d="M -24 -120 L -58 0 L 58 0 L 24 -120 Z" fill={body} />
        <rect x={-62} y={-16} width={124} height={16} rx={6} fill={C.greyDark} />
        {/* main body */}
        <rect x={-26} y={-600} width={52} height={490} rx={16} fill={body} />
        {/* upper joint slightly narrower */}
        <rect x={-22} y={-600} width={44} height={120} rx={12} fill={shade(body, 0.0)} />
        <rect x={-24} y={-490} width={48} height={14} rx={5} fill={C.greyLight} />
        {/* barrel and mouthpiece */}
        <rect x={-16} y={-690} width={32} height={96} rx={10} fill={body} />
        <rect x={-20} y={-700} width={40} height={18} rx={6} fill={C.greyLight} />
        <rect x={-42} y={-720} width={84} height={28} rx={10} fill={shade(body, 0.1)} />
        <rect x={-30} y={-722} width={60} height={8} rx={3} fill={C.grey} opacity={0.6} />
        {/* silver keys and tone holes on the front */}
        {[-520, -440, -360, -280, -200, -130, -70, -10, 60, 120].map((ky, i) => (
          <g key={i}>
            <circle cx={0} cy={ky} r={9} fill={C.greyLight} />
            <circle cx={0} cy={ky} r={4} fill={C.ink} opacity={0.7} />
          </g>
        ))}
        {/* key arms on the sides */}
        {KEYS.map(([kx, side], i) => (
          <rect key={i} x={side > 0 ? 20 : -36} y={-560 + i * 56} width={16} height={28} rx={6} fill={C.greyLight} />
        ))}
        {/* ring keys (silver tabs) at the bell joint */}
        <rect x={-30} y={-130} width={60} height={12} rx={6} fill={C.greyLight} />
        {/* highlight */}
        <rect x={-14} y={-580} width={6} height={440} rx={3} fill={C.white} opacity={0.12} />
      </g>
    </g>
  );
}
