import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";
import { Burst } from "../../core/burst/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <g>
      <Burst x={p.x} y={p.y} r={p.r * 2} c={P.gold} n={20} rot={p.f * 0.6} />
      <circle cx={p.x} cy={p.y} r={p.r} fill={p.c ?? P.scarlet} stroke={INK} strokeWidth={8} />
      <circle cx={p.x} cy={p.y} r={p.r - 18} fill="none" stroke={P.gold} strokeWidth={8} />
    </g>
  );
}
