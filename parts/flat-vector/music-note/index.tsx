import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Two floating notes: a single quaver (eighth note) on the left and a beamed pair on the right.
// Origin = centre of the group. anim "float": the notes drift up and fade in a loop of 120 frames.
// anim "pulse": the notes grow and shrink to a beat of 30 frames. anim "spin": the group sways side to side.
const f1 = (v: number) => v.toFixed(1);

// A notehead (tilted ellipse) with a stem going up on the right side.
const Head = ({ x, y, c }: { x: number; y: number; c: string }) => (
  <ellipse cx={x} cy={y} rx={40} ry={30} transform={`rotate(-20 ${x} ${y})`} fill={c} />
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 700;
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "float";
  const ph = (f % 120) / 120;
  const fy = anim === "float" ? -120 * ph : 0;
  const op = anim === "float" ? Math.sin(Math.PI * ph) : 1;
  const beat = anim === "pulse" ? 1 + 0.08 * Math.sin((f * 2 * Math.PI) / 30) : 1;
  const sway = anim === "spin" ? Math.sin((f * 2 * Math.PI) / 90) * 6 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${s})`}>
      <g transform={`translate(0 ${f1(fy)}) rotate(${f1(sway)}) scale(${f1(beat)})`} opacity={op.toFixed(3)}>
        {/* single quaver: head, stem, flag */}
        <g transform="translate(-130 60)">
          <Head x={0} y={0} c={c} />
          <rect x={26} y={-170} width={14} height={170} rx={5} fill={c} />
          <path d="M 40 -170 C 90 -150 110 -110 80 -60 C 110 -100 100 -130 40 -140 Z" fill={c} />
        </g>
        {/* beamed pair */}
        <g transform="translate(100 -20)">
          <Head x={-60} y={100} c={C.navy} />
          <Head x={60} y={60} c={C.navy} />
          <rect x={-20} y={-100} width={14} height={170} rx={5} fill={C.navy} />
          <rect x={100} y={-140} width={14} height={170} rx={5} fill={C.navy} />
          <path d="M -20 -100 L 114 -140 L 114 -100 L -20 -60 Z" fill={C.navy} />
        </g>
        {/* sparkle */}
        <circle cx={190} cy={-200} r={12} fill={C.yellow} />
        <circle cx={-190} cy={-150} r={8} fill={C.yellow} />
      </g>
    </g>
  );
}
