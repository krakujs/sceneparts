import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Housekeeper preset: light-blue tee, white apron and purple skirt, holding a feather duster up beside the head.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor="#9FD3E8"
      bottom="skirt"
      bottomColor="#5A40A8"
      extra="apron"
      extraColor="#F4F1EA"
      held={(h) => (
        <g>
          <path d={`M ${h.x} ${h.y} L ${h.x + 70} ${h.y - 270}`} stroke={C.brown} strokeWidth={13} strokeLinecap="round" />
          <g transform={`translate(${h.x + 70} ${h.y - 280})`}>
            <ellipse cx={-28} cy={-10} rx={16} ry={40} transform="rotate(-30 -28 -10)" fill={C.yellow} />
            <ellipse cx={0} cy={-22} rx={16} ry={44} fill={C.pink} />
            <ellipse cx={28} cy={-10} rx={16} ry={40} transform="rotate(30 28 -10)" fill={C.yellowDark} />
            <ellipse cx={-14} cy={6} rx={14} ry={34} transform="rotate(-14 -14 6)" fill={C.pink} opacity={0.85} />
            <ellipse cx={14} cy={6} rx={14} ry={34} transform="rotate(14 14 6)" fill={C.yellow} opacity={0.9} />
            <rect x={-6} y={14} width={12} height={20} rx={4} fill={C.brownDark} />
          </g>
        </g>
      )}
    />
  );
}
