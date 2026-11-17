import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Wizard preset: long teal robe with gold stars, tall indigo pointed hat, long silver beard and a wooden staff with a glowing tip.
/* eslint-disable @typescript-eslint/no-explicit-any */
const star = (x: number, y: number, r: number) =>
  `M ${x} ${y - r} L ${x + r * 0.3} ${y - r * 0.3} L ${x + r} ${y} L ${x + r * 0.3} ${y + r * 0.3} L ${x} ${y + r} L ${x - r * 0.3} ${y + r * 0.3} L ${x - r} ${y} L ${x - r * 0.3} ${y - r * 0.3} Z`;
const robe = "#7A2E4A", hat = "#4E6B2F";
export default function Part(p: PartProps<any>) {
  const glow = 0.55 + 0.45 * Math.sin(p.f / 6);
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="dress"
      topColor={robe}
      bottom="skirt"
      bottomColor={robe}
      shoes="boots"
      shoesColor={C.ink}
      hat="none"
      hair="none"
      accessory="beard"
      hairColor="#D9DEE8"
      over={() => (
        <g>
          <path d="M -80 -760 L 88 -760 L 92 -700 L -84 -700 Z" fill={C.yellow} opacity={0.9} />
          {[[-40, -640], [30, -600], [-20, -520], [50, -480], [-60, -380], [60, -330]].map(([x, y], i) => (
            <path key={i} d={star(x, y, 15)} fill={C.yellow} />
          ))}
          <path d={star(-6, -560, 9)} fill={C.white} />
        </g>
      )}
      topper={() => (
        <g>
          <ellipse cx={0} cy={-84} rx={118} ry={26} fill={shade(hat, 0.2)} />
          <path d="M -100 -84 Q -40 -110 20 -220 Q 60 -300 110 -340 Q 50 -250 60 -86 Z" fill={hat} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-7} y={-300} width={14} height={330} rx={6} fill={C.brownDark} />
          <circle cx={0} cy={-318} r={26 + glow * 6} fill={C.lime} opacity={0.35} />
          <circle cx={0} cy={-318} r={16} fill={C.lime} opacity={0.6 + glow * 0.4} />
          <circle cx={0} cy={-318} r={8} fill={C.white} />
        </g>
      )}
    />
  );
}
