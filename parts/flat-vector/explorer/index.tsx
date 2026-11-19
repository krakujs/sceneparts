import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Explorer preset: khaki pith-style hat, khaki shirt and shorts, a backpack with a folded map in the side pocket and binoculars in hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
const khaki = "#C9A66B";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={khaki}
      shirtColor={khaki}
      bottom="shorts"
      bottomColor={shade(khaki, 0.1)}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="brim"
      hatColor={khaki}
      extra="backpack"
      extraColor={C.green}
      accessory="none"
      over={() => (
        <g>
          <path d="M -78 -520 L -30 -520 L -28 -478 L -76 -478 Z" fill={C.yellow} opacity={0} />
          <path d="M -86 -540 L -48 -552 L -40 -480 L -80 -470 Z" fill={C.white} />
          <path d="M -82 -530 L -52 -540 M -80 -512 L -46 -520" stroke={C.blue} strokeWidth={4} strokeDasharray="8 6" />
          <circle cx={-64} cy={-500} r={6} fill={C.red} />
          <rect x={-20} y={-512} width={32} height={20} rx={5} fill={C.brownDark} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-12)`}>
          <rect x={-30} y={-22} width={60} height={44} rx={10} fill={C.brownDark} />
          <rect x={-30} y={-22} width={60} height={12} rx={6} fill={C.brown} />
          <circle cx={-24} cy={-4} r={18} fill={C.ink} />
          <circle cx={30} cy={-4} r={18} fill={C.ink} />
          <circle cx={-24} cy={-4} r={11} fill={C.skyDeep} />
          <circle cx={30} cy={-4} r={11} fill={C.skyDeep} />
        </g>
      )}
    />
  );
}
