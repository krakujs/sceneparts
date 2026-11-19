import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// In love person: smile, floating hearts rising above the head (animated with p.f), holding a flower.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const heart = (i: number) => {
    const k = (p.f * 2 + i * 45) % 150;
    const sx = [-40, 30, 90][i];
    return (
      <g key={i} transform={`translate(${sx} ${-130 - k}) scale(${1.9 + i * 0.35})`} opacity={k > 110 ? (150 - k) / 40 : 1}>
        <path d="M 0 6 C -22 -10 -12 -28 0 -14 C 12 -28 22 -10 0 6 Z" fill={i === 1 ? C.red : C.pink} />
      </g>
    );
  };
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="wave"
      expression="smile"
      skin="fair"
      hair="long"
      hairColor="auburn"
      top="dress"
      topColor={C.pink}
      bottom="skirt"
      bottomColor={C.purple}
      shoes="sandals"
      shoesColor={C.brownDark}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M 0 0 L 0 -120" stroke={C.green} strokeWidth={9} strokeLinecap="round" />
          <circle cx={0} cy={-150} r={20} fill={C.pink} />
          <circle cx={-22} cy={-136} r={20} fill={C.pink} />
          <circle cx={22} cy={-136} r={20} fill={C.pink} />
          <circle cx={-12} cy={-166} r={20} fill={C.pink} />
          <circle cx={12} cy={-166} r={20} fill={C.pink} />
          <circle cx={0} cy={-150} r={12} fill={C.yellow} />
        </g>
      )}
      topper={() => <g>{[0, 1, 2].map((i) => heart(i))}</g>}
    />
  );
}
