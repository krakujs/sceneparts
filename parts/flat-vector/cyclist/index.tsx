import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Cyclist preset: helmet, green cycling jersey, navy shorts, water bottle held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.green}
      bottom="shorts"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.ink}
      hat="helmet"
      hatColor={C.yellow}
      accessory="sunglasses"
      extra="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 30}) rotate(-6) scale(1.3)`}>
          <rect x={-30} y={-70} width={60} height={150} rx={16} fill={C.blue} />
          <rect x={-30} y={-70} width={60} height={22} rx={10} fill={C.ink} />
          <rect x={-24} y={-30} width={48} height={60} rx={8} fill={C.white} opacity={0.6} />
        </g>
      )}
    />
  );
}
