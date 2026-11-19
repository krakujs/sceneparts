import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector frog. Origin = ground under the body (bottom centre), faces right, honours flip, s and vx. About 200 px wide.
// pose sit: breathing and blink. hop: crouch, jump arc from f, landing squash. croak: throat sac inflates from f.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "sit";
  const col = p.color ?? "#5DB85A", dk = shade(col, 0.2), belly = "#E6F5B5", sacC = "#CFEA8E";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;

  // vertical lift and squash for the hop cycle (48 frames: crouch, jump, land)
  let lift = 0, sx = 1, sy = 1 + Math.sin(f / 14) * 0.012;
  if (pose === "hop") {
    const ph = (f % 48) / 48;
    if (ph < 0.12 || ph > 0.94) { sx = 1.08; sy = 0.9; }
    else {
      const u = (ph - 0.12) / 0.82;
      lift = -Math.sin(Math.PI * u) * 170;
      sx = 0.95; sy = 1.07;
    }
  }
  const blink = pose === "sit" && f % 120 < 6;
  const sacK = pose === "croak" ? 0.5 + 0.5 * Math.sin(f * 0.35) : 0;
  const shadowK = Math.max(0.45, 1 + lift / 320);

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={100 * shadowK} ry={11 * shadowK} fill={C.shadow} />
      <g transform={`translate(0 ${lift.toFixed(1)}) scale(${sx} ${sy})`}>
        {/* back legs folded under the body */}
        <ellipse cx={-58} cy={-30} rx={46} ry={32} fill={dk} />
        <ellipse cx={-34} cy={-6} rx={44} ry={9} fill={dk} />
        {/* body and head as one soft shape */}
        <ellipse cx={0} cy={-78} rx={80} ry={62} fill={col} />
        <ellipse cx={10} cy={-128} rx={72} ry={44} fill={col} />
        <ellipse cx={14} cy={-62} rx={56} ry={36} fill={belly} />
        {/* front arms */}
        <path d="M 44 -64 L 64 -34" stroke={col} strokeWidth={17} strokeLinecap="round" fill="none" />
        <circle cx={66} cy={-30} r={10} fill={dk} />
        {/* throat sac */}
        <ellipse cx={46} cy={-88} rx={18 + 22 * sacK} ry={14 + 16 * sacK} fill={sacC} />
        {/* big eyes on top of the head */}
        {[[-22, -170], [36, -170]].map(([ex, ey], i) => (
          <g key={i}>
            <circle cx={ex} cy={ey} r={27} fill={col} />
            <g transform={`translate(${ex} ${ey}) scale(1 ${blink ? 0.15 : 1})`}>
              <circle cx={0} cy={0} r={20} fill={C.white} />
              <circle cx={5} cy={3} r={9} fill={C.ink} />
              <circle cx={1} cy={-4} r={3} fill={C.white} />
            </g>
          </g>
        ))}
        {/* nostrils and wide smile */}
        <circle cx={56} cy={-150} r={3} fill={dk} />
        <circle cx={70} cy={-148} r={3} fill={dk} />
        <path d="M -40 -118 Q 22 -84 78 -116 Q 24 -100 -40 -118 Z" fill={C.ink} />
      </g>
    </g>
  );
}
