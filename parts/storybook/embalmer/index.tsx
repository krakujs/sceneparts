import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Embalmer: ancient Egyptian embalmer in a white kilt with a jackal-style mask, holding a clay jar.
const Jackal = () => (
  <g>
    <path d="M -54 -470 Q -62 -560 -46 -560 L -34 -650 L -10 -596 Q 14 -606 26 -594 L 40 -660 L 54 -578 Q 70 -560 72 -548 L 170 -500 Q 184 -488 176 -472 L 72 -456 Q 20 -452 -54 -470 Z" fill={C.stoneDark} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 20 -528 Q 40 -542 62 -526 Q 40 -516 20 -528 Z" fill={C.mustard} stroke={C.ink} strokeWidth={3} />
    <ellipse cx={174} cy={-486} rx={8} ry={6} fill={C.ink} />
    <path d="M -10 -616 L 0 -590" stroke={C.mustard} strokeWidth={4} opacity={0.7} strokeLinecap="round" />
  </g>
);

const Necklace = () => (
  <g>
    <path d="M -60 -430 Q 0 -350 60 -430" stroke={C.mustard} strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M -56 -414 Q 0 -336 56 -414" stroke={C.teal} strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M -52 -398 Q 0 -322 52 -398" stroke={C.brick} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>
);

const Jar = ({ c }: { c: string }) => (
  <g>
    <path d="M -40 -20 Q -74 -70 -66 -130 Q -62 -168 -36 -176 L 36 -176 Q 62 -168 66 -130 Q 74 -70 40 -20 Z" fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-28} y={-200} width={56} height={26} rx={6} fill={c} stroke={C.ink} strokeWidth={5} />
    <ellipse cx={0} cy={-200} rx={30} ry={8} fill="#8A6A45" stroke={C.ink} strokeWidth={4} />
    <path d="M -64 -112 L 64 -112 M -66 -90 L 66 -90" stroke={C.brick} strokeWidth={8} />
    <path d="M -50 -150 Q -54 -120 -46 -98" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.4} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="bald" top="shirt" shirt={p.skin} lower="skirt" legs={p.kilt}
      boots="#8A6A45" skin={p.skin} pose="forward" action="idle"
      held={() => <Jar c={p.jar} />} body={<Necklace />} front={<Jackal />}
    />
  );
}
