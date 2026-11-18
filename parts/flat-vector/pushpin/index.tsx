import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round-head push pin stuck at an angle, with a small shadow on the surface below its tip.
// Origin = the tip of the pin on the surface (bottom centre of the item).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const head = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={18} cy={6} rx={46} ry={11} fill={C.shadow} />
      <g transform={`${motion(anim, f)} rotate(24)`}>
        {/* needle with a tapered tip */}
        <path d="M -6 0 L -6 -150 L 0 -150 L 6 -150 L 6 0 L 0 14 Z" fill={C.grey} />
        <path d="M 1 -150 L 6 -150 L 6 0 L 0 14 Z" fill={C.greyDark} />
        {/* round head with a darker lower edge and a highlight */}
        <circle cx={0} cy={-194} r={50} fill={shade(head, 0.25)} />
        <circle cx={-5} cy={-200} r={46} fill={head} />
        <ellipse cx={-18} cy={-218} rx={14} ry={9} fill={C.white} opacity={0.5} transform="rotate(-30 -18 -218)" />
      </g>
    </g>
  );
}
