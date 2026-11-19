import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pixie: a small mischievous pixie (~300 px tall) in a pointed hat made of a flower, with four dragonfly wings, hovering. Custom drawing.
// y is the hover point (the feet). Faces right.
/* eslint-disable @typescript-eslint/no-explicit-any */
const SKIN = "#F6D2B5", HAIR = "#C2532B", PETAL = "#FF8FB3", PETALD = shade("#FF8FB3", 0.2), WING = "#CFF4F0", VEIN = "#4B9C9A";
export default function Part(p: PartProps<any>) {
  const TUNIC = (p as any).color || "#8CC36B", TUNICD = shade(TUNIC, 0.2);
  const { x = 540, y = 1200, s = 1, f = 0, flip } = p as any;
  const hover = Math.sin(f / 10) * 14;
  const beat = Math.sin(f / 1.6);
  const giggle = f % 140 < 6;
  const wing = (sx: number, sy: number, ex: number, ey: number, k: number, op: number) => (
    <g transform={`translate(${sx} ${sy}) scale(${k} 1)`} opacity={op}>
      <path d={`M 0 0 Q ${ex * 0.5} ${ey - 30} ${ex} ${ey} Q ${ex * 0.4} ${ey * 0.6 + 16} 0 ${20} Z`} fill={WING} stroke={VEIN} strokeWidth={3} />
      <path d={`M 0 4 Q ${ex * 0.45} ${ey * 0.5} ${ex * 0.85} ${ey * 0.85}`} stroke={VEIN} strokeWidth={2} fill="none" opacity={0.7} />
    </g>
  );
  return (
    <g transform={`translate(${x + (p.vx ?? 0) * f} ${y + hover}) scale(${flip ? -s : s} ${s})`}>
      {/* dragonfly wings: two pairs, flapping fast */}
      <g transform={`translate(-16 -186)`}>
        {wing(0, 0, -130, -120, 0.25 + Math.abs(beat) * 0.75, 0.75)}
        {wing(0, 14, -110, 40, 0.25 + Math.abs(beat) * 0.75, 0.6)}
      </g>
      <g transform={`translate(12 -186)`}>
        {wing(0, 0, 130, -120, 0.25 + Math.abs(beat) * 0.75, 0.75)}
        {wing(0, 14, 110, 40, 0.25 + Math.abs(beat) * 0.75, 0.6)}
      </g>
      {/* little legs tucked up */}
      <path d="M -10 -98 Q -24 -76 -14 -58 M 10 -98 Q 24 -76 16 -58" stroke={SKIN} strokeWidth={10} fill="none" strokeLinecap="round" />
      {/* tunic and belt */}
      <path d="M -40 -190 Q -48 -110 -30 -92 L 30 -92 Q 48 -110 40 -190 Z" fill={TUNIC} />
      <path d="M -40 -150 L 40 -150" stroke={C.brownDark} strokeWidth={10} strokeLinecap="round" />
      <path d="M -40 -190 Q -50 -170 -66 -164" stroke={TUNICD} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M 40 -190 Q 66 -180 78 -156" stroke={SKIN} strokeWidth={14} fill="none" strokeLinecap="round" />
      {/* head with pointed ears */}
      <path d="M -36 -236 L -86 -262 L -34 -214 Z" fill={SKIN} />
      <path d="M 34 -236 L 80 -262 L 32 -214 Z" fill={SKIN} />
      <circle cx={0} cy={-236} r={40} fill={SKIN} />
      <path d="M -40 -236 Q -40 -270 0 -270 Q 40 -270 40 -236 Q 20 -256 -10 -252 Q -30 -250 -40 -236 Z" fill={HAIR} />
      {giggle ? (
        <g>
          <path d="M 4 -238 Q 12 -244 20 -238" stroke={C.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
          <path d="M 18 -236 Q 26 -242 34 -236" stroke={C.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <circle cx={12} cy={-238} r={5} fill={C.ink} />
          <circle cx={30} cy={-238} r={5} fill={C.ink} />
        </g>
      )}
      <path d="M 10 -216 Q 26 -206 42 -218" stroke={C.inkSoft} strokeWidth={4} fill="none" strokeLinecap="round" />
      <circle cx={-4} cy={-222} r={6} fill={PETAL} opacity={0.4} />
      {/* flower hat: pointed petals on top of the head */}
      <g transform="translate(-4 -262)">
        <path d="M -8 0 Q -36 -40 -20 -90 Q -6 -66 -8 -20 Z" fill={PETAL} />
        <path d="M 8 0 Q 36 -40 20 -90 Q 6 -66 8 -20 Z" fill={PETALD} />
        <path d="M -4 2 Q -44 -20 -40 -60 Q -18 -40 -4 -6 Z" fill={PETALD} />
        <path d="M 4 2 Q 44 -20 40 -60 Q 18 -40 4 -6 Z" fill={PETAL} />
        <path d="M 0 -2 Q -16 -50 0 -118 Q 16 -50 0 -2 Z" fill={PETAL} />
        <path d="M 0 -6 Q -6 -44 0 -96" stroke={PETALD} strokeWidth={4} fill="none" />
        <circle cx={0} cy={-12} r={12} fill={C.yellow} />
      </g>
    </g>
  );
}
