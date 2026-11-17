import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Shampoo bottle with a pump head and a plain white label band (no text). Origin = bottom centre; hero size.
// anim "pump" presses the pump head down and back up.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.purple;
  const press = p.anim === "pump" ? 14 * (1 - Math.cos((f * 2 * Math.PI) / 50)) / 2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={120} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* bottle body with a darker right side and a highlight */}
        <rect x={-110} y={-380} width={220} height={380} rx={60} fill={c} />
        <path d="M 50 -380 Q 110 -380 110 -300 L 110 -80 Q 110 0 50 0 Z" fill={shade(c, 0.2)} />
        <rect x={-86} y={-350} width={16} height={150} rx={8} fill={C.white} opacity={0.3} />
        {/* plain label band */}
        <rect x={-110} y={-250} width={220} height={110} fill={C.white} />
        <rect x={-110} y={-250} width={220} height={8} fill={shade(C.white, 0.1)} />
        {/* collar and pump head, which presses down */}
        <rect x={-36} y={-410} width={72} height={36} rx={10} fill={C.greyDark} />
        <g transform={`translate(0 ${f1(press)})`}>
          <rect x={-12} y={-452} width={24} height={46} rx={6} fill={C.greyDark} />
          <rect x={-48} y={-482} width={96} height={34} rx={14} fill={C.grey} />
          <rect x={30} y={-474} width={92} height={20} rx={10} fill={C.greyDark} />
        </g>
      </g>
    </g>
  );
}
