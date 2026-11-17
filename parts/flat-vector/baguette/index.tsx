import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector baguette: long thick golden loaf with rounded tapered ends, lying at a slight diagonal,
// six pale diagonal slashes on top and a darker golden shade along the lower half.
// Origin = resting point (bottom centre), honours flip and s. ~520 px long, ~95 px thick at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Baguette(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const crust = p.color ?? "#F0B046";
  const L = 520, T = 95, H = T / 2;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // rounded, tapered ends; the body is a little fuller in the middle
  const body = `M ${-L / 2} 0 C ${-L / 2} ${-H * 0.8} ${-L / 2 + 50} ${-H} ${-L / 2 + 120} ${-H} C ${-120} ${-H * 1.02} ${120} ${-H * 1.02} ${L / 2 - 120} ${-H} C ${L / 2 - 50} ${-H} ${L / 2} ${-H * 0.8} ${L / 2} 0 C ${L / 2} ${H * 0.8} ${L / 2 - 50} ${H} ${L / 2 - 120} ${H} C 120 ${H * 1.02} -120 ${H * 1.02} ${-L / 2 + 120} ${H} C ${-L / 2 + 50} ${H} ${-L / 2} ${H * 0.8} ${-L / 2} 0 Z`;
  // darker lower half: the underside band
  const lower = `M ${-L / 2 + 40} 2 L ${L / 2 - 40} 2 C ${L / 2 - 60} ${H * 0.8} ${L / 2 - 170} ${H} ${L / 2 - 120} ${H} C 120 ${H * 1.02} -120 ${H * 1.02} ${-L / 2 + 120} ${H} C ${-L / 2 + 170} ${H} ${-L / 2 + 60} ${H * 0.8} ${-L / 2 + 40} 2 Z`;
  const slashX = [-215, -130, -45, 40, 125, 210];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={L * 0.5} ry={16} fill={C.shadow} />
      <g transform={`translate(0 -${f1(H + 6)}) rotate(-6) ${tr}`}>
        <path d={body} fill={crust} />
        <path d={lower} fill={shade(crust, 0.22)} />
        {slashX.map((sx, i) => (
          <g key={i} transform={`translate(${sx} ${f1(-H * 0.2 + (i % 2 ? 4 : -4))}) rotate(-34)`}>
            <path d="M -30 -8 Q 0 -12 30 -7 Q 0 -4 -30 -8 Z" fill="#FFF1D0" />
            <path d="M -28 -6 Q 0 -10 28 -6 L 28 -1 Q 0 -4 -28 -1 Z" fill="#FFF8E4" opacity={0.9} />
          </g>
        ))}
        <path d={`M ${-L / 2 + 60} ${f1(-H * 0.45)} Q 0 ${f1(-H * 0.8)} ${L / 2 - 80} ${f1(-H * 0.5)}`} stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.4} />
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Baguette {...p} />;
}
