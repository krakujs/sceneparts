import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Jagged yellow-white lightning bolt with a glow. Origin = centre of the bolt.
// anim "flash": the bolt switches on and off in a flicker every 50 frames.
const BOLT = "M 50 -300 L -58 -34 L 26 -34 L -70 300";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const col = p.color && p.color !== "none" ? p.color : C.yellow;
  const flash = (p.anim ?? "none") === "flash";
  const cyc = f % 50;
  const on = flash ? (cyc < 4 || (cyc >= 8 && cyc < 11) ? 1 : 0) : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={on}>
      <circle r={250} fill={col} opacity={0.16} />
      <path d={BOLT} fill="none" stroke={col} strokeWidth={140} strokeLinejoin="round" strokeLinecap="round" opacity={0.22} />
      <path d={BOLT} fill="none" stroke={col} strokeWidth={42} strokeLinejoin="round" strokeLinecap="round" />
      <path d={BOLT} fill="none" stroke="#FFF8D6" strokeWidth={16} strokeLinejoin="round" strokeLinecap="round" />
    </g>
  );
}
