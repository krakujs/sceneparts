import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cooking pot: deep stock pot with a domed lid and two side handles. anim "steam" puffs steam out of the lid.
// Origin = bottom centre (resting point). Honours flip, s and anim.
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
  const c = p.color && p.color !== "none" ? p.color : "#C9D1DC";
  const dk = shade(c, 0.2), handle = C.inkSoft;
  const steam = p.anim === "steam";
  const puffs = steam
    ? [0, 1, 2].map((i) => {
        const ph = ((f * 2 + i * 40) % 120) / 120;
        return (
          <circle
            key={i}
            cx={f1((i - 1) * 50 + Math.sin(ph * Math.PI * 2) * 10)}
            cy={f1(-350 - ph * 130)}
            r={f1(16 + ph * 16)}
            fill="#FFFFFF"
            opacity={(Math.sin(ph * Math.PI) * 0.8).toFixed(2)}
          />
        );
      })
    : null;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={176} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim === "steam" ? "none" : p.anim ?? "none", f)}>
        {/* side handles, behind the body */}
        <rect x={-226} y={-200} width={92} height={28} rx={14} fill={handle} />
        <rect x={134} y={-200} width={92} height={28} rx={14} fill={handle} />
        {/* body */}
        <path d="M -150 -240 L -142 -40 Q -140 -4 -110 -4 L 110 -4 Q 140 -4 142 -40 L 150 -240 Z" fill={c} />
        <path d="M 96 -240 L 150 -240 L 142 -40 Q 140 -4 110 -4 L 92 -4 Q 122 -14 124 -60 Z" fill={dk} />
        <rect x={-120} y={-4} width={240} height={4} rx={2} fill={dk} />
        {/* rim */}
        <ellipse cx={0} cy={-240} rx={150} ry={24} fill={shade(c, -0.25)} />
        <ellipse cx={0} cy={-240} rx={138} ry={17} fill={shade(c, 0.3)} />
        {/* lid */}
        <ellipse cx={0} cy={-258} rx={158} ry={20} fill={dk} />
        <path d="M -158 -258 C -158 -300 158 -300 158 -258 Z" fill={shade(c, 0.1)} />
        <rect x={-26} y={-316} width={52} height={16} rx={8} fill={handle} />
        {puffs}
      </g>
    </g>
  );
}
