import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Headsman: cartoon executioner in a black hood with an eye hole, bare arms, leaning on a big axe. No blood, no victim.
const Hood = ({ c }: { c: string }) => (
  <g>
    <path d="M -66 -470 Q -86 -560 -48 -616 Q 4 -662 56 -616 Q 90 -570 70 -470 Q 4 -440 -66 -470 Z" fill={c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -34 -636 Q 4 -666 40 -640" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.2} strokeLinecap="round" />
    <path d="M 4 -612 Q 0 -560 10 -500" stroke={C.ink} strokeWidth={3} fill="none" opacity={0.4} />
    <ellipse cx={34} cy={-528} rx={16} ry={11} fill={C.cream} stroke={C.ink} strokeWidth={4} />
    <circle cx={40} cy={-526} r={6} fill={C.ink} />
  </g>
);

const Axe = () => (
  <g>
    <rect x={-8} y={-430} width={16} height={702} rx={6} fill="#8D5A3B" stroke={C.ink} strokeWidth={5} />
    {[110, 140, 170].map((y) => <line key={y} x1={-8} y1={y} x2={8} y2={y} stroke={C.ink} strokeWidth={3} opacity={0.5} />)}
    <path d="M 8 -460 Q 160 -520 160 -380 Q 146 -300 8 -326 Z" fill="#B8C2CC" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 8 -446 Q 60 -420 58 -372" stroke={C.ink} strokeWidth={4} fill="none" opacity={0.5} />
    <path d="M 26 -440 Q 120 -444 140 -384" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.6} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="bald" top="waistcoat" coat="#1B1712" shirt={p.skin} apron={false}
      lower="trousers" legs="#2C2F3B" boots="#1B1712" skin={p.skin}
      pose="carry" backPose="hip" action="idle"
      held={() => <Axe />} front={<Hood c={p.hood} />}
    />
  );
}
