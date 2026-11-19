import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Lamplighter: cap, long coat and scarf, raising a long brass-tipped pole with a small flame.
// Example preset of storybook/townsfolk: fixes the look, draws the pole in the front hand.
const Pole: React.FC<{ f: number; lit: boolean }> = ({ f, lit }) => {
  const flick = 1 + Math.sin(f / 2.3) * 0.12;
  return (
    <g transform="rotate(28)">
      <rect x={-7} y={-330} width={14} height={440} rx={6} fill="#B98B52" stroke={C.ink} strokeWidth={4} />
      <rect x={-12} y={-356} width={24} height={34} rx={4} fill={C.mustard} stroke={C.ink} strokeWidth={4} />
      <path d="M 10 -350 q 26 -6 22 -30" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
      {lit ? (
        <g transform={`translate(0 -362) scale(${flick})`}>
          <circle r={34} fill={C.glow} opacity={0.35} />
          <path d="M 0 -30 Q 14 -8 8 4 Q 0 12 -8 4 Q -14 -8 0 -30 Z" fill="#F08A24" stroke={C.ink} strokeWidth={3} />
        </g>
      ) : null}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="cap" hair="short" beard="moustache" top="coat" coat={p.coat ?? "#2E3F5C"} scarf={p.scarf ?? C.mustard}
      skin={p.skin} hairColour={p.hairColour} lower="trousers"
      pose={p.walk ? "carry" : "up"} action={p.walk ? "walk" : "idle"}
      held={() => <Pole f={p.f} lit={p.lit !== false} />}
    />
  );
}
