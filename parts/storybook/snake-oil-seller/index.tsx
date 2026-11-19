import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Snake oil seller: top hat, checked waistcoat, holding up an unlabelled tonic bottle with a little sparkle.
const Bottle: React.FC<{ f: number }> = ({ f }) => {
  const tw = 0.6 + Math.abs(Math.sin(f / 9)) * 0.5;
  return (
    <g>
      <rect x={-14} y={-130} width={28} height={36} fill="#7FB7A8" stroke={C.ink} strokeWidth={5} />
      <path d="M -40 -130 L 40 -130 L 40 -60 Q 40 -20 0 -20 Q -40 -20 -40 -60 Z" fill="#7FB7A8" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -22 -100 L -22 -62" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" opacity={0.6} />
      <g transform={`translate(44 -150) scale(${tw})`}>
        <path d="M 0 -22 L 5 -5 L 22 0 L 5 5 L 0 22 L -5 5 L -22 0 L -5 -5 Z" fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
      </g>
      <g transform={`translate(-46 -170) scale(${1.2 - tw * 0.3})`}>
        <path d="M 0 -14 L 3 -3 L 14 0 L 3 3 L 0 14 L -3 3 L -14 0 L -3 -3 Z" fill={C.glow} stroke={C.ink} strokeWidth={2.5} />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="top" hatColour={p.hatColour ?? "#1B1712"} hair="short" hairColour={p.hairColour} beard="moustache"
      skin={p.skin} top="waistcoat" coat={p.coat ?? C.mustard} shirt={C.cream} lower="trousers" legs={C.brickDark}
      scarf={C.brick} pose="up" action={p.walk ? "walk" : "wave"}
      body={<path d="M -40 -400 L -40 -262 M -10 -400 L -10 -262 M 20 -400 L 20 -262 M 50 -400 L 50 -262 M -60 -360 L 60 -330 M -60 -300 L 60 -270" stroke={C.brick} strokeOpacity={0.45} strokeWidth={6} />}
      held={() => <Bottle f={p.f} />}
    />
  );
}
