import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Press gang sailor: burly sailor in a striped shirt with a wooden cudgel and a coil of rope over the shoulder.
const hw = (y: number) => 66 + ((y + 460) / 210) * 10; // torso half-width at height y

const Stripes = ({ c }: { c: string }) => {
  const bands = [];
  for (let k = 0; k < 8; k++) {
    const y0 = -440 + k * 28;
    const y1 = y0 + 14;
    bands.push(
      <path key={k} d={`M ${-hw(y0)} ${y0} L ${hw(y0)} ${y0} L ${hw(y1)} ${y1} L ${-hw(y1)} ${y1} Z`} fill={c} />
    );
  }
  return <g>{bands}</g>;
};

const Rope = () => (
  <g>
    <ellipse cx={-56} cy={-430} rx={40} ry={26} fill="#D9C49C" stroke={C.ink} strokeWidth={5} />
    <ellipse cx={-56} cy={-430} rx={22} ry={13} fill="none" stroke={C.ink} strokeWidth={4} />
    <path d="M -90 -420 Q -96 -380 -84 -352" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>
);

const Cudgel = () => (
  <g>
    <rect x={-10} y={-12} width={20} height={250} rx={8} fill="#8D5A3B" stroke={C.ink} strokeWidth={5} />
    <circle cx={0} cy={262} r={34} fill="#8D5A3B" stroke={C.ink} strokeWidth={6} />
    <circle cx={-10} cy={252} r={6} fill="#FFFFFF" opacity={0.4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="cap" hatColour="#2C2F3B" hair="short" hairColour={p.hairColour} beard="full"
      skin={p.skin} top="shirt" shirt={C.cream} lower="trousers" legs="#2C2F3B" boots="#2B2420"
      pose="down" action="idle"
      body={<><Stripes c={p.stripe} /><Rope /></>} held={() => <Cudgel />}
    />
  );
}
