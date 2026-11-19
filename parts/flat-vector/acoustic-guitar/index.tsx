import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Acoustic guitar standing upright on its base: a round wooden body with a waist and a sound hole, a neck,
// a fingerboard with frets, a headstock with tuners and six strings. Origin = bottom centre (base on y).
// Room-scale: about 560 px tall at s = 1. anim "strum": the strings swing in turn, the body hums.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  return "";
};
// Figure-eight style body outline, origin top centre, height H, half-widths Wu (upper bout), Ww (waist), Wl (lower bout).
const bodyPath = (H: number, Wu: number, Ww: number, Wl: number) =>
  `M 0 0 C ${f1(Wu * 0.7)} 0 ${f1(Wu)} ${f1(H * 0.1)} ${f1(Wu)} ${f1(H * 0.22)} C ${f1(Wu)} ${f1(H * 0.3)} ${f1(Ww * 1.05)} ${f1(H * 0.38)} ${f1(Ww)} ${f1(H * 0.45)} C ${f1(Ww * 1.05)} ${f1(H * 0.52)} ${f1(Wl)} ${f1(H * 0.62)} ${f1(Wl)} ${f1(H * 0.78)} C ${f1(Wl)} ${f1(H * 0.9)} ${f1(Wl * 0.55)} ${f1(H)} 0 ${f1(H)} C ${f1(-Wl * 0.55)} ${f1(H)} ${f1(-Wl)} ${f1(H * 0.9)} ${f1(-Wl)} ${f1(H * 0.78)} C ${f1(-Wl)} ${f1(H * 0.62)} ${f1(-Ww * 1.05)} ${f1(H * 0.52)} ${f1(-Ww)} ${f1(H * 0.45)} C ${f1(-Ww * 1.05)} ${f1(H * 0.38)} ${f1(-Wu)} ${f1(H * 0.3)} ${f1(-Wu)} ${f1(H * 0.22)} C ${f1(-Wu)} ${f1(H * 0.1)} ${f1(-Wu * 0.7)} 0 0 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : "#C68558";
  const neck = p.accent && p.accent !== "none" ? p.accent : C.brownDark;
  const anim: string = p.anim ?? "none";
  const BODY_H = 260, BODY_TOP = -BODY_H;
  // Strum: each string swings in turn, decaying over 40 frames, then the next one is struck.
  const strumAmp = (i: number) => {
    if (anim !== "strum") return 0;
    const cyc = ((f - i * 4) % 90 + 90) % 90;
    return 9 * Math.exp(-cyc / 14) * Math.sin(cyc * 0.9) ;
  };
  const xs = [-16, -9.6, -3.2, 3.2, 9.6, 16];
  const bridgeY = -90, nutY = -470;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* body (bottom at y = 0) */}
        <g transform={`translate(0 ${f1(BODY_TOP)})`}>
          <path d={bodyPath(BODY_H, 112, 78, 130)} fill={wood} />
          {/* lower bout shading along the bottom edge */}
          <path d={`M -120 ${BODY_H * 0.8} Q 0 ${BODY_H + 10} 120 ${BODY_H * 0.8} Q 0 ${BODY_H * 0.9} -120 ${BODY_H * 0.8} Z`} fill={shade(wood, 0.18)} />
          {/* sound hole */}
          <circle cx={0} cy={150} r={46} fill={C.ink} />
          <circle cx={0} cy={150} r={54} fill="none" stroke={shade(wood, 0.25)} strokeWidth={8} />
          {/* bridge */}
          <rect x={-46} y={bridgeY - BODY_TOP - 6} width={92} height={14} rx={5} fill={C.ink} />
          {/* neck joint */}
          <rect x={-40} y={-6} width={80} height={24} rx={6} fill={neck} />
        </g>
        {/* neck and fingerboard */}
        <rect x={-30} y={-300} width={60} height={310} rx={8} fill={neck} />
        <rect x={-22} y={-470} width={44} height={180} rx={4} fill={C.ink} />
        {[-400, -340, -290].map((fy, i) => <line key={i} x1={-22} y1={fy} x2={22} y2={fy} stroke={C.greyDark} strokeWidth={3} />)}
        {/* headstock */}
        <path d="M -30 -470 L -34 -540 Q -34 -562 -10 -564 L 10 -564 Q 34 -562 34 -540 L 30 -470 Z" fill={neck} />
        {[-1, 1].map((side) => [-530, -500].map((ty, j) => (
          <g key={`${side}${j}`}>
            <circle cx={side * 24} cy={ty} r={7} fill={C.greyLight} />
            <rect x={side > 0 ? 6 : -30} y={ty - 3} width={24} height={6} rx={3} fill={C.greyLight} />
          </g>
        )))}
        {/* strings: bridge to nut, bowed sideways when strummed */}
        {xs.map((sx, i) => {
          const a = strumAmp(i);
          return (
            <path key={i} d={`M ${f1(sx * 2.4)} ${bridgeY} Q ${f1(sx * 2.4 + a)} ${(bridgeY + nutY) / 2} ${f1(sx * 1.4)} ${nutY}`} fill="none" stroke={C.greyLight} strokeWidth={2.2} />
          );
        })}
      </g>
    </g>
  );
}
