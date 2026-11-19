import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Recycling worker: hi-vis vest over a teal tee and a blue cap, carrying a green crate of bottles in the front hand.
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
      bottomColor="#5D6578"
      shoes="sneakers"
      shoesColor={C.white}
      hat="cap"
      hatColor={C.blue}
      extra="hivis"
      extraColor="#E7F04A"
      held={(h) => (
        <g transform={`translate(${h.x - 6} ${h.y + 20}) scale(1.3)`}>
          <rect x={-40} y={-74} width={20} height={58} rx={8} fill={C.teal} />
          <rect x={-10} y={-84} width={20} height={68} rx={8} fill={C.white} />
          <rect x={20} y={-70} width={20} height={54} rx={8} fill={C.blue} />
          <rect x={-70} y={-16} width={140} height={84} rx={8} fill={C.greenDark} />
          {[-30, 0, 30].map((x) => <rect key={x} x={x - 6} y={-6} width={12} height={62} rx={4} fill={C.green} />)}
          <rect x={-70} y={-16} width={140} height={10} fill={C.green} />
        </g>
      )}
    />
  );
}
