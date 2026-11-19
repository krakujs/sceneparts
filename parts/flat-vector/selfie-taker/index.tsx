import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Selfie taker: arm stretched out in front with a phone held towards themselves, smiling. Phone shows its back.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.yellow}
      bottom="shorts"
      bottomColor={C.blueDark}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      pose={p.pose ?? "point"}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-12)`}>
          <rect x={-20} y={-84} width={40} height={78} rx={9} fill={C.ink} />
          <rect x={-20} y={-84} width={40} height={10} rx={4} fill={C.greyDark} />
          <circle cx={-8} cy={-70} r={5} fill={C.greyDark} />
          <circle cx={-8} cy={-70} r={2.5} fill="#8FD0F2" />
        </g>
      )}
    />
  );
}
