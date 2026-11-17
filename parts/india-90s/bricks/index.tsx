import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// brick-stack stumps
export const Bricks: React.FC<{ x: number; y: number; scale?: number; fall?: number }> = ({ x, y, scale = 1, fall = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {[0, 1, 2, 3].map((k) => (
      <rect key={k} x={-60 + (k % 2) * 8 + fall * k * 22} y={-40 - k * 40 + fall * k * 34} width={120} height={40} rx={4} fill="#B5452F" stroke={INK} strokeWidth={5}
        transform={`rotate(${fall * k * 18} 0 ${-20 - k * 40})`} />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Bricks {...(rest as any)} frame={f} />;
}
