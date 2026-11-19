import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Watchmaker preset: light shirt under a leather apron, a loupe on one eye and a pocket watch on a chain in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#D9E2EC"
      bottom="trousers"
      bottomColor="#3A4157"
      extra="apron"
      extraColor="#8A5A3C"
      topper={() => (
        <g>
          <circle cx={36} cy={0} r={22} fill="#BFE6F5" opacity={0.35} />
          <circle cx={36} cy={0} r={22} stroke={C.yellowDark} strokeWidth={6} fill="none" />
          <path d="M 14 20 L -4 56" stroke={C.yellowDark} strokeWidth={4} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.2)`}>
          <path d="M 0 -40 Q -40 -90 -76 -64" stroke={C.yellowDark} strokeWidth={4} fill="none" />
          <circle cx={0} cy={0} r={34} fill={C.yellow} />
          <circle cx={0} cy={0} r={26} fill={C.white} />
          <rect x={-5} y={-46} width={10} height={12} rx={3} fill={C.yellowDark} />
          <path d="M 0 0 L 0 -17" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          <path d="M 0 0 L 11 7" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          <circle cx={0} cy={0} r={4} fill={C.ink} />
        </g>
      )}
    />
  );
}
