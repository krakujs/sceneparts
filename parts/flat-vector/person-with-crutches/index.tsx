import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Person with crutches: an adult standing on both legs, the front leg in a white cast, two forearm crutches.
// The back crutch is drawn behind the figure and the front crutch in front of it, in the figure's own space (flip-aware).
const shaft = (x1: number, y1: number, x2: number, y2: number) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.greyDark} strokeWidth={16} strokeLinecap="round" />
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const X = p.x + (p.vx ?? 0) * p.f;
  const cast = () => (
    <g>
      <path d="M 40 -252 L 50 -50" stroke={C.white} strokeWidth={84} strokeLinecap="round" />
      <path d="M 0 -170 L 84 -160 M 0 -120 L 84 -112" stroke={C.greyLight} strokeWidth={5} strokeLinecap="round" />
    </g>
  );
  return (
    <g transform={`translate(${X} ${p.y}) scale(${p.flip ? -s : s} ${s})`}>
      <g>
        {shaft(-30, -700, -100, -4)}
        <circle cx={-100} cy={-6} r={9} fill={C.ink} />
      </g>
      <Person {...p} x={0} y={0} s={1} f={p.f} flip={false} age="adult" pose="stand" over={cast} />
      <g>
        {shaft(64, -700, 132, -4)}
        <ellipse cx={79} cy={-548} rx={26} ry={10} fill={C.ink} />
        <rect x={80} y={-474} width={40} height={14} rx={7} fill={C.ink} />
        <circle cx={132} cy={-6} r={9} fill={C.ink} />
      </g>
    </g>
  );
}
