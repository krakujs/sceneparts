import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Weaver: headscarf, apron and rolled sleeves, a wooden shuttle in one hand and a bolt of woven cloth under the other arm.
const Shuttle: React.FC = () => (
  <g transform="rotate(-12)">
    <path d="M -50 -10 Q 0 -30 50 -10 L 44 14 Q 0 28 -44 14 Z" fill="#A87A4A" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -30 0 L 30 0" stroke={C.cream} strokeWidth={4} opacity={0.7} />
  </g>
);

const Bolt: React.FC = () => (
  <g transform="translate(0 -40)">
    <rect x={-50} y={-110} width={100} height={220} rx={14} fill={C.teal} stroke={C.ink} strokeWidth={6} />
    {[-120, -90, -60, -30, 0, 30].map((y) => (
      <line key={y} x1={-50} y1={y} x2={50} y2={y + 14} stroke={C.mustard} strokeWidth={6} opacity={0.8} />
    ))}
    <ellipse cx={0} cy={-110} rx={50} ry={12} fill={C.cream} stroke={C.ink} strokeWidth={5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="kerchief" hatColour={p.hatColour ?? C.mustard} hair="bun" hairColour={p.hairColour ?? "#4A3324"} beard="none"
      skin={p.skin} top="shirt" shirt={C.paper} coat={C.paper} lower="skirt" legs={C.stone}
      apron apronColour={C.cream} pose="forward" backPose="down" action={p.walk ? "walk" : "work"}
      backHeld={() => <Bolt />}
      held={() => <Shuttle />}
    />
  );
}
