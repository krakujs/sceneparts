import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Shoe shiner: a boy in a flat cap brushing a shoe on a wooden shoe-shine box with a foot rest.
// Preset of storybook/townsfolk at child size. The brush is drawn in the front hand; the arm works it.
const INK = C.ink;
const WOOD = "#8A6A45";
const LID = "#6B4B2E";

const Brush: React.FC = () => (
  <g>
    <rect x={-9} y={-6} width={18} height={60} rx={5} fill={WOOD} stroke={INK} strokeWidth={5} />
    <rect x={-38} y={50} width={76} height={34} rx={9} fill={WOOD} stroke={INK} strokeWidth={5} />
    <rect x={-32} y={82} width={64} height={18} rx={4} fill={C.cream} stroke={INK} strokeWidth={4} />
    <line x1={-18} y1={84} x2={-18} y2={98} stroke={C.sepia} strokeWidth={3} />
    <line x1={0} y1={84} x2={0} y2={98} stroke={C.sepia} strokeWidth={3} />
    <line x1={18} y1={84} x2={18} y2={98} stroke={C.sepia} strokeWidth={3} />
  </g>
);

const ShineBox: React.FC = () => (
  <g>
    <rect x={92} y={-112} width={176} height={112} rx={8} fill={WOOD} stroke={INK} strokeWidth={6} />
    <path d="M 104 -94 L 256 -94 M 104 -66 L 256 -66 M 104 -38 L 256 -38" stroke={C.sepia} strokeWidth={3} opacity={0.6} />
    <rect x={86} y={-126} width={188} height={18} rx={5} fill={LID} stroke={INK} strokeWidth={5} />
    <circle cx={118} cy={-30} r={5} fill={C.mustard} stroke={INK} strokeWidth={3} />
    <circle cx={242} cy={-30} r={5} fill={C.mustard} stroke={INK} strokeWidth={3} />
    <rect x={112} y={-186} width={140} height={44} rx={14} fill={C.brickDark} stroke={INK} strokeWidth={6} />
    <path d="M 124 -178 Q 170 -184 236 -176" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.3} strokeLinecap="round" />
    <path d="M 120 -186 Q 124 -236 176 -238 Q 230 -238 244 -212 Q 252 -192 240 -186 Z" fill="#1B1712" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 146 -220 Q 176 -226 214 -218" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.4} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="flat" hatColour="#6B4B2E" hair="short" hairColour={p.hairColour}
      top="jacket" coat={p.jacket ?? "#4A4E5E"} shirt={C.cream} lower="trousers" legs="#3D3A44" boots="#2B2420"
      age="child" skin={p.skin} pose="carry" backPose="down" action={p.working === false ? "idle" : "work"}
      held={() => <Brush />}
      front={<ShineBox />}
    />
  );
}
