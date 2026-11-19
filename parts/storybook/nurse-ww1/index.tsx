import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// WW1 nurse: long blue dress, white apron and veil, holding a roll of bandage in the front hand.
// No red cross or other emblems. Preset of storybook/townsfolk.
const INK = C.ink;
const WHITE = "#FBF7EE";
const LINEN = "#C9B98F";

const Bandage: React.FC = () => (
  <g>
    <path d="M 30 14 Q 50 56 42 112" stroke={INK} strokeWidth={24} fill="none" strokeLinecap="round" />
    <path d="M 30 14 Q 50 56 42 112" stroke={WHITE} strokeWidth={14} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={-16} r={42} fill={WHITE} stroke={INK} strokeWidth={6} />
    <circle cx={0} cy={-16} r={26} fill="none" stroke={LINEN} strokeWidth={4} />
    <circle cx={0} cy={-16} r={12} fill={LINEN} stroke={INK} strokeWidth={3} />
    <path d="M -26 -40 Q -6 -52 14 -38" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.8} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="veil" hatColour={WHITE} hair="bun" hairColour={p.hairColour}
      top="dress" coat={p.dress ?? "#2E5E8C"} lower="long" boots="#2B2420"
      apron apronColour={WHITE} skin={p.skin}
      pose="forward" backPose="down" action="idle"
      body={
        <path d="M -36 -448 Q 4 -420 44 -448 L 40 -418 Q 4 -396 -32 -418 Z" fill={WHITE} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      }
      held={() => <Bandage />}
    />
  );
}
