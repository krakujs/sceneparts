import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Butcher preset: blue shirt under a white apron with red stripes, holding a hanging string of sausages.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.blueDark}
      extra="apron"
      extraColor={C.white}
      over={() => (
        <g fill={C.red} opacity={0.85}>
          {[-66, -36, -6, 24, 54].map((x) => (
            <rect key={x} x={x} y={-590} width={12} height={280} />
          ))}
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          {[[-2, 22], [6, 66], [-4, 110], [4, 154]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x - 15} y={y - 24} width={30} height={48} rx={15} fill={i % 2 ? "#E07A6B" : "#C9675A"} />
              <path d={`M ${x - 6} ${y - 14} L ${x - 6} ${y + 8}`} stroke="#F2A89C" strokeWidth={4} strokeLinecap="round" />
            </g>
          ))}
        </g>
      )}
    />
  );
}
