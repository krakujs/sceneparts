import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Water pump: cast-iron village hand pump with a curved handle and a spout dripping water. Stands on (x, y) at ground level.
export const WaterPump: React.FC<{ x: number; y: number; s?: number; f?: number; pumping?: boolean; metal?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, pumping = true, metal = C.stone, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const handle = pumping ? Math.sin(f / 18) * 14 : 0;
  const drops = pumping ? [0, 1, 2].map((i) => {
    const t = ((f + i * 24) % 72) / 72;
    return { y: -500 + t * 120, op: 1 - t * 0.6 };
  }) : [];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={150} ry={18} fill="#000" opacity={0.2} />
      {/* base plinth */}
      <path d="M -130 0 L 130 0 L 120 -40 Q 112 -70 84 -70 L -84 -70 Q -112 -70 -120 -40 Z" fill={metal} {...o} />
      <rect x={-100} y={-84} width={200} height={18} rx={6} fill={metal} {...o} />
      {/* body */}
      <path d="M -66 -84 L -40 -530 L 40 -530 L 66 -84 Z" fill={metal} {...o} />
      <path d="M -30 -110 L -18 -500" stroke="#FFFFFF" strokeWidth={8} opacity={0.35} strokeLinecap="round" />
      <rect x={-54} y={-540} width={108} height={22} rx={6} fill={metal} {...o} />
      <rect x={-46} y={-420} width={92} height={18} rx={6} fill={metal} {...o} />
      {/* spout */}
      <path d="M 30 -500 L 150 -500 Q 170 -500 170 -478 L 158 -456 Q 152 -444 140 -446 L 128 -446 L 132 -478 L 30 -470 Z" fill={metal} {...o} />
      <path d="M 40 -494 L 128 -494" stroke="#FFFFFF" strokeWidth={5} opacity={0.4} strokeLinecap="round" />
      {drops.map((d, i) => <ellipse key={i} cx={150} cy={d.y} rx={6} ry={9} fill={C.teal} stroke={C.ink} strokeWidth={2.5} opacity={d.op} />)}
      {/* shaft and curved handle */}
      <rect x={-9} y={-640} width={18} height={110} fill={metal} {...o} />
      <g transform={`rotate(${handle} 0 -640)`}>
        <path d="M 0 -640 Q -110 -650 -170 -720" stroke={C.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
        <path d="M 0 -640 Q -110 -650 -170 -720" stroke={metal} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d="M -150 -712 L -176 -728" stroke={C.ink} strokeWidth={24} strokeLinecap="round" />
        <path d="M -150 -712 L -176 -728" stroke={metal} strokeWidth={10} strokeLinecap="round" />
      </g>
      <circle cx={0} cy={-640} r={16} fill={metal} {...o} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <WaterPump x={p.x} y={p.y} s={p.s} f={p.f} pumping={p.pumping} metal={p.metal} flip={p.flip} />;
}
