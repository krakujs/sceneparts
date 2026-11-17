import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Sari preset: red sari with a gold border, pallu draped from the front shoulder across the chest and
// hanging down the back, long skirt part to the ankles, short teal blouse and a small bindi.
/* eslint-disable @typescript-eslint/no-explicit-any */
const SARI = "#D8452F";
const SARI_D = "#B53A2E";
const GOLD = C.yellow;
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor="#2A8C82"
      bottom="trousers"
      bottomColor={SARI}
      shoes="sandals"
      shoesColor={C.yellowDark}
      hat="none"
      topper={() => <circle cx={60} cy={-52} r={7} fill={C.red} />}
      over={() => (
        <g>
          <path d="M -80 -478 L 86 -478 L 104 -40 L -100 -40 Z" fill={SARI} />
          <rect x={-100} y={-60} width={204} height={20} fill={GOLD} />
          {[-40, 0, 40].map((xx) => <path key={xx} d={`M ${xx - 40} -440 L ${xx - 58} -90`} stroke={SARI_D} strokeWidth={4} fill="none" opacity={0.5} />)}
          <path d="M -40 -800 L -96 -470 L -62 -462 L -22 -792 Z" fill={SARI_D} />
          <path d="M -50 -470 L 58 -800" stroke={GOLD} strokeWidth={100} strokeLinecap="round" />
          <path d="M -50 -470 L 58 -800" stroke={SARI} strokeWidth={84} strokeLinecap="round" />
          <path d="M -26 -690 L 30 -570" stroke={GOLD} strokeWidth={4} opacity={0.8} />
        </g>
      )}
    />
  );
}
