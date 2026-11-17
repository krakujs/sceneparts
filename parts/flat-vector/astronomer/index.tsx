import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Astronomer preset: navy star-pattern sweater and trousers, holding a small telescope on a short stand in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor={C.navy}
      bottom="trousers"
      bottomColor={C.inkSoft}
      hair="side"
      hairColor="grey"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.4)`}>
          <path d="M 0 0 L -26 70 M 0 0 L 26 70 M 0 0 L 0 76" stroke={C.greyDark} strokeWidth={6} strokeLinecap="round" />
          <g transform="rotate(-28)">
            <rect x={-6} y={-10} width={70} height={18} rx={6} fill={C.greyDark} />
            <rect x={-40} y={-16} width={56} height={30} rx={10} fill={C.blue} />
            <circle cx={62} cy={-1} r={14} fill={C.skyDeep} stroke={C.greyDark} strokeWidth={4} />
          </g>
        </g>
      )}
    />
  );
}
