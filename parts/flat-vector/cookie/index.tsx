import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cookie: round golden cookie with chocolate chips and an optional bite taken out of the edge.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~380 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Cookie(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const dough = p.color ?? "#E9A94E";
  const chip = "#5E3B26";
  const bite = !!p.bite;
  const RX = 180, RY = 112, TH = 46, CY = -TH - RY; // disc: top face ellipse centre CY, thickness TH
  const circ = (cx: number, cy: number, r: number) => `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;
  const bites = bite ? [circ(150, CY - 56, 46), circ(176, CY + 26, 30)] : [];
  // clip: the cookie face ellipse with the bite circles removed (evenodd)
  const faceD = `M ${-RX} ${CY} A ${RX} ${RY} 0 1 0 ${RX} ${CY} A ${RX} ${RY} 0 1 0 ${-RX} ${CY} Z`;
  const sideD = `M ${-RX} ${CY} L ${-RX} ${CY + TH} A ${RX} ${RY} 0 0 0 ${RX} ${CY + TH} L ${RX} ${CY} A ${RX} ${RY} 0 0 1 ${-RX} ${CY} Z`;
  const clipD = [faceD, ...bites].join(" ");

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // chocolate chips, deterministic, kept away from the bite
  const chips: [number, number, number][] = [[-100, -30, 0], [-40, -62, 1], [30, -20, 2], [-120, -120, 3], [-10, -150, 0], [80, -75, 1], [-70, -190, 2], [60, -170, 3], [-150, -180, 1]];
  const chipEls = chips.map(([cx, cy, k], i) => {
    const yy = CY + cy * 0.45;
    return (
      <g key={i} transform={`translate(${cx} ${f1(yy)}) rotate(${k * 30 - 20})`}>
        <path d="M -16 -6 Q -4 -12 10 -8 Q 18 -2 14 6 Q 2 12 -12 8 Q -20 2 -16 -6 Z" fill={chip} />
        <ellipse cx={-4} cy={-4} rx={4} ry={2} fill="#FFFFFF" opacity={0.25} />
      </g>
    );
  });

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={RX + 16} ry={18} fill={C.shadow} />
      <g transform={tr}>
        <path d={sideD} fill={shade(dough, 0.3)} />
        <defs><clipPath id="cookie-face" clipRule="evenodd"><path d={clipD} clipRule="evenodd" /></clipPath></defs>
        <g clipPath="url(#cookie-face)">
          <ellipse cx={0} cy={CY} rx={RX} ry={RY} fill={dough} />
          <ellipse cx={-10} cy={CY - 10} rx={RX * 0.84} ry={RY * 0.8} fill={shade(dough, 0.06)} opacity={0.5} />
          {chipEls}
          <path d={`M ${-RX * 0.7} ${CY - 40} Q ${-RX * 0.5} ${CY - RY * 0.7} ${-RX * 0.1} ${CY - RY * 0.72}`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.35} />
        </g>
        {bite && (
          <path d={`M 118 ${CY - 26} Q 130 ${CY - 40} 150 ${CY - 56}`} stroke={shade(dough, 0.3)} strokeWidth={4} fill="none" opacity={0} />
        )}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Cookie {...p} />;
}
