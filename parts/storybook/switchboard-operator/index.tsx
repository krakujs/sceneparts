import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Switchboard operator: woman in blouse and long skirt, headset with mouthpiece,
// holding a plug cord out in front. Preset of storybook/townsfolk.
const Plug: React.FC<{ f: number }> = ({ f }) => {
  const sway = Math.sin(f / 6) * 6;
  return (
    <g>
      <path d={`M 0 0 Q 40 ${-30 + sway} 70 ${-10 + sway}`} stroke={C.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d={`M 0 0 Q 40 ${-30 + sway} 70 ${-10 + sway}`} stroke={C.brick} strokeWidth={4} fill="none" strokeLinecap="round" />
      <rect x={-14} y={-22} width={28} height={44} rx={6} fill={C.brick} stroke={C.ink} strokeWidth={5} />
      <rect x={66} y={-24 + sway} width={34} height={24} rx={6} fill="#C9D3DA" stroke={C.ink} strokeWidth={5} />
    </g>
  );
};

const Headset: React.FC = () => (
  <g>
    <path d="M -54 -530 Q -60 -610 4 -612 Q 66 -610 62 -530" fill="none" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
    <path d="M -54 -530 Q -60 -610 4 -612 Q 66 -610 62 -530" fill="none" stroke={C.stoneDark} strokeWidth={4} strokeLinecap="round" />
    <rect x={-66} y={-540} width={22} height={40} rx={8} fill={C.stone} stroke={C.ink} strokeWidth={5} />
    <path d="M -56 -500 Q -40 -470 -18 -478" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
    <rect x={-22} y={-486} width={16} height={14} rx={5} fill="#2C2F3B" stroke={C.ink} strokeWidth={4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="bun" hairColour={p.hairColour ?? "#7A4A2E"} beard="none"
      top="shirt" shirt={p.blouse ?? C.cream} lower="skirt" legs={p.skirt ?? C.brickDark} boots="#2B2420"
      skin={p.skin ?? "#E8B990"} age="adult"
      pose="forward" backPose="down" action={p.walk ? "walk" : "idle"}
      held={() => <Plug f={p.f} />}
      front={<Headset />}
    />
  );
}
