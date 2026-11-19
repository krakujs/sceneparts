import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Fuller: medieval cloth worker standing knee-deep in a wooden tub, treading cloth (walks in place).
const Tub = () => (
  <g>
    <path d="M -150 -150 L -136 -20 Q 0 4 136 -20 L 150 -150 Z" fill="#A0794C" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-96, -48, 0, 48, 96].map((x) => (
      <line key={x} x1={x} y1={-138} x2={x * 0.92} y2={-24} stroke="#6B4A2E" strokeWidth={4} opacity={0.6} />
    ))}
    <path d="M -146 -120 Q 0 -98 146 -120" stroke={C.ink} strokeWidth={6} fill="none" />
    <path d="M -141 -56 Q 0 -36 141 -56" stroke={C.ink} strokeWidth={6} fill="none" />
    <ellipse cx={0} cy={-150} rx={150} ry={26} fill="#8A6A45" stroke={C.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-150} rx={136} ry={18} fill="#2E7D7A" stroke={C.ink} strokeWidth={5} />
    <path d="M -90 -156 Q -60 -168 -30 -156 M 26 -146 Q 56 -160 88 -146" stroke="#9CC9CF" strokeWidth={5} fill="none" strokeLinecap="round" />
    <circle cx={-60} cy={-144} r={5} fill="#FFFFFF" opacity={0.7} />
    <circle cx={70} cy={-152} r={4} fill="#FFFFFF" opacity={0.7} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="kerchief" hatColour={C.brick} hair="short" top="tunic" coat={p.coat}
      lower="breeches" legs={p.legs} skin={p.skin} pose="down" action="walk"
      front={<Tub />}
    />
  );
}
