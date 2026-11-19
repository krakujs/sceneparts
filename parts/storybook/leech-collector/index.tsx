import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Leech collector: woman wading with her skirt hitched up, bare legs with small leeches,
// holding a glass jar of leeches. Preset of storybook/townsfolk.
const Jar: React.FC<{ f: number }> = ({ f }) => {
  const wrig = Math.sin(f / 3) * 4;
  return (
    <g>
      <rect x={-36} y={-50} width={72} height={100} rx={12} fill="#CFE3DE" opacity={0.85} stroke={C.ink} strokeWidth={6} />
      <rect x={-30} y={-64} width={60} height={18} rx={4} fill="#8A6A45" stroke={C.ink} strokeWidth={4} />
      <path d={`M -20 10 Q -10 ${wrig} 0 10 Q 10 ${-wrig} 20 10`} fill="none" stroke="#3B4A2A" strokeWidth={6} strokeLinecap="round" />
      <path d={`M -14 30 Q -4 ${30 + wrig} 6 30 Q 16 ${30 - wrig} 22 30`} fill="none" stroke="#3B4A2A" strokeWidth={5} strokeLinecap="round" />
      <path d="M -26 -36 L -26 30" stroke="#FFFFFF" strokeWidth={5} opacity={0.6} strokeLinecap="round" />
    </g>
  );
};

const Leeches: React.FC<{ f: number }> = ({ f }) => {
  const wig = Math.sin(f / 4) * 3;
  const leech = (x: number, y: number, k: number) => (
    <path key={`${x}-${y}`} d={`M ${x} ${y} q ${6 + wig * k} -6 12 0 q 6 6 12 0`} fill="none" stroke="#3B4A2A" strokeWidth={6} strokeLinecap="round" />
  );
  return (
    <g>
      {leech(-44, -150, 1)}
      {leech(-10, -120, -1)}
      {leech(-30, -70, 1)}
      {leech(30, -170, -1)}
      {leech(40, -90, 1)}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="bonnet" hatColour={p.bonnet ?? C.sepia} hair="bun" hairColour={p.hairColour ?? "#4A3324"} beard="none"
      top="smock" shirt={C.cream} coat={p.smock ?? C.paperDark} lower="skirt" legs={p.skin ?? "#E8B990"} boots={p.skin ?? "#E8B990"}
      skin={p.skin ?? "#E8B990"} age="adult"
      pose="forward" backPose="down" action={p.walk ? "walk" : "idle"}
      held={() => <Jar f={p.f} />}
      front={<Leeches f={p.f} />}
    />
  );
}
