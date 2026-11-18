import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Biconvex glass lens in a small holder on a stand, with parallel rays converging to a focus point on the right.
// Origin = bottom centre (the stand rests on y). About 900 px wide and 600 px tall at s = 1.
// anim "rays": light flows along the rays towards the focus and the focus glows.
const f1 = (v: number) => v.toFixed(1);
const TOP = -560, LH = 360, BULGE = 74, FX = 330, FY = -380;
const T = (u: number) => BULGE * Math.sin(Math.PI * u);
const RAY_Y = [-140, -70, 0, 70, 140];

// Outline of the biconvex lens, built from the same profile used for the rays.
const LENS = (() => {
  let d = "";
  for (let i = 0; i <= 24; i++) { const u = i / 24; d += `${i ? "L" : "M"} ${f1(T(u))} ${f1(TOP + u * LH)} `; }
  for (let i = 24; i >= 0; i--) { const u = i / 24; d += `L ${f1(-T(u))} ${f1(TOP + u * LH)} `; }
  return d + "Z";
})();
const LENS_SHADE = (() => {
  let d = `M 0 ${TOP} `;
  for (let i = 0; i <= 24; i++) { const u = i / 24; d += `L ${f1(T(u))} ${f1(TOP + u * LH)} `; }
  return d + `L 0 ${TOP + LH} Z`;
})();

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const glass = p.color && p.color !== "none" ? p.color : "#A9DCF2";
  const holder = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const flow = anim === "rays" ? -(f * 3) : 0;
  const dash = anim === "rays" ? { strokeDasharray: "26 18", strokeDashoffset: f1(flow) } : {};
  const glow = anim === "rays" ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 40) : 0.6;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      {/* stand */}
      <rect x={-180} y={-44} width={360} height={44} rx={20} fill={shade(holder, 0.2)} />
      <rect x={-14} y={-210} width={28} height={170} fill={shade(holder, 0.1)} />
      {/* holder: four bars around the lens */}
      <rect x={-130} y={-600} width={30} height={402} rx={15} fill={holder} />
      <rect x={100} y={-600} width={30} height={402} rx={15} fill={holder} />
      <rect x={-130} y={-600} width={260} height={26} rx={13} fill={shade(holder, 0.1)} />
      <rect x={-130} y={-226} width={260} height={26} rx={13} fill={shade(holder, 0.1)} />
      {/* rays: incoming from the left, bent towards the focus */}
      {RAY_Y.map((d, i) => {
        const yh = FY + d;
        const u = (yh - TOP) / LH;
        return (
          <g key={i} stroke={C.orange} strokeWidth={12} strokeLinecap="round" fill="none" {...dash}>
            <line x1={-520} y1={yh} x2={f1(-T(u))} y2={yh} />
            <line x1={f1(T(u))} y1={yh} x2={FX} y2={FY} />
          </g>
        );
      })}
      {/* lens */}
      <path d={LENS} fill={glass} />
      <path d={LENS_SHADE} fill={shade(glass, 0.14)} />
      <path d="M -40 -520 Q -48 -460 -40 -400" stroke={C.white} strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.6} />
      {/* focus point */}
      <circle cx={FX} cy={FY} r={62} fill={C.yellow} opacity={0.25 * glow} />
      <circle cx={FX} cy={FY} r={30} fill={C.yellow} />
      <circle cx={FX} cy={FY} r={12} fill={C.white} opacity={0.8} />
    </g>
  );
}
