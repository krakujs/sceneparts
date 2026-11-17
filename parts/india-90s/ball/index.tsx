import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

export const Ball: React.FC<{ x: number; y: number; r?: number; spin?: number }> = ({ x, y, r = 26, spin = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${spin})`}>
    <circle r={r} fill="#D7F04A" stroke={INK} strokeWidth={5} />
    <path d={`M ${-r * 0.8} ${-r * 0.4} Q 0 ${r * 0.3} ${r * 0.8} ${-r * 0.4}`} stroke="#FFFFFF" strokeWidth={4} fill="none" />
  </g>
);

// motion streaks behind a moving object

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Ball {...(rest as any)} frame={f} />;
}
