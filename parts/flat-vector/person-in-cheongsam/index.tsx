import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Cheongsam preset: fitted red high-collar dress to the ankles with a gold frog-button closure.
/* eslint-disable @typescript-eslint/no-explicit-any */
const DRESS = "#B5202E";
const GOLD = C.yellow;
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={DRESS}
      bottom="trousers"
      bottomColor={DRESS}
      shoes="heels"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          <path d="M -68 -812 L 80 -812 L 78 -470 L 84 -40 L -76 -40 L -72 -470 Z" fill={DRESS} />
          <path d="M 38 -360 L 84 -360 L 84 -40 L 46 -40 Z" fill={shade(DRESS, 0.2)} opacity={0.0} />
          <path d="M -20 -836 L 46 -836 L 46 -814 L -20 -814 Z" fill={GOLD} />
          <path d="M -10 -812 L 52 -640" stroke={GOLD} strokeWidth={5} />
          {[[-2, -790], [12, -758], [26, -726], [40, -694]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={7} fill={GOLD} />
              <path d={`M ${x - 4} ${y + 4} Q ${x + 6} ${y + 16} ${x + 12} ${y + 6}`} stroke={GOLD} strokeWidth={3} fill="none" />
            </g>
          ))}
          <path d="M 4 -640 L 6 -40" stroke={shade(DRESS, 0.25)} strokeWidth={3} opacity={0.6} />
        </g>
      )}
    />
  );
}
