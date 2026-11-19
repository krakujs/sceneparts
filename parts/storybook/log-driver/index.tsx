import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Log driver: lumberjack shirt and cap, standing on a floating log with a long pike pole.
const Log: React.FC<{ f: number }> = ({ f }) => {
  const rock = Math.sin(f / 12) * 4;
  return (
    <g transform={`rotate(${rock} 0 0)`}>
      <ellipse cx={0} cy={20} rx={230} ry={70} fill="#2E7D7A" opacity={0.35} />
      <rect x={-200} y={-30} width={400} height={66} rx={30} fill="#8A6A45" stroke={C.ink} strokeWidth={6} />
      <ellipse cx={-200} cy={3} rx={18} ry={33} fill="#D9B27A" stroke={C.ink} strokeWidth={5} />
      <circle cx={-200} cy={3} r={8} fill="none" stroke={C.sepia} strokeWidth={3} />
      <path d="M -150 -10 Q -100 -18 -50 -10" fill="none" stroke={C.ink} strokeWidth={3} opacity={0.4} />
      <path d="M 40 10 Q 90 4 130 14" fill="none" stroke={C.ink} strokeWidth={3} opacity={0.4} />
      {[-120, -40, 60, 150].map((x, i) => (
        <path key={i} d={`M ${x - 26} ${40 + Math.sin(f / 9 + i) * 3} q 13 -8 26 0 q 13 8 26 0`} fill="none" stroke="#FFFFFF" strokeWidth={4} opacity={0.7} strokeLinecap="round" />
      ))}
    </g>
  );
};

const Pike: React.FC = () => (
  <g transform="rotate(14)">
    <rect x={-6} y={-380} width={12} height={460} rx={5} fill="#B98B52" stroke={C.ink} strokeWidth={4} />
    <path d="M -10 -390 L 10 -390 L 26 -340 L 10 -350 L -10 -350 Z" fill="#C9D3DA" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -20 -350 L 20 -350 L 20 -326 L -20 -326 Z" fill="#B98B52" stroke={C.ink} strokeWidth={4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="cap" hatColour={p.hatColour ?? "#B5452F"} hair="short" hairColour={p.hairColour ?? "#5C3A26"} beard="full"
      top="shirt" shirt={p.plaid ?? "#B5452F"} lower="trousers" legs="#4A4E5E" boots="#2B2420"
      skin={p.skin ?? "#C98E64"} belt
      pose="up" backPose="down" action={p.walk ? "walk" : "work"}
      held={() => <Pike />}
      behind={<Log f={p.f} />}
    />
  );
}
