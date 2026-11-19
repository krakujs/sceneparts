import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Projectionist: waistcoat, rolled sleeves and cap, holding a film reel with a strip of film unspooling.
const Reel: React.FC<{ f: number }> = ({ f }) => {
  const spin = (f * 6) % 360;
  return (
    <g>
      <path d="M 0 0 Q -30 60 -10 140 Q 0 180 -40 220" fill="none" stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
      <path d="M 0 0 Q -30 60 -10 140 Q 0 180 -40 220" fill="none" stroke="#2C2F3B" strokeWidth={12} strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={-30 + (i % 2) * 2} y={20 + i * 40} width={10} height={6} rx={2} fill={C.cream} stroke={C.ink} strokeWidth={2} />
      ))}
      <g transform={`rotate(${spin})`}>
        <circle cx={0} cy={0} r={44} fill="#8A8E9B" stroke={C.ink} strokeWidth={6} />
        <circle cx={0} cy={0} r={12} fill={C.ink} />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={Math.cos((k * 2 * Math.PI) / 3) * 24} cy={Math.sin((k * 2 * Math.PI) / 3) * 24} r={6} fill={C.ink} />
        ))}
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="cap" hatColour={p.hatColour ?? C.stoneDark} hair="short" hairColour={p.hairColour ?? "#2C2F3B"} beard="none"
      top="waistcoat" coat={p.waistcoat ?? C.brickDark} shirt={C.cream} lower="trousers" legs={C.stone} boots="#2B2420"
      skin={p.skin ?? "#E8B990"} belt
      pose="forward" backPose="down" action={p.walk ? "walk" : "work"}
      held={() => <Reel f={p.f} />}
    />
  );
}
