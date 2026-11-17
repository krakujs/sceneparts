import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";
import { Adult } from "../adult/index";

// a neighbour's window (close-up) – glass can shatter; an aunty can pop up behind it
export const HouseWindow: React.FC<{ broken?: number; aunty?: number; angry?: boolean }> = ({ broken = 0, aunty = 0, angry = true }) => (
  <g>
    <rect width={1080} height={1920} fill="#E8C3D3" />
    {new Array(10).fill(0).map((_, k) => <rect key={k} x={0} y={k * 200} width={1080} height={8} fill="#000" opacity={0.04} />)}
    <rect x={190} y={330} width={700} height={820} fill="#4A3B33" stroke={INK} strokeWidth={10} />
    <rect x={220} y={360} width={640} height={760} fill="#7FB6CF" />
    <g transform={`translate(0 ${(1 - aunty) * 520})`}>
      <defs><clipPath id="win-aunty"><rect x={220} y={360} width={640} height={760} /></clipPath></defs>
      <g clipPath="url(#win-aunty)">
        <Adult x={540} y={1650} scale={1.25} kind="mummy" mouth={angry ? "open" : "smile"} armR={-150} />
      </g>
    </g>
    <line x1={540} y1={360} x2={540} y2={1120} stroke={INK} strokeWidth={10} />
    <line x1={220} y1={740} x2={860} y2={740} stroke={INK} strokeWidth={10} />
    <rect x={220} y={360} width={640} height={760} fill="#FFFFFF" opacity={0.18 * (1 - broken)} />
    {broken > 0 ? (
      <g stroke="#FFFFFF" strokeWidth={6} opacity={broken} fill="none" strokeLinecap="round">
        {[[0, -1], [0.6, -0.8], [1, -0.1], [0.7, 0.7], [0, 1], [-0.7, 0.6], [-1, -0.1], [-0.5, -0.9]].map(([dx, dy], k) => (
          <polyline key={k} points={`700,560 ${700 + dx * 90},${560 + dy * 70} ${700 + dx * 170 + (k % 2) * 20},${560 + dy * 150} ${700 + dx * 260},${560 + dy * 230}`} />
        ))}
        <circle cx={700} cy={560} r={40} />
      </g>
    ) : null}
    <rect x={160} y={1150} width={760} height={60} fill="#C9A066" stroke={INK} strokeWidth={8} />
    {/* potted tulsi on the sill */}
    <rect x={720} y={1060} width={110} height={90} fill={P.brick} stroke={INK} strokeWidth={6} />
    <path d="M 775 1060 q -40 -80 -10 -140 q 10 50 10 140 q 20 -90 50 -120 q -10 70 -50 120" fill={P.green} stroke={INK} strokeWidth={5} />
  </g>
);

// floodlit stadium for the "today" twist

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <HouseWindow {...(rest as any)} frame={f} />;
}
