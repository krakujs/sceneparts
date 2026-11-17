import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Bellhop: red pillbox cap on the head, a red uniform with gold trim, and a suitcase in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="uniform"
      topColor={C.purpleDark}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      topper={() => (
        <g>
          <rect x={-72} y={-112} width={144} height={46} rx={12} fill={C.red} />
          <rect x={-72} y={-80} width={144} height={12} fill={C.yellow} />
          <rect x={-60} y={-130} width={120} height={22} rx={8} fill={shade(C.red, 0.15)} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M -24 -4 Q 0 -44 24 -4" stroke={C.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
          <rect x={-70} y={0} width={140} height={108} rx={12} fill={C.brown} />
          <rect x={-70} y={36} width={140} height={10} fill={C.brownDark} />
          <rect x={-22} y={78} width={44} height={20} rx={4} fill={C.yellow} />
        </g>
      )}
    />
  );
}
