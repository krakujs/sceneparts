import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Knocker-upper: early-morning waker with a long thin pole tapping upstairs windows.
// Preset of storybook/townsfolk: cap, long coat, pole raised in the front hand.
const Pole: React.FC<{ f: number }> = ({ f }) => {
  const tap = Math.max(0, Math.sin(f / 4)) * 14;
  return (
    <g transform={`rotate(${-10 - tap * 0.2})`}>
      <rect x={-5} y={-420} width={10} height={470} rx={5} fill="#B98B52" stroke={C.ink} strokeWidth={4} />
      <circle cx={0} cy={-430} r={12} fill={C.sepia} stroke={C.ink} strokeWidth={4} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="cap" hair="short" beard="none" top="coat" coat={p.coat ?? C.stone} scarf={p.scarf}
      skin={p.skin} hairColour={p.hairColour} lower="trousers"
      pose="up" action={p.walk ? "walk" : "work"}
      held={(a) => <Pole f={p.f} />}
    />
  );
}
