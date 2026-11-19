import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Monk preset: saffron robe with a darker sash, shaved head and a string of prayer beads hanging from the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
const SAFFRON = "#E8A33D";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="dress"
      topColor={SAFFRON}
      hair="none"
      extra="sash"
      extraColor={C.brownDark}
      held={(h) => (
        <g>
          <path d={`M ${h.x - 6} ${h.y + 10} Q ${h.x + 30} ${h.y + 70} ${h.x + 8} ${h.y + 120}`} stroke={C.brownDark} strokeWidth={3} fill="none" />
          {[[-2, 22], [14, 46], [22, 74], [14, 102], [-2, 118], [-20, 102], [-26, 74], [-20, 46]].map(([dx, dy], i) => (
            <circle key={i} cx={h.x + dx} cy={h.y + dy} r={14} fill={C.brown} stroke={C.brownDark} strokeWidth={2} />
          ))}
        </g>
      )}
    />
  );
}
