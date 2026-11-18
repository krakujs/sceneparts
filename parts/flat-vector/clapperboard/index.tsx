import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Film clapperboard standing on the floor: a dark board with blank white lines, and a striped clapper arm
// hinged at the top-left. No text anywhere. Origin = bottom centre.
// anim "clap" (60-frame loop): the arm is raised, snaps shut onto the board, rests, then lifts again.
const f1 = (v: number) => v.toFixed(1);
const HINGE_X = -240;
const HINGE_Y = -400;
const STRIPES = [0, 1, 2, 3, 4, 5, 6, 7];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const board = p.color && p.color !== "none" ? p.color : C.ink;
  const anim: string = p.anim ?? "clap";
  const c = f % 60;
  // arm angle: -40 = raised, 0 = shut on the board
  const angle = anim !== "clap" ? -40
    : c < 24 ? -40
      : c < 30 ? -40 + (40 * (c - 24)) / 6
        : c < 40 ? 0
          : (-40 * (c - 40)) / 20;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.06 : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) scale(${f1(pop)})`}>
        {/* slate board with blank white lines */}
        <rect x={-240} y={-370} width={460} height={370} rx={12} fill={board} />
        <rect x={-240} y={-370} width={460} height={14} rx={6} fill={shade(board, -0.3)} />
        <rect x={-222} y={-352} width={424} height={320} rx={6} fill="none" stroke="#FFFFFF" strokeWidth={5} opacity={0.6} />
        <line x1={-222} y1={-280} x2={202} y2={-280} stroke="#FFFFFF" strokeWidth={4} opacity={0.5} />
        <line x1={-222} y1={-210} x2={202} y2={-210} stroke="#FFFFFF" strokeWidth={4} opacity={0.5} />
        <line x1={-222} y1={-140} x2={202} y2={-140} stroke="#FFFFFF" strokeWidth={4} opacity={0.5} />
        <line x1={-40} y1={-352} x2={-40} y2={-32} stroke="#FFFFFF" strokeWidth={4} opacity={0.5} />
        <line x1={80} y1={-352} x2={80} y2={-32} stroke="#FFFFFF" strokeWidth={4} opacity={0.5} />
        {/* clapper arm: a striped bar rotating about its hinge */}
        <g transform={`translate(${HINGE_X} ${HINGE_Y}) rotate(${f1(angle)})`}>
          <rect x={0} y={-30} width={460} height={60} rx={8} fill={board} />
          {STRIPES.map((i) => (
            <rect key={i} x={20 + i * 56} y={-30} width={28} height={60} fill="#FFFFFF" opacity={0.9} />
          ))}
          <circle cx={0} cy={0} r={14} fill={C.greyDark} />
        </g>
      </g>
    </g>
  );
}
