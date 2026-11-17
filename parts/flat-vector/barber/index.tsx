import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Barber preset: light-blue shirt under a navy striped apron, holding hair clippers. Pose, face, skin and hair stay free.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#9FD3E8"
      bottom="trousers"
      bottomColor="#1F2433"
      extra="apron"
      extraColor="#2A50AE"
      over={() => (
        <g stroke={C.white} strokeWidth={11} opacity={0.9} strokeLinecap="butt">
          {[-52, -20, 12, 44].map((x) => <path key={x} d={`M ${x} -700 L ${x - 6} -320`} />)}
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-16) scale(1.3)`}>
          <rect x={-42} y={-18} width={84} height={34} rx={14} fill={C.greyDark} />
          <rect x={-42} y={-18} width={84} height={12} rx={6} fill={C.inkSoft} />
          <rect x={30} y={-12} width={40} height={22} rx={6} fill={C.grey} />
          {[44, 52, 60, 68].map((x) => <rect key={x} x={x} y={10} width={3} height={6} fill={C.greyDark} />)}
          <rect x={-12} y={-26} width={22} height={8} rx={3} fill={C.red} />
        </g>
      )}
    />
  );
}
