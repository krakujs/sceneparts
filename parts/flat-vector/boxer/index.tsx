import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Boxer preset: blue tank top, red shorts, big red gloves held up in front of both hands.
/* eslint-disable @typescript-eslint/no-explicit-any */
function Glove({ x, y }: { x: number; y: number }) {
  const g = C.red;
  return (
    <g transform={`translate(${x} ${y - 10})`}>
      <rect x={-34} y={38} width={68} height={34} rx={8} fill={C.white} />
      <path d="M -58 -44 Q -62 40 -30 52 L 34 52 Q 62 30 58 -44 Q 40 -66 0 -66 Q -40 -66 -58 -44 Z" fill={g} />
      <ellipse cx={-30} cy={-10} rx={22} ry={30} fill={shade(g, 0.14)} />
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor={C.blue}
      bottom="shorts"
      bottomColor={C.red}
      shoes="boots"
      shoesColor={C.ink}
      hat="none"
      accessory="none"
      extra="none"
      held={(h) => (
        <g>
          <Glove x={h.bx} y={h.by} />
          <Glove x={h.x} y={h.y} />
        </g>
      )}
    />
  );
}
