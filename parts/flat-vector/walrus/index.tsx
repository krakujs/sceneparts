import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector walrus, lying on the ground with a big barrel body, wrinkled skin, bristles and long white tusks.
// Origin = bottom centre (ground), faces right, honours flip. About 600 px long and 340 px tall at s = 1.
// pose rest: breathing only. idle: breathing plus a slow head nod. swim: body rock and flipper paddle.

const BROWN = "#9C6B4B", DARK = shade(BROWN, 0.3), MUZ = "#B07C5A", IVORY = "#F6F0DF", IVORY_DK = "#D8CDB0";

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "rest";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1500;
  const ph = f * 0.06;
  const breathe = 1 + Math.sin(f * 0.06) * 0.012;
  const headRot = pose === "idle" ? Math.sin(f * 0.05) * 3 : 0;
  const rock = pose === "swim" ? Math.sin(ph) * 2 : 0;
  const paddle = pose === "swim" ? Math.sin(ph * 2) * 12 : 0;
  const bristles: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) bristles.push([278 + c * 12, -206 + r * 14 + (c % 2) * 4]);
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${rock} 0 0) scale(1 ${breathe})`}>
        <path d="M -250 -18 C -270 -24 -280 -34 -262 -44 C -240 -52 -220 -40 -226 -24 Z" fill={DARK} />
        <path d="M -270 -30 C -280 -120 -220 -200 -110 -240 C -40 -268 60 -290 120 -270 C 160 -256 170 -200 170 -150 C 170 -60 140 -10 60 -4 C -40 2 -200 2 -250 -10 C -266 -16 -272 -22 -270 -30 Z" fill={BROWN} />
        <g fill="none" stroke={DARK} strokeWidth={5} strokeLinecap="round" opacity={0.6}>
          <path d="M -170 -160 Q -150 -140 -170 -120" /><path d="M -120 -190 Q -100 -170 -124 -150" />
          <path d="M -60 -220 Q -40 -200 -62 -180" /><path d="M -210 -90 Q -190 -70 -210 -50" />
        </g>
        {taper([90, -60], [150, -30], [196, -4], 60, 14, DARK, "fl", true)}
        <g transform={`rotate(${paddle} -230 -20)`}>
          <ellipse cx={-240} cy={-16} rx={46} ry={14} transform="rotate(-14 -240 -16)" fill={DARK} />
        </g>
        <g transform={`rotate(${headRot} 190 -220)`}>
          <ellipse cx={190} cy={-240} rx={100} ry={94} fill={BROWN} />
          <ellipse cx={250} cy={-206} rx={62} ry={44} fill={MUZ} />
          <circle cx={204} cy={-272} r={9} fill={C.ink} />
          <circle cx={206} cy={-275} r={2.8} fill="#FFFFFF" />
          {taper([212, -190], [236, -140], [244, -82], 22, 4, IVORY)}
          {taper([236, -196], [262, -150], [276, -86], 26, 4, IVORY)}
          <path d="M 242 -170 L 250 -140" stroke={IVORY_DK} strokeWidth={3} strokeLinecap="round" />
          <g fill={DARK} opacity={0.7}>
            {bristles.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={3} />)}
          </g>
        </g>
      </g>
    </g>
  );
}
