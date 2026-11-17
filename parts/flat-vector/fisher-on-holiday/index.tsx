import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Holiday fisher: yellow sun hat, sand fishing vest over a green tee, holding a rod with a line and a float that bobs with p.f.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.green}
      bottom="shorts"
      bottomColor={C.brown}
      shoes="sneakers"
      shoesColor={C.white}
      hat="brim"
      hatColor={C.yellow}
      pose={p.pose ?? "hold"}
      over={() => (
        <g>
          <path d="M -58 -800 L -40 -560 L -8 -520 L -6 -470 L 58 -470 L 66 -560 L 60 -800 Z" fill={C.sand} />
          <path d="M -58 -800 L -40 -560 L -8 -520 L -6 -470" fill="none" stroke={C.yellowDark} strokeWidth={5} />
          <rect x={-30} y={-640} width={34} height={36} rx={6} fill={C.brown} opacity={0.5} />
          <rect x={22} y={-640} width={34} height={36} rx={6} fill={C.brown} opacity={0.5} />
          <circle cx={-6} cy={-540} r={5} fill={C.yellowDark} />
        </g>
      )}
      held={(h) => {
        const tipX = h.x + 230, tipY = h.y - 170;
        const fx = h.x + 190, fy = 4 + Math.sin(p.f / 14) * 9;
        return (
          <g>
            <path d={`M ${h.x} ${h.y} L ${tipX} ${tipY}`} stroke={C.brownDark} strokeWidth={10} strokeLinecap="round" />
            <path d={`M ${tipX} ${tipY} L ${fx} ${fy - 14}`} stroke={C.greyDark} strokeWidth={3} fill="none" />
            <circle cx={fx} cy={fy} r={12} fill={C.red} />
            <path d={`M ${fx - 12} ${fy} A 12 12 0 0 0 ${fx + 12} ${fy} Z`} fill={C.white} />
          </g>
        );
      }}
    />
  );
}
