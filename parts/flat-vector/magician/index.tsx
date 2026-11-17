import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Magician preset: purple tailcoat over a white shirt, red bow tie, black top hat; a star-tipped wand in the front hand (pose point).
/* eslint-disable @typescript-eslint/no-explicit-any */
const star = (x: number, y: number, r: number) =>
  `M ${x} ${y - r} L ${x + r * 0.3} ${y - r * 0.3} L ${x + r} ${y} L ${x + r * 0.3} ${y + r * 0.3} L ${x} ${y + r} L ${x - r * 0.3} ${y + r * 0.3} L ${x - r} ${y} L ${x - r * 0.3} ${y - r * 0.3} Z`;

export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.purpleDark}
      shirtColor={C.white}
      hat="tophat"
      hatColor={C.ink}
      accessory="none"
      extra="bowtie"
      extraColor={C.red}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-28)`}>
          <rect x={0} y={-6} width={130} height={12} rx={6} fill={C.white} />
          <rect x={40} y={-6} width={14} height={12} fill={C.ink} />
          <rect x={82} y={-6} width={14} height={12} fill={C.ink} />
          <path d={star(140, 0, 22)} fill={C.yellow} />
        </g>
      )}
    />
  );
}
