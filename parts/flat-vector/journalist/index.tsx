import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Journalist preset: light-blue shirt, khaki trousers, press-style lanyard badge (blank, no text), notepad and pen held.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#8FC3E0"
      shirtColor={C.white}
      bottom="trousers"
      bottomColor="#B9A277"
      shoes="shoes"
      shoesColor={C.brownDark}
      hat="none"
      extra="lanyard"
      extraColor={C.red}
      accessory="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-40} y={-108} width={80} height={104} rx={6} fill={C.white} />
          <rect x={-40} y={-108} width={80} height={18} rx={6} fill={C.red} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={-28} y={-72 + i * 16} width={56} height={5} rx={2} fill={C.greyLight} />
          ))}
          <path d="M 20 -40 L 52 -104" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          <path d="M 52 -104 L 58 -116" stroke={shade(C.ink, 0.1)} strokeWidth={9} strokeLinecap="round" />
        </g>
      )}
    />
  );
}
