import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Vestal priestess: white Roman robe and veil, carrying a shallow bowl with a sacred flame.
const Bowl: React.FC<{ f: number }> = ({ f }) => {
  const flick = 1 + Math.sin(f / 2.2) * 0.12;
  return (
    <g transform="translate(0 -60)">
      <path d="M -70 -20 L 70 -20 Q 60 40 0 40 Q -60 40 -70 -20 Z" fill={C.mustard} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -50 0 Q -40 20 -10 24" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.6} strokeLinecap="round" />
      <g transform={`translate(0 -20) scale(${flick})`}>
        <circle r={34} fill={C.glow} opacity={0.35} />
        <path d="M 0 -50 Q 22 -16 14 6 Q 0 16 -14 6 Q -22 -16 0 -50 Z" fill="#F08A24" stroke={C.ink} strokeWidth={4} />
        <path d="M 0 -22 Q 8 -4 4 4 Q 0 8 -4 4 Q -8 -4 0 -22 Z" fill={C.glow} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="veil" hatColour="#F7F2E6" hair="long" hairColour={p.hairColour ?? "#4A3324"} beard="none"
      skin={p.skin} top="robe" coat="#F7F2E6" shirt="#F7F2E6" lower="long" legs="#F7F2E6"
      scarf={C.mustard} pose="down" backPose="down" action={p.walk ? "walk" : "idle"}
      body={<path d="M -60 -450 Q 0 -420 60 -450 L 62 -330 Q 0 -310 -62 -330 Z" fill="#F7F2E6" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />}
      held={() => <Bowl f={p.f} />}
    />
  );
}
