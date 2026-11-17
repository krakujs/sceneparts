import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Cleaner preset: white tee under a teal tabard apron, holding a spray bottle in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.white}
      bottom="trousers"
      bottomColor="#3A4157"
      extra="apron"
      extraColor={C.teal}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.25)`}>
          <path d="M -14 -76 L -14 -100 L 30 -100 L 30 -90 L -4 -90 L -4 -76 Z" fill={C.ink} />
          <rect x={-14} y={-80} width={28} height={20} rx={6} fill={C.ink} />
          <rect x={-24} y={-62} width={48} height={112} rx={16} fill="#8EC5E8" />
          <rect x={-24} y={-10} width={48} height={16} fill={C.white} opacity={0.85} />
          <rect x={-24} y={28} width={48} height={22} rx={10} fill={C.blue} opacity={0.35} />
        </g>
      )}
    />
  );
}
