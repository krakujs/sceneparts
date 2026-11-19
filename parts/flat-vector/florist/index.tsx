import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Florist preset: yellow shirt under a green apron, holding a wrapped bouquet of flowers in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#FFE27A"
      bottom="trousers"
      bottomColor="#3A4157"
      extra="apron"
      extraColor={C.greenDark}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.3) translate(${-h.x} ${-h.y})`}>
          <path d={`M ${h.x} ${h.y} L ${h.x - 20} ${h.y - 150}`} stroke={C.green} strokeWidth={6} strokeLinecap="round" />
          <path d={`M ${h.x - 4} ${h.y - 60} L ${h.x - 48} ${h.y - 92}`} stroke={C.green} strokeWidth={6} strokeLinecap="round" />
          <path d={`M ${h.x + 4} ${h.y - 40} L ${h.x + 40} ${h.y - 70}`} stroke={C.green} strokeWidth={6} strokeLinecap="round" />
          <ellipse cx={h.x - 62} cy={h.y - 104} rx={20} ry={12} transform={`rotate(-30 ${h.x - 62} ${h.y - 104})`} fill={C.lime} />
          <ellipse cx={h.x + 36} cy={h.y - 84} rx={20} ry={12} transform={`rotate(30 ${h.x + 36} ${h.y - 84})`} fill={C.lime} />
          <circle cx={h.x - 30} cy={h.y - 128} r={24} fill={C.red} />
          <circle cx={h.x + 10} cy={h.y - 152} r={26} fill={C.pink} />
          <circle cx={h.x - 66} cy={h.y - 96} r={20} fill={C.yellow} />
          <circle cx={h.x + 40} cy={h.y - 110} r={20} fill={C.purple} />
          <circle cx={h.x - 30} cy={h.y - 128} r={9} fill={shade(C.red, 0.2)} />
          <path d={`M ${h.x - 30} ${h.y + 12} L ${h.x + 30} ${h.y + 12} L ${h.x + 10} ${h.y - 40} L ${h.x - 10} ${h.y - 40} Z`} fill={C.sand} />
          <path d={`M ${h.x - 30} ${h.y + 12} L ${h.x + 30} ${h.y + 12} L ${h.x + 26} ${h.y + 2} L ${h.x - 26} ${h.y + 2} Z`} fill={shade(C.sand, 0.15)} />
        </g>
      )}
    />
  );
}
