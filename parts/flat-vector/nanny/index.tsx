import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Nanny preset: pink cardigan (buttoned front) over a blue skirt, holding a teddy bear. Pose, face, skin and hair stay free.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor="#F4B9C6"
      bottom="skirt"
      bottomColor="#8EC5E8"
      over={() => (
        <g>
          <path d="M 14 -800 L 14 -470" stroke="#E58FAA" strokeWidth={5} />
          {[-720, -650, -580, -510].map((y) => <circle key={y} cx={14} cy={y} r={7} fill={C.white} />)}
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.2) translate(${-h.x} ${-h.y})`}>
          <ellipse cx={h.x} cy={h.y - 18} rx={34} ry={42} fill={C.brown} />
          <ellipse cx={h.x} cy={h.y - 14} rx={20} ry={28} fill={C.sand} />
          <circle cx={h.x - 22} cy={h.y - 122} r={11} fill={C.brownDark} />
          <circle cx={h.x + 22} cy={h.y - 122} r={11} fill={C.brownDark} />
          <circle cx={h.x} cy={h.y - 96} r={32} fill={C.brown} />
          <ellipse cx={h.x + 2} cy={h.y - 82} rx={14} ry={10} fill={C.sand} />
          <circle cx={h.x - 11} cy={h.y - 104} r={4} fill={C.ink} />
          <circle cx={h.x + 11} cy={h.y - 104} r={4} fill={C.ink} />
          <circle cx={h.x + 2} cy={h.y - 88} r={4} fill={C.ink} />
        </g>
      )}
    />
  );
}
