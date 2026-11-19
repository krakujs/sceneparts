import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// Red pillar letterbox, feet at (x, y)
export const LetterBox: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-150} y={-40} width={300} height={40} rx={8} fill={P.concreteDark} stroke={INK} strokeWidth={SW} />
    <path d="M -120 -40 L -120 -560 Q -120 -680 0 -680 Q 120 -680 120 -560 L 120 -40 Z" fill="#D2322A" stroke={INK} strokeWidth={SW} />
    <path d="M -135 -560 Q -135 -700 0 -700 Q 135 -700 135 -560 Z" fill="#B3261F" stroke={INK} strokeWidth={SW} />
    <rect x={-70} y={-500} width={140} height={22} rx={10} fill={INK} />
    <rect x={-70} y={-420} width={140} height={80} rx={8} fill={P.cream} stroke={INK} strokeWidth={5} />
    <text x={0} y={-368} textAnchor="middle" fontFamily={typeFont} fontSize={36} fill={INK}>POST</text>
    <rect x={-90} y={-260} width={180} height={150} rx={10} fill="#BF2B24" stroke={INK} strokeWidth={5} />
    <circle cx={60} cy={-185} r={10} fill={INK} />
    <path d="M -100 -600 Q -80 -650 -30 -660" stroke="#FFFFFF" strokeWidth={10} fill="none" opacity={0.35} strokeLinecap="round" />
  </g>
);

// Ink pen (tip at 0,0), angle in degrees

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <LetterBox {...(rest as any)} frame={f} />;
}
