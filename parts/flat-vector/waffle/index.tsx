import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector waffle: golden square (or round) waffle with grid pockets, a butter pat and syrup running down.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~400 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Waffle(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const shape: string = p.shape ?? "square";
  const batter = p.color ?? "#E9B65A";
  const pocket = shade(batter, 0.3);
  const syrup = "#B8641E";
  const T = 104; // slab thickness

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // top face: oblique parallelogram; P(u, v) maps unit square to it
  const P = (u: number, v: number): [number, number] => [-190 + 380 * u + 40 * v, -T - 70 * v];
  const pts = (q: [number, number][]) => q.map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L ");
  const pockets: React.ReactNode[] = [];
  const N = 5, inset = 0.1;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const u0 = (i + inset) / N, u1 = (i + 1 - inset) / N, v0 = (j + inset) / N, v1 = (j + 1 - inset) / N;
    const q: [number, number][] = [P(u0, v0), P(u1, v0), P(u1, v1), P(u0, v1)];
    pockets.push(<path key={`${i}-${j}`} d={`M ${pts(q)} Z`} fill={pocket} stroke={shade(batter, 0.45)} strokeWidth={2} strokeLinejoin="round" />);
  }
  const topD = `M ${pts([P(0, 0), P(1, 0), P(1, 1), P(0, 1)])} Z`;
  const clipTop = shape === "round"
    ? <clipPath id="waffle-top"><ellipse cx={0} cy={f1(-T - 35)} rx={190} ry={95} /></clipPath>
    : <clipPath id="waffle-top"><path d={topD} /></clipPath>;
  const front = `M -190 ${-T} L 190 ${-T} L 190 0 L -190 0 Z`;
  const sideR = `M 190 ${-T} L 230 ${-T - 70} L 230 -70 L 190 0 Z`;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={22} fill={C.shadow} />
      <g transform={tr}>
        {shape === "round" ? (
          <g>
            <path d={`M -190 ${-T} L -190 0 A 190 40 0 0 0 190 0 L 190 ${-T} A 190 40 0 0 1 -190 ${-T} Z`} fill={shade(batter, 0.25)} />
            <ellipse cx={0} cy={-T} rx={190} ry={95} fill={shade(batter, 0.08)} />
            <defs>{clipTop}</defs>
            <g clipPath="url(#waffle-top)">
              <rect x={-200} y={-T - 110} width={400} height={230} fill={batter} />
              {pockets}
            </g>
          </g>
        ) : (
          <g>
            <path d={front} fill={shade(batter, 0.2)} />
            <path d={sideR} fill={shade(batter, 0.32)} />
            <path d={topD} fill={batter} />
            <defs>{clipTop}</defs>
            <g clipPath="url(#waffle-top)">{pockets}</g>
            <path d={`M ${pts([P(0, 0), P(1, 0), P(1, 1), P(0, 1)])} Z`} fill="none" stroke={shade(batter, 0.1)} strokeWidth={4} />
          </g>
        )}
        {/* syrup over the top and running down the front */}
        <path d={`M -150 ${-T - 40} Q 0 ${-T - 20} 150 ${-T - 40} L 150 ${-T - 10} Q 0 ${-T + 10} -150 ${-T - 10} Z`} fill={syrup} opacity={0.9} />
        {[-120, -50, 30, 110].map((dx, i) => (
          <g key={i}>
            <rect x={dx - 7} y={-T - 14} width={14} height={[26, 56, 18, 40][i]} rx={7} fill={syrup} />
            <ellipse cx={dx} cy={-T - 14 + [26, 56, 18, 40][i]} rx={7} ry={8} fill={syrup} />
          </g>
        ))}
        {/* butter pat */}
        <g transform={`translate(${f1(P(0.5, 0.5)[0])} ${f1(P(0.5, 0.5)[1] - 22)})`}>
          <path d="M -34 0 L 0 -14 L 38 0 L 4 14 Z" fill="#FFE07A" />
          <path d="M -34 0 L 4 14 L 4 30 L -34 16 Z" fill="#E8B83A" />
          <path d="M 4 14 L 38 0 L 38 16 L 4 30 Z" fill="#F5CC55" />
        </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Waffle {...p} />;
}
