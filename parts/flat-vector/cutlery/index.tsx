import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cutlery: fork, knife and spoon standing side by side, upright. Handles take the colour, metal stays steel.
// Origin = bottom centre (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const STEEL = "#C9D1DC";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const hd = p.color && p.color !== "none" ? p.color : C.blue;
  const hdDk = shade(hd, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* fork */}
        <g transform="translate(-125 0) rotate(-3)">
          <rect x={-24} y={-250} width={48} height={250} rx={24} fill={hd} />
          <rect x={-24} y={-200} width={48} height={8} rx={4} fill={hdDk} />
          <rect x={-14} y={-300} width={28} height={60} rx={8} fill={STEEL} />
          <rect x={-46} y={-342} width={92} height={50} rx={14} fill={STEEL} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={-46 + i * 24} y={-430} width={16} height={100} rx={8} fill={STEEL} />
          ))}
        </g>
        {/* knife */}
        <g>
          <rect x={-24} y={-246} width={48} height={246} rx={24} fill={hd} />
          <rect x={-24} y={-200} width={48} height={8} rx={4} fill={hdDk} />
          <rect x={-30} y={-266} width={60} height={24} rx={8} fill={STEEL} />
          <path d="M -26 -268 L -26 -424 Q -26 -432 -18 -430 Q 36 -380 34 -268 Z" fill={STEEL} />
          <path d="M 14 -262 Q 30 -350 28 -398 Q 38 -340 34 -268 Z" fill={shade(STEEL, 0.2)} />
        </g>
        {/* spoon */}
        <g transform="translate(125 0) rotate(3)">
          <rect x={-20} y={-246} width={40} height={246} rx={20} fill={hd} />
          <rect x={-20} y={-200} width={40} height={8} rx={4} fill={hdDk} />
          <rect x={-10} y={-300} width={20} height={70} fill={STEEL} />
          <ellipse cx={0} cy={-368} rx={56} ry={70} fill={STEEL} />
          <ellipse cx={0} cy={-362} rx={42} ry={54} fill={shade(STEEL, 0.15)} />
        </g>
      </g>
    </g>
  );
}
