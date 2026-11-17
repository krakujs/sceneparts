import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Architect preset: teal blazer over a white shirt and glasses, carrying a rolled blueprint in both hands.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.tealDark}
      shirtColor={C.white}
      accessory="glasses"
      held={(h) => (
        <g>
          <rect x={h.bx - 22} y={h.by - 20} width={h.x - h.bx + 44} height={40} rx={20} fill={C.blueDark} />
          <circle cx={h.x + 14} cy={h.y} r={16} fill="#E9EEF2" />
          <rect x={h.bx + 6} y={h.by - 20} width={6} height={40} fill={C.blue} opacity={0.6} />
        </g>
      )}
    />
  );
}
