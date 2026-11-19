import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Happy winner: cheer pose, big laugh, gold trophy held high in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="cheer"
      expression="laugh"
      skin="tan"
      hair="short"
      hairColor="black"
      top="tshirt"
      topColor={C.teal}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y + 100})`}>
          <rect x={-26} y={-170} width={52} height={26} rx={8} fill={C.yellowDark} />
          <path d="M -6 -150 L -6 -110 L 6 -110 L 6 -150 Z" fill={C.yellowDark} />
          <path d="M -92 -330 L 92 -330 Q 90 -210 0 -170 Q -90 -210 -92 -330 Z" fill={C.yellow} />
          <path d="M -92 -330 Q -150 -320 -128 -260 Q -110 -228 -72 -226" stroke={C.yellow} strokeWidth={18} fill="none" strokeLinecap="round" />
          <path d="M 92 -330 Q 150 -320 128 -260 Q 110 -228 72 -226" stroke={C.yellow} strokeWidth={18} fill="none" strokeLinecap="round" />
          <path d="M -60 -310 Q -60 -240 -28 -210" stroke={C.white} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.6} />
          <path d="M -92 -330 L 92 -330 L 92 -318 Q 0 -300 -92 -318 Z" fill={shade(C.yellow, 0.2)} />
        </g>
      )}
    />
  );
}
