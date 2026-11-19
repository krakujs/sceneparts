import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Ice cutter: wool cap, scarf and heavy coat, working a long ice saw and carrying iron tongs.
const Saw: React.FC = () => (
  <g transform="rotate(20)">
    <rect x={-6} y={-40} width={12} height={180} rx={5} fill="#8A6A45" stroke={C.ink} strokeWidth={4} />
    <rect x={-8} y={-300} width={16} height={270} rx={3} fill="#C9D3DA" stroke={C.ink} strokeWidth={5} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <path key={i} d={`M ${-8} ${-296 + i * 38} l 6 10 l 6 -10`} fill="none" stroke={C.ink} strokeWidth={3} />
    ))}
  </g>
);

const Tongs: React.FC = () => (
  <g transform="translate(-6 -120)">
    <path d="M -8 0 L -8 120 M 8 0 L 8 120" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <path d="M -8 0 L -8 120 M 8 0 L 8 120" stroke="#5C5F6E" strokeWidth={4} strokeLinecap="round" />
    <path d="M -8 0 Q 0 -20 8 0" stroke={C.ink} strokeWidth={8} fill="none" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="cap" hatColour={p.hatColour ?? C.brickDark} hair="short" beard="stubble" hairColour={p.hairColour}
      top="coat" coat={p.coat ?? C.navy} shirt={C.cream} scarf={p.scarf ?? C.brick}
      skin={p.skin} lower="trousers" legs="#3D3A44" boots="#2B2420"
      pose="forward" backPose="down" action={p.walk ? "walk" : "work"}
      held={() => <Saw />}
      backHeld={() => <Tongs />}
    />
  );
}
