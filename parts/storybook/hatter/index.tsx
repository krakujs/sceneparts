import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Hatter: waistcoat and apron, holding a nearly finished top hat on a wooden hat block.
const Block = () => (
  <g>
    <path d="M -56 -6 L 56 -6 L 66 80 Q 0 96 -66 80 Z" fill="#B07A4E" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -50 36 Q 0 48 50 36" stroke="#6B4A2E" strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M -40 -14 L -36 -130 Q 4 -140 44 -130 L 48 -14 Z" fill="#2B2420" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-40} y={-44} width={88} height={16} fill={C.brick} />
    <path d="M -72 -14 Q 4 -30 80 -14 Q 4 4 -72 -14 Z" fill="#2B2420" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -24 -118 L -22 -60" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.35} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="flat" hatColour={p.hatColour} hair="short" hairColour={p.hairColour} beard="moustache"
      skin={p.skin} top="waistcoat" coat={p.coat} shirt={C.cream} lower="trousers" legs="#4A4E5E"
      apron apronColour={C.paper} pose="chest" action="idle"
      held={() => <Block />}
    />
  );
}
