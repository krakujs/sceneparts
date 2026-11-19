import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Truck driver preset: red check shirt under a dark cap, holding a bunch of keys on a ring.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.red}
      hat="cap"
      hatColor={C.ink}
      over={() => (
        <g>
          {[-54, -22, 10, 42].map((x) => (
            <rect key={x} x={x} y={-800} width={6} height={330} fill={C.redDark} opacity={0.55} />
          ))}
          {[-748, -676, -604, -532].map((y) => (
            <rect key={y} x={-74} y={y} width={156} height={7} fill={C.white} opacity={0.3} />
          ))}
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <circle cx={0} cy={44} r={14} fill="none" stroke={C.greyDark} strokeWidth={6} />
          <g transform="translate(0 44) rotate(-24)">
            <rect x={-4} y={14} width={8} height={62} rx={3} fill={C.grey} />
            <rect x={4} y={58} width={14} height={7} rx={2} fill={C.grey} />
            <rect x={4} y={46} width={10} height={6} rx={2} fill={C.grey} />
            <circle cx={0} cy={14} r={12} fill={C.yellowDark} />
          </g>
          <g transform="translate(0 44) rotate(20)">
            <rect x={-4} y={14} width={8} height={54} rx={3} fill={C.grey} />
            <rect x={-12} y={50} width={12} height={6} rx={2} fill={C.grey} />
            <circle cx={0} cy={14} r={12} fill={C.yellowDark} />
          </g>
          <rect x={-14} y={26} width={28} height={40} rx={8} fill={C.blue} transform="translate(0 0)" />
        </g>
      )}
    />
  );
}
