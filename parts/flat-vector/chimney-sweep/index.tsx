import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Chimney sweep: dark coat, tall top hat, and a round brush on a long pole held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor="#3A4157"
      shirtColor={C.white}
      bottom="trousers"
      bottomColor="#3A4157"
      shoes="boots"
      shoesColor={C.ink}
      hat="tophat"
      hatColor={C.ink}
      accessory="moustache"
      held={(h) => (
        <g>
          <path d={`M ${h.x} ${h.y} L ${h.x + 70} ${h.y - 460}`} stroke={C.brownDark} strokeWidth={12} strokeLinecap="round" />
          <g transform={`translate(${h.x + 70} ${h.y - 460})`}>
            <circle r={50} fill={C.sand} />
            <circle r={24} fill={C.brown} />
            <path d="M -36 -18 L -28 -10 M 30 -24 L 38 -14 M -8 36 L -2 44 M 34 30 L 26 40" stroke={C.brownDark} strokeWidth={6} strokeLinecap="round" />
          </g>
        </g>
      )}
    />
  );
}
