import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Yoga instructor preset: lilac tank top, dark leggings, barefoot sandals, a rolled teal yoga mat in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const mat = C.teal;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor={C.purple}
      bottom="trousers"
      bottomColor={C.purpleDark}
      shoes="sandals"
      shoesColor={C.brown}
      hat="none"
      accessory="none"
      extra="none"
      extraColor={C.white}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-6)`}>
          <rect x={-22} y={-96} width={46} height={190} rx={23} fill={mat} />
          <rect x={-22} y={-96} width={46} height={20} rx={10} fill={shade(mat, 0.2)} />
          <rect x={-22} y={70} width={46} height={18} rx={9} fill={shade(mat, 0.2)} />
          <path d="M -10 -40 L 12 -40 M -10 0 L 12 0 M -10 40 L 12 40" stroke={shade(mat, 0.25)} strokeWidth={4} />
        </g>
      )}
    />
  );
}
