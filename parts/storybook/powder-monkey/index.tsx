import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Powder monkey: ship's boy, barefoot, striped shirt, carrying a wooden box of powder cartridges.
const Box: React.FC<{ f: number }> = ({ f }) => {
  const bob = Math.sin(f / 5) * 3;
  return (
    <g transform={`translate(0 ${bob})`}>
      <rect x={-56} y={-40} width={112} height={80} rx={6} fill="#8A6A45" stroke={C.ink} strokeWidth={6} />
      <path d="M -56 -10 L 56 -10 M -56 20 L 56 20" stroke={C.ink} strokeWidth={4} />
      <rect x={-12} y={-12} width={24} height={22} rx={3} fill={C.mustard} stroke={C.ink} strokeWidth={4} />
      <path d="M -40 -30 Q 0 -44 40 -30" fill="none" stroke="#B98B52" strokeWidth={5} />
    </g>
  );
};

const Stripes: React.FC = () => (
  <g fill="none" stroke={C.brickDark} strokeWidth={8} opacity={0.85}>
    <path d="M -66 -400 L 66 -400" />
    <path d="M -66 -360 L 66 -360" />
    <path d="M -66 -320 L 66 -320" />
    <path d="M -66 -280 L 66 -280" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="kerchief" hatColour={p.hatColour ?? C.brick} hair="short" hairColour={p.hairColour ?? "#3B2A1E"} beard="none"
      top="shirt" shirt={C.cream} lower="shorts" legs={C.sepia} boots={p.skin ?? "#C98E64"}
      skin={p.skin ?? "#C98E64"} age="child" belt
      pose="carry" backPose="down" action={p.walk ? "walk" : "idle"}
      held={() => <Box f={p.f} />}
      body={<Stripes />}
    />
  );
}
