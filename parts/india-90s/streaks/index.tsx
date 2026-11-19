import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// motion streaks behind a moving object
export const Streaks: React.FC<{ x: number; y: number; dx: number; dy: number; n?: number }> = ({ x, y, dx, dy, n = 4 }) => {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  return (
    <g stroke={INK} strokeWidth={6} strokeLinecap="round" opacity={0.5}>
      {new Array(n).fill(0).map((_, k) => {
        const off = (k - (n - 1) / 2) * 18;
        return <line key={k} x1={x - ux * 40 - uy * off} y1={y - uy * 40 + ux * off} x2={x - ux * (110 + k * 20) - uy * off} y2={y - uy * (110 + k * 20) + ux * off} />;
      })}
    </g>
  );
};

// big slammed stamp ("OUT!", "SIX!")

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Streaks {...(rest as any)} frame={f} />;
}
