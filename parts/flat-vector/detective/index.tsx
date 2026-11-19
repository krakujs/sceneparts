import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Detective preset: sand trench coat with a turned-up collar, a brown fedora, a magnifying glass in hand and a notepad in the side pocket.
/* eslint-disable @typescript-eslint/no-explicit-any */
const coat = "#C7A77A";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={coat}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.brownDark}
      shoes="shoes"
      shoesColor={C.ink}
      hat="fedora"
      hatColor={C.brownDark}
      accessory="none"
      over={() => (
        <g>
          <path d="M -88 -806 L -40 -770 L -60 -700 L -96 -740 Z" fill={shade(coat, 0.15)} />
          <path d="M 92 -806 L 44 -770 L 64 -700 L 100 -740 Z" fill={shade(coat, 0.15)} />
          <path d="M -16 -812 L 14 -760 L 46 -812 Z" fill={C.white} />
          <rect x={-76} y={-520} width={160} height={14} rx={5} fill={shade(coat, 0.3)} />
          <rect x={-70} y={-640} width={42} height={0} fill={C.brownDark} />
          <g transform="rotate(-6 -48 -520)">
            <rect x={-68} y={-552} width={46} height={56} rx={4} fill={C.white} />
            <rect x={-62} y={-540} width={34} height={3} fill={C.blue} />
            <rect x={-62} y={-530} width={34} height={3} fill={C.blue} />
            <rect x={-62} y={-520} width={34} height={3} fill={C.blue} />
          </g>
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-20)`}>
          <rect x={0} y={-6} width={70} height={16} rx={8} fill={C.brownDark} />
          <circle cx={6} cy={-30} r={40} fill="#CFEAF7" stroke={C.brownDark} strokeWidth={12} />
          <circle cx={-6} cy={-42} r={10} fill={C.white} opacity={0.8} />
        </g>
      )}
    />
  );
}
