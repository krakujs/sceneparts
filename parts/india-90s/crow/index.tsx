import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

export const Crow: React.FC<{ x: number; y: number; scale?: number; flap?: number }> = ({ x, y, scale = 1, flap = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -60 0 Q -10 -50 50 -20 L 80 -28 L 60 -8 Q 30 30 -30 20 L -90 30 Z" fill="#1B1B22" stroke={INK} strokeWidth={5} />
    <path d={`M -20 -10 Q -40 ${-60 - flap * 60} -100 ${-40 - flap * 70} Q -60 -10 -20 -10 Z`} fill="#2C2C36" stroke={INK} strokeWidth={5} />
    <circle cx={42} cy={-22} r={6} fill="#FFFFFF" />
    <circle cx={43} cy={-22} r={3} fill={INK} />
    <path d="M 0 22 L -6 50 M 20 20 L 24 50" stroke={INK} strokeWidth={5} />
  </g>
);

// Modern phone with Wi-Fi bars (0–3)

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Crow {...(rest as any)} frame={f} />;
}
