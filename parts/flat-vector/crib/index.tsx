import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Crib (baby cot), front view: a rectangular frame with vertical bars along the sides, a mattress and a small
// blanket. Origin = bottom centre.
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
  const frame = p.color && p.color !== "none" ? p.color : "#F5E6CC";
  const blanket = p.color2 && p.color2 !== "none" ? p.color2 : "#9ED8D2";
  const dk = shade(frame, 0.2);
  const bars = Array.from({ length: 9 }, (_, i) => -320 + i * 80); // bar x positions
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={360} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* feet */}
        <rect x={-330} y={-50} width={36} height={50} rx={10} fill={dk} />
        <rect x={294} y={-50} width={36} height={50} rx={10} fill={dk} />
        {/* back panel (solid, behind the bars) */}
        <rect x={-360} y={-600} width={720} height={480} rx={24} fill={dk} />
        {/* mattress with a little blanket */}
        <rect x={-300} y={-230} width={600} height={60} rx={20} fill="#FFFFFF" />
        <path d="M -300 -230 L 300 -230 L 300 -170 L 40 -170 L 40 -290 L -300 -290 Z" fill="none" />
        <rect x={-300} y={-300} width={600} height={70} rx={22} fill={blanket} />
        <rect x={-300} y={-300} width={600} height={16} rx={8} fill="#FFFFFF" opacity={0.25} />
        {/* base rail */}
        <rect x={-360} y={-180} width={720} height={40} rx={14} fill={frame} />
        {/* vertical bars on the front and sides */}
        {bars.map((bx) => (
          <rect key={bx} x={bx - 13} y={-600} width={26} height={420} rx={13} fill={frame} />
        ))}
        {/* top rail */}
        <rect x={-380} y={-640} width={760} height={50} rx={22} fill={frame} />
        {/* side posts, slightly taller */}
        <rect x={-380} y={-660} width={36} height={520} rx={16} fill={dk} />
        <rect x={344} y={-660} width={36} height={520} rx={16} fill={dk} />
      </g>
    </g>
  );
}
