import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Home cleaner: casual tee and trousers, yellow rubber glove cuffs, pushing a generic upright vacuum cleaner.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.purple}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      pose={p.pose ?? "hold"}
      held={(h) => {
        const hx = h.x - 44 * Math.sin((h.a * Math.PI) / 180), hy = h.y - 44 * Math.cos((h.a * Math.PI) / 180);
        const ex = h.x + 120;
        return (
          <g>
            <path d={`M ${h.x} ${h.y} L ${ex} -300`} stroke={C.greyDark} strokeWidth={14} strokeLinecap="round" />
            <rect x={ex - 44} y={-310} width={92} height={250} rx={30} fill={C.red} />
            <rect x={ex - 30} y={-280} width={34} height={180} rx={14} fill={shade(C.red, 0.2)} />
            <rect x={ex - 80} y={-62} width={190} height={50} rx={18} fill={C.greyDark} />
            <rect x={ex - 80} y={-24} width={190} height={14} rx={6} fill={C.ink} />
            <circle cx={ex - 40} cy={-6} r={12} fill={C.ink} />
            <rect x={hx - 20} y={hy - 10} width={40} height={20} rx={7} fill={C.yellow} transform={`rotate(${-h.a} ${hx} ${hy})`} />
          </g>
        );
      }}
    />
  );
}
