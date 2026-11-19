import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector spotted harbour seal, lying on its belly with the head raised. Origin = bottom centre (ground),
// faces right, honours flip. About 560 px long at s = 1.
// pose rest: breathing only. idle: breathing plus a slow head bob. swim: body wriggle and flipper paddle.

const GREY = "#8C9AA8", DARK = shade(GREY, 0.3), PALE = "#D9E0E7", SPOT = shade(GREY, 0.45);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "rest";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1500;
  const ph = f * 0.07;
  const breathe = 1 + Math.sin(f * 0.07) * 0.012;
  const headRot = pose === "idle" ? Math.sin(f * 0.05) * 4 : 0;
  const sway = pose === "swim" ? Math.sin(ph) * 6 : 0;
  const paddle = pose === "swim" ? Math.sin(ph * 2) * 14 : 0;
  const spots: [number, number, number][] = [[-180, -60, 12], [-120, -90, 9], [-60, -70, 11], [0, -100, 8], [50, -44, 9], [-200, -26, 8], [120, -118, 7], [-240, -60, 7], [-100, -36, 8], [30, -80, 6]];
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`translate(${sway} 0) scale(1 ${breathe})`}>
        <path d="M -262 -18 C -290 -4 -300 6 -282 8 C -262 10 -240 4 -226 -6 Z" fill={DARK} />
        <path d="M -270 -30 C -230 -92 -130 -122 -40 -122 C 40 -122 110 -150 170 -178 L 196 -150 C 176 -64 156 -18 66 -2 C -20 12 -150 6 -210 -2 C -248 -10 -270 -20 -270 -30 Z" fill={GREY} />
        <path d="M -220 -4 C -120 -40 40 -36 120 -30 C 150 -28 166 -14 170 -2 C 60 -2 -100 -4 -220 -4 Z" fill={PALE} />
        {spots.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={SPOT} opacity={0.7} />)}
        <g transform={`rotate(${paddle} 96 -52)`}>
          <path d="M 90 -80 C 150 -60 190 -30 214 -8 C 186 -2 150 -2 118 -14 C 96 -30 84 -50 90 -80 Z" fill={DARK} />
        </g>
        <g transform={`rotate(${headRot} 210 -130)`}>
          <ellipse cx={222} cy={-170} rx={66} ry={56} transform="rotate(-12 222 -170)" fill={GREY} />
          <ellipse cx={278} cy={-158} rx={34} ry={26} fill={PALE} />
          <circle cx={296} cy={-166} r={9} fill={C.ink} />
          <circle cx={232} cy={-184} r={9} fill={C.ink} />
          <circle cx={235} cy={-187} r={2.8} fill="#FFFFFF" />
          <g fill={SPOT} opacity={0.8}>
            <circle cx={266} cy={-140} r={3} /><circle cx={280} cy={-138} r={3} /><circle cx={292} cy={-142} r={3} />
          </g>
        </g>
      </g>
    </g>
  );
}
