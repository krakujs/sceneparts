import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden handheld torch standing upright: a stick with a wrapped rag head and flickering fire on top.
// Hero scale: about 220 px wide (with flame) and 560 px tall at s = 1. Origin = bottom centre (the butt sits on y).
// anim "flicker": the fire sways and pulses with p.f; "bob" and "pop" move the whole torch.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const flick = (f: number) => 0.5 + 0.5 * Math.sin(f * 0.9) * 0.6 + 0.5 * Math.sin(f * 2.3) * 0.4;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const rag = p.color2 && p.color2 !== "none" ? p.color2 : C.brownDark;
  const anim: string = p.anim ?? "none";
  const flicker = anim === "flicker";
  const k = flicker ? flick(f) : 0.5;
  const fh = 1 + (flicker ? (k - 0.5) * 0.35 : 0);
  const fx = flicker ? Math.sin(f * 1.9) * 7 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={90} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "flicker" ? "none" : anim, f)}>
        {/* stick */}
        <rect x={-22} y={-420} width={44} height={420} rx={14} fill={wood} />
        <rect x={6} y={-420} width={16} height={420} rx={8} fill={shade(wood, 0.25)} />
        {/* wrapped rag head */}
        <path d="M-40 -420 Q-44 -470 -30 -490 L30 -490 Q44 -470 40 -420 Z" fill={rag} />
        <rect x={-42} y={-428} width={84} height={16} rx={8} fill={shade(rag, 0.2)} />
        {/* fire */}
        <g transform={`translate(${f1(fx)} -490) scale(1 ${f1(fh)}) translate(0 490)`}>
          <path d="M0 -490 Q-70 -560 -40 -640 Q-22 -600 -10 -610 Q-8 -570 14 -560 Q30 -600 20 -650 Q70 -580 40 -520 Q30 -490 0 -490 Z" fill={C.orange} />
          <path d="M0 -500 Q-36 -550 -20 -600 Q-8 -570 4 -570 Q14 -540 0 -500 Z" fill={C.yellow} />
        </g>
      </g>
    </g>
  );
}
