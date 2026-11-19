import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// King preset: long purple robe with white fur trim, gold crown and a gold sceptre in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
const fur = (x: number, y: number, n: number, gap: number) =>
  Array.from({ length: n }, (_, i) => <circle key={i} cx={x + i * gap} cy={y} r={gap * 0.62} fill={C.white} />);

export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.purpleDark}
      shirtColor={C.yellow}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="none"
      over={() => (
        <g>
          <path d="M -40 -812 L 60 -812 L 52 -740 L -34 -740 Z" fill={C.white} />
          {fur(-44, -800, 4, 26)}
          {fur(-84, -352, 8, 26)}
          <rect x={-96} y={-318} width={200} height={20} rx={8} fill={C.white} />
          <rect x={-78} y={-600} width={160} height={10} fill={C.yellow} />
          <circle cx={20} cy={-520} r={11} fill={C.red} />
        </g>
      )}
      topper={() => (
        <g>
          <rect x={-70} y={-118} width={140} height={34} rx={8} fill={C.yellow} />
          <rect x={-70} y={-118} width={140} height={10} fill={C.yellowDark} />
          <path d="M -70 -118 L -62 -160 L -34 -130 L 0 -176 L 34 -130 L 62 -160 L 70 -118 Z" fill={C.yellow} />
          <circle cx={0} cy={-100} r={9} fill={C.red} />
          <circle cx={-44} cy={-101} r={6} fill={C.teal} />
          <circle cx={44} cy={-101} r={6} fill={C.teal} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-7} y={-150} width={14} height={170} rx={7} fill={C.yellow} />
          <rect x={-7} y={-150} width={5} height={170} rx={2} fill={C.yellowDark} />
          <circle cx={0} cy={-168} r={20} fill={C.red} />
          <circle cx={0} cy={-168} r={9} fill={C.yellow} />
        </g>
      )}
    />
  );
}
