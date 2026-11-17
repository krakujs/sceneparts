import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Medieval peasant preset: rough brown tunic with a rope belt, linen coif, and a wooden bucket in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="dress"
      topColor={C.brown}
      bottom="trousers"
      bottomColor={C.brownDark}
      shoes="boots"
      shoesColor={C.ink}
      hat="headscarf"
      hatColor={C.brownDark}
      over={() => (
        <g>
          <rect x={-80} y={-488} width={170} height={16} rx={6} fill={C.sand} />
          {[-70, -50, -30, -10, 10, 30, 50, 70].map((x) => (
            <path key={x} d={`M ${x} -486 L ${x + 8} -474`} stroke={C.yellowDark} strokeWidth={3} strokeLinecap="round" />
          ))}
          <path d="M 60 -478 Q 84 -440 70 -404" stroke={C.sand} strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.3)`}>
          <path d="M -36 -4 Q 0 -84 36 -4" stroke={C.brownDark} strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M -44 0 L 44 0 L 34 92 L -34 92 Z" fill={C.sand} />
          <rect x={-46} y={18} width={92} height={10} fill={C.brownDark} />
          <rect x={-40} y={58} width={80} height={10} fill={C.brownDark} />
          <ellipse cx={0} cy={92} rx={34} ry={6} fill={C.yellowDark} />
        </g>
      )}
    />
  );
}
