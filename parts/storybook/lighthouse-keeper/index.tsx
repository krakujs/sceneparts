import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Lighthouse keeper: bearded keeper in oilskin coat and sou'wester hat, holding a glowing lantern.
const Lantern: React.FC<{ f: number; lit: boolean }> = ({ f, lit }) => {
  const flick = 1 + Math.sin(f / 2.3) * 0.08;
  return (
    <g transform="translate(0 -40)">
      {lit ? <circle cx={0} cy={0} r={90 * flick} fill={C.glow} opacity={0.3} /> : null}
      <path d="M -30 -40 Q 0 -70 30 -40" fill="none" stroke={C.ink} strokeWidth={7} />
      <rect x={-38} y={-40} width={76} height={20} rx={4} fill="#B98B52" stroke={C.ink} strokeWidth={5} />
      <path d="M -34 -20 L -28 30 L 28 30 L 34 -20 Z" fill={lit ? "#FCEBB6" : "#D7E3E2"} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      {lit ? (
        <g transform={`scale(${flick})`}>
          <path d="M 0 -8 Q 14 12 6 24 Q 0 30 -6 24 Q -14 12 0 -8 Z" fill="#F08A24" stroke={C.ink} strokeWidth={3} />
        </g>
      ) : null}
      <path d="M -22 -12 L -18 20" stroke="#FFFFFF" strokeWidth={4} opacity={0.6} strokeLinecap="round" />
      <path d="M -34 30 L 34 30 L 28 40 L -28 40 Z" fill="#B98B52" stroke={C.ink} strokeWidth={5} />
    </g>
  );
};

// Sou'wester: wide-brimmed oilskin hat with a long back flap.
const Souwester: React.FC = () => (
  <g>
    <path d="M -64 -560 Q -66 -650 4 -652 Q 72 -650 68 -560 Z" fill={C.mustard} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -92 -556 Q 0 -530 96 -556 Q 80 -530 0 -524 Q -80 -530 -92 -556 Z" fill={C.mustard} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -40 -620 Q 0 -632 40 -618" fill="none" stroke="#FFFFFF" strokeWidth={4} opacity={0.6} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="bald" beard="full" hairColour={p.beardColour ?? "#C9C2B8"}
      top="jacket" coat={p.oilskin ?? "#B5452F"} shirt={C.cream} lower="trousers" legs="#3D3A44" boots="#2B2420"
      skin={p.skin ?? "#C98E64"} age="old"
      pose="up" backPose="down" action={p.walk ? "walk" : "idle"}
      held={() => <Lantern f={p.f} lit={p.lit !== false} />}
      front={<Souwester />}
    />
  );
}
