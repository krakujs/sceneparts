import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pepper mill (standalone): tall wooden grinder with a curved waist, bulb top and a knob. Origin = base centre.
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

// right half of the body profile (the left half is its mirror image); y goes up from the base
const HALF = "M 0 0 L 122 0 C 124 -24 112 -48 98 -72 C 84 -100 74 -150 72 -210 C 70 -260 66 -300 72 -330 C 92 -370 150 -420 152 -488 C 154 -552 128 -592 92 -612 C 62 -628 30 -636 0 -640 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const x = p.x ?? 540, y = p.y ?? 1560, s = p.s ?? 1, f: number = p.f ?? 0;
  const wood: string = p.woodColor ?? "#8A5A3C";
  const metal: string = p.metalColor ?? "#9AA3B5";
  const k = 1.2; // overall size: the body is ~375 px wide at s = 1
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={175} ry={22} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f, 380)}>
        <g transform={`scale(${k})`}>
          {/* metal foot ring */}
          <rect x={-126} y={-18} width={252} height={18} rx={6} fill={metal} />
          {/* body: mirrored left half in the main colour, right half in the shade */}
          <g transform="scale(-1 1)"><path d={HALF} fill={wood} /></g>
          <path d={HALF} fill={shade(wood, 0.22)} />
          {/* highlight on the left of the body */}
          <path d="M -104 -560 C -118 -480 -118 -300 -100 -180" stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" fill="none" opacity={0.18} />
          {/* grinder cap ring */}
          <rect x={-70} y={-640} width={140} height={20} rx={8} fill={metal} />
          {/* knob on top */}
          <rect x={-14} y={-668} width={28} height={30} rx={6} fill={shade(wood, 0.3)} />
          <circle cx={0} cy={-694} r={36} fill={wood} />
          <circle cx={-12} cy={-706} r={11} fill="#FFFFFF" opacity={0.25} />
        </g>
      </g>
    </g>
  );
}
