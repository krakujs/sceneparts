import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Shopper preset: teal tee, navy trousers, white trainers, two plain carrier bags (no logos): one in the front hand, one on the back side.
/* eslint-disable @typescript-eslint/no-explicit-any */
const Bag = ({ x, y, c }: { x: number; y: number; c: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -10 0 Q -10 -40 14 -40 Q 38 -40 38 0" stroke={shade(c, 0.25)} strokeWidth={7} fill="none" />
    <path d="M -36 0 L 40 0 L 34 100 L -30 100 Z" fill={c} />
    <rect x={-36} y={0} width={76} height={10} fill={shade(c, 0.18)} />
  </g>
);

export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.tealDark}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      over={() => <Bag x={-104} y={-470} c={C.orange} />}
      held={(h) => (
        <g transform={`translate(${h.x + 6} ${h.y + 4})`}>
          <path d="M -10 0 Q -10 -40 14 -40 Q 38 -40 38 0" stroke={shade(C.yellowDark, 0.2)} strokeWidth={7} fill="none" />
          <path d="M -36 0 L 40 0 L 34 100 L -30 100 Z" fill={C.yellow} />
          <rect x={-36} y={0} width={76} height={10} fill={C.yellowDark} />
        </g>
      )}
    />
  );
}
