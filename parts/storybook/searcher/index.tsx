import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Searcher of the dead (plague era): old woman in hood and shawl, long red wand, lantern in the back hand.
const Wand: React.FC = () => (
  <g transform="rotate(14)">
    <rect x={-7} y={-460} width={14} height={520} rx={6} fill={C.brick} stroke={C.ink} strokeWidth={5} />
    <circle cx={0} cy={-464} r={12} fill={C.brickDark} stroke={C.ink} strokeWidth={4} />
  </g>
);

const Lantern: React.FC<{ f: number }> = ({ f }) => {
  const flick = 1 + Math.sin(f / 2.6) * 0.1;
  return (
    <g>
      <circle cx={0} cy={-10} r={40 * flick} fill={C.glow} opacity={0.3} />
      <rect x={-14} y={-24} width={28} height={36} fill="#FCEBB6" stroke={C.ink} strokeWidth={5} />
      <path d="M -18 -24 L 0 -44 L 18 -24 Z" fill={C.ink} />
      <path d="M 0 -14 Q 6 -4 0 0 Q -6 -4 0 -14 Z" fill="#F08A24" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      age="old" hat="hood" hatColour={p.hatColour ?? "#4A3B2E"} hair="bun" hairColour="#B8B2A8" beard="none"
      skin={p.skin} top="dress" coat={p.coat ?? "#4A3B2E"} shirt={C.paperDark} lower="long" legs="#4A3B2E"
      scarf={C.paperDark} pose="forward" backPose="up" action={p.walk ? "walk" : "idle"}
      body={<path d="M -70 -440 Q 0 -390 70 -440 L 92 -300 Q 0 -340 -92 -300 Z" fill={C.paperDark} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />}
      held={() => <Wand />}
      backHeld={() => <Lantern f={p.f} />}
    />
  );
}
