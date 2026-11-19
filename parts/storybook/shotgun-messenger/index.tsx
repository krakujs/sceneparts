import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Shotgun messenger: stagecoach guard in duster and wide hat, double-barrel coach gun across the chest, strongbox at his feet.
const CoachGun = () => (
  <g>
    <path d="M -240 -20 Q -226 -24 -150 -28 L -150 4 Q -220 10 -240 8 Q -252 -6 -240 -20 Z" fill="#8D5A3B" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-150} y={-32} width={230} height={32} rx={6} fill="#4A4E5E" stroke={C.ink} strokeWidth={5} />
    <path d="M -146 -16 L 74 -16" stroke={C.ink} strokeWidth={2} opacity={0.5} />
    <ellipse cx={80} cy={-24} rx={7} ry={11} fill="#1B1712" stroke={C.ink} strokeWidth={3} />
    <rect x={-118} y={-40} width={26} height={12} rx={3} fill="#9AA3AD" stroke={C.ink} strokeWidth={4} />
  </g>
);

const StrongBox = () => (
  <g transform="translate(210 0)">
    <ellipse cx={0} cy={4} rx={110} ry={14} fill="#000" opacity={0.2} />
    <rect x={-90} y={-130} width={180} height={128} rx={8} fill="#8D5A3B" stroke={C.ink} strokeWidth={7} />
    <rect x={-90} y={-100} width={180} height={16} fill="#4A4E5E" stroke={C.ink} strokeWidth={4} />
    <rect x={-90} y={-30} width={180} height={16} fill="#4A4E5E" stroke={C.ink} strokeWidth={4} />
    <rect x={-18} y={-84} width={36} height={30} rx={4} fill={C.mustard} stroke={C.ink} strokeWidth={5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="wide" hatColour={p.hatColour} hair="short" hairColour={p.hairColour} beard="moustache"
      skin={p.skin} top="coat" coat={p.coat} buttons={false} lower="trousers" legs="#4A3324"
      pose="chest" backPose="chest" action="idle"
      held={() => <CoachGun />} front={<StrongBox />}
    />
  );
}
