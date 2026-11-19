import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// ---------- gully (street lane, frontal perspective) ----------
export const Gully: React.FC<{ tint?: number ; frame?: number }> = ({ frame = 0, tint = 0 }) => {
  const f = frame;
  const win = (pts: string, k: string, lit = false) => <polygon key={k} points={pts} fill={lit ? "#FFE6A6" : "#5E4436"} stroke={INK} strokeWidth={5} />;
  return (
    <g>
      <rect width={1080} height={1920} fill="#A8DCEB" />
      <rect x={340} y={420} width={400} height={800} fill="#F2D49B" stroke={INK} strokeWidth={6} />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={380 + c * 120} y={480 + r * 170} width={70} height={100} rx={6} fill={r === 1 && c === 1 ? "#FFE6A6" : "#5E4436"} stroke={INK} strokeWidth={4} />))}
      <rect x={640} y={340} width={70} height={80} fill={P.tank} stroke={INK} strokeWidth={4} />
      {/* left wall */}
      <polygon points="0,0 380,380 380,1220 0,1560" fill="#E9A88E" stroke={INK} strokeWidth={7} />
      {win("60,300 200,410 200,620 60,560", "l1")}
      {win("250,450 330,510 330,680 250,640", "l2", true)}
      <polygon points="60,860 220,950 220,1330 60,1420" fill={P.teal} stroke={INK} strokeWidth={6} />
      {/* right wall */}
      <polygon points="1080,0 700,380 700,1220 1080,1560" fill="#BFD5E2" stroke={INK} strokeWidth={7} />
      {win("1020,300 880,410 880,620 1020,560", "r1", true)}
      {win("830,450 750,510 750,680 830,640", "r2")}
      <polygon points="1030,760 860,850 860,1040 1030,980" fill="#7CC4E6" stroke={INK} strokeWidth={6} />
      {/* balcony rail */}
      <polygon points="1040,1010 850,1080 850,1110 1040,1050" fill={P.brick} stroke={INK} strokeWidth={5} />
      {/* ground + drain */}
      <polygon points="0,1560 380,1220 700,1220 1080,1560 1080,1920 0,1920" fill="#9C8B76" stroke={INK} strokeWidth={6} />
      <polygon points="120,1920 455,1220 625,1220 960,1920" fill="#AD9C86" />
      <line x1={540} y1={1220} x2={540} y2={1920} stroke="#8A7A66" strokeWidth={6} strokeDasharray="40 40" />
      {/* wires + crows of a sort */}
      <path d={`M 0 180 Q 540 ${300 + Math.sin(f / 20) * 6} 1080 160`} stroke={INK} strokeWidth={4} fill="none" />
      <path d={`M 0 250 Q 540 ${360 + Math.sin(f / 23) * 6} 1080 230`} stroke={INK} strokeWidth={3} fill="none" />
      {tint ? <rect width={1080} height={1920} fill="#2B160C" opacity={tint} /> : null}
    </g>
  );
};

// brick-stack stumps

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Gully {...(rest as any)} frame={f} />;
}
