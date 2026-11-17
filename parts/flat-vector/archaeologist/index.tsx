import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Archaeologist preset: khaki shirt, brim hat and tan trousers, holding a trowel and a large brush in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
const KHAKI = "#C9B07A";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={KHAKI}
      bottom="trousers"
      bottomColor={C.sand}
      hat="brim"
      hatColor={KHAKI}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.35)`}>
          <rect x={-8} y={-96} width={16} height={92} rx={7} fill={C.brownDark} />
          <path d="M -26 -100 L 26 -100 L 14 -58 L -14 -58 Z" fill={C.grey} />
          <rect x={-22} y={-100} width={44} height={8} rx={3} fill={C.greyDark} />
          <rect x={22} y={-22} width={18} height={60} rx={5} fill={C.brown} transform="rotate(-18 31 -22)" />
          <rect x={18} y={-6} width={26} height={40} rx={6} fill={C.sand} transform="rotate(-18 31 -6)" />
        </g>
      )}
    />
  );
}
