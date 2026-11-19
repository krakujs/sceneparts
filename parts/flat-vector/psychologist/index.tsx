import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Psychologist: purple blazer over a white shirt, round-frame glasses and a notebook held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.purpleDark}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.brownDark}
      accessory="glasses"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 30}) scale(1.25)`}>
          <rect x={-42} y={-56} width={84} height={108} rx={8} fill={C.teal} />
          <rect x={-34} y={-48} width={72} height={92} rx={4} fill={C.white} />
          {[0, 1, 2].map((i) => <rect key={i} x={-26} y={-32 + i * 22} width={52} height={6} rx={3} fill={C.greyLight} />)}
        </g>
      )}
    />
  );
}
