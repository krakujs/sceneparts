import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Time machine: an original brass-and-glass contraption. An open brass frame with two glass tubes, a big clock dial,
// gyro rings that spin around it, a leather seat with armrests and a small control console. No wheels, no door:
// not a car and not a phone box. Scenery: origin = floor centre; ~1000 px tall, ~860 px wide at s = 1.
const BRASS = "#D9A441", BRASS_D = shade("#D9A441", 0.25), LEATHER = "#8A5A3C", LEATHER_D = shade("#8A5A3C", 0.25);
const CREAM = "#F4F1EA", GLASS = "#BDE6F7", INK = "#3A2A1E";
const CY = -640; // centre of the clock dial
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, glow = "#3DE0C0", anim = "spin" } = p as any;
  const on = anim === "spin";
  const spin = on ? f : 0;
  const bubbleY = (i: number) => -(((on ? f * 2 : 0) + i * 70) % 330);
  const hourA = spin * 0.05;
  const minA = spin * 0.6;
  const secA = spin * 6;
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return <circle key={i} cx={Math.cos(a) * 138} cy={CY + Math.sin(a) * 138} r={i % 3 === 0 ? 9 : 6} fill={INK} />;
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={420} ry={26} fill={C.shadow} />
      {/* plinth */}
      <rect x={-380} y={-76} width={760} height={76} rx={16} fill={BRASS_D} />
      <rect x={-360} y={-96} width={720} height={28} rx={12} fill={BRASS} />
      <rect x={-340} y={-66} width={680} height={8} rx={4} fill={glow} opacity={on ? 0.6 + 0.4 * Math.sin(f / 7) : 0.8} />
      {/* glass tubes with glowing liquid and rising bubbles */}
      {[-260, 260].map((tx) => (
        <g key={tx}>
          <rect x={tx - 40} y={-720} width={80} height={620} rx={40} fill={GLASS} opacity={0.5} />
          <rect x={tx - 30} y={-460} width={60} height={360} rx={30} fill={glow} opacity={0.75} />
          {on && [0, 1, 2].map((i) => (
            <circle key={i} cx={tx - 12 + i * 12} cy={-100 + bubbleY(i)} r={6} fill={C.white} opacity={0.7} />
          ))}
          <rect x={tx - 50} y={-720} width={100} height={20} rx={8} fill={BRASS} />
          <rect x={tx - 50} y={-120} width={100} height={22} rx={8} fill={BRASS} />
        </g>
      ))}
      {/* brass columns and arch */}
      <rect x={-322} y={-760} width={36} height={680} rx={10} fill={BRASS} />
      <rect x={286} y={-760} width={36} height={680} rx={10} fill={BRASS} />
      <path d="M -304 -760 Q 0 -930 304 -760" stroke={BRASS} strokeWidth={26} fill="none" strokeLinecap="round" />
      {/* gyro rings tilting around the dial */}
      {[0, 1, 2].map((i) => {
        const th = spin * 0.02 * (1 + i * 0.5) + i * 1.05;
        return (
          <g key={i} transform={`rotate(${i * 60} 0 ${CY})`}>
            <ellipse cx={0} cy={CY} rx={Math.abs(Math.cos(th)) * 200} ry={200} fill="none" stroke={BRASS_D} strokeWidth={12} />
          </g>
        );
      })}
      {/* clock dial */}
      <circle cx={0} cy={CY} r={170} fill={CREAM} stroke={BRASS} strokeWidth={22} />
      <circle cx={0} cy={CY} r={150} fill="none" stroke={BRASS_D} strokeWidth={3} />
      {ticks}
      <line x1={0} y1={CY} x2={0} y2={CY - 80} stroke={INK} strokeWidth={12} strokeLinecap="round" transform={`rotate(${hourA.toFixed(2)} 0 ${CY})`} />
      <line x1={0} y1={CY} x2={0} y2={CY - 124} stroke={INK} strokeWidth={8} strokeLinecap="round" transform={`rotate(${minA.toFixed(2)} 0 ${CY})`} />
      <line x1={0} y1={CY + 18} x2={0} y2={CY - 140} stroke={C.red} strokeWidth={4} strokeLinecap="round" transform={`rotate(${secA.toFixed(2)} 0 ${CY})`} />
      <circle cx={0} cy={CY} r={14} fill={BRASS} />
      {/* seat with a backrest, legs and armrests */}
      {[-130, 106].map((lx) => (
        <rect key={lx} x={lx} y={-200} width={24} height={106} rx={8} fill={BRASS_D} />
      ))}
      <rect x={-160} y={-440} width={320} height={200} rx={44} fill={LEATHER_D} />
      <rect x={-150} y={-260} width={300} height={70} rx={26} fill={LEATHER} />
      <rect x={-200} y={-210} width={44} height={124} rx={20} fill={BRASS} />
      <rect x={156} y={-210} width={44} height={124} rx={20} fill={BRASS} />
      {/* control console */}
      <rect x={210} y={-190} width={170} height={96} rx={18} fill={BRASS_D} />
      <circle cx={252} cy={-148} r={16} fill={CREAM} />
      <circle cx={306} cy={-148} r={16} fill={glow} />
      <line x1={330} y1={-176} x2={350} y2={-236} stroke={BRASS} strokeWidth={10} strokeLinecap="round" />
      <circle cx={352} cy={-242} r={14} fill={C.red} />
    </g>
  );
}
