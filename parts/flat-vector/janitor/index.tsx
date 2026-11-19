import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Janitor preset: yellow tee under blue overalls and a cap, with a mop and bucket beside the feet.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor="#FFC83D"
      bottom="overalls"
      bottomColor="#3D6FE0"
      hat="cap"
      hatColor={C.orange}
      held={(h) => (
        <g>
          <path d={`M ${h.x} ${h.y} L ${h.x + 30} -40`} stroke={C.brown} strokeWidth={12} strokeLinecap="round" />
          <path d={`M ${h.x + 6} -44 L ${h.x + 54} -44 L ${h.x + 60} -20 L ${h.x + 0} -20 Z`} fill={C.brownDark} opacity={0.4} />
          <ellipse cx={h.x + 30} cy={-30} rx={62} ry={22} fill={C.greyLight} />
          {[-40, -20, 0, 20, 40].map((dx) => <path key={dx} d={`M ${h.x + 30 + dx} -44 L ${h.x + 30 + dx * 0.8} -12`} stroke={C.white} strokeWidth={6} strokeLinecap="round" />)}
          <path d="M 196 -132 L 336 -132 L 316 -8 L 216 -8 Z" fill={C.blue} />
          <path d="M 196 -132 L 336 -132 L 336 -116 L 196 -116 Z" fill={C.blueDark} />
          <path d="M 216 -8 L 316 -8 L 312 -20 L 220 -20 Z" fill={shade(C.blue, 0.25)} />
          <path d="M 336 -116 Q 360 -90 336 -70" stroke={C.greyDark} strokeWidth={6} fill="none" />
        </g>
      )}
    />
  );
}
