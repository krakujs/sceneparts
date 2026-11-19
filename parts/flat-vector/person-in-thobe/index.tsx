import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Thobe preset: ankle-length white robe with a placket and a white ghutra headscarf held by a dark agal cord.
/* eslint-disable @typescript-eslint/no-explicit-any */
const THOBE = "#FFFFFF";
const THOBE_D = "#D9DEE6";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={THOBE}
      bottom="trousers"
      bottomColor={THOBE}
      shoes="sandals"
      shoesColor={C.brownDark}
      hat="none"
      hair="none"
      over={() => (
        <g>
          <path d="M -80 -812 L 88 -812 L 98 -40 L -94 -40 Z" fill={THOBE} />
          <rect x={-94} y={-56} width={190} height={16} fill={THOBE_D} />
          <path d="M 14 -800 L 14 -700" stroke={THOBE_D} strokeWidth={4} />
          <circle cx={14} cy={-790} r={4} fill={THOBE_D} />
          <path d="M -36 -812 L 52 -812 L 50 -796 L -34 -796 Z" fill={THOBE_D} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -118 60 Q -150 140 -112 210 Q -72 150 -70 40 Z" fill={THOBE} />
          <path d="M -118 60 Q -140 -120 0 -132 Q 120 -128 112 -30 Q 60 -64 0 -64 Q -70 -64 -118 60 Z" fill={THOBE} />
          <path d="M -104 -44 Q 0 -112 104 -48" stroke="#2B2B2B" strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M -100 -18 Q 0 -86 100 -22" stroke="#2B2B2B" strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
