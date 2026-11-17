import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Dish } from "../dish/index";

// Flat vector samosa: two golden triangular pastries with a pastry texture, beside a small bowl of green chutney.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 420 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Samosa(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const pastryC = p.pastryColor ?? "#E3A03A";
  const chutneyC = p.chutneyColor ?? "#5FA84A";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // one samosa: triangle, base at y=0, apex at (0,-230), rounded corners
  const samosa = (dx: number, dy: number, rot: number, k: number) => {
    const W = 150, H = 220;
    const d = `M ${-W} 0 Q ${-W - 4} -8 ${-W + 14} -10 L -18 ${-H + 26} Q 0 ${-H - 10} 18 ${-H + 26} L ${W - 14} -10 Q ${W + 4} -8 ${W} 0 Q 0 10 ${-W} 0 Z`;
    const dots = [[-70, -40], [-30, -70], [40, -50], [70, -20], [0, -110], [-50, -120], [30, -130], [0, -40]];
    return (
      <g transform={`translate(${f1(dx)} ${f1(dy)}) rotate(${f1(rot)})`}>
        <path d={d} fill={pastryC} />
        <path d={`M ${-W + 14} -10 L 0 ${-H + 10} L 0 -16 Z`} fill={shade(pastryC, 0.16)} />
        <path d={`M ${W - 14} -10 L 0 ${-H + 10} L 0 -16 Z`} fill={shade(pastryC, 0.06)} opacity={0.5} />
        {/* pastry crimp lines along the edges */}
        <path d={`M ${-W + 22} -14 Q ${-W / 2} -30 0 ${-H + 60}`} stroke={shade(pastryC, 0.25)} strokeWidth={4} fill="none" opacity={0.6} />
        {dots.map(([qx, qy], i) => <circle key={i} cx={qx + k * 4} cy={qy} r={5} fill={shade(pastryC, 0.3)} opacity={0.55} />)}
        <path d={`M -90 -60 Q -60 -90 -30 -110`} stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.3} />
      </g>
    );
  };

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={16} fill={C.shadow} />
      <g transform={tr}>
        <Dish x={190} y={-2} vessel="bowl" w={190} fill="liquid" fillColor={chutneyC} fillColor2="#4E8C3A" />
        {samosa(-60, 0, -8, 0)}
        {samosa(60, -4, 10, 1)}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Samosa {...p} />;
}
