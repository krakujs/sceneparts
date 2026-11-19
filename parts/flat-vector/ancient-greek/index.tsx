import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Ancient Greek preset: belted chiton tunic with a gold hem, shoulder pins, sandals and a scroll in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="dress"
      topColor={C.teal}
      bottom="skirt"
      bottomColor={C.teal}
      shoes="sandals"
      shoesColor={C.brownDark}
      hat="none"
      over={() => (
        <g>
          <rect x={-80} y={-506} width={170} height={22} rx={8} fill={C.yellowDark} />
          <rect x={-70} y={-512} width={20} height={34} rx={5} fill={C.yellow} />
          <rect x={-122} y={-284} width={250} height={14} fill={C.yellow} />
          <path d="M -76 -806 L 84 -806" stroke={C.yellow} strokeWidth={8} strokeLinecap="round" />
          <circle cx={-44} cy={-790} r={12} fill={C.yellow} />
          <circle cx={48} cy={-790} r={12} fill={C.yellow} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-10)`}>
          <rect x={-26} y={-62} width={52} height={112} rx={3} fill={C.yellow} />
          <path d="M -16 -40 L 16 -40 M -16 -18 L 16 -18 M -16 4 L 16 4 M -16 26 L 10 26" stroke={C.brownDark} strokeWidth={4} strokeLinecap="round" />
          <rect x={-36} y={-74} width={72} height={22} rx={11} fill={C.brown} />
          <rect x={-36} y={46} width={72} height={22} rx={11} fill={C.brown} />
        </g>
      )}
    />
  );
}
