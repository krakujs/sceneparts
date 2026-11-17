import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Home cook: red apron over a teal tee and navy trousers, with a wooden spoon in the front hand. No chef hat.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.teal}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      extra="apron"
      extraColor={C.red}
      pose={p.pose ?? "talk"}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(${-h.a})`}>
          <rect x={-7} y={-6} width={14} height={150} rx={7} fill={C.brown} />
          <ellipse cx={0} cy={-190} rx={26} ry={46} fill={C.brownDark} />
          <ellipse cx={0} cy={-190} rx={12} ry={20} fill={C.brown} opacity={0.5} />
        </g>
      )}
    />
  );
}
