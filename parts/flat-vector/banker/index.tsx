import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Banker preset: navy suit, green tie, dark trousers, a bundle of banknotes held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const note = C.green;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.navy}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      accessory="none"
      extra="tie"
      extraColor={note}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-8)`}>
          <rect x={-60} y={-30} width={120} height={60} rx={5} fill={shade(note, 0.2)} />
          <rect x={-60} y={-38} width={120} height={60} rx={5} fill={note} />
          <rect x={-14} y={-38} width={28} height={60} fill={C.greenDark} />
          <rect x={-14} y={-22} width={28} height={12} fill={C.white} opacity={0.85} />
        </g>
      )}
    />
  );
}
