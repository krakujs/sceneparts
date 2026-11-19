import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Lederhosen preset: brown leather shorts with braces, red checked shirt, green knee socks and a green alpine hat with a feather.
/* eslint-disable @typescript-eslint/no-explicit-any */
const LEATHER = "#8A5A3C";
const CHECK = "#C0392B";
const SOCK = "#2E7D4F";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={CHECK}
      shirtColor={C.white}
      bottom="shorts"
      bottomColor={LEATHER}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="brim"
      hatColor={SOCK}
      over={() => (
        <g>
          {[-740, -700, -660, -620, -580, -540].map((y) => <rect key={y} x={-70} y={y} width={150} height={5} fill={C.white} opacity={0.5} />)}
          {[-60, -20, 20, 60].map((x) => <rect key={x} x={x} y={-800} width={5} height={330} fill={C.white} opacity={0.4} />)}
          <path d="M -34 -812 L -26 -470 M 60 -812 L 52 -470" stroke="#6B4226" strokeWidth={12} strokeLinecap="round" />
          <path d="M -34 -680 L 60 -680" stroke="#6B4226" strokeWidth={10} />
          <circle cx={-30} cy={-680} r={7} fill={C.yellow} />
          <circle cx={56} cy={-680} r={7} fill={C.yellow} />
          <path d="M -30 -470 L 56 -470" stroke="#6B4226" strokeWidth={10} />
          <path d="M -26 -244 L -26 -40 M 60 -244 L 60 -40" stroke={SOCK} strokeWidth={62} strokeLinecap="round" />
          <path d="M -26 -244 L -26 -40 M 60 -244 L 60 -40" stroke={C.white} strokeWidth={4} strokeDasharray="10 10" opacity={0.3} />
        </g>
      )}
      topper={() => <path d="M -62 -112 Q -40 -170 14 -150 Q -6 -120 -10 -100 Z" fill={C.white} />}
    />
  );
}
