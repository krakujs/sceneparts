import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Ao dai preset: long fitted tunic with side slits showing white trousers underneath; optional conical non la hat.
/* eslint-disable @typescript-eslint/no-explicit-any */
const AO = "#D9477A";
const PANTS = "#F7F3EA";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={AO}
      bottom="trousers"
      bottomColor={PANTS}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          <path d="M -72 -812 L 84 -812 L 88 -470 L 92 -40 L -88 -40 L -76 -470 Z" fill={AO} />
          <path d="M 30 -300 L 66 -300 L 66 -40 L 30 -40 Z" fill={PANTS} />
          <path d="M -86 -300 L -60 -300 L -60 -40 L -86 -40 Z" fill={shade(PANTS, 0.12)} />
          <path d="M 14 -800 L 14 -600" stroke={shade(AO, 0.2)} strokeWidth={4} />
          <rect x={-26} y={-836} width={44} height={22} rx={6} fill={shade(AO, 0.2)} />
        </g>
      )}
      topper={() =>
        p.conicalHat === false ? null : (
          <g>
            <path d="M -102 -66 Q -40 -226 0 -236 Q 40 -226 102 -66 Z" fill="#E9D3A9" />
            <ellipse cx={0} cy={-62} rx={170} ry={26} fill="#D8B979" />
            <path d="M -60 -150 Q 0 -190 60 -150" stroke="#B88F4F" strokeWidth={6} fill="none" />
          </g>
        )
      }
    />
  );
}
