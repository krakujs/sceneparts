import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Goblin: a small mischievous goblin with big pointy ears, yellow eyes, an olive-teal face and a lumpy sack over one shoulder.
// Custom drawing. Feet at 0,0, faces right, ~600 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
const TUNIC = "#6B5A4A", SACK = "#A67B4B", SACKD = shade("#A67B4B", 0.2), EYE = "#F4D03F";
export default function Part(p: PartProps<any>) {
  const SK = (p as any).color || "#5E9482", SKD = shade(SK, 0.2);
  const { x = 540, y = 1560, s = 1, f = 0, flip } = p as any;
  const bob = Math.abs(Math.sin(f / 6)) * 6;
  const step = Math.sin(f / 6) * 22;
  const blink = f % 100 < 4;
  return (
    <g transform={`translate(${x + (p.vx ?? 0) * f} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={3} rx={110} ry={12} fill={C.shadow} />
      {/* legs with pointed boots */}
      <path d={`M -34 -150 L ${-40 + step} -26`} stroke={SKD} strokeWidth={30} strokeLinecap="round" />
      <path d={`M 34 -150 L ${40 - step} -26`} stroke={SK} strokeWidth={30} strokeLinecap="round" />
      <path d={`M ${-40 + step} -26 L ${-70 + step} -14 L ${-24 + step} -10 Z`} fill={C.brownDark} />
      <path d={`M ${40 - step} -26 L ${70 - step} -14 L ${24 - step} -10 Z`} fill={C.brownDark} />
      {/* back ear and arm */}
      {/* sack slung over the shoulder */}
      <g transform={`translate(${-120} ${-320 - bob})`}>
        <path d="M -40 -40 Q -86 -10 -64 60 Q -40 110 20 92 Q 70 80 60 20 Q 50 -30 10 -46 Z" fill={SACK} />
        <path d="M -20 -40 Q 0 -66 20 -40" stroke={SACKD} strokeWidth={10} fill="none" strokeLinecap="round" />
        <path d="M -30 -60 L -6 -40 L 14 -60" stroke={SACKD} strokeWidth={8} fill="none" strokeLinejoin="round" />
        <path d="M -40 40 L 0 60 M -20 84 L 26 60" stroke={SACKD} strokeWidth={4} fill="none" />
      </g>
      {/* tunic body */}
      <path d={`M -58 -150 Q -70 -260 -40 -300 L 50 -300 Q 74 -250 60 -150 Z`} fill={TUNIC} />
      <path d="M -30 -290 L 10 -220 L 40 -290" stroke={shade(TUNIC, 0.3)} strokeWidth={8} fill="none" strokeLinejoin="round" />
      {/* arm held out, fist to chest */}
      <path d={`M 40 -280 Q 96 -230 ${70 + step * 0.3} -170`} stroke={SK} strokeWidth={24} fill="none" strokeLinecap="round" />
      <circle cx={70 + step * 0.3} cy={-170} r={18} fill={SK} />
      {/* head: pear-shaped, spiky tufts, swept-up ears, half-lidded yellow eyes and a toothy grin */}
      <g transform={`translate(0 ${-392 - bob * 0.5})`}>
        <path d="M -58 -20 L -214 -126 L -70 -48 Z" fill={SK} />
        <path d="M 58 -22 L 206 -140 L 70 -46 Z" fill={SK} />
        <path d="M -150 -100 L -196 -116 L -160 -84 Z" fill={SKD} opacity={0.5} />
        <path d="M -30 -68 L -48 -122 L -10 -80 Z M 8 -74 L 18 -132 L 36 -72 Z M 40 -62 L 66 -106 L 60 -50 Z" fill={SKD} />
        <path d="M -80 -10 Q -84 -80 -10 -84 Q 60 -84 80 -16 Q 84 40 40 66 Q 0 82 -40 66 Q -80 44 -80 -10 Z" fill={SK} />
        {/* half-lidded yellow eyes */}
        {[-30, 30].map((ex) => (
          <g key={ex}>
            <ellipse cx={ex} cy={-16} rx={20} ry={blink ? 3 : 12} fill={EYE} />
            {!blink ? <circle cx={ex + (ex > 0 ? 4 : -4)} cy={-14} r={5} fill={C.ink} /> : null}
            <path d={`M ${ex - 22} ${-22} Q ${ex} ${-34} ${ex + 22} ${-22}`} stroke={C.ink} strokeWidth={6} fill={SKD} strokeLinecap="round" />
          </g>
        ))}
        <path d="M -48 -58 L -16 -46" stroke={SKD} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M 16 -46 L 48 -58" stroke={SKD} strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* big bulbous nose */}
        <circle cx={4} cy={6} r={22} fill={SKD} />
        <circle cx={-6} cy={0} r={5} fill={C.ink} opacity={0.35} />
        {/* toothy grin with two fangs */}
        <path d="M -44 40 Q 0 84 46 36 Q 22 62 0 62 Q -22 62 -44 40 Z" fill={C.ink} />
        <path d="M -20 52 L -14 66 L -8 54 M 12 54 L 18 68 L 24 54" stroke={C.white} strokeWidth={4} fill="none" strokeLinejoin="round" />
      </g>
    </g>
  );
}
