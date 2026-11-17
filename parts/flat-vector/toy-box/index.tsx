import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Toy box: wooden chest with its lid propped open at the back, a ball, a block and a toy car peeking out of the top.
// Origin = bottom centre; faces the viewer, honours flip, s and anim. Room scale.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  const lid = shade(c, -0.1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={20} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* open lid propped up behind the box */}
        <polygon points="-270,-300 270,-300 238,-470 -238,-470" fill={lid} />
        <polygon points="-214,-300 214,-300 196,-440 -196,-440" fill={shade(c, 0.35)} opacity={0.6} />
        {/* toys inside, peeking over the rim */}
        <circle cx={-130} cy={-334} r={64} fill={C.red} />
        <circle cx={-150} cy={-356} r={16} fill={C.white} opacity={0.45} />
        <rect x={20} y={-374} width={128} height={96} rx={18} fill={C.yellow} />
        <circle cx={58} cy={-326} r={11} fill={C.orange} />
        <circle cx={110} cy={-326} r={11} fill={C.orange} />
        <rect x={150} y={-340} width={84} height={44} rx={16} fill={C.blue} />
        <circle cx={172} cy={-300} r={18} fill={C.ink} />
        <circle cx={214} cy={-300} r={18} fill={C.ink} />
        {/* box body */}
        <rect x={-270} y={-300} width={540} height={300} rx={16} fill={c} />
        <path d="M 196 -300 H 254 A 16 16 0 0 1 270 -284 V -16 A 16 16 0 0 1 254 0 H 196 Z" fill={dk} />
        {/* rim band and planks */}
        <rect x={-270} y={-300} width={540} height={32} rx={12} fill={lid} />
        <rect x={-260} y={-190} width={520} height={12} rx={6} fill={dk} opacity={0.55} />
        <rect x={-260} y={-90} width={520} height={12} rx={6} fill={dk} opacity={0.55} />
        {/* handles on the front */}
        <rect x={-96} y={-170} width={192} height={24} rx={12} fill={C.sand} />
        {/* feet */}
        <rect x={-250} y={-18} width={56} height={18} rx={6} fill={dk} />
        <rect x={194} y={-18} width={56} height={18} rx={6} fill={dk} />
      </g>
    </g>
  );
}
