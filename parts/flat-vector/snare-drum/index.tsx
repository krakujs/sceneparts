import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Snare drum on a three-legged stand, seen from the front, with two sticks crossed above the head.
// Origin = bottom centre (feet on y). anim "hit": the sticks swing down onto the head in turn.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};
// strike pulse: 1 at the moment of impact, falling away over 5 frames
const strike = (f: number, phase: number) => {
  const t = (((f - phase) % 20) + 20) % 20;
  return Math.max(0, 1 - t / 5);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const shell = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const hitL = anim === "hit" ? strike(f, 0) : 0;
  const hitR = anim === "hit" ? strike(f, 10) : 0;
  const headDip = Math.max(hitL, hitR) * 6;
  const SX = 0, TOP = -330, BOT = -200, RX = 190, RY = 40;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* stand: tripod legs and the centre tube */}
        <line x1={-150} y1={0} x2={-20} y2={BOT + 10} stroke={C.greyDark} strokeWidth={14} strokeLinecap="round" />
        <line x1={150} y1={0} x2={20} y2={BOT + 10} stroke={C.greyDark} strokeWidth={14} strokeLinecap="round" />
        <line x1={0} y1={-6} x2={0} y2={BOT + 10} stroke={C.greyDark} strokeWidth={14} strokeLinecap="round" />
        <rect x={-30} y={BOT - 20} width={60} height={24} rx={8} fill={C.greyDark} />
        <rect x={-190} y={-14} width={60} height={14} rx={6} fill={C.inkSoft} />
        <rect x={130} y={-14} width={60} height={14} rx={6} fill={C.inkSoft} />
        {/* shell */}
        <rect x={-RX} y={TOP} width={2 * RX} height={BOT - TOP} fill={shade(shell, 0.1)} />
        <ellipse cx={0} cy={BOT} rx={RX} ry={RY} fill={shade(shell, 0.25)} />
        <rect x={-RX} y={TOP + 6} width={2 * RX} height={6} fill={C.white} opacity={0.4} />
        {/* snare wires under the bottom head */}
        {[-120, -60, 0, 60, 120].map((wx, i) => (
          <line key={i} x1={wx} y1={BOT + 12} x2={wx} y2={BOT - 8} stroke={C.greyLight} strokeWidth={5} />
        ))}
        {/* shell highlight and lugs */}
        <rect x={-RX + 24} y={TOP + 30} width={14} height={BOT - TOP - 60} rx={7} fill={C.white} opacity={0.22} />
        {[-130, -65, 0, 65, 130].map((lx, i) => (
          <rect key={i} x={lx - 9} y={BOT - 14} width={18} height={24} rx={5} fill={C.greyLight} />
        ))}
        {/* top head, dipped when struck */}
        <ellipse cx={0} cy={TOP} rx={RX + 6} ry={RY} fill={C.greyLight} />
        <ellipse cx={0} cy={TOP + headDip} rx={RX - 16} ry={RY - 10} fill={C.white} />
        <ellipse cx={0} cy={TOP + headDip} rx={RX - 16} ry={RY - 10} fill="none" stroke={C.greyLight} strokeWidth={6} opacity={0.6} />
        {/* hoop */}
        <ellipse cx={0} cy={TOP} rx={RX + 6} ry={RY} fill="none" stroke={C.greyDark} strokeWidth={8} />
        {/* sticks crossed above the head, each tip striking the head */}
        <g transform={`translate(-170 -470) rotate(${f1(hitL * 14)} 0 0)`}>
          <line x1={0} y1={0} x2={150} y2={130} stroke={C.brownDark} strokeWidth={16} strokeLinecap="round" />
          <circle cx={0} cy={0} r={11} fill={C.ink} />
        </g>
        <g transform={`translate(170 -470) rotate(${f1(-hitR * 14)} 0 0)`}>
          <line x1={0} y1={0} x2={-150} y2={130} stroke={C.brownDark} strokeWidth={16} strokeLinecap="round" />
          <circle cx={0} cy={0} r={11} fill={C.ink} />
        </g>
      </g>
    </g>
  );
}
