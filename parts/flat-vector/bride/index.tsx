import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Bride preset: long white wedding dress, a sheer veil on the head and a small pink bouquet in the front hand. Generic, any skin tone.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="dress"
      topColor={C.white}
      shirtColor={C.white}
      bottom="skirt"
      bottomColor={C.white}
      shoes="heels"
      shoesColor={C.white}
      hair="bun"
      hairColor="brown"
      hat="none"
      topper={() => (
        <g>
          <path d="M 10 -112 Q -70 -118 -104 -50 Q -150 80 -170 290 L -50 300 Q -86 150 -74 20 Q -60 -60 10 -112 Z" fill={C.white} opacity={0.85} />
          <path d="M 10 -112 Q -70 -118 -104 -50 Q -150 80 -170 290" fill="none" stroke={shade(C.white, 0.14)} strokeWidth={6} />
          <path d="M -40 -118 Q 6 -150 52 -118" fill="none" stroke={C.yellow} strokeWidth={8} strokeLinecap="round" />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M 4 0 L 18 30 M 4 0 L -6 30 M 4 0 L 26 26" stroke={C.green} strokeWidth={6} strokeLinecap="round" fill="none" />
          <circle cx={4} cy={-14} r={18} fill={C.pink} />
          <circle cx={-14} cy={-24} r={14} fill={C.purple} opacity={0} />
          <circle cx={-14} cy={-24} r={15} fill={C.pink} />
          <circle cx={22} cy={-24} r={15} fill={C.red} />
          <circle cx={-4} cy={-40} r={14} fill={C.white} />
          <path d="M -4 -40 L 4 -14 M 22 -24 L 4 -14" stroke={shade(C.pink, 0.2)} strokeWidth={3} fill="none" />
        </g>
      )}
    />
  );
}
