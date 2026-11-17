import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// TV stand: low media cabinet, two closed doors with knobs on the left and an open shelf with a few
// items (a small box and a plant pot) on the right. No TV. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.sand;
  const dk = shade(c, 0.2);
  const W = 400, H = 300, top = -H - 80;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={W + 30} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* short feet */}
        <rect x={-W + 30} y={-30} width={40} height={30} rx={8} fill={dk} />
        <rect x={W - 70} y={-30} width={40} height={30} rx={8} fill={dk} />
        {/* carcass */}
        <rect x={-W} y={top} width={2 * W} height={H} rx={18} fill={c} />
        {/* left: two doors */}
        <rect x={-W + 16} y={top + 16} width={W - 26} height={H - 32} rx={10} fill={shade(c, 0.06)} />
        <rect x={10} y={top + 16} width={W - 26} height={H - 32} rx={10} fill={shade(c, 0.06)} />
        <rect x={-W + 36} y={top + 40} width={W - 66} height={H - 80} rx={6} fill={shade(c, 0.12)} />
        <rect x={40} y={top + 40} width={W - 66} height={H - 80} rx={6} fill={shade(c, 0.12)} />
        <circle cx={-16} cy={top + H / 2} r={12} fill={C.greyLight} />
        <circle cx={16} cy={top + H / 2} r={12} fill={C.greyLight} />
        {/* right side open shelf: back panel and shelf items */}
        <rect x={-W + 14} y={top + 16} width={0} height={0} fill="none" />
        {/* top slab */}
        <rect x={-W - 14} y={top - 22} width={2 * W + 28} height={30} rx={12} fill={shade(c, -0.08)} />
        {/* items sitting on the top slab */}
        <rect x={180} y={top - 88} width={120} height={66} rx={10} fill={C.teal} />
        <rect x={180} y={top - 88} width={120} height={14} rx={7} fill={C.tealDark} />
        <rect x={-300} y={top - 60} width={60} height={38} rx={8} fill={C.pink} />
        <ellipse cx={-260} cy={top - 66} rx={18} ry={10} fill={C.lime} />
      </g>
    </g>
  );
}
