import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Underarm crutch: padded armrest on top, two side rails narrowing down to a collar, a hand grip
// between the rails, then one adjustable leg with holes and a rubber foot.
// Origin = bottom centre (the foot stands on y). About 1.3 m tall (730 px) at s = 1 (1 m ≈ 560 px).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const pad = p.color && p.color !== "none" ? p.color : C.blue;
  const alu = p.color2 && p.color2 !== "none" ? p.color2 : "#AEB7C6";
  const aluDk = shade(alu, 0.22);
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={90} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* adjustable leg with holes */}
        <rect x={-15} y={-300} width={30} height={262} rx={8} fill={aluDk} />
        <rect x={-15} y={-300} width={14} height={262} rx={6} fill={alu} />
        {[-250, -210, -170, -130, -90].map((hy) => <circle key={hy} cx={0} cy={hy} r={5} fill={C.inkSoft} />)}
        {/* rubber foot */}
        <path d="M -24 -50 L 24 -50 L 30 -6 Q 30 0 24 0 L -24 0 Q -30 0 -30 -6 Z" fill={C.ink} />
        {/* two side rails */}
        <path d="M -78 -700 L -22 -300" stroke={aluDk} strokeWidth={24} strokeLinecap="round" />
        <path d="M 78 -700 L 22 -300" stroke={aluDk} strokeWidth={24} strokeLinecap="round" />
        <path d="M -80 -700 L -26 -300" stroke={alu} strokeWidth={10} strokeLinecap="round" />
        <path d="M 76 -700 L 20 -300" stroke={alu} strokeWidth={10} strokeLinecap="round" />
        {/* collar where the rails meet the leg */}
        <rect x={-34} y={-322} width={68} height={40} rx={10} fill={shade(alu, 0.35)} />
        <circle cx={0} cy={-302} r={7} fill={alu} />
        {/* hand grip between the rails */}
        <rect x={-62} y={-500} width={124} height={40} rx={20} fill={shade(pad, 0.2)} />
        <rect x={-62} y={-500} width={124} height={22} rx={11} fill={pad} />
        {/* padded armrest */}
        <rect x={-110} y={-744} width={220} height={56} rx={28} fill={shade(pad, 0.2)} />
        <rect x={-110} y={-744} width={220} height={36} rx={18} fill={pad} />
        <rect x={-80} y={-736} width={110} height={10} rx={5} fill={C.white} opacity={0.3} />
      </g>
    </g>
  );
}
