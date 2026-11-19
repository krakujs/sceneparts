import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Resurrection man: dark coat, flat cap, shovel over the shoulder, lantern, and an empty sack. No body.
const Shovel: React.FC = () => (
  <g transform="rotate(-40 18 -440)">
    <rect x={-6} y={-700} width={14} height={520} rx={6} fill="#8A6A45" stroke={C.ink} strokeWidth={5} />
    <path d="M -30 -200 L 30 -200 L 36 -130 Q 0 -100 -36 -130 Z" fill="#7D8590" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>
);

const Sack: React.FC = () => (
  <g transform="translate(-150 -120)">
    <path d="M -50 0 Q -70 -90 -30 -120 Q 0 -140 30 -120 Q 70 -90 50 0 Q 0 16 -50 0 Z" fill={C.paperDark} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -26 -118 Q 0 -100 26 -118" stroke={C.ink} strokeWidth={5} fill="none" />
    <path d="M -30 -60 Q -36 -30 -20 -10" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.5} strokeLinecap="round" />
  </g>
);

const Lantern: React.FC<{ f: number }> = ({ f }) => {
  const flick = 1 + Math.sin(f / 2.3) * 0.1;
  return (
    <g transform="translate(0 0)">
      <circle cx={0} cy={0} r={44 * flick} fill={C.glow} opacity={0.3} />
      <rect x={-14} y={-14} width={28} height={36} fill="#FCEBB6" stroke={C.ink} strokeWidth={5} />
      <path d="M -18 -14 L 0 -34 L 18 -14 Z" fill={C.ink} />
      <path d="M 0 -4 Q 6 6 0 10 Q -6 6 0 -4 Z" fill="#F08A24" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="flat" hatColour={p.hatColour ?? "#2B2420"} hair="short" beard="stubble"
      top="coat" coat={p.coat ?? "#2B2A33"} shirt={C.paper} lower="trousers" legs="#3A3742"
      skin={p.skin} hairColour={p.hairColour} belt
      pose={p.walk ? "carry" : "down"} action={p.walk ? "walk" : "idle"}
      behind={<Shovel />}
      backHeld={() => <Sack />}
      held={() => <g transform="translate(0 -20)"><Lantern f={p.f} /></g>}
    />
  );
}
