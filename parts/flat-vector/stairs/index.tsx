import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stairs: a flight of wooden steps rising to the right, a solid stringer below them, and a banister with
// posts along the top. Origin = bottom of the first step, at the left-bottom corner of the run.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  const N = 6, SW = 150, SH = 120; // steps, step width, step rise
  const L = -450; // left edge of the run
  const steps: React.ReactNode[] = [];
  for (let i = 0; i < N; i++) {
    const sx = L + i * SW, topH = (i + 1) * SH;
    // tread (top) and riser (front face) of each step
    steps.push(
      <g key={i}>
        <rect x={sx} y={-topH} width={SW + 4} height={topH} rx={6} fill={c} />
        <rect x={sx} y={-topH} width={SW + 4} height={18} rx={6} fill={shade(c, -0.1)} />
        <rect x={sx + SW - 10} y={-topH} width={10} height={topH} fill={dk} opacity={0.5} />
      </g>,
    );
  }
  const topY = -N * SH;
  const rightX = L + N * SW;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={520} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* stringer under the steps */}
        <path d={`M ${L} 0 L ${rightX} ${topY} L ${rightX} 0 Z`} fill={dk} />
        {steps}
        {/* banister: rail along the top of the steps, then posts */}
        {Array.from({ length: N }, (_, i) => {
          const px = L + i * SW + 14;
          const py = -(i + 1) * SH - 430;
          return <rect key={i} x={px} y={py} width={18} height={430} rx={8} fill={dk} />;
        })}
        <path d={`M ${L + 20} ${-SH - 430} L ${rightX - 20} ${topY - 430}`} stroke={c} strokeWidth={26} strokeLinecap="round" fill="none" />
        {/* newel post at the bottom */}
        <rect x={L - 20} y={-SH - 470} width={46} height={470} rx={12} fill={c} />
      </g>
    </g>
  );
}
