import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Mudlark: ragged barefoot child holding up a found coin, with a small bucket and mud on rolled trousers.
const Coin: React.FC<{ f: number }> = ({ f }) => {
  const spin = Math.abs(Math.sin(f / 6));
  return (
    <g transform={`translate(0 ${-Math.abs(Math.sin(f / 8)) * 6})`}>
      <ellipse cx={0} cy={0} rx={22 * spin + 3} ry={22} fill={C.mustard} stroke={C.ink} strokeWidth={5} />
      <path d="M -6 -10 Q -2 -2 -6 8" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.6} strokeLinecap="round" />
    </g>
  );
};

const Bucket: React.FC = () => (
  <g transform="translate(0 -40)">
    <path d="M -36 -10 L -28 50 L 28 50 L 36 -10 Z" fill="#8A6A45" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -40 -10 L 40 -10" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    <path d="M -38 0 Q 0 -40 38 0" fill="none" stroke={C.ink} strokeWidth={4} />
  </g>
);

const Mud: React.FC = () => (
  <g fill="#5A4431" stroke={C.ink} strokeWidth={3}>
    <ellipse cx={-22} cy={-240} rx={14} ry={9} />
    <ellipse cx={24} cy={-200} rx={11} ry={8} />
    <ellipse cx={-10} cy={-120} rx={12} ry={8} />
    <ellipse cx={20} cy={-40} rx={16} ry={10} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="curly" hairColour={p.hairColour ?? "#3B2A1E"} beard="none"
      top="tunic" shirt={C.paperDark} coat={p.rags ?? "#8A7A62"} lower="shorts" legs="#8A7A62" boots={p.skin ?? "#B8875C"}
      skin={p.skin ?? "#B8875C"} age="child"
      pose="up" backPose="down" action={p.walk ? "walk" : "idle"}
      held={() => <Coin f={p.f} />}
      backHeld={() => <Bucket />}
      front={<Mud />}
    />
  );
}
