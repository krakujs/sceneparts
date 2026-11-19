import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Jester: original motley tunic in two colours, a three-point belled cap and a bauble sceptre.
const Motley = ({ c }: { c: string }) => (
  <g>
    <path d="M 2 -452 L 80 -434 L 92 -216 L 2 -216 Z" fill={c} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    {[[30, -400], [60, -350], [40, -300], [66, -250]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={7} fill={C.brick} stroke={C.ink} strokeWidth={3} />
    ))}
    <path d="M -40 -330 L -14 -300 L -40 -270 L -66 -300 Z" fill={C.brick} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

const Cap = ({ c, d }: { c: string; d: string }) => (
  <g>
    <path d="M -60 -560 L -100 -640 Q -70 -622 -40 -576 Z" fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -24 -582 L 4 -692 L 32 -582 Z" fill={d} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 40 -578 L 98 -636 Q 70 -620 56 -562 Z" fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -64 -548 Q 4 -594 68 -548 L 62 -528 Q 4 -570 -58 -528 Z" fill={d} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={-100} cy={-644} r={14} fill={C.glow} stroke={C.ink} strokeWidth={4} />
    <circle cx={4} cy={-696} r={14} fill={C.glow} stroke={C.ink} strokeWidth={4} />
    <circle cx={100} cy={-640} r={14} fill={C.glow} stroke={C.ink} strokeWidth={4} />
  </g>
);

const Bauble = () => (
  <g>
    <rect x={-6} y={-380} width={12} height={420} rx={5} fill="#8D5A3B" stroke={C.ink} strokeWidth={5} />
    <path d="M -22 -380 L 0 -350 L 22 -380" fill={C.mustard} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={0} cy={-410} r={36} fill={C.brick} stroke={C.ink} strokeWidth={6} />
    <circle cx={-12} cy={-422} r={9} fill="#FFFFFF" opacity={0.5} />
    {[-34, 0, 34].map((x) => (
      <circle key={x} cx={x} cy={-456} r={10} fill={C.mustard} stroke={C.ink} strokeWidth={4} />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="bald" top="tunic" coat={p.coat} lower="breeches" legs={p.legs} skin={p.skin}
      pose="up" action="idle"
      held={() => <Bauble />} body={<Motley c={p.motley} />} front={<Cap c={p.coat} d={p.motley} />}
    />
  );
}
