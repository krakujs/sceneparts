import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Writer preset: brown knit sweater and round glasses, holding an open-cover notebook with a pen (pose hold).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor={C.brown}
      hat="none"
      accessory="glasses"
      hatColor={C.ink}
      extra="none"
      held={(h) => {
        const mx = (h.x + h.bx) / 2, my = (h.y + h.by) / 2;
        return (
          <g transform={`translate(${mx} ${my}) rotate(-6)`}>
            <g transform="translate(36 -36) rotate(18)">
              <rect x={-6} y={-150} width={12} height={170} rx={5} fill={C.yellow} />
              <path d="M -6 20 L 0 38 L 6 20 Z" fill={C.ink} />
            </g>
            <rect x={-72} y={-96} width={144} height={170} rx={10} fill={C.teal} />
            <rect x={-64} y={-88} width={132} height={156} rx={6} fill={C.white} />
            {[-52, -26, 0, 26, 52].map((y) => <rect key={y} x={-48} y={y - 2} width={96} height={5} rx={2.5} fill={C.greyLight} />)}
            {[-70, -30, 10, 50].map((y) => <circle key={y} cx={-72} cy={y} r={7} fill={C.greyDark} />)}
          </g>
        );
      }}
    />
  );
}
