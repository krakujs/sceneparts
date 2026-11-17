import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// News anchor preset: charcoal suit with white shirt and red tie, sheets of paper in hand, talking to camera.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.greyDark}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      extra="tie"
      extraColor={C.red}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-6)`}>
          <rect x={-40} y={-100} width={70} height={92} rx={4} fill={C.greyLight} />
          <rect x={-30} y={-110} width={70} height={94} rx={4} fill={C.white} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={-22} y={-96 + i * 16} width={54} height={5} rx={2} fill={C.greyLight} />
          ))}
        </g>
      )}
    />
  );
}
