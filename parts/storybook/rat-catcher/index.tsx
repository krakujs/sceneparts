import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Rat catcher: flat cap, sash and waistcoat, holding a wire cage with two cartoon rats peeking out.
const Rat: React.FC<{ x: number; f: number; k: number }> = ({ x, f, k }) => {
  const peek = Math.max(0, Math.sin(f / 9 + k * 2)) * 8;
  return (
    <g transform={`translate(${x} ${-peek})`}>
      <ellipse cx={0} cy={0} rx={22} ry={16} fill="#8A7A8C" stroke={C.ink} strokeWidth={4} />
      <circle cx={-18} cy={-16} r={9} fill="#8A7A8C" stroke={C.ink} strokeWidth={4} />
      <circle cx={-20} cy={-6} r={2.5} fill={C.ink} />
      <path d="M 20 0 Q 40 -6 44 -18" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
};

const Cage: React.FC<{ f: number }> = ({ f }) => (
  <g transform="translate(-10 -90)">
    <rect x={-70} y={-40} width={140} height={100} rx={10} fill="none" stroke={C.ink} strokeWidth={10} />
    <rect x={-70} y={-40} width={140} height={100} rx={10} fill="none" stroke="#9AA3AE" strokeWidth={5} />
    {[-40, -10, 20, 50].map((bx) => <line key={bx} x1={bx} y1={-38} x2={bx} y2={58} stroke="#9AA3AE" strokeWidth={4} />)}
    <path d="M -70 -40 Q 0 -80 70 -40" fill="none" stroke={C.ink} strokeWidth={8} />
    <path d="M -70 -40 Q 0 -80 70 -40" fill="none" stroke="#9AA3AE" strokeWidth={3} />
    <Rat x={-22} f={f} k={0} />
    <Rat x={24} f={f} k={1} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="flat" hatColour={p.hatColour ?? C.sepia} hair="short" hairColour={p.hairColour ?? "#5C3A26"} beard="mutton"
      top="waistcoat" coat={p.waistcoat ?? C.teal} shirt={C.cream} belt
      skin={p.skin ?? "#C98E64"} lower="trousers" legs="#3D3A44" boots="#2B2420"
      pose="forward" backPose="down" action={p.walk ? "walk" : "idle"}
      held={() => <Cage f={p.f} />}
      body={<path d="M -60 -420 Q 0 -380 60 -420 L 58 -380 Q 0 -340 -58 -380 Z" fill={C.brick} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />}
    />
  );
}
