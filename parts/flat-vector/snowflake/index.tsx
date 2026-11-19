import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Six-armed snowflake: each arm has two pairs of side branches and a V tip. White core on an ice-blue frame.
// Origin = centre. anim "spin" turns it slowly; "fall" drifts it down in a fading loop.
const ARM = "M 0 0 L 0 -262 M 0 -110 L -42 -165 M 0 -110 L 42 -165 M 0 -170 L -34 -218 M 0 -170 L 34 -218 M 0 -262 L -32 -232 M 0 -262 L 32 -232";
const ICE = "#5FAEE0";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const anim: string = p.anim ?? "none";
  const ph = anim === "fall" ? (f % 150) / 150 : 0;
  const dy = anim === "fall" ? -120 + 240 * ph : 0;
  const op = anim === "fall" ? Math.sin(Math.PI * ph) : 1;
  const rot = anim === "spin" ? f * 2 : anim === "fall" ? f * 0.5 : 0;
  const arms = [0, 1, 2, 3, 4, 5];
  return (
    <g transform={`translate(${x} ${y + dy}) scale(${s})`} opacity={op.toFixed(3)}>
      <g transform={`rotate(${rot})`}>
        {arms.map((i) => <path key={`o${i}`} d={ARM} transform={`rotate(${i * 60})`} fill="none" stroke={ICE} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />)}
        {arms.map((i) => <path key={`w${i}`} d={ARM} transform={`rotate(${i * 60})`} fill="none" stroke={C.white} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />)}
        <circle r={34} fill={C.white} />
        <circle r={18} fill="#CFEAFA" />
      </g>
    </g>
  );
}
