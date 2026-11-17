import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Balloon whisk: steel wire loops in a rounded balloon shape on a short handle.
// Origin = bottom of the handle (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const WIRE = "#9AA3B5";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={70} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* handle and collar */}
        <rect x={-18} y={-132} width={36} height={132} rx={18} fill={c} />
        <rect x={-30} y={-146} width={60} height={20} rx={9} fill={shade(c, 0.2)} />
        {/* balloon wire loops, all meeting at the top and bottom */}
        {[22, 46, 70, 92].map((rx, i) => (
          <ellipse key={i} cx={0} cy={-284} rx={rx} ry={140} fill="none" stroke={WIRE} strokeWidth={9} />
        ))}
      </g>
    </g>
  );
}
