import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Security guard preset: black uniform with a cap, dark trousers, flashlight held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="uniform"
      topColor={C.inkSoft}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="boots"
      shoesColor={C.ink}
      hat="cap"
      hatColor={C.ink}
      extra="badge"
      extraColor={C.grey}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-11} y={-54} width={22} height={70} rx={7} fill={C.greyDark} />
          <rect x={-14} y={-86} width={28} height={36} rx={9} fill={C.ink} />
          <ellipse cx={0} cy={-88} rx={14} ry={5} fill={C.yellow} />
          <path d="M -14 -88 L -40 -118 L -36 -82 Z" fill={C.yellow} opacity={0.35} />
        </g>
      )}
    />
  );
}
