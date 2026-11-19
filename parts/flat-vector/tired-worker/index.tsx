import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Tired worker: light blue office shirt with a red tie pulled loose, slumped forward, a big coffee mug and dark eye bags.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const x = (p.x ?? 540) + (p.vx ?? 0) * p.f;
  const y = p.y ?? 1560;
  return (
    <g transform={`translate(${x} ${y}) rotate(4) scale(${p.flip ? -s : s} ${s})`}>
      <Person
        x={0}
        y={0}
        s={1}
        f={p.f}
        flip={false}
        pose={p.pose ?? "stand"}
        expression="neutral"
        top="shirt"
        topColor={C.skyDeep}
        shirtColor={C.white}
        extra="tie"
        extraColor={C.red}
        bottom="trousers"
        bottomColor={C.greyDark}
        shoes="shoes"
        shoesColor={C.brownDark}
        hat="none"
        held={(h) => (
          <g transform={`translate(${h.x} ${h.y}) scale(1.4)`}>
            <rect x={-26} y={-74} width={58} height={80} rx={12} fill={C.red} />
            <rect x={-26} y={-74} width={58} height={14} rx={6} fill={C.brownDark} />
            <path d="M 32 -60 Q 56 -56 52 -36 Q 48 -22 30 -28" stroke={C.red} strokeWidth={10} fill="none" strokeLinecap="round" />
          </g>
        )}
        topper={() => (
          <g fill="#5B4B6B" opacity={0.5}>
            <ellipse cx={36} cy={22} rx={15} ry={7} />
            <ellipse cx={76} cy={22} rx={15} ry={7} />
          </g>
        )}
      />
    </g>
  );
}
