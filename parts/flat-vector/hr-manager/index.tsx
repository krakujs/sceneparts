import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// HR manager preset: navy blazer over a white shirt with a yellow name badge, holding a manila folder.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const sand = C.sand, sandD = shade(C.sand, 0.14);
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor="#2A50AE"
      bottom="trousers"
      bottomColor="#5D6578"
      extra="badge"
      extraColor={C.yellow}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-44} y={-34} width={88} height={74} rx={6} fill={sand} />
          <rect x={-44} y={-46} width={40} height={16} rx={5} fill={sand} />
          <rect x={-36} y={-56} width={72} height={40} rx={3} fill={C.white} />
          {[0, 1, 2].map((i) => <rect key={i} x={-28} y={-48 + i * 11} width={56} height={5} rx={2} fill={C.greyLight} />)}
          <rect x={-44} y={-10} width={88} height={50} rx={6} fill={sandD} />
        </g>
      )}
    />
  );
}
