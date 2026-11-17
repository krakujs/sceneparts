import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector crab. Origin = bottom centre on the ground (y). Faces right, honours flip, s and vx.
// pose idle: gentle breathing bob and slow eye blink. walk: legs step in turn, body bobs.
// snap: both claws open and snap shut from p.f.

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "idle";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const SH = p.color ?? "#F0703A", DK = shade(SH, 0.2), STALK = shade(SH, 0.12);
  const walk = pose === "walk", snap = pose === "snap";
  const ph = f * 0.2;
  const bob = walk ? -Math.abs(Math.sin(ph)) * 4 : Math.sin(f * 0.06) * 1.5;
  const open = snap ? 4 + 26 * Math.pow((Math.sin(f * 0.3) + 1) / 2, 2) : 8 + 3 * Math.sin(f * 0.07);
  const blink = Math.sin(f * 0.031) > 0.985 ? 0.15 : 1;

  const legs: React.ReactNode[] = [];
  for (const side of [-1, 1]) for (let j = 0; j < 4; j++) {
    const phase = (j % 2 ? Math.PI : 0) + (side < 0 ? Math.PI : 0);
    const st = walk ? Math.sin(ph + phase) * 8 : 0;
    const lift = walk ? Math.max(0, Math.cos(ph + phase)) * 10 : 0;
    const ax = side * (44 + j * 14), ay = -66 + bob;
    const kx = side * (88 + j * 14) + st * 0.4, ky = -34 + bob * 0.5 - lift * 0.5;
    const fx = side * (100 + j * 18) + st, fy = -4 - lift;
    legs.push(<path key={`${side}-${j}`} d={`M ${ax} ${ay} Q ${kx} ${ky} ${fx} ${fy}`} fill="none" stroke={j % 2 ? SH : DK} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />);
  }

  // One claw, drawn for the right side; the left claw is the same mirrored.
  const claw = (side: number) => (
    <g transform={side < 0 ? "scale(-1 1)" : undefined}>
      <path d="M 84 -92 C 104 -108 112 -122 116 -134" fill="none" stroke={SH} strokeWidth={20} strokeLinecap="round" />
      <path d="M 118 -152 C 136 -170 160 -166 172 -150 C 158 -152 138 -150 120 -146 Z" fill={SH} transform={`rotate(${-open} 126 -148)`} />
      <path d="M 118 -128 C 136 -110 160 -114 172 -130 C 158 -128 138 -130 120 -134 Z" fill={DK} transform={`rotate(${open} 126 -132)`} />
      <ellipse cx={120} cy={-140} rx={26} ry={22} fill={SH} />
    </g>
  );

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      {legs}
      <g transform={`translate(0 ${bob})`}>
        {claw(-1)}
        {claw(1)}
        <path d="M -40 -136 L -44 -172" stroke={STALK} strokeWidth={12} strokeLinecap="round" />
        <path d="M 40 -136 L 44 -172" stroke={STALK} strokeWidth={12} strokeLinecap="round" />
        <path d="M -105 -100 C -105 -140 -52 -150 0 -150 C 52 -150 105 -140 105 -100 C 105 -76 82 -66 52 -66 L -52 -66 C -82 -66 -105 -76 -105 -100 Z" fill={SH} />
        <path d="M -100 -88 C -100 -74 -80 -66 -52 -66 L 52 -66 C 80 -66 100 -74 100 -88 C 80 -78 56 -76 0 -76 C -56 -76 -80 -78 -100 -88 Z" fill={DK} />
        <ellipse cx={-36} cy={-124} rx={26} ry={9} fill="#FFFFFF" opacity={0.25} transform="rotate(-12 -36 -124)" />
        {([[-56, -112, 6], [-20, -132, 5], [30, -130, 6], [62, -110, 5]] as number[][]).map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={DK} opacity={0.6} />
        ))}
        {[-1, 1].map((side) => (
          <g key={side} transform={`translate(${side * 44} -186)`}>
            <g transform={`scale(1 ${blink})`}>
              <circle r={18} fill="#FFFFFF" />
              <circle cx={2} cy={2} r={8} fill="#1F2433" />
              <circle cx={4} cy={-1} r={2.5} fill="#FFFFFF" />
            </g>
          </g>
        ))}
      </g>
    </g>
  );
}
