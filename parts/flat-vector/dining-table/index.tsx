import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Dining table: rectangular wooden table, front view. Top slab with a front edge band, two visible legs
// and two more in shade behind them. Origin = bottom centre.
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
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  const leg = shade(c, 0.12);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={380} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* back legs, in shade */}
        <rect x={-330} y={-520} width={34} height={520} rx={10} fill={dk} />
        <rect x={296} y={-520} width={34} height={520} rx={10} fill={dk} />
        {/* front legs */}
        <rect x={-300} y={-420} width={44} height={420} rx={12} fill={leg} />
        <rect x={256} y={-420} width={44} height={420} rx={12} fill={leg} />
        {/* apron under the top */}
        <rect x={-270} y={-470} width={540} height={60} rx={8} fill={dk} />
        {/* table top: slab with a front edge band */}
        <rect x={-400} y={-560} width={800} height={96} rx={18} fill={c} />
        <rect x={-400} y={-480} width={800} height={16} rx={8} fill={dk} />
        <rect x={-380} y={-556} width={760} height={14} rx={7} fill="#FFFFFF" opacity={0.12} />
      </g>
    </g>
  );
}
