import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Social worker: pink knit cardigan over a skirt, a blue lanyard badge and a manila folder held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor="#E9A3B8"
      bottom="skirt"
      bottomColor={C.greyDark}
      shoes="boots"
      shoesColor={C.brownDark}
      extra="lanyard"
      extraColor={C.blue}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 4}) scale(1.25)`}>
          <rect x={-44} y={-40} width={30} height={14} rx={5} fill={C.yellowDark} />
          <rect x={-56} y={-30} width={112} height={80} rx={8} fill={C.yellow} />
          <rect x={-56} y={-30} width={112} height={12} fill={C.yellowDark} />
          <rect x={-42} y={-6} width={84} height={6} rx={3} fill={C.white} opacity={0.8} />
          <rect x={-42} y={8} width={60} height={6} rx={3} fill={C.white} opacity={0.8} />
        </g>
      )}
    />
  );
}
