import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Cyberpunk street prop: a neon-lit futuristic vending kiosk with a screen, a keypad, a dispensing slot, glowing side
// strips and cables running to the ground. No text and no brand marks; the screen shows abstract bars only.
// Prop: origin = floor centre at the bottom of the kiosk; ~950 px tall, ~440 px wide at s = 1.
const BODY = "#253058", BODY_D = "#1B2240", PANEL = "#1E2540", INK = "#0B0F1C", DIM = "#2A3350", BTN = "#3A4157";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, accent = "#FF4FA3", accent2 = "#3DE0FF", anim = "pulse" } = p as any;
  const on = anim === "pulse";
  const pulse = on ? 0.7 + 0.3 * Math.sin(f / 6) : 0.9;
  const bars = Array.from({ length: 5 }, (_, i) => {
    const w = 180 * (0.4 + 0.6 * Math.abs(Math.sin((on ? f : 0) / (9 + i * 3) + i)));
    return <rect key={i} x={-130} y={-738 + i * 44} width={w} height={18} rx={9} fill={i % 2 ? accent : accent2} opacity={0.9} />;
  });
  const keys = Array.from({ length: 9 }, (_, i) => {
    const r = Math.floor(i / 3), c = i % 3;
    const lit = on ? (Math.floor(f / 8) + i) % 4 === 0 : i % 4 === 0;
    return (
      <g key={i}>
        <rect x={-120 + c * 80} y={-470 + r * 46} width={52} height={34} rx={8} fill={BTN} />
        <circle cx={-94 + c * 80} cy={-453 + r * 46} r={6} fill={lit ? accent : accent2} opacity={lit ? pulse : 0.5} />
      </g>
    );
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={20} fill={C.shadow} />
      {/* cables running to the ground */}
      <path d="M 200 -600 C 260 -560 240 -300 280 -200 S 300 -40 330 0" stroke={INK} strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M 200 -600 C 260 -560 240 -300 280 -200 S 300 -40 330 0" stroke={accent2} strokeWidth={3} fill="none" opacity={0.6 * pulse} />
      <path d="M -200 -300 C -270 -250 -240 -160 -280 -100 S -250 -30 -260 0" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M -200 -300 C -270 -250 -240 -160 -280 -100 S -250 -30 -260 0" stroke={accent} strokeWidth={3} fill="none" opacity={0.6 * pulse} />
      {/* base */}
      <rect x={-220} y={-24} width={440} height={24} rx={8} fill={INK} />
      {/* body */}
      <rect x={-200} y={-940} width={400} height={930} rx={26} fill={BODY} />
      <rect x={150} y={-940} width={50} height={930} rx={22} fill={BODY_D} opacity={0.7} />
      {/* side neon strips */}
      <rect x={-206} y={-940} width={18} height={940} rx={6} fill={accent} opacity={0.25 * pulse} />
      <rect x={-204} y={-940} width={6} height={940} rx={3} fill={accent} opacity={pulse} />
      <rect x={198} y={-940} width={18} height={940} rx={6} fill={accent2} opacity={0.25 * pulse} />
      <rect x={198} y={-940} width={6} height={940} rx={3} fill={accent2} opacity={pulse} />
      {/* top sign panel with abstract shapes only */}
      <rect x={-190} y={-940} width={380} height={110} rx={16} fill={PANEL} />
      <circle cx={-110} cy={-885} r={28} fill={accent} opacity={pulse} />
      <rect x={-60} y={-900} width={170} height={16} rx={8} fill={accent2} opacity={pulse} />
      <rect x={-60} y={-870} width={120} height={14} rx={7} fill={accent} opacity={0.7} />
      <path d="M 120 -912 L 160 -850 L 80 -850 Z" fill={accent2} opacity={0.8} />
      <rect x={-190} y={-826} width={380} height={8} rx={4} fill={accent} opacity={pulse} />
      {/* screen */}
      <rect x={-150} y={-780} width={300} height={260} rx={14} fill={INK} stroke={accent2} strokeWidth={4} />
      {bars}
      <rect x={-130} y={-530} width={260} height={4} rx={2} fill={DIM} />
      {/* keypad */}
      {keys}
      {/* dispensing slot */}
      <rect x={-130} y={-300} width={260} height={80} rx={12} fill={INK} />
      <rect x={-110} y={-276} width={220} height={8} rx={4} fill={accent2} opacity={pulse} />
      {/* lower glowing panel */}
      <rect x={-170} y={-190} width={340} height={150} rx={14} fill={PANEL} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={-150 + i * 66} y={-170} width={12} height={110} rx={6} fill={i % 2 ? accent2 : accent} opacity={pulse * (0.6 + 0.1 * i)} />
      ))}
    </g>
  );
}
