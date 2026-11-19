import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Blood drop: a single red teardrop with a shine, centred on (x, y). Effect, so no shadow or stand.
// anim "drip": the drop falls and fades in a 60-frame loop, squashing just before it lands.
// anim "pulse": the drop gently beats.
const f1 = (v: number) => v.toFixed(1);
const BODY = "M 0 -150 C 30 -90 90 -20 90 30 C 90 85 50 120 0 120 C -50 120 -90 85 -90 30 C -90 -20 -30 -90 0 -150 Z";
const SHADE = "M 0 -150 C 30 -90 90 -20 90 30 C 90 85 50 120 0 120 C 40 110 70 70 70 25 C 70 -20 30 -90 0 -150 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const cyc = (f % 60) / 60;
  const drip = anim === "drip";
  const dy = drip ? 40 * cyc * cyc : 0;
  const sy = drip && cyc > 0.85 ? 1 - (cyc - 0.85) * 1.2 : 1;
  const op = drip && cyc > 0.8 ? (1 - cyc) / 0.2 : 1;
  const beat = anim === "pulse" ? 1 + 0.05 * Math.sin((f * 2 * Math.PI) / 40) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y + dy)}) scale(${f1(s * beat)} ${f1(s * beat * sy)})`} opacity={op.toFixed(3)}>
      <path d={BODY} fill={c} />
      <path d={SHADE} fill={shade(c, 0.2)} />
      <path d="M -48 -30 C -58 -5 -55 15 -42 32" stroke={C.white} strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.6} />
      <circle cx={-44} cy={-62} r={7} fill={C.white} opacity={0.5} />
    </g>
  );
}
