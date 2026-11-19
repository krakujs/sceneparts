import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Factory girl: mob cap, apron and long skirt, carrying a basket of cotton bobbins.
const Bobbins: React.FC = () => (
  <g transform="translate(0 -20)">
    <path d="M -74 -20 L 74 -20 L 56 46 L -56 46 Z" fill="#B98B52" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -74 -20 Q 0 -86 74 -20" fill="none" stroke={C.ink} strokeWidth={7} />
    {[-40, -10, 22, 50].map((x, i) => (
      <g key={i} transform={`translate(${x} ${-30 - (i % 2) * 10})`}>
        <rect x={-10} y={-22} width={20} height={34} rx={4} fill={C.cream} stroke={C.ink} strokeWidth={4} />
        <rect x={-14} y={-26} width={28} height={8} rx={3} fill={C.teal} stroke={C.ink} strokeWidth={3} />
      </g>
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="mob" hair="bun" hairColour={p.hairColour ?? "#6B4A2E"} beard="none" skin={p.skin}
      top="smock" coat={p.coat ?? "#D9C49C"} shirt={C.cream} lower="skirt" legs={C.brick} boots="#2B2420"
      apron apronColour={C.cream} pose="carry" backPose="down" action={p.walk ? "walk" : "idle"}
      held={() => <Bobbins />}
    />
  );
}
