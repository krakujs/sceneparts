import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Surveyor preset: lime hi-vis vest over a grey shirt and a white hard hat, carrying a theodolite on its tripod.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.greyDark}
      extra="hivis"
      extraColor={C.lime}
      hat="hardhat"
      hatColor={C.white}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M 0 -6 L -58 466 M 0 -6 L 0 466 M 0 -6 L 58 466" stroke={C.brownDark} strokeWidth={10} strokeLinecap="round" fill="none" />
          <rect x={-40} y={-70} width={80} height={66} rx={12} fill={C.blue} />
          <rect x={-4} y={-88} width={70} height={22} rx={9} fill={C.ink} />
          <circle cx={-28} cy={-40} r={9} fill={C.yellow} />
        </g>
      )}
    />
  );
}
