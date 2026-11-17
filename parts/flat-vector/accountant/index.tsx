import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Accountant preset: light blue shirt, round glasses, grey trousers, desk calculator in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const keys = [0, 1, 2];
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.skyDeep}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="shoes"
      shoesColor={C.brownDark}
      hat="none"
      accessory="glasses"
      extra="none"
      extraColor={C.white}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 30}) rotate(-6)`}>
          <rect x={-40} y={-56} width={80} height={112} rx={10} fill={C.greyDark} />
          <rect x={-30} y={-46} width={60} height={24} rx={4} fill="#BFE6F5" />
          {keys.map((r) => keys.map((c) => <rect key={`${r}-${c}`} x={-30 + c * 22} y={-10 + r * 18} width={16} height={12} rx={3} fill={C.greyLight} />))}
        </g>
      )}
    />
  );
}
