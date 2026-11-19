import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Party guest preset: purple festive shirt with a sparkle pattern, dark trousers, a striped party hat on the head and a drink glass raised in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.purple}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g fill={C.yellow}>
          <path d="M -40 -760 l 6 14 l 14 6 l -14 6 l -6 14 l -6 -14 l -14 -6 l 14 -6 Z" />
          <path d="M 30 -640 l 5 12 l 12 5 l -12 5 l -5 12 l -5 -12 l -12 -5 l 12 -5 Z" fill={C.pink} />
          <circle cx={-10} cy={-600} r={5} fill={C.white} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -54 -70 L 12 -240 L 58 -66 Z" fill={C.orange} />
          <path d="M -20 -130 L 36 -128 M -36 -96 L 50 -92" stroke={C.yellow} strokeWidth={10} strokeLinecap="round" />
          <circle cx={12} cy={-244} r={14} fill={C.yellow} />
          <rect x={-62} y={-80} width={126} height={14} rx={7} fill={shade(C.orange, 0.1)} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M -22 -92 L 22 -92 L 6 -40 L -6 -40 Z" fill="#CFEFFA" />
          <path d="M -18 -74 L 18 -74 L 6 -40 L -6 -40 Z" fill={C.pink} />
          <rect x={-2} y={-40} width={4} height={34} fill="#CFEFFA" />
          <ellipse cx={0} cy={-2} rx={16} ry={5} fill="#CFEFFA" />
          <circle cx={-10} cy={-62} r={4} fill={C.yellow} />
        </g>
      )}
    />
  );
}
