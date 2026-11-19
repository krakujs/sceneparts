import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector pancakes: a stack of four golden pancakes on a plate, a butter pat on top and syrup dripping down.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~420 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Pancakes(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const batter = "#E9A94E", side = shade(batter, 0.22), syrup = "#B8641E";
  const RX = 175, RY = 52, TH = 30; // pancake radii and side thickness
  const PLATE_Y = -26;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // pancake i: its bottom edge centre at yb
  const cake = (yb: number, i: number) => {
    const yt = yb - TH;
    return (
      <g key={i}>
        <path d={`M ${-RX} ${f1(yb)} L ${-RX} ${f1(yt)} A ${RX} ${RY} 0 0 0 ${RX} ${f1(yt)} L ${RX} ${f1(yb)} A ${RX} ${RY} 0 0 1 ${-RX} ${f1(yb)} Z`} fill={side} />
        <ellipse cx={0} cy={f1(yt)} rx={RX} ry={RY} fill={batter} />
        <ellipse cx={-30} cy={f1(yt - 12)} rx={90} ry={18} fill="#FFFFFF" opacity={0.2} />
        <ellipse cx={0} cy={f1(yt)} rx={RX - 28} ry={RY - 12} fill="none" stroke={shade(batter, 0.1)} strokeWidth={3} opacity={0.5} />
      </g>
    );
  };
  const tops = [0, 1, 2, 3].map((i) => PLATE_Y - 8 - i * 36);
  const layers = [0, 1, 2, 3].map((i) => cake(PLATE_Y - 8 - i * 36, i));
  const topY = tops[3] - TH; // top surface of the highest pancake

  // syrup: coats the top and drips down the sides of the stack
  const drips = [-130, -70, -10, 60, 120];
  const dripLen = [60, 110, 40, 130, 70];
  const syrupEls = (
    <g>
      <ellipse cx={0} cy={topY + 4} rx={RX - 8} ry={RY - 8} fill={syrup} opacity={0.85} />
      <path d={`M ${-RX + 8} ${topY + 2} Q ${-RX + 20} ${topY + 40} ${-RX + 30} ${topY + 62} L ${RX - 30} ${topY + 62} Q ${RX - 20} ${topY + 40} ${RX - 8} ${topY + 2} Z`} fill={syrup} opacity={0} />
      {drips.map((dx, i) => {
        const edgeY = topY + 4 + Math.sqrt(Math.max(0, 1 - (dx / RX) ** 2)) * (RY - 8);
        return (
          <g key={i}>
            <rect x={dx - 9} y={f1(edgeY - 6)} width={18} height={dripLen[i]} rx={9} fill={syrup} />
            <ellipse cx={dx} cy={f1(edgeY - 6 + dripLen[i])} rx={9} ry={10} fill={syrup} />
          </g>
        );
      })}
      <path d={`M ${-RX + 30} ${topY - 8} Q ${-RX * 0.4} ${topY - 26} ${-30} ${topY - 22}`} stroke="#E0883A" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.7} />
    </g>
  );

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={270} ry={26} fill={C.shadow} />
      <g transform={tr}>
        {/* plate */}
        <ellipse cx={0} cy={PLATE_Y + 6} rx={260} ry={54} fill={shade(C.white, 0.14)} />
        <ellipse cx={0} cy={PLATE_Y} rx={260} ry={54} fill={C.white} />
        <ellipse cx={0} cy={PLATE_Y} rx={200} ry={38} fill={shade(C.white, 0.05)} />
        {layers}
        {syrupEls}
        {/* butter pat */}
        <g transform={`translate(0 ${f1(topY - 26)})`}>
          <path d="M -36 0 L 0 -14 L 40 0 L 4 14 Z" fill="#FFE07A" />
          <path d="M -36 0 L 4 14 L 4 30 L -36 16 Z" fill="#E8B83A" />
          <path d="M 4 14 L 40 0 L 40 16 L 4 30 Z" fill="#F5CC55" />
        </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Pancakes {...p} />;
}
