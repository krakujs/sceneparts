import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// Stair room ("mumty") with a door someone shouts out of
export const Mumty: React.FC<{ x: number; floorY: number; open?: number; children?: React.ReactNode }> = ({ x, floorY, open = 1, children }) => (
  <g>
    <rect x={x} y={floorY - 430} width={300} height={440} fill="#E3B486" stroke={INK} strokeWidth={SW} />
    <rect x={x - 14} y={floorY - 450} width={328} height={30} fill={P.concreteDark} stroke={INK} strokeWidth={SW} />
    <rect x={x + 80} y={floorY - 330} width={150} height={330} fill="#3A2418" stroke={INK} strokeWidth={SW} />
    {children}
    <rect x={x + 80} y={floorY - 330} width={150 * (1 - 0.75 * open)} height={330} fill={P.teal} stroke={INK} strokeWidth={SW} />
  </g>
);

// ---------- people ----------

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Mumty {...(rest as any)} frame={f} />;
}
