import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Sculptor preset: blue shirt under a brown apron; holds a block of clay in both hands and a chisel in the front hand (pose hold).
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
      shirtColor={C.white}
      hat="none"
      accessory="none"
      extra="apron"
      extraColor={C.brown}
      held={(h) => {
        const mx = (h.x + h.bx) / 2;
        return (
          <g>
            <rect x={mx - 74} y={-705} width={148} height={110} rx={18} fill="#C8875B" />
            <rect x={mx - 62} y={-693} width={120} height={14} rx={7} fill="#D99B70" />
            <g transform={`translate(${h.x} ${h.y}) rotate(40)`}>
              <rect x={-13} y={-110} width={26} height={84} rx={10} fill={C.brownDark} />
              <rect x={-10} y={-30} width={20} height={14} fill={C.grey} />
              <rect x={-7} y={-16} width={14} height={84} fill={C.greyDark} />
            </g>
          </g>
        );
      }}
    />
  );
}
