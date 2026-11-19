import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Commuter preset: long grey coat over a white shirt, navy trousers, shoulder bag on the back-side and a coffee cup in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.greyDark}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          <path d="M 70 -790 Q 40 -560 -40 -520" stroke={C.brownDark} strokeWidth={10} fill="none" strokeLinecap="round" />
          <rect x={-74} y={-560} width={70} height={60} rx={10} fill={C.brown} />
          <rect x={-74} y={-560} width={70} height={14} rx={6} fill={C.brownDark} />
        </g>
      )}
      held={(h) => (
        <g>
          <rect x={h.x - 22} y={h.y - 52} width={50} height={56} rx={8} fill={C.white} />
          <rect x={h.x - 24} y={h.y - 62} width={54} height={14} rx={5} fill={C.brown} />
          <path d={`M ${h.x + 26} ${h.y - 40} Q ${h.x + 44} ${h.y - 36} ${h.x + 26} ${h.y - 18}`} stroke={C.white} strokeWidth={7} fill="none" />
          <rect x={h.x - 22} y={h.y - 30} width={50} height={8} fill={shade(C.white, 0.15)} />
        </g>
      )}
    />
  );
}
