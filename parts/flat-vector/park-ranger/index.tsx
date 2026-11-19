import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Park ranger preset: khaki uniform shirt, khaki trousers, wide brim hat, binoculars held up to the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const khaki = "#B9A277";
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={khaki}
      shirtColor={C.sand}
      bottom="trousers"
      bottomColor={shade(khaki, 0.12)}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="brim"
      hatColor={khaki}
      extra="toolbelt"
      extraColor={C.brown}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-40} y={-60} width={30} height={46} rx={10} fill={C.brownDark} />
          <rect x={10} y={-60} width={30} height={46} rx={10} fill={C.brownDark} />
          <rect x={-8} y={-52} width={16} height={12} rx={4} fill={C.brown} />
          <circle cx={-25} cy={-16} r={13} fill="#8FD0F2" />
          <circle cx={25} cy={-16} r={13} fill="#8FD0F2" />
        </g>
      )}
    />
  );
}
