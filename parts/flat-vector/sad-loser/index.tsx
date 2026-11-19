import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Sad loser: slumped hoodie, sad face, small grey rain cloud drifting above the head (topper).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const drift = Math.sin(p.f / 22) * 18;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="stand"
      expression="sad"
      skin="light"
      hair="side"
      hairColor="brown"
      top="hoodie"
      topColor={C.greyDark}
      bottom="trousers"
      bottomColor={C.inkSoft}
      shoes="shoes"
      shoesColor={C.ink}
      topper={() => (
        <g transform={`translate(${drift} 0)`}>
          <g transform="translate(20 -200) scale(1.7)">
            <ellipse cx={-40} cy={0} rx={52} ry={34} fill={C.grey} />
            <ellipse cx={30} cy={-6} rx={60} ry={44} fill={C.grey} />
            <ellipse cx={-8} cy={6} rx={56} ry={34} fill={C.grey} />
            <rect x={-92} y={-4} width={180} height={34} rx={17} fill={C.grey} />
            <ellipse cx={-30} cy={28} rx={0} ry={0} fill={C.grey} />
          </g>
          {[0, 1, 2, 3].map((i) => {
            const k = (p.f * 3 + i * 40) % 160;
            return <path key={i} d={`M ${-60 + i * 36} ${-150 + k} l -8 18`} stroke={C.blue} strokeWidth={7} strokeLinecap="round" opacity={0.85} />;
          })}
        </g>
      )}
    />
  );
}
