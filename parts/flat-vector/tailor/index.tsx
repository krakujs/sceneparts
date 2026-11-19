import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Tailor preset: crisp shirt under a brown waistcoat, a yellow measuring tape around the neck and scissors in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#E9F3FA"
      bottom="trousers"
      bottomColor="#3A4157"
      over={() => (
        <g>
          <path d="M -70 -790 L -20 -790 L 14 -700 L 50 -790 L 76 -790 L 78 -470 L -72 -470 Z" fill="#5E3B26" />
          {[-640, -560, -480].map((y) => <circle key={y} cx={14} cy={y} r={5} fill={C.yellow} />)}
          <path d="M -46 -800 Q 10 -764 66 -796" stroke={C.yellow} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d="M -46 -800 Q 10 -764 66 -796" stroke={C.ink} strokeWidth={3} strokeDasharray="4 7" fill="none" />
          <path d="M 60 -790 L 44 -676" stroke={C.yellow} strokeWidth={10} strokeLinecap="round" />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x - 24} ${h.y}) rotate(-18)`}>
          <circle cx={-36} cy={-24} r={12} stroke={C.red} strokeWidth={7} fill="none" />
          <circle cx={-36} cy={22} r={12} stroke={C.redDark} strokeWidth={7} fill="none" />
          <path d="M -26 -16 L 0 0 M -26 14 L 0 0" stroke={C.greyDark} strokeWidth={7} strokeLinecap="round" />
          <path d="M 0 0 L 66 -22 L 72 -12 L 4 6 Z" fill={C.grey} />
          <path d="M 0 0 L 66 16 L 72 6 L 4 -6 Z" fill={C.greyLight} />
          <circle cx={0} cy={0} r={5} fill={C.ink} />
        </g>
      )}
    />
  );
}
