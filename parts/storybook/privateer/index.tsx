import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Privateer: tricorn, long teal coat with gold trim, sash, breeches and boots, cutlass raised.
const Cutlass: React.FC = () => (
  <g>
    <rect x={-8} y={-20} width={16} height={44} rx={4} fill="#4A3324" stroke={C.ink} strokeWidth={5} />
    <path d="M -34 -22 Q 0 -8 34 -22" stroke={C.mustard} strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M -4 -26 L 4 -26 Q 14 -200 6 -360 Q 0 -400 -4 -360 Q -10 -200 -4 -26 Z" fill="#DDE3E8" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="tricorn" hatColour={p.hatColour ?? "#2B2420"} hair="ponytail" hairColour={p.hairColour} beard="none"
      skin={p.skin} top="coat" coat={p.coat ?? C.teal} shirt={C.cream} lower="breeches" legs={C.cream} boots="#2B2420"
      belt pose="up" action={p.walk ? "walk" : "work"}
      body={
        <g>
          <path d="M -60 -440 L 60 -250 L 40 -244 L -66 -430 Z" fill={C.mustard} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -70 -262 L 70 -262 L 74 -240 L -74 -240 Z" fill={C.mustard} stroke={C.ink} strokeWidth={4} />
          <path d="M -74 -330 L -74 -190 M 74 -330 L 74 -190" stroke={C.mustard} strokeWidth={8} />
        </g>
      }
      held={() => <Cutlass />}
    />
  );
}
