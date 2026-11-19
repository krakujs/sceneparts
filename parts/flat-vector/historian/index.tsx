import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Historian preset: tweed blazer over a cream shirt, round glasses, holding an old rolled scroll in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
const TWEED = "#7A6A55";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={TWEED}
      shirtColor="#F4EBD6"
      bottom="trousers"
      bottomColor={C.brownDark}
      accessory="glasses"
      extra="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-14)`}>
          <rect x={-20} y={-110} width={40} height={136} rx={10} fill={C.sand} />
          <rect x={-20} y={-110} width={40} height={12} rx={5} fill={C.brownDark} />
          <rect x={-20} y={14} width={40} height={12} rx={5} fill={C.brownDark} />
          <path d="M -8 -80 L 8 -80 M -8 -56 L 8 -56 M -8 -32 L 8 -32" stroke={C.yellowDark} strokeWidth={4} />
          <circle cx={0} cy={-100} r={3} fill={C.brownDark} />
        </g>
      )}
    />
  );
}
