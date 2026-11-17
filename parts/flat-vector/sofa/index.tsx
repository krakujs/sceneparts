import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sofa: three-seat sofa, rounded arms, back cushions behind two seat cushions, short legs.
// Origin = bottom centre (floor level). Faces the viewer.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  const dk = shade(c, 0.2);
  const legC = C.brownDark;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={440} ry={18} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* legs */}
        <rect x={-400} y={-44} width={26} height={44} rx={8} fill={legC} />
        <rect x={374} y={-44} width={26} height={44} rx={8} fill={legC} />
        {/* back */}
        <rect x={-430} y={-400} width={860} height={300} rx={60} fill={c} />
        {/* back cushions (slightly shaded, behind seat) */}
        <rect x={-300} y={-330} width={280} height={170} rx={40} fill={shade(c, 0.08)} />
        <rect x={20} y={-330} width={280} height={170} rx={40} fill={shade(c, 0.08)} />
        {/* arms */}
        <rect x={-450} y={-300} width={160} height={250} rx={70} fill={c} />
        <rect x={290} y={-300} width={160} height={250} rx={70} fill={c} />
        <rect x={-450 + 110} y={-300} width={50} height={250} rx={20} fill={dk} opacity={0.5} />
        <rect x={290 + 0} y={-300} width={50} height={250} rx={20} fill={dk} opacity={0.5} />
        {/* seat base */}
        <rect x={-300} y={-200} width={600} height={130} rx={24} fill={dk} />
        {/* two seat cushions */}
        <rect x={-296} y={-196} width={288} height={126} rx={36} fill={c} />
        <rect x={8} y={-196} width={288} height={126} rx={36} fill={c} />
        <rect x={-296} y={-196} width={288} height={20} rx={10} fill="#FFFFFF" opacity={0.08} />
        <rect x={8} y={-196} width={288} height={20} rx={10} fill="#FFFFFF" opacity={0.08} />
        {/* front lip */}
        <rect x={-310} y={-86} width={620} height={26} rx={10} fill={dk} />
      </g>
    </g>
  );
}
