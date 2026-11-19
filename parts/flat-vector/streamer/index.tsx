import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Streamer preset: green hoodie, headset mic, and a game controller held in both hands (use pose hold).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="hoodie"
      topColor={C.greenDark}
      hat="none"
      accessory="headset"
      hatColor={C.ink}
      extra="none"
      held={(h) => {
        const mx = (h.x + h.bx) / 2, my = (h.y + h.by) / 2;
        return (
          <g transform={`translate(${mx} ${my}) rotate(-6)`}>
            <rect x={-96} y={-40} width={192} height={74} rx={36} fill={C.inkSoft} />
            <ellipse cx={-62} cy={30} rx={30} ry={34} fill={C.inkSoft} />
            <ellipse cx={62} cy={30} rx={30} ry={34} fill={C.inkSoft} />
            <rect x={-78} y={-6} width={36} height={12} rx={4} fill={C.white} />
            <rect x={-66} y={-18} width={12} height={36} rx={4} fill={C.white} />
            <circle cx={-30} cy={14} r={11} fill={C.ink} />
            <circle cx={56} cy={-12} r={7} fill={C.yellow} />
            <circle cx={72} cy={4} r={7} fill={C.red} />
            <circle cx={56} cy={20} r={7} fill={C.blue} />
            <circle cx={40} cy={4} r={7} fill={C.green} />
          </g>
        );
      }}
    />
  );
}
