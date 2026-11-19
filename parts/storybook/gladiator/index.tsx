import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Gladiator: bronze crested helmet, arm guard, short sword and round shield, tunic and sandals.
const Helmet = ({ m }: { m: string }) => (
  <g>
    <path d="M -48 -618 Q -10 -700 40 -676 Q 10 -650 52 -620 Q 0 -620 -48 -618 Z" fill={C.brick} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -62 -530 Q -68 -640 4 -644 Q 74 -640 70 -530 Z" fill={m} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -66 -532 Q 0 -512 72 -532" stroke={C.ink} strokeWidth={6} fill="none" />
    <path d="M 6 -602 L 58 -562 Q 40 -548 16 -560 Z" fill={m} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -36 -606 Q -6 -624 18 -612" stroke="#F2D39A" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
    {[-40, -10].map((x) => <circle key={x} cx={x} cy={-586} r={5} fill={C.mustard} stroke={C.ink} strokeWidth={3} />)}
  </g>
);

const Shield = () => (
  <g>
    <circle cx={-68} cy={-326} r={104} fill="#8A6A45" stroke={C.ink} strokeWidth={7} />
    <circle cx={-68} cy={-326} r={84} fill="none" stroke={C.brick} strokeWidth={14} />
    <path d="M -110 -326 L -26 -326 M -68 -368 L -68 -284" stroke={C.ink} strokeWidth={6} opacity={0.4} />
    <circle cx={-68} cy={-326} r={24} fill="#C9D3DA" stroke={C.ink} strokeWidth={6} />
  </g>
);

const Sword = () => (
  <g>
    <rect x={-26} y={-9} width={36} height={18} rx={5} fill="#6B4A2E" stroke={C.ink} strokeWidth={4} />
    <rect x={8} y={-36} width={14} height={72} rx={5} fill={C.mustard} stroke={C.ink} strokeWidth={5} />
    <path d="M 22 -12 L 176 -12 L 206 0 L 176 12 L 22 12 Z" fill="#E6E9EE" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 30 -5 L 170 -5" stroke="#FFFFFF" strokeWidth={3} opacity={0.8} />
  </g>
);

// Arm guard drawn in the arm's own frame (origin = hand), so it follows the forearm at any pose.
const ArmGuard = ({ a }: { a: number }) => (
  <g transform={`rotate(${a})`}>
    <rect x={-30} y={-96} width={60} height={62} rx={14} fill="#C08A3E" stroke={C.ink} strokeWidth={5} />
    <path d="M -18 -84 L -18 -44" stroke="#F2D39A" strokeWidth={4} opacity={0.7} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="bald" top="tunic" coat={p.coat} belt lower="trousers" legs={p.skin} boots="#8A6A45"
      skin={p.skin} pose="forward" backPose="down" action="idle"
      held={(a) => <><ArmGuard a={a} /><Sword /></>}
      front={<><Helmet m={p.metal} /><Shield /></>}
    />
  );
}
