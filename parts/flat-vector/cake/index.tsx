import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector round layer cake on a stand: sponge layers, cream frosting with drips, berries on top.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~480 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Cake(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const frost = p.frosting ?? "#FFF6EC";
  const sponge = "#F5D08A";
  const ry = 34; // ellipse half-height for top and bottom edges
  const R1 = 210, R2 = 168; // bottom and top tier radii
  const standTop = -36, L1Top = -120, L2Top = -236;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // cylinder with elliptical top and bottom
  const tier = (R: number, yTop: number, yBot: number, body: string, top: string) => (
    <g>
      <path d={`M ${-R} ${yBot} L ${-R} ${yTop} A ${R} ${ry} 0 0 0 ${R} ${yTop} L ${R} ${yBot} A ${R} ${ry} 0 0 1 ${-R} ${yBot} Z`} fill={body} />
      <ellipse cx={0} cy={yTop} rx={R} ry={ry} fill={top} />
    </g>
  );
  // frosting drips hanging over the top tier's edge
  const drips = [-150, -100, -40, 20, 80, 140];
  const dripLen = [40, 60, 28, 70, 46, 30];

  // berries on the top, deterministic positions
  const berries = [[-70, -20], [-20, -40], [40, -24], [85, -6], [-100, -4], [10, -10]];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={22} fill={C.shadow} />
      <g transform={tr}>
        {/* stand */}
        <ellipse cx={0} cy={standTop} rx={240} ry={36} fill={shade(C.greyLight, 0.12)} />
        <path d={`M -240 ${standTop} L -240 ${standTop + 0} A 240 36 0 0 0 240 ${standTop} L 240 ${standTop} L 240 ${standTop} L 240 ${standTop} Z`} fill="none" />
        <path d={`M -240 ${standTop - 2} A 240 36 0 0 0 240 ${standTop - 2} L 240 ${standTop - 10} A 240 36 0 0 1 -240 ${standTop - 10} Z`} fill={C.greyLight} />
        <path d={`M -60 ${standTop + 2} L -40 0 L 40 0 L 60 ${standTop + 2} Z`} fill={shade(C.greyLight, 0.25)} />
        {/* bottom tier */}
        {tier(R1, L1Top, standTop, sponge, frost)}
        <path d={`M ${-R1} ${L1Top + 14} A ${R1} ${ry} 0 0 0 ${R1} ${L1Top + 14} L ${R1} ${L1Top} A ${R1} ${ry} 0 0 1 ${-R1} ${L1Top} Z`} fill={frost} opacity={0} />
        <path d={`M ${-R1} ${L1Top + 2} Q ${-R1} ${L1Top - 4} ${-R1 + 6} ${L1Top - 2}`} fill="none" />
        {/* top tier */}
        {tier(R2, L2Top, L1Top, sponge, frost)}
        {/* frosting band between layers */}
        <path d={`M ${-R1 + 2} ${L1Top} A ${R1 - 2} ${ry} 0 0 0 ${R1 - 2} ${L1Top} L ${R1 - 2} ${L1Top - 22} A ${R1 - 2} ${ry} 0 0 1 ${-R1 + 2} ${L1Top - 22} Z`} fill={frost} />
        <ellipse cx={0} cy={L1Top - 22} rx={R1 - 2} ry={ry} fill={shade(frost, 0.04)} opacity={0} />
        {/* frosting drips down the top tier's side */}
        {drips.map((dx, i) => (
          <g key={i}>
            <rect x={dx - 13} y={L2Top + 4} width={26} height={dripLen[i]} rx={13} fill={frost} />
            <ellipse cx={dx} cy={L2Top + 4 + dripLen[i]} rx={13} ry={12} fill={frost} />
          </g>
        ))}
        {/* sponge crumb showing through the frosting band */}
        <path d={`M ${-R2 + 12} ${L2Top + 8} Q ${-R2 + 16} ${L2Top - 20} ${-R2 * 0.4} ${L2Top - 26}`} stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" fill="none" opacity={0.6} />
        {/* berries */}
        {berries.map(([bx, by], i) => (
          <g key={i} transform={`translate(${bx} ${f1(L2Top + by)})`}>
            <circle cx={0} cy={0} r={i % 2 ? 26 : 30} fill={i % 3 === 0 ? "#E8503F" : i % 3 === 1 ? "#B3247F" : "#E8503F"} />
            <circle cx={-8} cy={-9} r={6} fill="#FFFFFF" opacity={0.5} />
            <path d="M 0 -26 l -8 -4 l 8 -2 l 8 2 Z" fill="#4BB46A" />
          </g>
        ))}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Cake {...p} />;
}
