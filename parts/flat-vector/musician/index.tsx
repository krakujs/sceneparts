import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Musician preset: casual orange tee and earrings, holding a violin (neck in the front hand) and a bow (back hand) (pose hold).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.orange}
      hat="none"
      accessory="earrings"
      hatColor={C.ink}
      extra="none"
      held={(h) => {
        const mx = (h.x + h.bx) / 2, my = (h.y + h.by) / 2;
        return (
          <g>
            <path d={`M ${h.bx - 70} ${h.by + 20} L ${h.bx + 84} ${h.by - 130}`} stroke={C.inkSoft} strokeWidth={4} strokeLinecap="round" />
            <g transform={`translate(${mx} ${my}) rotate(30)`}>
              <rect x={-7} y={-178} width={14} height={160} rx={5} fill={C.brownDark} />
              <circle cx={0} cy={-186} r={12} fill={C.brownDark} />
              <ellipse cx={0} cy={-18} rx={42} ry={46} fill={C.brown} />
              <ellipse cx={0} cy={60} rx={58} ry={62} fill={C.brown} />
              <rect x={-30} y={-30} width={60} height={80} fill={C.brown} />
              <path d="M -16 -6 Q -24 14 -16 30 M 16 -6 Q 24 14 16 30" stroke={C.brownDark} strokeWidth={5} fill="none" strokeLinecap="round" />
              <rect x={-1} y={-160} width={2} height={200} fill={C.greyLight} />
              <rect x={-18} y={42} width={36} height={6} rx={3} fill={C.sand} />
            </g>
          </g>
        );
      }}
    />
  );
}
