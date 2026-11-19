import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Pin setter: boy in shirt and braces carrying two bowling pins, with a bowling ball at his feet.
const Pin: React.FC<{ tilt?: number }> = ({ tilt = 0 }) => (
  <g transform={`rotate(${tilt})`}>
    <path d="M -14 -90 Q -22 -60 -14 -40 Q -36 -20 -24 20 Q -20 40 0 40 Q 20 40 24 20 Q 36 -20 14 -40 Q 22 -60 14 -90 Q 0 -100 -14 -90 Z" fill={C.cream} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -18 -20 L 18 -20 M -20 0 L 20 0" stroke={C.brick} strokeWidth={6} />
    <path d="M -8 -70 Q -10 -50 -6 -30" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.6} strokeLinecap="round" />
  </g>
);

const Ball: React.FC = () => (
  <g transform="translate(96 -36)">
    <ellipse cx={0} cy={4} rx={44} ry={12} fill="#000" opacity={0.2} />
    <circle cx={0} cy={-20} r={36} fill={C.navy} stroke={C.ink} strokeWidth={6} />
    <circle cx={-10} cy={-30} r={4} fill={C.ink} />
    <circle cx={8} cy={-34} r={4} fill={C.ink} />
    <circle cx={0} cy={-14} r={4} fill={C.ink} />
    <path d="M -22 -40 Q -18 -52 -8 -56" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.6} strokeLinecap="round" />
  </g>
);

const Braces: React.FC = () => (
  <g fill="none" stroke={C.brickDark} strokeWidth={6} strokeLinecap="round">
    <path d="M -50 -430 L -40 -270" />
    <path d="M 50 -430 L 40 -270" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="flat" hatColour={p.hatColour ?? "#8A6A45"} hair="short" hairColour={p.hairColour ?? "#3B2A1E"} beard="none"
      top="shirt" shirt={p.shirt ?? "#F4EAD5"} lower="trousers" legs={C.sepia} boots="#2B2420"
      skin={p.skin ?? "#E8B990"} age="child"
      pose="carry" backPose="carry" action={p.walk ? "walk" : "work"}
      held={() => <Pin tilt={-8} />}
      backHeld={() => <Pin tilt={10} />}
      body={<Braces />}
      front={<Ball />}
    />
  );
}
