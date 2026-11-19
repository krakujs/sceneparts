import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Stock trader preset: light blue shirt, purple tie, dark trousers, tablet showing a rising chart.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.sky}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      accessory="none"
      extra="tie"
      extraColor={C.purple}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 40}) rotate(-6)`}>
          <rect x={-62} y={-60} width={124} height={96} rx={10} fill={C.ink} />
          <rect x={-52} y={-50} width={104} height={76} rx={5} fill="#0F1A2E" />
          <path d="M -40 14 L -14 -8 L 4 4 L 36 -30" stroke={C.green} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 22 -38 L 46 -40 L 40 -18 Z" fill={C.green} />
        </g>
      )}
    />
  );
}
