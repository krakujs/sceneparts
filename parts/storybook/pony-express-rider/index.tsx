import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Pony express rider: young mail rider in fringed jacket and wide hat, leather mail pouch over the shoulder. Walks.
const Pouch = () => (
  <g>
    <path d="M -58 -440 Q 8 -360 62 -292" stroke={C.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M -58 -440 Q 8 -360 62 -292" stroke="#6B4A2E" strokeWidth={8} fill="none" strokeLinecap="round" />
    <rect x={34} y={-292} width={76} height={66} rx={8} fill="#6B4A2E" stroke={C.ink} strokeWidth={6} />
    <path d="M 30 -296 L 114 -296 L 110 -266 L 34 -266 Z" fill="#8D5A3B" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={72} cy={-270} r={4} fill={C.mustard} stroke={C.ink} strokeWidth={2} />
  </g>
);

const Fringe = () => (
  <g>
    {[-60, -48, -36, -24, -12, 0, 12, 24, 36, 48, 60].map((x) => (
      <line key={x} x1={x} y1={-252} x2={x} y2={-214} stroke="#6B4A2E" strokeWidth={4} strokeLinecap="round" />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="wide" hatColour={p.hatColour} hair="short" hairColour={p.hairColour} beard="none"
      skin={p.skin} top="jacket" coat={p.coat} buttons={false} lower="trousers" legs="#4A3324" boots="#2B2420"
      pose="down" action="walk"
      body={<><Fringe /><Pouch /></>}
    />
  );
}
