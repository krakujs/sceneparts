import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Firefighter preset: yellow fire coat with silver reflective bands, dark trousers, red fire helmet (topper), hose nozzle held.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const band = "#E6EDF2";
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.yellowDark}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="boots"
      shoesColor={C.ink}
      hat="none"
      extra="none"
      accessory="none"
      over={() => (
        <g>
          <rect x={-78} y={-600} width={162} height={18} fill={band} />
          <rect x={-78} y={-540} width={162} height={18} fill={band} />
          <rect x={-102} y={-640} width={24} height={14} rx={4} fill={band} transform="rotate(-18 -90 -633)" />
          <rect x={80} y={-640} width={24} height={14} rx={4} fill={band} transform="rotate(18 92 -633)" />
          <rect x={-42} y={-812} width={78} height={22} rx={6} fill={shade(C.yellowDark, 0.1)} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -104 -40 Q -104 -150 6 -154 Q 116 -150 112 -40 Z" fill={C.red} />
          <path d="M -112 -40 L 118 -40 L 112 -18 L -106 -18 Z" fill={C.redDark} />
          <path d="M -60 -120 Q 0 -150 70 -124" stroke={C.redDark} strokeWidth={12} fill="none" strokeLinecap="round" />
          <rect x={-20} y={-40} width={58} height={20} rx={6} fill={C.greyLight} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-6} y={-70} width={12} height={70} rx={5} fill={C.greyDark} />
          <path d="M -14 -70 L 14 -70 L 18 -88 L -18 -88 Z" fill={C.greyDark} />
          <path d="M -18 -88 L 14 -132 L 26 -124 L -6 -88 Z" fill={C.yellowDark} />
          <path d="M -6 -102 L 14 -132 L 24 -124 L 2 -100 Z" fill={C.greyDark} />
        </g>
      )}
    />
  );
}
