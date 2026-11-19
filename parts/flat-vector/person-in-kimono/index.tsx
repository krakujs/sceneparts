import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Kimono preset: long indigo robe with a dark lapel, wide sleeve and a red obi sash, sandals on the feet.
/* eslint-disable @typescript-eslint/no-explicit-any */
const ROBE = "#3D5A9A";
const ROBE_D = shade(ROBE, 0.18);
const OBI = "#B53A2E";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={ROBE}
      bottom="trousers"
      bottomColor={ROBE}
      shoes="sandals"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          <path d="M -84 -812 L 90 -812 L 104 -40 L -100 -40 Z" fill={ROBE} />
          <path d="M 10 -812 L 60 -812 L 6 -500 L -34 -520 Z" fill={ROBE_D} />
          <rect x={-88} y={-500} width={186} height={92} rx={6} fill={OBI} />
          <rect x={-88} y={-478} width={186} height={6} fill={C.yellow} opacity={0.8} />
          <rect x={-88} y={-436} width={186} height={6} fill={C.yellow} opacity={0.8} />
        </g>
      )}
      held={(h) => (
        <g>
          <line x1={50} y1={-745} x2={h.x - 6} y2={h.y - 6} stroke={ROBE} strokeWidth={96} strokeLinecap="round" />
          <line x1={50} y1={-745} x2={h.x - 6} y2={h.y - 6} stroke={ROBE_D} strokeWidth={12} strokeLinecap="round" opacity={0.5} />
        </g>
      )}
    />
  );
}
