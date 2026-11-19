import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Chalkboard: green board in a wooden frame with a chalk tray and chalk doodles (shapes and simple signs, no words).
// Wall item: centred on (x, y), default y = 760. anim "draw": each doodle is sketched in turn, 40 frames apart.
const f1 = (v: number) => v.toFixed(1);
const CHALK = "#F2F4F1";

// Doodles: path data in board coordinates, with the frame each one starts drawing.
const DOODLES = [
  "M -230 110 L -150 -30 L -70 110 Z", // triangle
  "M -40 40 A 52 52 0 1 0 64 40 A 52 52 0 1 0 -40 40 Z", // circle
  "M 100 40 L 160 40 M 130 10 L 130 70", // plus sign
  "M 200 22 L 262 22 M 200 60 L 262 60", // equals sign
  "M -260 -110 Q -230 -150 -200 -110 T -140 -110 T -80 -110 T -20 -110", // squiggle
  "M 60 -150 L 75 -115 L 112 -112 L 83 -90 L 93 -54 L 60 -76 L 27 -54 L 37 -90 L 8 -112 L 45 -115 Z", // star
  "M 180 -120 Q 186 -165 226 -160 Q 258 -152 240 -124 L 180 -70 L 254 -70", // small number 2
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const board = p.color && p.color !== "none" ? p.color : "#3E7360";
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const draw = p.anim === "draw";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* wooden frame */}
      <rect x={-330} y={-220} width={660} height={440} rx={16} fill={frame} />
      <rect x={-330} y={-220} width={660} height={440} rx={16} fill="none" stroke={shade(frame, 0.25)} strokeWidth={6} />
      {/* board */}
      <rect x={-300} y={-190} width={600} height={380} rx={6} fill={board} />
      <rect x={-300} y={-190} width={600} height={14} rx={6} fill={shade(board, 0.15)} />
      {/* faint chalk smudges */}
      <ellipse cx={-170} cy={-110} rx={100} ry={30} fill={C.white} opacity={0.05} />
      <ellipse cx={180} cy={80} rx={120} ry={36} fill={C.white} opacity={0.05} />
      <ellipse cx={20} cy={-120} rx={60} ry={18} fill={C.white} opacity={0.04} />
      {/* doodles, each sketched in turn when anim is draw */}
      {DOODLES.map((d, i) => {
        const prog = draw ? Math.min(1, Math.max(0, (f - i * 40) / 40)) : 1;
        return (
          <path key={i} d={d} fill="none" stroke={CHALK} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round"
            pathLength={1} strokeDasharray={`${prog.toFixed(3)} 1`} />
        );
      })}
      {/* chalk tray and sticks */}
      <rect x={-250} y={220} width={500} height={22} rx={6} fill={shade(frame, 0.2)} />
      <rect x={-60} y={198} width={56} height={22} rx={8} fill={C.white} />
      <rect x={6} y={198} width={56} height={22} rx={8} fill={C.yellow} />
      <rect x={72} y={198} width={56} height={22} rx={8} fill={C.pink} />
    </g>
  );
}
