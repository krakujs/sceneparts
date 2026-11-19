import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector lollipop: a big round swirl candy on a white stick, standing on its end.
// Origin = resting point (bottom centre of the stick), honours flip and s. Hero size ~330 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Lollipop(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const col = p.color ?? "#F27BA6";
  const col2 = p.color2 ?? "#FFFFFF";
  const CY = -400, R = 160;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // Archimedean spiral from the centre to the rim, three turns, drawn as one thick stroke
  const turns = 3, N = 240;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * turns * 2 * Math.PI;
    const r = 14 + (i / N) * (R - 26);
    pts.push(`${f1(r * Math.cos(t))} ${f1(CY + r * Math.sin(t))}`);
  }
  const spiral = `M ${pts.join(" L ")}`;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={110} ry={16} fill={C.shadow} />
      <g transform={tr}>
        {/* stick, rounded at the bottom */}
        <path d={`M -15 ${CY + R - 40} L 15 ${CY + R - 40} L 15 -10 Q 15 0 0 0 Q -15 0 -15 -10 Z`} fill={col2} />
        <path d={`M 5 ${CY + R - 40} L 15 ${CY + R - 40} L 15 -10 Q 15 0 0 0 Q 5 0 5 -10 Z`} fill={shade(col2, 0.14)} />
        {/* candy disc with its swirl */}
        <defs>
          <clipPath id="lollipop-disc"><circle cx={0} cy={CY} r={R} /></clipPath>
        </defs>
        <circle cx={0} cy={CY} r={R} fill={col2} />
        <g clipPath="url(#lollipop-disc)">
          <path d={spiral} fill="none" stroke={col} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <circle cx={0} cy={CY} r={R} fill="none" stroke={shade(col, 0.1)} strokeWidth={0} />
        <path d={`M -110 ${CY - 60} Q -100 ${CY - 120} -40 ${CY - 140}`} stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" fill="none" opacity={0.5} />
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Lollipop {...p} />;
}
