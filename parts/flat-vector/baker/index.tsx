import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Baker preset: chef hat and white apron over a teal shirt and brown skirt, holding a tray of bread loaves.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.teal}
      bottom="skirt"
      bottomColor={C.brownDark}
      hat="chef"
      hatColor={C.white}
      extra="apron"
      extraColor={C.white}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-84} y={-42} width={168} height={18} rx={9} fill={C.grey} />
          <rect x={-84} y={-30} width={168} height={6} rx={3} fill={shade(C.grey, 0.25)} />
          <ellipse cx={-40} cy={-64} rx={30} ry={18} fill="#D9953F" />
          <ellipse cx={2} cy={-70} rx={32} ry={20} fill="#E6A95A" />
          <ellipse cx={44} cy={-64} rx={30} ry={18} fill="#D9953F" />
          <path d="M -56 -66 Q -40 -76 -24 -66 M -14 -72 Q 2 -82 18 -72 M 30 -66 Q 44 -76 58 -66" stroke="#B06F2A" strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
