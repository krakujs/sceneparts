import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Telegraph boy: pillbox cap and buttoned uniform, holding out a telegram envelope, with a satchel across the body.
const Envelope: React.FC<{ f: number }> = ({ f }) => {
  const nod = Math.sin(f / 5) * 4;
  return (
    <g transform={`translate(0 ${nod})`}>
      <rect x={-46} y={-30} width={92} height={60} rx={4} fill={C.cream} stroke={C.ink} strokeWidth={5} />
      <path d="M -46 -30 L 0 6 L 46 -30" fill="none" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M -46 30 L -12 -2 M 46 30 L 12 -2" fill="none" stroke={C.sepia} strokeWidth={3} opacity={0.6} />
      <circle cx={0} cy={6} r={7} fill={C.brick} stroke={C.ink} strokeWidth={3} />
    </g>
  );
};

const Satchel: React.FC = () => (
  <g>
    <path d="M -60 -440 L 50 -250" stroke="#4A3324" strokeWidth={14} strokeLinecap="round" />
    <path d="M -60 -440 L 50 -250" stroke={C.ink} strokeWidth={3} strokeLinecap="round" opacity={0.5} />
    <rect x={-36} y={-290} width={70} height={60} rx={8} fill="#6B4A2E" stroke={C.ink} strokeWidth={5} />
    <path d="M -36 -262 L 34 -262" stroke={C.ink} strokeWidth={3} opacity={0.5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="helmet" hatColour={C.navy} hair="short" hairColour={p.hairColour ?? "#5C3A26"} beard="none"
      top="uniform" coat={p.uniform ?? C.navy} shirt={C.cream}
      skin={p.skin ?? "#C98E64"} lower="trousers" legs={C.stoneDark} boots="#2B2420"
      pose="forward" backPose="down" action={p.walk ? "walk" : "idle"} age="child"
      held={() => <Envelope f={p.f} />}
      body={<Satchel />}
    />
  );
}
