import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Cowboy preset: brown wide-brim hat, blue plaid shirt, red neckerchief, blue jeans, brown boots and a coiled rope.
/* eslint-disable @typescript-eslint/no-explicit-any */
const HAT = "#8A5A3C";
const SHIRT = "#2F6FB0";
const ROPE = "#C9A06A";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={SHIRT}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor="#2F4F86"
      shoes="boots"
      shoesColor={C.brownDark}
      hat="none"
      over={() => (
        <g>
          {[-760, -720, -680, -640, -600].map((y) => <rect key={y} x={-70} y={y} width={150} height={6} fill="#8EC5E8" opacity={0.7} />)}
          {[-50, -10, 30, 60].map((x) => <rect key={x} x={x} y={-800} width={6} height={330} fill="#8EC5E8" opacity={0.6} />)}
          <path d="M -30 -812 L 40 -812 L 6 -728 Z" fill={C.red} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -58 -60 Q -66 -190 0 -186 Q 62 -186 58 -60 Z" fill={HAT} />
          <rect x={-60} y={-92} width={118} height={18} fill={shade(HAT, 0.3)} />
          <ellipse cx={0} cy={-64} rx={168} ry={26} fill={HAT} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <ellipse cx={0} cy={0} rx={40} ry={26} fill="none" stroke={ROPE} strokeWidth={12} />
          <ellipse cx={0} cy={0} rx={22} ry={13} fill="none" stroke={shade(ROPE, 0.2)} strokeWidth={10} />
          <path d="M 30 14 Q 60 90 36 140" stroke={ROPE} strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
