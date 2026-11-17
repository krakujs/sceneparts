import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Film director preset: red shirt and navy cap, holding a yellow megaphone pointing forward (pose point).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.red}
      shirtColor={C.white}
      hat="cap"
      hatColor={C.navy}
      accessory="none"
      extra="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-8)`}>
          <path d="M 0 -18 L 108 -60 L 108 60 L 0 18 Z" fill={C.yellow} />
          <rect x={100} y={-66} width={14} height={132} rx={7} fill={C.yellowDark} />
          <rect x={-18} y={12} width={30} height={40} rx={10} fill={C.ink} />
        </g>
      )}
    />
  );
}
