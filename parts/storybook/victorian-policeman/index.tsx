import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Victorian policeman: custodian helmet, navy tunic with brass buttons, wooden truncheon, bullseye lantern on the belt.
const Truncheon: React.FC = () => (
  <g transform="translate(0 -40)">
    <path d="M -9 -170 L 9 -170 L 12 0 Q 0 14 -12 0 Z" fill="#8A6A45" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -4 -150 L -4 -30" stroke="#FFFFFF" strokeWidth={4} opacity={0.5} strokeLinecap="round" />
  </g>
);

const Bullseye: React.FC<{ f: number }> = ({ f }) => {
  const flick = 1 + Math.sin(f / 3.1) * 0.06;
  return (
    <g transform="translate(-74 -236)">
      <circle r={44 * flick} fill={C.glow} opacity={0.25} />
      <rect x={-16} y={-18} width={32} height={34} rx={4} fill={C.stoneDark} stroke={C.ink} strokeWidth={5} />
      <circle cx={0} cy={-2} r={12} fill="#FCEBB6" stroke={C.ink} strokeWidth={4} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="custodian" hatColour={p.hatColour ?? "#1E2A47"} hair="short" beard="moustache" skin={p.skin} hairColour={p.hairColour}
      top="uniform" coat={p.coat ?? "#1E2A47"} shirt={C.cream} lower="trousers" legs="#1E2A47" boots="#1B1712"
      belt pose="down" action={p.walk ? "walk" : "idle"}
      body={<rect x={-70} y={-292} width={140} height={6} fill={C.mustard} stroke={C.ink} strokeWidth={3} />}
      held={() => <Truncheon />}
      front={<Bullseye f={p.f} />}
    />
  );
}
