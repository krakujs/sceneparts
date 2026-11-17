import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Personal trainer preset: red tee, navy shorts, white sneakers, whistle on a lanyard, dumbbell in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const metal = C.greyDark;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.red}
      bottom="shorts"
      bottomColor={C.ink}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      accessory="none"
      extra="none"
      extraColor={C.navy}
      over={() => (
        <g>
          <path d="M 4 -800 Q 30 -760 52 -800" stroke={C.navy} strokeWidth={6} fill="none" />
          <circle cx={36} cy={-660} r={16} fill={C.grey} />
          <circle cx={36} cy={-660} r={8} fill={C.ink} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-62} y={-8} width={124} height={16} rx={8} fill={metal} />
          <rect x={-72} y={-34} width={22} height={68} rx={8} fill={C.ink} />
          <rect x={50} y={-34} width={22} height={68} rx={8} fill={C.ink} />
          <rect x={-58} y={-24} width={12} height={48} rx={6} fill={shade(C.ink, 0.1)} />
        </g>
      )}
    />
  );
}
