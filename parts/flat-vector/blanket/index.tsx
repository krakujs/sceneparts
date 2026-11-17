import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Blanket: a neatly folded checked blanket, two stacked folds with a plaid pattern and a darker fold edge.
// Origin = bottom centre; faces the viewer, honours flip, s and anim.
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
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const dk = shade(c, 0.2);
  // plaid bars on the top fold (x positions and y positions inside the fold)
  const bars = [-150, -60, 30, 120];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* bottom fold */}
        <rect x={-210} y={-96} width={420} height={96} rx={26} fill={dk} />
        {/* top fold, slightly offset */}
        <rect x={-190} y={-200} width={380} height={112} rx={26} fill={c} />
        {/* plaid on the top fold */}
        {bars.map((bx) => (
          <rect key={`v${bx}`} x={bx} y={-196} width={26} height={104} fill={c2} opacity={0.75} />
        ))}
        {[-188, -150].map((by) => (
          <rect key={`h${by}`} x={-186} y={by} width={372} height={20} fill={c2} opacity={0.55} />
        ))}
        {/* fold edge highlight on the lower fold */}
        <rect x={-210} y={-96} width={420} height={18} rx={9} fill={c} opacity={0.35} />
        {/* small corner tassel */}
        <rect x={150} y={-14} width={10} height={24} rx={5} fill={c2} />
        <rect x={-160} y={-14} width={10} height={24} rx={5} fill={c2} />
      </g>
    </g>
  );
}
