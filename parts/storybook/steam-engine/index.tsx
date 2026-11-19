import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Steam engine: small early steam locomotive in red and black with a tall chimney and puffing steam. Stands on (x, y) at rail level.
export const SteamEngine: React.FC<{ x: number; y: number; s?: number; f?: number; puffing?: boolean; red?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, puffing = true, red = C.brick, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const black = "#1B1712";
  const wheelRot = puffing ? f * 5 : 0;
  const bob = puffing ? Math.sin(f / 4) * 1.2 : 0;
  const puffs = [0, 1, 2, 3].map((i) => {
    const t = ((f + i * 15) % 60) / 60;
    return { cx: 236 + t * 60, cy: -660 - t * 280, r: 26 + t * 60, op: 0.9 * (1 - t) };
  });
  const Wheel: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
    <g transform={`rotate(${wheelRot} ${cx} ${cy})`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={black} strokeWidth={r * 0.2} />
      <circle cx={cx} cy={cy} r={r * 0.8} fill="none" stroke={C.ink} strokeWidth={5} />
      {[0, 60, 120].map((a) => <line key={a} x1={cx} y1={cy - r * 0.8} x2={cx} y2={cy + r * 0.8} stroke={red} strokeWidth={6} transform={`rotate(${a} ${cx} ${cy})`} />)}
      <circle cx={cx} cy={cy} r={r * 0.18} fill={red} stroke={C.ink} strokeWidth={4} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={20} cy={6} rx={380} ry={20} fill="#000" opacity={0.2} />
      {puffs.map((p, i) => <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={C.cream} stroke={C.ink} strokeWidth={4} opacity={p.op} />)}
      <g transform={`translate(0 ${bob})`}>
        {/* chassis and connecting rod */}
        <rect x={-270} y={-220} width={600} height={34} rx={8} fill={black} {...o} />
        <rect x={-170} y={-112} width={200} height={12} fill={C.ink} />
        {/* cab */}
        <rect x={-330} y={-640} width={200} height={420} rx={6} fill={red} {...o} />
        <rect x={-350} y={-668} width={240} height={34} rx={6} fill={black} {...o} />
        <rect x={-300} y={-580} width={120} height={80} fill={C.cream} stroke={C.ink} strokeWidth={6} />
        {/* boiler */}
        <rect x={-130} y={-430} width={330} height={190} rx={70} fill={red} {...o} />
        <rect x={60} y={-430} width={24} height={190} fill={black} opacity={0.5} />
        <rect x={120} y={-430} width={24} height={190} fill={black} opacity={0.5} />
        <path d="M -110 -410 Q 10 -424 130 -408" stroke="#FFFFFF" strokeWidth={8} opacity={0.35} fill="none" strokeLinecap="round" />
        {/* dome and whistle */}
        <ellipse cx={0} cy={-432} rx={36} ry={30} fill={black} {...o} />
        <rect x={150} y={-470} width={22} height={44} rx={6} fill={black} {...o} />
        {/* smokebox and front */}
        <rect x={200} y={-400} width={70} height={160} rx={10} fill={black} {...o} />
        <path d="M 280 -200 L 300 -110 L 240 -110 L 240 -200 Z" fill={C.ink} />
        {/* chimney */}
        <path d="M 210 -430 L 218 -640 L 262 -640 L 270 -430 Z" fill={black} {...o} />
        <ellipse cx={240} cy={-640} rx={36} ry={12} fill={black} {...o} />
        {/* wheels */}
        <Wheel cx={-190} cy={-100} r={100} />
        <Wheel cx={-20} cy={-100} r={100} />
        <Wheel cx={240} cy={-60} r={60} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <SteamEngine x={p.x} y={p.y} s={p.s} f={p.f} puffing={p.puffing} red={p.red} flip={p.flip} />;
}
