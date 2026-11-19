import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Retro robot: a boxy 1950s tin robot with a round brass-rimmed dial chest, a coil antenna, porthole eyes and claw
// hands. It walks with alternating legs and a bobbing body. Custom drawing. Feet at 0,0, ~1000 px tall at s = 1.
const TEAL = "#1FA39A", TEAL_D = shade("#1FA39A", 0.22), CREAM = "#F4F1EA", CREAM_D = shade("#F4F1EA", 0.14);
const RED = "#E8503F", BRASS = "#E0A21F", METAL = "#9AA3B5", DARK = "#3A4157";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, walk = true } = p as any;
  const step = walk ? Math.sin(f / 8) : 0;
  const bob = walk ? -Math.abs(Math.sin(f / 8)) * 10 : 0;
  const blinkOn = f % 100 < 8;
  const hipY = -400, shY = -600;
  const dialY = -530;
  // A leg pivots at the hip and swings; the foot is a dark block.
  const leg = (hx: number, a: number) => (
    <g transform={`rotate(${a.toFixed(2)} ${hx} ${hipY})`}>
      <rect x={hx - 42} y={hipY} width={84} height={340} rx={20} fill={TEAL_D} />
      <rect x={hx - 74} y={-62} width={148} height={62} rx={18} fill={DARK} />
    </g>
  );
  // An arm pivots at the shoulder; the hand is a red wrist with a two-prong claw.
  const arm = (sx: number, a: number) => (
    <g transform={`rotate(${a.toFixed(2)} ${sx} ${shY})`}>
      <rect x={sx - 26} y={shY} width={52} height={230} rx={22} fill={CREAM_D} />
      <g transform={`translate(${sx} -360)`}>
        <circle cx={0} cy={0} r={34} fill={RED} />
        <path d="M -16 26 Q -50 44 -40 84" stroke={METAL} strokeWidth={15} strokeLinecap="round" fill="none" />
        <path d="M 16 26 Q 50 44 40 84" stroke={METAL} strokeWidth={15} strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return <line key={i} x1={Math.cos(a) * 62} y1={dialY + Math.sin(a) * 62} x2={Math.cos(a) * 74} y2={dialY + Math.sin(a) * 74} stroke={DARK} strokeWidth={5} strokeLinecap="round" />;
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={200} ry={20} fill={C.shadow} />
      {leg(-70, step * 14)}
      {leg(70, -step * 14)}
      <g transform={`translate(0 ${bob.toFixed(1)})`}>
        {/* antenna with a red bulb */}
        <line x1={0} y1={-850} x2={0} y2={-955} stroke={METAL} strokeWidth={8} strokeLinecap="round" />
        {[-872, -892, -912].map((yy) => (
          <ellipse key={yy} cx={0} cy={yy} rx={16} ry={5} fill="none" stroke={METAL} strokeWidth={4} />
        ))}
        <circle cx={0} cy={-962} r={34} fill={RED} opacity={0.25 + 0.15 * Math.sin(f / 6)} />
        <circle cx={0} cy={-962} r={22} fill={RED} />
        {/* head box with porthole eyes and a grille */}
        <rect x={-40} y={-680} width={80} height={40} fill={METAL} />
        <rect x={-115} y={-850} width={230} height={190} rx={24} fill={CREAM} />
        {[-55, 55].map((ex) => (
          <g key={ex}>
            <circle cx={ex} cy={-780} r={40} fill={TEAL_D} stroke={BRASS} strokeWidth={12} />
            {blinkOn ? (
              <rect x={ex - 34} y={-786} width={68} height={12} rx={6} fill={TEAL_D} />
            ) : (
              <circle cx={ex} cy={-780} r={24} fill="#FFE58A" />
            )}
          </g>
        ))}
        <rect x={-55} y={-712} width={110} height={8} rx={4} fill={METAL} />
        <rect x={-55} y={-696} width={110} height={8} rx={4} fill={METAL} />
        {/* torso with a round dial chest */}
        <rect x={-170} y={-640} width={340} height={270} rx={22} fill={TEAL} />
        <rect x={-150} y={-630} width={300} height={12} rx={6} fill={TEAL_D} />
        <circle cx={0} cy={dialY} r={84} fill={CREAM} stroke={BRASS} strokeWidth={14} />
        {ticks}
        <g transform={`rotate(${((f * 4) % 360).toFixed(1)} 0 ${dialY})`}>
          <line x1={0} y1={dialY} x2={0} y2={dialY - 62} stroke={RED} strokeWidth={6} strokeLinecap="round" />
        </g>
        <circle cx={0} cy={dialY} r={10} fill={BRASS} />
        {arm(-190, -step * 12)}
        {arm(190, step * 12)}
      </g>
    </g>
  );
}
