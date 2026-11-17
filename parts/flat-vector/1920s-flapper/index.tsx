import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// 1920s flapper preset: short bob, beaded headband with a feather, drop-waist fringed dress (the fringe sways with p.f) and long beads.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  const fringe = Array.from({ length: 14 }, (_, i) => {
    const x = -110 + i * 17;
    const sway = Math.sin(f / 6 + i * 0.7) * 10;
    return <path key={i} d={`M ${x} -470 Q ${x + sway / 2} -380 ${x + sway} -286`} stroke={C.yellow} strokeWidth={6} fill="none" strokeLinecap="round" />;
  });
  const beads = Array.from({ length: 16 }, (_, i) => {
    const t = i / 15;
    const x = -40 + 74 * t + Math.sin(Math.PI * t) * 18;
    const y = -800 + 330 * t;
    return <circle key={i} cx={x} cy={y} r={11} fill={i % 2 ? C.yellow : C.orange} />;
  });
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="dress"
      topColor={C.teal}
      bottom="skirt"
      bottomColor={C.teal}
      shoes="heels"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          <rect x={-112} y={-486} width={232} height={18} rx={6} fill={C.yellowDark} />
          {fringe}
          {beads}
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -94 -42 Q -20 -118 96 -54" stroke={C.yellow} strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M 62 -104 Q 116 -168 152 -204 Q 150 -150 112 -106 Q 90 -86 62 -104 Z" fill={C.pink} />
          <path d="M 66 -102 Q 110 -140 146 -196" stroke={C.white} strokeWidth={3} fill="none" />
        </g>
      )}
    />
  );
}
