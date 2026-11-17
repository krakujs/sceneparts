import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Potter preset: sand tee under a blue apron, holding a freshly thrown clay pot in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const clay = "#C4683A";
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor="#E9D3A9"
      bottom="trousers"
      bottomColor="#5E3B26"
      extra="apron"
      extraColor="#2A50AE"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M 52 -6 Q 76 -30 62 -56 Q 54 -70 46 -60" stroke={shade(clay, 0.15)} strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M -50 -28 Q -62 -84 -30 -96 L 30 -96 Q 62 -84 50 -28 Q 40 40 0 40 Q -40 40 -50 -28 Z" fill={clay} />
          <path d="M -30 -96 Q 0 -86 30 -96 L 30 -84 Q 0 -74 -30 -84 Z" fill={shade(clay, 0.2)} />
          <path d="M -34 -70 Q -20 -60 -6 -70" stroke={shade(clay, 0.25)} strokeWidth={4} fill="none" strokeLinecap="round" />
          <path d="M -40 -10 Q -30 14 0 16 Q 30 14 40 -10" stroke={shade(clay, 0.2)} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.7} />
        </g>
      )}
    />
  );
}
