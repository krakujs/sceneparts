import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Gift wrapping set: a roll of paper on the left, its sheet unrolled to the right with polka dots,
// a pair of scissors and a spool of ribbon. Origin = centre of the floor line at y.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paper = p.color && p.color !== "none" ? p.color : C.pink;
  const roll = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8 : 0;
  const dots = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    dots.push(<circle key={`${r}-${c}`} cx={f1(40 + c * 52 + (r % 2) * 26)} cy={f1(-150 + r * 46)} r={11} fill={C.white} opacity={0.85} />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={60} cy={0} rx={460} ry={18} fill={C.shadow} />
      {/* unrolled sheet of paper: a flat band lying forward from the roll */}
      <path d="M -60 -220 L 230 -220 L 250 -12 L -60 -12 Z" fill={paper} />
      <path d="M -60 -220 L 230 -220 L 240 -190 L -60 -190 Z" fill={shade(paper, 0.12)} />
      {dots}
      {/* roll: a cylinder lying on its side, with its end visible at the left */}
      <rect x={-330} y={-200} width={260} height={200} rx={14} fill={roll} />
      <rect x={-330} y={-200} width={260} height={200} rx={14} fill={shade(roll, 0.12)} opacity={0.35} />
      <rect x={-330} y={-150} width={260} height={18} fill={shade(roll, 0.2)} opacity={0.6} />
      <ellipse cx={-330} cy={-100} rx={34} ry={100} fill={C.white} />
      <ellipse cx={-330} cy={-100} rx={34} ry={100} fill="none" stroke={shade(roll, 0.2)} strokeWidth={6} />
      <circle cx={-330} cy={-100} r={18} fill={C.brown} />
      {/* scissors: two blades crossing, with loop handles */}
      <g transform={`translate(0 ${f1(bob)})`}>
        <path d="M 240 -10 L 330 -190 L 350 -180 L 264 -4 Z" fill={C.greyDark} />
        <path d="M 230 -120 L 350 -20 L 340 -8 L 222 -112 Z" fill={C.grey} />
        <circle cx={330} cy={-16} r={24} fill="none" stroke={C.greyDark} strokeWidth={12} />
        <circle cx={250} cy={-190} r={24} fill="none" stroke={C.red} strokeWidth={12} />
        <circle cx={262} cy={-100} r={5} fill={C.ink} />
      </g>
      {/* spool of ribbon with a loose tail */}
      <g transform={`translate(0 ${f1(bob)})`}>
        <path d="M 420 -20 Q 470 -10 470 -60 Q 470 -110 430 -120 Q 384 -120 386 -70 Q 388 -30 420 -40" fill="none" stroke={C.yellow} strokeWidth={14} strokeLinecap="round" />
        <rect x={380} y={-120} width={100} height={120} rx={12} fill={C.yellow} />
        <rect x={380} y={-120} width={100} height={120} rx={12} fill="none" stroke={shade(C.yellow, 0.15)} strokeWidth={0} />
        <ellipse cx={380} cy={-60} rx={18} ry={60} fill={C.yellowDark} />
        <ellipse cx={480} cy={-60} rx={18} ry={60} fill={C.yellowDark} />
        <ellipse cx={480} cy={-60} rx={8} ry={24} fill={C.yellow} />
      </g>
    </g>
  );
}
