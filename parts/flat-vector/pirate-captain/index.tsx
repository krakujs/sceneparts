import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Pirate captain preset: tricorne hat, long navy coat with gold buttons, bushy beard and a brass telescope raised to the sky. Nothing aimed at anyone.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.navy}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="none"
      hair="none"
      accessory="beard"
      over={() => (
        <g>
          <path d="M -52 -812 L 14 -740 L 60 -812 Z" fill={C.white} />
          {[-720, -660, -600].map((yy) => <circle key={yy} cx={-56} cy={yy} r={8} fill={C.yellow} />)}
          {[-720, -660, -600].map((yy) => <circle key={"r" + yy} cx={66} cy={yy} r={8} fill={C.yellow} />)}
          <rect x={-76} y={-508} width={160} height={16} rx={5} fill={C.brownDark} />
          <rect x={-12} y={-514} width={30} height={28} rx={4} fill={C.yellow} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -96 -60 Q -96 -150 6 -152 Q 104 -150 104 -60 Z" fill={shade(C.ink, -0.6)} />
          <path d="M -170 -20 Q -150 -70 -120 -170 Q -60 -96 6 -100 Q 76 -96 140 -170 Q 166 -70 184 -20 Q 6 -70 -170 -20 Z" fill={C.ink} />
          <path d="M -170 -20 Q 6 -70 184 -20" stroke={C.yellow} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d="M -150 -64 Q -136 -110 -120 -160 M 160 -64 Q 150 -110 140 -160" stroke={C.yellow} strokeWidth={7} fill="none" strokeLinecap="round" />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-62)`}>
          <rect x={0} y={-10} width={130} height={20} rx={6} fill={C.yellowDark} />
          <rect x={20} y={-14} width={30} height={28} rx={4} fill={C.yellow} />
          <rect x={92} y={-16} width={40} height={32} rx={6} fill={C.brownDark} />
          <rect x={0} y={-10} width={130} height={5} fill={C.yellow} opacity={0.6} />
        </g>
      )}
    />
  );
}
