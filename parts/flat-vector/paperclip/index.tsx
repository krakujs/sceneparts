import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Large metal paper clip at an angle: one continuous wire with an inner and an outer loop.
// Origin = bottom centre of the item's bounding box (about 600 px tall at s = 1).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

const WIRE = "M -40 200 L -40 -140 A 40 40 0 0 1 40 -140 L 40 230 A 60 60 0 0 1 -80 230 L -80 -200 A 80 80 0 0 1 80 -200 L 80 170";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.grey;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={300} rx={170} ry={14} fill={C.shadow} />
      <g transform={`${motion(anim, f)} translate(0 -300) rotate(-28)`}>
        <path d={WIRE} fill="none" stroke={shade(metal, 0.3)} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" transform="translate(4 6)" />
        <path d={WIRE} fill="none" stroke={metal} strokeWidth={21} strokeLinecap="round" strokeLinejoin="round" />
        <path d={WIRE} fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={0.5} transform="translate(-4 -4)" />
      </g>
    </g>
  );
}
