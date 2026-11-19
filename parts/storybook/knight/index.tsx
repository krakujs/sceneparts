import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Knight: full grey armour, visored great helm, sword raised high and a heater shield with a chevron.
const GreatHelm = ({ m }: { m: string }) => (
  <g>
    <path d="M -60 -520 L -66 -624 Q -66 -652 -38 -656 L 38 -656 Q 66 -652 66 -624 L 62 -520 Z" fill={m} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -56 -600 Q 0 -612 58 -600" stroke={C.ink} strokeWidth={4} fill="none" opacity={0.5} />
    <rect x={-30} y={-550} width={84} height={16} rx={4} fill={C.ink} />
    {[[30, -600], [46, -600], [30, -584], [46, -584]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={4} fill={C.ink} opacity={0.7} />
    ))}
    <path d="M -46 -640 Q -40 -650 -24 -650" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.5} strokeLinecap="round" />
    <path d="M -64 -520 L 60 -520 L 52 -494 L -54 -494 Z" fill="#8E99A6" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>
);

const Shield = () => (
  <g>
    <path d="M -150 -420 L -10 -420 L -10 -340 Q -10 -270 -80 -240 Q -150 -270 -150 -340 Z" fill="#3B3F6E" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -146 -392 L -80 -330 L -14 -392 L -14 -360 L -80 -298 L -146 -360 Z" fill={C.mustard} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

const Sword = () => (
  <g>
    <path d="M -8 -40 L -8 -400 L 0 -434 L 8 -400 L 8 -40 Z" fill="#E6E9EE" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -2 -60 L -2 -396" stroke="#FFFFFF" strokeWidth={3} opacity={0.8} />
    <rect x={-34} y={-46} width={68} height={14} rx={6} fill={C.mustard} stroke={C.ink} strokeWidth={5} />
    <rect x={-6} y={-32} width={12} height={56} rx={4} fill="#6B4A2E" stroke={C.ink} strokeWidth={4} />
    <circle cx={0} cy={34} r={11} fill={C.mustard} stroke={C.ink} strokeWidth={5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="bald" top="armour" coat={p.metal} lower="trousers" legs={p.metal} boots="#4A4E5E"
      skin={p.skin} pose="up" action="idle"
      held={() => <Sword />} front={<><GreatHelm m={p.metal} /><Shield /></>}
    />
  );
}
