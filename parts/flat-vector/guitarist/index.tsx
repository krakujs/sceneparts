import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Guitarist preset: blue tee and ink beanie, playing an acoustic guitar held across the body (pose hold).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.blueDark}
      hat="beanie"
      hatColor={C.ink}
      accessory="none"
      extra="none"
      held={(h) => {
        const mx = (h.x + h.bx) / 2 - 30, my = (h.y + h.by) / 2 + 60;
        return (
          <g transform={`translate(${mx} ${my}) rotate(30)`}>
            <rect x={-11} y={-250} width={22} height={230} rx={6} fill={C.brownDark} />
            <rect x={-16} y={-284} width={32} height={40} rx={6} fill={C.brownDark} />
            <circle cx={0} cy={-30} r={56} fill={C.yellowDark} />
            <circle cx={0} cy={40} r={74} fill={C.yellowDark} />
            <circle cx={0} cy={12} r={22} fill={C.ink} />
            <rect x={-26} y={64} width={52} height={10} rx={4} fill={C.ink} />
          </g>
        );
      }}
    />
  );
}
