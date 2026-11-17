import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector lobster in side view. Origin = bottom centre on the ground (y). About 420 px long at s = 1.
// Faces right, honours flip, s and vx. pose idle: slow tail and antenna sway.
// walk: legs step and tail flicks. snap: claws open and snap shut from p.f.

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "idle";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const SH = p.color ?? "#C8322B", DK = shade(SH, 0.22);
  const walk = pose === "walk", snap = pose === "snap";
  const ph = f * 0.2;
  const bob = walk ? -Math.abs(Math.sin(ph)) * 3 : Math.sin(f * 0.05) * 1.5;
  const flick = Math.sin(f * (walk ? 0.2 : 0.07)) * (walk ? 6 : 3);
  const open = snap ? 4 + 24 * Math.pow((Math.sin(f * 0.3) + 1) / 2, 2) : 10 + 3 * Math.sin(f * 0.06);
  const feel = Math.sin(f * 0.06) * 4;

  const legs = [0, 1, 2, 3].map((j) => {
    const phase = j % 2 ? Math.PI : 0;
    const st = walk ? Math.sin(ph + phase) * 8 : 0;
    const lift = walk ? Math.max(0, Math.cos(ph + phase)) * 9 : 0;
    const ax = 52 + j * 28, ay = -54 + bob;
    return <path key={j} d={`M ${ax} ${ay} Q ${ax - 8 + st * 0.4} -26 ${ax + 4 + st} ${-4 - lift}`} fill="none" stroke={DK} strokeWidth={9} strokeLinecap="round" />;
  });

  const claw = (dx: number, dy: number, col: string) => (
    <g transform={`translate(${dx} ${dy})`}>
      <path d="M 128 -96 C 160 -100 178 -118 198 -110" fill="none" stroke={col} strokeWidth={18} strokeLinecap="round" />
      <path d="M 222 -116 C 240 -136 268 -132 288 -116 C 268 -118 246 -114 226 -106 Z" fill={col} transform={`rotate(${-open} 230 -108)`} />
      <path d="M 222 -94 C 240 -74 268 -78 288 -92 C 268 -90 246 -88 226 -86 Z" fill={DK} transform={`rotate(${open} 230 -92)`} />
      <ellipse cx={226} cy={-100} rx={26} ry={22} fill={col} />
    </g>
  );

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s}) translate(-50 0)`}>
      {legs}
      <g transform={`translate(0 ${bob})`}>
        {claw(-14, -30, DK)}
        {[0, 1, 2, 3].map((i) => {
          const cx = 10 - i * 28, ry = 38 - i * 3;
          return (
            <g key={i}>
              <ellipse cx={cx} cy={-60} rx={22} ry={ry} fill={DK} />
              <ellipse cx={cx} cy={-66} rx={22} ry={ry} fill={SH} />
            </g>
          );
        })}
        <g transform={`rotate(${flick} -96 -66)`}>
          <ellipse cx={-112} cy={-66} rx={18} ry={14} fill={SH} />
          <ellipse cx={-124} cy={-84} rx={26} ry={11} fill={DK} transform="rotate(-24 -124 -84)" />
          <ellipse cx={-124} cy={-48} rx={26} ry={11} fill={DK} transform="rotate(24 -124 -48)" />
        </g>
        <path d="M 30 -96 C 30 -124 74 -136 118 -128 C 148 -122 166 -106 170 -92 C 150 -70 120 -58 80 -56 C 48 -54 30 -72 30 -96 Z" fill={SH} />
        <path d="M 40 -72 C 64 -60 112 -60 150 -88 C 124 -64 92 -60 60 -68 Z" fill={DK} />
        <path d="M 160 -104 L 194 -94 L 160 -84 Z" fill={SH} />
        <g transform={`rotate(${feel} 150 -124)`}>
          <path d="M 150 -126 C 200 -170 240 -170 272 -212" fill="none" stroke={DK} strokeWidth={5} strokeLinecap="round" />
          <path d="M 144 -122 C 180 -150 210 -142 230 -170" fill="none" stroke={DK} strokeWidth={4} strokeLinecap="round" />
        </g>
        <path d="M 140 -118 L 146 -146" stroke={DK} strokeWidth={9} strokeLinecap="round" />
        <g transform="translate(148 -152)">
          <circle r={11} fill="#FFFFFF" />
          <circle cx={2} cy={1} r={5.5} fill="#1F2433" />
          <circle cx={0} cy={-2} r={1.8} fill="#FFFFFF" />
        </g>
        {claw(0, 0, SH)}
      </g>
    </g>
  );
}
