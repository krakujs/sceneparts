import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Diplomat: dark suit, white shirt, a plain sash and a folder held in the front hand. No real flags or insignia.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.navy}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      extra="sash"
      extraColor={C.purple}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 10}) scale(1.2)`}>
          <rect x={-46} y={-44} width={40} height={14} rx={5} fill={C.yellowDark} />
          <rect x={-56} y={-34} width={112} height={84} rx={8} fill={C.yellow} />
          <rect x={-56} y={-34} width={112} height={12} fill={C.yellowDark} />
          <rect x={-44} y={-10} width={88} height={6} rx={3} fill={C.white} opacity={0.8} />
          <rect x={-44} y={6} width={70} height={6} rx={3} fill={C.white} opacity={0.8} />
        </g>
      )}
    />
  );
}
