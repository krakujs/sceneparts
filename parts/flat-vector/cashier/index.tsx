import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Cashier preset: blue polo with a name badge, dark trousers, and a flat barcode scanner with a red scan line in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.blue}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      accessory="none"
      extra="badge"
      extraColor={C.white}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 10}) rotate(-12)`}>
          <rect x={-50} y={-26} width={100} height={52} rx={12} fill={C.ink} />
          <rect x={-40} y={-16} width={80} height={32} rx={6} fill={C.greyDark} />
          <rect x={-34} y={-8} width={6} height={16} fill={C.white} />
          <rect x={-22} y={-8} width={3} height={16} fill={C.white} />
          <rect x={-12} y={-8} width={8} height={16} fill={C.white} />
          <rect x={2} y={-8} width={4} height={16} fill={C.white} />
          <rect x={12} y={-8} width={6} height={16} fill={C.white} />
          <rect x={26} y={-8} width={3} height={16} fill={C.white} />
          <rect x={-48} y={-2} width={96} height={4} rx={2} fill={C.red} />
        </g>
      )}
    />
  );
}
