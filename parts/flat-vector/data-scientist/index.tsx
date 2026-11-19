import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Data scientist preset: sky-blue shirt, navy trousers, round glasses, a tablet showing a bar chart held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const bars: [number, string][] = [[20, C.blue], [36, C.teal], [52, C.orange], [64, C.purple]];
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#5BA8D9"
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      extra="none"
      accessory="glasses"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-10)`}>
          <rect x={-8} y={-102} width={116} height={86} rx={10} fill={C.ink} />
          <rect x={-2} y={-96} width={104} height={74} rx={5} fill="#E8F4FB" />
          {bars.map(([bh, col], i) => (
            <rect key={i} x={6 + i * 24} y={-30 - bh} width={16} height={bh} rx={3} fill={col} />
          ))}
        </g>
      )}
    />
  );
}
