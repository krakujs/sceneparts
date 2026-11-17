import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Hairdresser preset: pink tee and black apron, with scissors in the front hand and a comb in the back hand.
// Defaults to the hold pose so both tools sit in front of the body.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor="#F27BA6"
      bottom="trousers"
      bottomColor="#253058"
      extra="apron"
      extraColor={C.ink}
      held={(h) => (
        <g>
          <g transform={`translate(${h.bx} ${h.by}) rotate(-52)`}>
            <rect x={-40} y={-10} width={80} height={18} rx={5} fill={C.teal} />
            {[-34, -26, -18, -10, -2, 6, 14, 22, 30].map((x) => <rect key={x} x={x} y={8} width={4} height={22} rx={2} fill={C.tealDark} />)}
          </g>
          <g transform={`translate(${h.x} ${h.y}) rotate(-20)`}>
            <path d="M -26 -16 L 0 0 M -26 14 L 0 0" stroke={C.greyDark} strokeWidth={7} strokeLinecap="round" />
            <circle cx={-36} cy={-24} r={12} stroke={C.blue} strokeWidth={7} fill="none" />
            <circle cx={-36} cy={22} r={12} stroke={C.blueDark} strokeWidth={7} fill="none" />
            <path d="M 0 0 L 66 -22 L 72 -12 L 4 6 Z" fill={C.grey} />
            <path d="M 0 0 L 66 16 L 72 6 L 4 -6 Z" fill={C.greyLight} />
            <circle cx={0} cy={0} r={5} fill={C.ink} />
          </g>
        </g>
      )}
    />
  );
}
