import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// ---------- 90s living room ----------
export const Room: React.FC<{ wall?: string; floorY?: number; night?: boolean }> = ({ wall = P.wall, floorY = 1300, night = false }) => (
  <g>
    <rect width={1080} height={floorY} fill={wall} />
    {new Array(14).fill(0).map((_, k) => <rect key={k} x={k * 80} y={0} width={40} height={floorY} fill="#000" opacity={0.025} />)}
    <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill={P.floor} />
    {new Array(8).fill(0).map((_, k) => <line key={k} x1={0} y1={floorY + 60 + k * 90} x2={1080} y2={floorY + 60 + k * 90} stroke={INK} strokeWidth={3} opacity={0.25} />)}
    <rect x={0} y={floorY - 14} width={1080} height={20} fill={P.wallDark} stroke={INK} strokeWidth={4} />
    {/* window with grill */}
    <rect x={60} y={300} width={250} height={340} fill={night ? "#2C3550" : "#CFEAF2"} stroke={INK} strokeWidth={SW} />
    {[1, 2, 3, 4].map((k) => <line key={k} x1={60 + k * 50} y1={300} x2={60 + k * 50} y2={640} stroke={INK} strokeWidth={5} />)}
    <line x1={60} y1={470} x2={310} y2={470} stroke={INK} strokeWidth={5} />
    {/* tube light */}
    <rect x={560} y={150} width={330} height={26} rx={13} fill="#FFFDF2" stroke={INK} strokeWidth={5} />
    <rect x={540} y={176} width={370} height={14} fill={P.wallDark} stroke={INK} strokeWidth={4} />
    {/* wall calendar (generic) */}
    <rect x={870} y={330} width={150} height={200} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    <rect x={870} y={330} width={150} height={70} fill={P.brick} stroke={INK} strokeWidth={5} />
    {new Array(12).fill(0).map((_, k) => <rect key={k} x={886 + (k % 4) * 32} y={414 + Math.floor(k / 4) * 34} width={22} height={22} fill={P.concreteDark} />)}
  </g>
);

// Family seen from behind on the sofa (watching TV)

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Room {...(rest as any)} frame={f} />;
}
