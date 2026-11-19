import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Locksmith preset: blue tee, khaki shorts and a teal cap, holding a steel ring of keys.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor="#3D6FE0"
      bottom="shorts"
      bottomColor="#B9A27A"
      hat="cap"
      hatColor={C.teal}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.45) translate(${-h.x} ${-h.y})`}>
          <circle cx={h.x} cy={h.y - 30} r={28} stroke={C.greyLight} strokeWidth={7} fill="none" />
          <g transform={`translate(${h.x - 14} ${h.y})`}>
            <rect x={0} y={0} width={8} height={72} rx={3} fill={C.grey} />
            <rect x={0} y={54} width={16} height={7} rx={2} fill={C.grey} />
            <rect x={8} y={44} width={8} height={6} rx={2} fill={C.grey} />
            <circle cx={4} cy={0} r={9} fill="none" stroke={C.grey} strokeWidth={5} />
          </g>
          <g transform={`translate(${h.x + 8} ${h.y + 2})`}>
            <rect x={0} y={0} width={7} height={58} rx={3} fill={C.yellowDark} />
            <rect x={0} y={44} width={14} height={6} rx={2} fill={C.yellowDark} />
            <rect x={7} y={36} width={7} height={6} rx={2} fill={C.yellowDark} />
            <circle cx={3.5} cy={0} r={8} fill="none" stroke={C.yellowDark} strokeWidth={5} />
          </g>
          <g transform={`translate(${h.x + 24} ${h.y - 4})`}>
            <rect x={0} y={0} width={7} height={48} rx={3} fill={C.grey} />
            <rect x={0} y={38} width={12} height={6} rx={2} fill={C.grey} />
            <circle cx={3.5} cy={0} r={8} fill="none" stroke={C.grey} strokeWidth={5} />
          </g>
        </g>
      )}
    />
  );
}
