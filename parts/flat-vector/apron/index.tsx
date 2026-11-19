import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Apron: kitchen apron hanging from its neck strap, with a front pocket and waist ties.
// Origin = bottom edge of the apron (the hem sits on y). No ground shadow, it hangs. Honours flip, s and anim.
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
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const dk = shade(c, 0.2), strap = shade(c, 0.1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(p.anim ?? "none", f)}>
        {/* neck strap and waist ties, behind the body */}
        <path d="M -96 -470 Q 0 -610 96 -470" fill="none" stroke={strap} strokeWidth={14} strokeLinecap="round" />
        <path d="M -150 -330 Q -220 -320 -232 -250" fill="none" stroke={strap} strokeWidth={18} strokeLinecap="round" />
        <path d="M 150 -330 Q 220 -320 232 -250" fill="none" stroke={strap} strokeWidth={18} strokeLinecap="round" />
        {/* body */}
        <path d="M -100 -470 Q 0 -450 100 -470 L 160 -320 L 170 -60 Q 170 0 110 0 L -110 0 Q -170 0 -170 -60 L -160 -320 Z" fill={c} />
        <path d="M 100 -470 L 160 -320 L 170 -60 Q 170 0 120 0 L 92 0 Q 132 -30 126 -90 L 100 -300 Z" fill={dk} />
        {/* hem band */}
        <rect x={-170} y={-40} width={340} height={14} rx={4} fill={dk} />
        {/* front pocket with flap */}
        <rect x={-80} y={-230} width={160} height={110} rx={18} fill={dk} />
        <rect x={-80} y={-230} width={160} height={24} rx={10} fill={shade(c, 0.3)} />
      </g>
    </g>
  );
}
