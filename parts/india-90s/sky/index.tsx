import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// Sun + drifting kites (patang)
export const Sky: React.FC<{ sunY?: number; kites?: boolean ; frame?: number }> = ({ frame = 0, sunY = 760, kites = true }) => {
  const f = frame;
  return (
    <g>
      <circle cx={790} cy={sunY} r={170} fill="#FFE9A8" opacity={0.45} />
      <circle cx={790} cy={sunY} r={110} fill="#FFF1C4" />
      {kites
        ? [
            { x: 200, y: 420, c: P.pink, s: 1 },
            { x: 930, y: 300, c: P.teal, s: 0.7 },
          ].map((k, i) => {
            const x = k.x + Math.sin(f / 22 + i) * 26;
            const y = k.y + Math.cos(f / 17 + i * 2) * 18;
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${k.s}) rotate(${Math.sin(f / 15 + i) * 8})`}>
                <path d={`M 0 -60 L 46 0 L 0 60 L -46 0 Z`} fill={k.c} stroke={INK} strokeWidth={5} />
                <path d="M 0 -60 L 0 60 M -46 0 L 46 0" stroke={INK} strokeWidth={3} />
                <path d={`M 0 60 q 20 40 -10 80 q -30 40 10 90`} stroke={INK} strokeWidth={3} fill="none" />
                <path d={`M 0 0 L ${-300 + i * 500} 900`} stroke={INK} strokeWidth={1.5} opacity={0.5} />
              </g>
            );
          })
        : null}
    </g>
  );
};

// ---------- mohalla rooftops ----------

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Sky {...(rest as any)} frame={f} />;
}
