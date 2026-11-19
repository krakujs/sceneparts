import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Soldier preset: generic plain olive uniform and helmet, no flags or insignia, no weapons. Holds a folded paper map.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const olive = "#6B7144";
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="jumpsuit"
      topColor={olive}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="helmet"
      hatColor={olive}
      extra="none"
      accessory="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M -40 -96 L 36 -110 L 44 -30 L -32 -16 Z" fill={C.sand} />
          <path d="M -6 -103 L -2 -23" stroke={shade(C.sand, 0.25)} strokeWidth={3} />
          <path d="M 22 -106 L 24 -27" stroke={shade(C.sand, 0.25)} strokeWidth={3} />
          <path d="M -40 -96 Q -20 -104 -4 -96 L -2 -23 Q -20 -16 -32 -16 Z" fill="#9FD3E8" opacity={0.7} />
        </g>
      )}
    />
  );
}
