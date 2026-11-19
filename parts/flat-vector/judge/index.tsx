import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Judge preset: plain black robe over a white collar, gavel held in the front hand. Generic, no crest.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="dress"
      topColor={C.ink}
      shoes="heels"
      shoesColor={C.ink}
      hat="none"
      extra="none"
      accessory="glasses"
      over={() => (
        <g>
          <path d="M -30 -812 L 14 -770 L 58 -812 L 52 -800 L 14 -752 L -24 -800 Z" fill={C.white} />
          <path d="M -40 -720 L 14 -690 L 64 -720 L 60 -700 L 14 -676 L -36 -700 Z" fill={C.white} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-5} y={-56} width={10} height={60} rx={4} fill={C.brownDark} />
          <rect x={-30} y={-104} width={60} height={34} rx={8} fill={C.brown} />
          <rect x={-30} y={-104} width={60} height={10} rx={4} fill={shade(C.brown, 0.2)} />
        </g>
      )}
    />
  );
}
