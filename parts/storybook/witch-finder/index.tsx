import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Witch finder: stern 1640s magistrate in a tall black hat and white falling collar, pointing and holding a book.
const Collar = () => (
  <path d="M -60 -450 L 60 -450 Q 72 -400 40 -384 L 0 -368 L -40 -384 Q -72 -400 -60 -450 Z" fill={C.cream} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
);

const TallHat = () => (
  <g>
    <path d="M -48 -574 L -44 -676 Q 4 -692 48 -676 L 52 -574 Z" fill="#1B1712" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-48} y={-598} width={100} height={20} fill="#8A6A45" stroke={C.ink} strokeWidth={4} />
    <ellipse cx={4} cy={-574} rx={94} ry={18} fill="#1B1712" stroke={C.ink} strokeWidth={6} />
  </g>
);

const Book = () => (
  <g transform="rotate(-8 -64 -300)">
    <rect x={-112} y={-340} width={92} height={72} rx={5} fill="#6B4A2E" stroke={C.ink} strokeWidth={6} />
    <rect x={-106} y={-334} width={80} height={60} rx={3} fill={C.cream} stroke={C.ink} strokeWidth={3} />
    <path d="M -106 -304 L -26 -304" stroke={C.ink} strokeWidth={3} opacity={0.4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="long" hairColour={p.hairColour} beard="full"
      skin={p.skin} top="coat" coat={p.coat} buttons={false} lower="trousers" legs="#2C2F3B"
      pose="forward" backPose="hip" action="idle"
      held={() => <path d="M 0 -7 L 74 -7 Q 86 0 74 7 L 0 7 Z" fill={p.skin} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />}
      body={<Collar />} front={<><TallHat /><Book /></>}
    />
  );
}
