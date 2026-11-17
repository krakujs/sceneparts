import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Phone addict: walking slowly, eyes on a glowing phone held at chest height. The screen light falls on the face.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="hoodie"
      topColor={C.greyDark}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      pose={p.pose ?? "hold"}
      expression={p.expression ?? "neutral"}
      held={(h) => (
        <g>
        <path d={`M ${h.x - 6} ${h.y - 50} L 62 -905 L 110 -880 L ${h.x + 40} ${h.y - 30} Z`} fill="#BFE6F5" opacity={0.25} />
        <g transform={`translate(${h.x + 10} ${h.y + 20}) rotate(-58)`}>
          <rect x={-24} y={-92} width={48} height={84} rx={9} fill={C.ink} />
          <rect x={-18} y={-84} width={36} height={68} rx={4} fill="#8FD0F2" />
          <rect x={-12} y={-76} width={24} height={8} rx={3} fill={C.white} opacity={0.7} />
          <rect x={-12} y={-62} width={18} height={6} rx={3} fill={C.white} opacity={0.5} />
        </g>
        </g>
      )}
    />
  );
}
