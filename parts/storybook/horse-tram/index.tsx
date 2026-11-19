import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Horse tram: Victorian double-deck tram car on rails, pulled by one original cartoon horse. Stands on (x, y) at rail level.
export const HorseTram: React.FC<{ x: number; y: number; s?: number; f?: number; walk?: boolean; colour?: string; horse?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, walk = false, colour = C.brick, horse = "#8A6A45", flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const ph = walk ? f * 0.3 : 0;
  const swing = (phase: number) => (walk ? Math.sin(ph + phase) * 16 : 0);
  const bob = walk ? -Math.abs(Math.sin(ph)) * 5 : 0;
  const wheelRot = walk ? f * 6 : 0;
  const Leg: React.FC<{ hx: number; phase: number }> = ({ hx, phase }) => (
    <g transform={`rotate(${swing(phase)} ${hx} -190)`}>
      <rect x={hx - 14} y={-190} width={28} height={180} rx={10} fill={horse} {...o} />
      <rect x={hx - 18} y={-18} width={36} height={18} rx={6} fill={C.ink} />
    </g>
  );
  const Wheel: React.FC<{ cx: number }> = ({ cx }) => (
    <g transform={`rotate(${wheelRot} ${cx} -40)`}>
      <circle cx={cx} cy={-40} r={40} fill={C.stoneDark} {...o} />
      <circle cx={cx} cy={-40} r={28} fill="none" stroke={C.stone} strokeWidth={4} />
      <path d={`M ${cx - 36} -40 L ${cx + 36} -40 M ${cx} -76 L ${cx} -4`} stroke={C.ink} strokeWidth={5} />
      <circle cx={cx} cy={-40} r={8} fill={C.mustard} stroke={C.ink} strokeWidth={3} />
    </g>
  );
  const windows = (xs: number[], yy: number, w: number, h: number) => xs.map((wx) => <rect key={wx} x={wx} y={yy} width={w} height={h} fill={C.cream} stroke={C.ink} strokeWidth={5} />);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? 1 : -1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={470} ry={16} fill="#000" opacity={0.18} />
      <rect x={-470} y={-12} width={950} height={6} fill={C.stone} />
      <rect x={-470} y={-2} width={950} height={6} fill={C.stone} />
      {Array.from({ length: 11 }, (_, i) => <rect key={i} x={-450 + i * 90} y={-4} width={14} height={12} fill={C.sepia} stroke={C.ink} strokeWidth={3} />)}
      <g transform={`translate(-540 ${bob}) scale(-1 1)`}>
        <Leg hx={-360} phase={Math.PI} />
        <Leg hx={-330} phase={0} />
        <path d="M -410 -280 Q -470 -250 -450 -180" stroke={C.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
        <path d="M -410 -280 Q -470 -250 -450 -180" stroke={horse} strokeWidth={16} fill="none" strokeLinecap="round" />
        <ellipse cx={-270} cy={-250} rx={140} ry={88} fill={horse} {...o} />
        <Leg hx={-180} phase={0} />
        <Leg hx={-150} phase={Math.PI} />
        <path d="M -190 -320 Q -170 -400 -120 -430 L -80 -400 Q -110 -340 -90 -270 Z" fill={horse} {...o} />
        <path d="M -190 -320 Q -160 -380 -120 -430" stroke={C.ink} strokeWidth={18} fill="none" strokeLinecap="round" />
        <path d="M -190 -320 Q -160 -380 -120 -430" stroke={C.stoneDark} strokeWidth={6} fill="none" strokeLinecap="round" />
        <ellipse cx={-100} cy={-430} rx={58} ry={38} fill={horse} transform="rotate(-18 -100 -430)" {...o} />
        <ellipse cx={-60} cy={-410} rx={24} ry={17} fill={C.sepia} {...o} />
        <path d="M -118 -448 L -126 -494 L -92 -458 Z" fill={horse} {...o} />
        <circle cx={-96} cy={-438} r={7} fill={C.ink} />
        <circle cx={-98} cy={-440} r={2.5} fill="#FFFFFF" />
      </g>
      <path d="M -120 -230 L 120 -230" stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
      <path d="M -120 -230 L 120 -230" stroke={C.sepia} strokeWidth={6} strokeLinecap="round" />
      <rect x={110} y={-96} width={360} height={20} fill={C.ink} />
      <rect x={110} y={-330} width={360} height={240} fill={colour} {...o} />
      <rect x={96} y={-500} width={388} height={26} rx={6} fill={C.ink} />
      <rect x={110} y={-480} width={360} height={150} fill={colour} {...o} />
      <rect x={110} y={-340} width={360} height={14} fill={C.mustard} />
      <rect x={110} y={-486} width={360} height={10} fill={C.mustard} />
      {windows([130, 218, 306], -302, 64, 90)}
      {windows([130, 200, 270, 340], -458, 56, 70)}
      <rect x={390} y={-312} width={62} height={210} fill={C.navy} stroke={C.ink} strokeWidth={5} />
      <path d="M 400 -292 L 440 -292" stroke={C.glow} strokeWidth={5} />
      <path d="M 160 -500 L 230 -560 L 280 -500" stroke={C.ink} strokeWidth={6} fill="none" />
      {[190, 400].map((cx) => <Wheel key={cx} cx={cx} />)}
      <path d="M 130 -312 L 176 -390" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} strokeLinecap="round" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <HorseTram x={p.x} y={p.y} s={p.s} f={p.f} walk={p.walk} colour={p.colour} horse={p.horse} flip={p.flip} />;
}
