import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Lector: reader in waistcoat and spectacles, holding a newspaper open and reading aloud,
// the other hand gesturing. Preset of storybook/townsfolk. No text on the page.
const Newspaper: React.FC<{ f: number }> = ({ f }) => {
  const turn = Math.sin(f / 30) * 2;
  return (
    <g transform={`rotate(${turn} 0 0)`}>
      <path d="M -90 -60 L 0 -40 L 0 90 L -90 70 Z" fill={C.cream} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 90 -60 L 0 -40 L 0 90 L 90 70 Z" fill={C.paper} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path d={`M -70 ${-30 + i * 22} L -14 ${-18 + i * 22}`} stroke={C.sepia} strokeWidth={4} opacity={0.55} />
          <path d={`M 14 ${-18 + i * 22} L 70 ${-30 + i * 22}`} stroke={C.sepia} strokeWidth={4} opacity={0.55} />
        </g>
      ))}
    </g>
  );
};

const Spectacles: React.FC = () => (
  <g>
    <circle cx={26} cy={-530} r={13} fill="none" stroke={C.ink} strokeWidth={5} />
    <circle cx={-4} cy={-530} r={0.1} fill="none" stroke={C.ink} strokeWidth={0} />
    <path d="M 39 -530 L 50 -534" stroke={C.ink} strokeWidth={4} />
  </g>
);

const Gesture: React.FC<{ f: number }> = ({ f }) => (
  <g transform={`translate(0 ${Math.sin(f / 7) * 6})`} opacity={0.8}>
    <path d="M 0 0 q 14 -20 30 -6" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="bowler" hatColour={p.hatColour ?? "#2C2F3B"} hair="bald" beard="moustache" hairColour={p.hairColour ?? "#8A8A8A"}
      top="waistcoat" coat={p.coat ?? C.brickDark} shirt={C.cream} lower="trousers" legs={C.stone}
      skin={p.skin ?? "#C98E64"} age="old"
      pose="chest" backPose="forward" action={p.walk ? "walk" : "work"}
      held={() => <Newspaper f={p.f} />}
      backHeld={() => <Gesture f={p.f} />}
      front={<Spectacles />}
    />
  );
}
