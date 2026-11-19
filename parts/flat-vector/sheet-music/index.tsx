import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Music stand with a sheet of music clipped on top: a tripod foot, a tall post, and a tilted white sheet with
// two five-line staves, notes and a treble clef. Origin = bottom centre of the foot. Room scale.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

// Staff lines for one stave, starting at top y0, spacing 16 px.
const staff = (y0: number) => [0, 1, 2, 3, 4].map((i) => <line key={`${y0}-${i}`} x1={-190} y1={y0 + i * 16} x2={190} y2={y0 + i * 16} stroke={C.greyDark} strokeWidth={3} />);
const note = (x: number, y: number, c: string) => (
  <g key={`n${x}-${y}`}>
    <ellipse cx={x} cy={y} rx={11} ry={8} transform={`rotate(-20 ${x} ${y})`} fill={c} />
    <rect x={x + 9} y={y - 56} width={4} height={56} fill={c} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const sway = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 50) * 1.5 : 0;
  const pop = anim === "pop" ? easeOutBack(Math.min(1, Math.max(0, f / 20))) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) scale(${f1(pop)})`}>
        {/* tripod foot and post */}
        <path d="M -150 0 L -20 -30 L 20 -30 L 150 0 L 130 0 L 20 -20 L -20 -20 L -130 0 Z" fill={frame} />
        <rect x={-14} y={-700} width={28} height={680} rx={12} fill={frame} />
        <rect x={-6} y={-680} width={6} height={640} rx={3} fill="#FFFFFF" opacity={0.15} />
        {/* sheet: white paper on a slight tilt, with a book-like shadow edge */}
        <g transform={`translate(0 -700) rotate(${f1(-4 + sway)})`}>
          <rect x={-200} y={-300} width={400} height={300} rx={8} fill={shade(C.paper, 0.12)} />
          <rect x={-206} y={-306} width={400} height={300} rx={8} fill="#FFFFFF" />
          {staff(-270)}
          {staff(-200)}
          {/* treble clef, simplified */}
          <path d="M -170 -250 Q -160 -290 -150 -262 Q -146 -226 -162 -210 Q -180 -196 -182 -220 Q -184 -236 -170 -250 Z" fill={C.ink} opacity={0.85} />
          <rect x={-164} y={-300} width={6} height={190} rx={3} fill={C.ink} opacity={0.85} />
          {/* notes */}
          {note(-100, -250, C.ink)}
          {note(-40, -242, C.ink)}
          {note(20, -234, C.blue)}
          {note(80, -226, C.ink)}
          {note(-70, -180, C.ink)}
          {note(30, -170, C.ink)}
          {note(110, -180, C.blue)}
        </g>
        {/* clip holding the sheet to the stand */}
        <rect x={-30} y={-700} width={60} height={22} rx={8} fill={C.greyDark} />
      </g>
    </g>
  );
}
