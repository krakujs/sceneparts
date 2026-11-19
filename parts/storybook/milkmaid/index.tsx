import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Milkmaid: kerchief bonnet, apron and dress, with a wooden yoke across the shoulders and two hanging pails.
const Yoke: React.FC<{ f: number }> = ({ f }) => {
  const sway = Math.sin(f / 7) * 6;
  const pail = (x: number) => (
    <g transform={`translate(${x} ${-170 + sway * (x > 0 ? 1 : -1)}) scale(1.5)`}>
      <path d={`M 0 -60 L 0 ${(-276 - sway * (x > 0 ? 1 : -1)) / 1.5}`} stroke={C.ink} strokeWidth={3} />
      <path d="M -30 -40 Q 0 -60 30 -40" stroke={C.ink} strokeWidth={4} fill="none" />
      <path d="M -30 -40 L -24 40 L 24 40 L 30 -40 Z" fill="#8A6A45" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -26 -18 L 26 -18 M -25 14 L 25 14" stroke={C.ink} strokeWidth={4} />
      <path d="M -18 -30 Q -14 0 -18 28" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.5} strokeLinecap="round" />
    </g>
  );
  return (
    <g>
      <path d="M -170 -446 Q 10 -476 190 -446" fill="none" stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
      <path d="M -170 -446 Q 10 -476 190 -446" fill="none" stroke="#B98B52" strokeWidth={10} strokeLinecap="round" />
      {pail(-150)}
      {pail(170)}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="kerchief" hatColour={p.kerchief ?? C.teal} hair="bun" hairColour={p.hairColour ?? "#7A4A2E"} beard="none"
      top="dress" shirt={C.cream} coat={p.dress ?? C.brick} lower="long" legs={C.navy}
      apron apronColour={C.cream} skin={p.skin ?? "#E8B990"}
      pose="down" backPose="down" action={p.walk ? "walk" : "idle"}
      body={<Yoke f={p.f} />}
    />
  );
}
