import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Suffragette: Edwardian dress and wide hat with a plain purple, white and green sash, holding a blank
// placard on a pole in the front hand. Preset of storybook/townsfolk. The placard carries no text.
const INK = C.ink;
const PURPLE = "#7B3FA0";
const GREEN = "#3E8E4E";
const CREAM = "#F7F1E1";

const Placard: React.FC = () => (
  <g>
    <rect x={-6} y={-130} width={12} height={230} rx={4} fill="#8A6A45" stroke={INK} strokeWidth={5} />
    <rect x={-112} y={-306} width={224} height={184} rx={8} fill={CREAM} stroke={INK} strokeWidth={7} />
    <rect x={-96} y={-290} width={192} height={152} rx={4} fill="none" stroke={C.paperDark} strokeWidth={3} />
    <path d="M -80 -262 Q -40 -274 -8 -262" stroke="#FFFFFF" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
  </g>
);

const Sash: React.FC = () => (
  <g transform="translate(0 -350) rotate(56)">
    <rect x={-150} y={-22} width={300} height={44} fill="none" />
    <rect x={-150} y={-22} width={300} height={14} fill={PURPLE} stroke={INK} strokeWidth={3} />
    <rect x={-150} y={-8} width={300} height={16} fill={CREAM} stroke={INK} strokeWidth={3} />
    <rect x={-150} y={8} width={300} height={14} fill={GREEN} stroke={INK} strokeWidth={3} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="wide" hatColour="#3B2A20" hair="bun" hairColour={p.hairColour}
      top="dress" coat={p.dress ?? "#3B3F6E"} lower="long" boots="#2B2420"
      skin={p.skin} pose="forward" backPose="hip" action="idle"
      body={<Sash />}
      front={<rect x={-50} y={-600} width={104} height={12} fill={PURPLE} stroke={INK} strokeWidth={3} />}
      held={() => <Placard />}
    />
  );
}
