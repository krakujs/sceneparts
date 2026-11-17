import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector bread loaf: side-view loaf, wide body with a domed darker crust that overhangs the pale sides,
// three diagonal pale scoring slashes. Origin = resting point (bottom centre), honours flip and s. ~420 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Loaf(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const crust = p.color ?? "#F0B046";
  const crumb = p.crumb ?? "#FFF1D0";
  const dark = shade(crust, 0.22);

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={18} fill={C.shadow} />
      <g transform={tr}>
        {/* pale sides of the loaf */}
        <rect x={-200} y={-190} width={400} height={190} rx={34} fill={shade(crumb, 0.06)} />
        <rect x={-200} y={-150} width={400} height={150} rx={30} fill={crumb} />
        {/* domed crust, overhanging the sides, darker */}
        <path d="M -226 -132 C -240 -236 -150 -262 0 -262 C 150 -262 240 -236 226 -132 Q 0 -112 -226 -132 Z" fill={crust} />
        <path d="M -226 -132 C -240 -236 -150 -262 0 -262 C 150 -262 240 -236 226 -132 Q 200 -150 0 -150 Q -200 -150 -226 -132 Z" fill={dark} opacity={0.55} />
        <path d="M -190 -170 C -170 -220 -110 -240 -60 -244" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.4} />
        {/* three diagonal scoring slashes */}
        {[-100, 0, 100].map((cx, i) => (
          <g key={i} transform={`translate(${cx} -200) rotate(-24)`}>
            <path d="M -15 -26 L 15 -26 Q 22 0 15 26 L -15 26 Q -22 0 -15 -26 Z" fill="#FFF3D8" opacity={0.95} />
            <path d="M -4 -20 L 4 -20 L 6 20 L -6 20 Z" fill={shade(crust, 0.08)} opacity={0.35} />
          </g>
        ))}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Loaf {...p} />;
}
