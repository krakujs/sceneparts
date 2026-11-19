import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Knife set: wooden knife block with five knife handles sticking out of the top.
// Origin = bottom centre (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const HANDLES = [C.inkSoft, C.red, C.blue, C.teal, C.yellow];
const XS = [-100, -50, 0, 50, 100];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : "#B9824F";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* block body */}
        <rect x={-150} y={-250} width={300} height={250} rx={22} fill={c} />
        <rect x={116} y={-236} width={34} height={222} rx={12} fill={shade(c, 0.18)} />
        <rect x={-170} y={-10} width={340} height={10} rx={5} fill={shade(c, 0.25)} />
        {/* top face */}
        <rect x={-156} y={-276} width={312} height={34} rx={14} fill={shade(c, -0.12)} />
        {/* knives: handle, then bolster */}
        {XS.map((xx, i) => (
          <g key={i}>
            <rect x={xx - 18} y={-340} width={36} height={90} rx={18} fill={HANDLES[i]} />
            <rect x={xx - 11} y={-330} width={6} height={44} rx={3} fill="#FFFFFF" opacity={0.25} />
            <rect x={xx - 24} y={-284} width={48} height={16} rx={6} fill={C.greyLight} />
          </g>
        ))}
      </g>
    </g>
  );
}
