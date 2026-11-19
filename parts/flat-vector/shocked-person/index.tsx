import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Shocked person: surprised face, both hands on the cheeks (over), little burst lines around the head (topper).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const sk = "#C68558";
  const rays = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
    const r = (a * Math.PI) / 180;
    return <path key={a} d={`M ${Math.cos(r) * 118} ${Math.sin(r) * 118} L ${Math.cos(r) * 160} ${Math.sin(r) * 160}`} stroke={C.yellow} strokeWidth={12} strokeLinecap="round" opacity={0.6 + 0.4 * Math.abs(Math.sin(p.f / 5))} />;
  });
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="stand"
      expression="surprised"
      skin="medium"
      hair="curly"
      hairColor="black"
      top="blazer"
      topColor={C.blueDark}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      over={() => (
        <g>
          <path d="M 48 -775 Q 150 -780 120 -700" stroke={C.blueDark} strokeWidth={60} fill="none" strokeLinecap="round" />
          <path d="M -44 -775 Q -140 -780 -110 -700" stroke={shade(C.blueDark, 0.16)} strokeWidth={60} fill="none" strokeLinecap="round" />
          <circle cx={104} cy={-880} r={28} fill={sk} />
          <circle cx={-82} cy={-880} r={28} fill={sk} />
        </g>
      )}
      topper={() => <g>{rays}</g>}
    />
  );
}
