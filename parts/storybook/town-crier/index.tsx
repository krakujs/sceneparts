import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Town crier: tricorn, long red coat, ringing a handbell in one hand and holding a rolled scroll in the other.
const Bell: React.FC<{ f: number }> = ({ f }) => {
  const ring = Math.sin(f / 2) * 18;
  return (
    <g transform={`rotate(${ring} 0 -10)`}>
      <path d="M -6 -40 L 6 -40 L 8 -20 L 0 -10 L -8 -20 Z" fill="#8A6A45" stroke={C.ink} strokeWidth={4} />
      <path d="M -32 -18 Q -40 20 -30 34 L 30 34 Q 40 20 32 -18 Q 0 -6 -32 -18 Z" fill={C.mustard} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -20 -4 Q -22 14 -14 24" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.6} strokeLinecap="round" />
      <circle cx={0} cy={40} r={7} fill={C.ink} />
    </g>
  );
};

const Scroll: React.FC = () => (
  <g transform="translate(-6 -120)">
    <rect x={-45} y={-20} width={90} height={100} rx={6} fill={C.cream} stroke={C.ink} strokeWidth={5} />
    <ellipse cx={-45} cy={30} rx={12} ry={50} fill={C.paperDark} stroke={C.ink} strokeWidth={5} />
    <ellipse cx={45} cy={30} rx={12} ry={50} fill={C.paperDark} stroke={C.ink} strokeWidth={5} />
    <path d="M -28 20 L 28 20 M -28 44 L 28 44" stroke={C.sepia} strokeWidth={4} opacity={0.4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="tricorn" hatColour="#2C2F3B" hair="long" hairColour={p.hairColour ?? "#C9C2B8"} beard="moustache"
      top="coat" coat={p.coat ?? C.brick} shirt={C.cream} scarf={C.cream} belt
      skin={p.skin ?? "#E8B990"} lower="breeches" legs={C.navy} boots="#2B2420"
      pose="up" backPose="carry" action="work"
      held={() => <Bell f={p.f} />}
      backHeld={() => <Scroll />}
      body={<path d="M -40 -450 Q 0 -420 40 -450" stroke={C.mustard} strokeWidth={6} fill="none" />}
    />
  );
}
