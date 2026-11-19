import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Newspaper seller: newsboy cap, waving a folded paper overhead, bundle of papers under the other arm. No readable text.
const Paper: React.FC = () => (
  <g transform="translate(0 -40)">
    <rect x={-44} y={-60} width={88} height={120} fill={C.cream} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -28 -36 L 28 -36 M -28 -16 L 28 -16 M -28 4 L 16 4 M -28 24 L 28 24 M -28 44 L 12 44" stroke={C.stone} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
    <rect x={-44} y={-60} width={88} height={20} fill={C.brick} stroke={C.ink} strokeWidth={4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      age="child" hat="cap" hatColour={p.hatColour ?? C.sepia} hair="short" hairColour={p.hairColour} beard="none"
      skin={p.skin} top="jacket" coat={p.coat ?? C.brickDark} shirt={C.cream} lower="shorts" legs={C.sepia} boots="#2B2420"
      pose="up" backPose="down" action={p.walk ? "walk" : "wave"}
      body={<rect x={-96} y={-330} width={110} height={70} rx={8} fill={C.paperDark} stroke={C.ink} strokeWidth={5} />}
      held={() => <Paper />}
    />
  );
}
