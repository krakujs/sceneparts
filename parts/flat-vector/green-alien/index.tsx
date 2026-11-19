import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Green alien: a classic little alien with an oval green head, two antennae with yellow bobbles, big black
// almond eyes, a silver jumpsuit and a waving hand. Custom drawing (not Person, not alien-visitor).
// Body space: feet at 0,0, faces the viewer, ~1000 px tall at s = 1.
const GREEN = "#7BD16B", GREEN_D = shade("#7BD16B", 0.18), SILVER = "#C9D2DF", SILVER_D = shade("#C9D2DF", 0.2), BELT = "#5D6578";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, pose = "wave" } = p as any;
  const wave = pose === "wave" ? Math.sin(f / 4) : 0;
  const blink = (f + 60) % 120 < 6;
  const sway = Math.sin(f / 14) * 8;
  // Almond eye, pointed at both ends; blinks by flattening. Left eye tilts up on the outside (+), right eye (-).
  const eye = (cx: number, cy: number, tilt: number) => (
    <g transform={`translate(${cx} ${cy}) rotate(${tilt})`}>
      <g transform={blink ? "scale(1 0.1)" : undefined}>
        <path d="M -44 0 Q 0 -92 44 0 Q 0 92 -44 0 Z" fill={C.ink} />
        <ellipse cx={-14} cy={-30} rx={11} ry={9} fill={C.white} />
      </g>
    </g>
  );
  const handR = pose === "wave" ? { x: 236 + wave * 14, y: -580 + wave * 10 } : { x: 192, y: -236 };
  const armPath = pose === "wave"
    ? `M 150 -410 Q 250 -470 ${handR.x} ${handR.y}`
    : `M 150 -410 L ${handR.x} ${handR.y}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={170} ry={18} fill={C.shadow} />
      {/* legs and boots */}
      <rect x={-118} y={-220} width={100} height={210} rx={44} fill={SILVER} />
      <rect x={18} y={-220} width={100} height={210} rx={44} fill={SILVER} />
      <rect x={-130} y={-50} width={122} height={52} rx={26} fill={BELT} />
      <rect x={8} y={-50} width={122} height={52} rx={26} fill={BELT} />
      {/* hanging left arm, behind the suit */}
      <path d="M -150 -410 L -186 -262" stroke={SILVER_D} strokeWidth={58} strokeLinecap="round" fill="none" />
      <circle cx={-192} cy={-236} r={36} fill={GREEN} />
      {/* jumpsuit */}
      <rect x={-150} y={-450} width={300} height={270} rx={64} fill={SILVER} />
      <rect x={-150} y={-250} width={300} height={28} fill={BELT} />
      <rect x={-22} y={-250} width={44} height={28} rx={6} fill={C.yellow} />
      <line x1={0} y1={-430} x2={0} y2={-270} stroke={SILVER_D} strokeWidth={8} strokeLinecap="round" />
      <rect x={40} y={-380} width={80} height={60} rx={14} fill={SILVER_D} />
      {/* neck */}
      <rect x={-38} y={-490} width={76} height={60} rx={22} fill={GREEN_D} />
      {/* antennae */}
      <path d={`M -80 -770 Q ${-96 + sway * 0.4} -840 ${-100 + sway} -900`} stroke={GREEN_D} strokeWidth={10} strokeLinecap="round" fill="none" />
      <path d={`M 80 -770 Q ${96 - sway * 0.4} -840 ${100 - sway} -900`} stroke={GREEN_D} strokeWidth={10} strokeLinecap="round" fill="none" />
      <circle cx={-100 + sway} cy={-908} r={22} fill={C.yellow} />
      <circle cx={100 - sway} cy={-908} r={22} fill={C.yellow} />
      {/* head */}
      <ellipse cx={0} cy={-640} rx={190} ry={175} fill={GREEN} />
      <ellipse cx={50} cy={-560} rx={120} ry={70} fill={GREEN_D} opacity={0.3} />
      {eye(-68, -650, 14)}
      {eye(68, -650, -14)}
      <path d="M -28 -520 Q 0 -492 28 -520" stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
      {/* waving or hanging right arm */}
      <path d={armPath} stroke={SILVER} strokeWidth={58} strokeLinecap="round" fill="none" />
      <circle cx={handR.x} cy={handR.y} r={36} fill={GREEN} />
    </g>
  );
}
