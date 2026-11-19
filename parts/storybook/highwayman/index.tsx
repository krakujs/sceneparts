import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Highwayman: tricorn, black eye mask, long cape and a flintlock pistol held pointing upward.
const Cape = ({ c }: { c: string }) => (
  <g>
    <path d="M -44 -446 Q -132 -400 -128 -250 Q -146 -120 -172 -10 Q -90 8 -40 -30 Q -60 -220 -10 -420 Z" fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -118 -262 Q -132 -140 -160 -22" stroke={C.brick} strokeWidth={8} fill="none" opacity={0.6} strokeLinecap="round" />
  </g>
);

const Pistol = () => (
  <g>
    <rect x={-9} y={-190} width={18} height={170} rx={3} fill="#4A4E5E" stroke={C.ink} strokeWidth={5} />
    <rect x={-13} y={-200} width={26} height={14} rx={3} fill={C.ink} />
    <rect x={6} y={-26} width={28} height={36} rx={4} fill="#9AA3AD" stroke={C.ink} strokeWidth={5} />
    <path d="M -12 -20 L 14 -20 L 20 70 Q 0 86 -18 70 Z" fill="#8D5A3B" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 8 14 Q 32 30 20 42" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>
);

const Mask = () => (
  <g>
    <path d="M 12 -548 Q 36 -562 64 -546 L 62 -518 Q 36 -528 12 -518 Z" fill="#1B1712" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={46} cy={-534} r={3} fill="#FFFFFF" opacity={0.8} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="tricorn" hatColour="#1B1712" hair="long" hairColour={p.hairColour} beard="none"
      skin={p.skin} top="coat" coat={p.coat} lower="breeches" legs="#6B4A2E" boots="#1B1712"
      pose="up" action="idle"
      behind={<Cape c={p.cape} />} held={() => <Pistol />} front={<Mask />}
    />
  );
}
