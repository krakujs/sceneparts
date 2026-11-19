import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// Ink pen (tip at 0,0), angle in degrees
export const Pen: React.FC<{ x: number; y: number; rot?: number; scale?: number }> = ({ x, y, rot = -35, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <path d="M 0 0 L 14 -40 L -14 -40 Z" fill="#C9D0D4" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-18} y={-260} width={36} height={222} rx={10} fill="#1F3A93" stroke={INK} strokeWidth={6} />
    <rect x={-20} y={-290} width={40} height={60} rx={10} fill="#2B2B33" stroke={INK} strokeWidth={6} />
    <rect x={14} y={-285} width={10} height={90} rx={4} fill="#C9D0D4" stroke={INK} strokeWidth={4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Pen {...(rest as any)} frame={f} />;
}
