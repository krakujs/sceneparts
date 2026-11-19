import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Cobbler preset: light-blue shirt under a leather apron and brown boots. Holds a shoe in the front hand and a small hammer in the back hand.
// Defaults to the hold pose so both tools sit in front of the body.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#9FD3E8"
      bottom="trousers"
      bottomColor="#3A4157"
      shoes="boots"
      shoesColor={C.brownDark}
      extra="apron"
      extraColor="#8A5A3C"
      held={(h) => (
        <g>
          <g transform={`translate(${h.bx} ${h.by}) rotate(-30)`}>
            <rect x={-6} y={-70} width={12} height={84} rx={5} fill={C.brown} />
            <rect x={-24} y={-100} width={46} height={28} rx={5} fill={C.greyDark} />
            <rect x={-24} y={-100} width={10} height={28} rx={3} fill={C.ink} opacity={0.35} />
          </g>
          <g transform={`translate(${h.x} ${h.y}) rotate(-8) scale(1.4)`}>
            <path d="M -36 -44 L 8 -44 Q 40 -36 42 -6 L 42 14 L -36 14 Z" fill={C.brown} />
            <path d="M -36 -44 L 8 -44 Q 40 -36 42 -6 L 42 -2 Q 20 -14 -36 -14 Z" fill={C.brownDark} opacity={0.5} />
            <rect x={-40} y={12} width={86} height={12} rx={5} fill={C.ink} />
            <path d="M -8 -30 L 6 -18 M 2 -34 L 12 -22" stroke={C.sand} strokeWidth={3} strokeLinecap="round" />
          </g>
        </g>
      )}
    />
  );
}
