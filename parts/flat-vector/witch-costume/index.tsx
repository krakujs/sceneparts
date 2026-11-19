import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Witch costume preset: tall pointed black hat with a purple band, dark purple dress and cape, black boots and a broom held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const sway = Math.sin(p.f / 26) * 6;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="dress"
      topColor={C.purpleDark}
      bottom="skirt"
      bottomColor={C.purpleDark}
      shoes="boots"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <path d={`M -60 -800 Q -150 -700 ${-170 + sway} -420 Q ${-150 + sway} -300 ${-190 + sway} -260 L -90 -260 Q -110 -520 -40 -800 Z`} fill={shade(C.purpleDark, 0.25)} />
      )}
      topper={() => (
        <g>
          <ellipse cx={6} cy={-70} rx={132} ry={22} fill={C.ink} />
          <path d="M -80 -74 Q -60 -190 26 -272 Q 46 -150 88 -72 Z" fill={C.ink} />
          <rect x={-76} y={-104} width={164} height={22} rx={6} fill={C.purple} />
          <circle cx={-24} cy={-110} r={8} fill={C.yellow} />
        </g>
      )}
      held={(h) => (
        <g>
          <path d={`M ${h.x - 30} ${h.y - 150} L ${h.x + 40} -120`} stroke={C.brown} strokeWidth={14} strokeLinecap="round" />
          <path d={`M ${h.x + 30} -130 L ${h.x + 54} -126 L ${h.x + 110} -4 L ${h.x - 10} -4 Z`} fill={C.yellowDark} />
          <path d={`M ${h.x + 30} -100 L ${h.x + 20} -8 M ${h.x + 46} -100 L ${h.x + 56} -8 M ${h.x + 58} -100 L ${h.x + 86} -8`} stroke={shade(C.yellowDark, 0.2)} strokeWidth={5} />
          <rect x={h.x + 24} y={-138} width={36} height={16} rx={5} fill={C.brownDark} transform={`rotate(12 ${h.x + 42} -130)`} />
        </g>
      )}
    />
  );
}
