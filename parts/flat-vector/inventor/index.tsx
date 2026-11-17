import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Inventor preset: blue overalls, safety goggles, a spinning gear-and-spring contraption in hand and a lightbulb above the head that flickers on.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const on = Math.sin(p.f / 5) > -0.2;
  const rot = (p.f * 4) % 360;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.orange}
      bottom="overalls"
      bottomColor={C.blue}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="none"
      hair="spiky"
      hairColor="brown"
      accessory="goggles"
      hatColor={C.orange}
      topper={() => (
        <g opacity={on ? 1 : 0.35}>
          <circle cx={10} cy={-200} r={70} fill={C.yellow} opacity={on ? 0.25 : 0} />
          <path d="M -30 -150 Q -30 -180 0 -190 Q 30 -180 30 -150 Q 30 -130 18 -118 L -18 -118 Q -30 -130 -30 -150 Z" fill={C.yellow} />
          <rect x={-18} y={-118} width={36} height={14} rx={3} fill={C.greyDark} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <g transform={`rotate(${rot})`}>
            <path d={Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2, r = i % 2 ? 46 : 58;
              return `${i ? "L" : "M"} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
            }).join(" ") + " Z"} fill={C.greyDark} />
            <circle cx={0} cy={0} r={22} fill={C.greyLight} />
            <circle cx={0} cy={0} r={8} fill={C.greyDark} />
          </g>
          <path d="M 44 6 L 60 -10 L 76 26 L 92 -10 L 108 26 L 124 -10 L 140 6" stroke={C.orange} strokeWidth={9} fill="none" strokeLinejoin="round" />
        </g>
      )}
    />
  );
}
