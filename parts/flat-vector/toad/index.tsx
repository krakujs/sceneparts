import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector toad. Origin = ground under the body (bottom centre), faces right, honours flip, s and vx. About 220 px wide.
// pose sit: breathing and blink. hop: slow crouch and jump arc from f (120-frame cycle).

const WARTS: [number, number, number][] = [
  [-62, -104, 6], [-30, -118, 7], [2, -124, 6], [34, -114, 7], [66, -96, 6],
  [-84, -74, 5], [-50, -82, 6], [-16, -90, 5], [18, -86, 6], [50, -76, 5], [80, -62, 5],
  [-66, -50, 5], [-32, -56, 6], [4, -62, 5], [38, -52, 5],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "sit";
  const col = p.color ?? "#7A7A3E", dk = shade(col, 0.25), wart = shade(col, 0.4), belly = "#E8D9A4", gold = "#E8B63A";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;

  let lift = 0, sx = 1, sy = 1 + Math.sin(f / 16) * 0.012;
  if (pose === "hop") {
    const ph = (f % 120) / 120;
    if (ph < 0.14 || ph > 0.92) { sx = 1.07; sy = 0.92; }
    else {
      const u = (ph - 0.14) / 0.78;
      lift = -Math.sin(Math.PI * u) * 110;
      sx = 0.96; sy = 1.05;
    }
  }
  const blink = pose === "sit" && f % 150 < 6;
  const shadowK = Math.max(0.5, 1 + lift / 260);

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={105 * shadowK} ry={11 * shadowK} fill={C.shadow} />
      <g transform={`translate(0 ${lift.toFixed(1)}) scale(${sx} ${sy})`}>
        {/* back legs and feet */}
        <ellipse cx={-66} cy={-34} rx={46} ry={30} fill={dk} />
        <ellipse cx={-40} cy={-6} rx={42} ry={8} fill={dk} />
        {/* chunky body */}
        <ellipse cx={0} cy={-70} rx={100} ry={66} fill={col} />
        {/* warty bumps */}
        {WARTS.map(([wx, wy, r], i) => <circle key={i} cx={wx} cy={wy} r={r} fill={wart} />)}
        {/* pale belly */}
        <ellipse cx={6} cy={-54} rx={72} ry={36} fill={belly} />
        {/* front arms */}
        <path d="M 52 -62 L 74 -26" stroke={col} strokeWidth={16} strokeLinecap="round" fill="none" />
        <ellipse cx={76} cy={-20} rx={12} ry={9} fill={dk} />
        {/* gold eyes on top with horizontal pupils */}
        {[[-40, -136], [34, -132]].map(([ex, ey], i) => (
          <g key={i} transform={`translate(${ex} ${ey}) scale(1 ${blink ? 0.15 : 1})`}>
            <circle cx={0} cy={0} r={22} fill={col} />
            <circle cx={0} cy={0} r={15} fill={gold} />
            <ellipse cx={2} cy={0} rx={3.5} ry={10} fill={C.ink} />
          </g>
        ))}
        {/* wide mouth line */}
        <path d="M 30 -90 Q 66 -74 98 -94 Q 66 -82 30 -90 Z" fill={dk} />
      </g>
    </g>
  );
}
