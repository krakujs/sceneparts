import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Food taster: court servant in livery, sipping from a goblet with worried eyes; a tart on a tray in the back hand.
const Goblet = () => (
  <g>
    <path d="M 0 0 L -98 30" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
    <path d="M 0 0 L -98 30" stroke={C.sepia} strokeWidth={5} strokeLinecap="round" />
    <g transform="translate(0 30)">
      <path d="M -126 -46 L -70 -46 Q -66 -6 -98 4 Q -130 -6 -126 -46 Z" fill={C.mustard} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -118 -38 Q -116 -20 -108 -12" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.6} strokeLinecap="round" />
      <path d="M -128 -46 L -68 -46" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <path d="M -100 -40 Q -98 -20 -96 -2" stroke={C.brick} strokeWidth={4} fill="none" opacity={0.7} />
    </g>
  </g>
);

const Tray = () => (
  <g>
    <rect x={-100} y={-6} width={210} height={16} rx={6} fill="#B07A4E" stroke={C.ink} strokeWidth={6} />
    <ellipse cx={8} cy={-20} rx={42} ry={15} fill="#E2A24E" stroke={C.ink} strokeWidth={5} />
    <ellipse cx={8} cy={-24} rx={26} ry={8} fill={C.brick} opacity={0.85} />
    <path d="M -22 -26 L 40 -18 M -10 -34 L 30 -16" stroke="#B5703E" strokeWidth={3} opacity={0.6} />
  </g>
);

const WorriedEyes = () => (
  <g>
    <circle cx={34} cy={-528} r={10} fill={C.cream} stroke={C.ink} strokeWidth={4} />
    <circle cx={36} cy={-527} r={4} fill={C.ink} />
    <path d="M 20 -570 L 46 -556" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M 60 -574 q -8 12 0 18 q 8 -6 0 -18 Z" fill="#9CC9CF" stroke={C.ink} strokeWidth={3} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="flat" hatColour={p.hatColour} hair="short" hairColour={p.hairColour} beard="none"
      skin={p.skin} top="tunic" coat={p.coat} belt shirt={C.cream} lower="breeches" legs="#3D3A44"
      pose="chest" backPose="forward" action="idle"
      held={() => <Goblet />} backHeld={() => <Tray />} front={<WorriedEyes />}
    />
  );
}
