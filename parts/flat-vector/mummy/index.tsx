import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Mummy: a bandage-wrapped cartoon mummy with glowing eyes, arms forward in a shuffling hold. Friendly, not scary.
/* eslint-disable @typescript-eslint/no-explicit-any */
const BAND = "#EDE3CC", BAND_D = "#C9BB9C", SKIN_M = "#D8CBAE", HEAD = "#F7F1E1", GLOW = "#B9F26B";
const pick = (p: any, d: Record<string, any>) => {
  const o: any = { ...d };
  for (const k of Object.keys(p)) if (p[k] !== undefined) o[k] = p[k];
  return o;
};
const wraps = (ys: number[], x0: number, x1: number) => ys.map((yy) => (
  <path key={yy} d={`M ${x0} ${yy} Q ${(x0 + x1) / 2} ${yy + 18} ${x1} ${yy - 6}`} stroke={BAND_D} strokeWidth={7} fill="none" strokeLinecap="round" />
));
export default function Part(p: PartProps<any>) {
  const v = pick(p, { pose: "hold", expression: "neutral", skin: SKIN_M });
  const f = p.f ?? 0;
  const glow = 0.6 + 0.4 * Math.sin(f / 8);
  return (
    <Person
      x={(p.x ?? 540) + (p.vx ?? 0) * f}
      y={p.y ?? 1560}
      s={p.s ?? 1}
      f={f}
      flip={!!p.flip}
      pose={v.pose}
      expression={v.expression}
      skin={v.skin}
      hair="none"
      top="tshirt"
      topColor={BAND}
      bottom="trousers"
      bottomColor={BAND}
      shoes="shoes"
      shoesColor={SKIN_M}
      over={() => (
        <g>
          {wraps([-790, -740, -690, -640, -590, -540, -490], -80, 88)}
          <path d="M -70 -790 L 80 -790 L 84 -500 L -76 -500 Z" fill={BAND_D} opacity={0.12} />
        </g>
      )}
      topper={() => (
        <g>
          {/* head wrapped in bandage with two glowing eyes */}
          <circle cx={0} cy={0} r={96} fill={HEAD} />
          <path d="M -96 0 Q -96 -96 0 -96 Q 96 -96 96 0 Q 60 -30 0 -26 Q -60 -30 -96 0 Z" fill={BAND_D} opacity={0.45} />
          {wraps([-70, -40, -10, 20, 50, 80], -86, 80)}
          <ellipse cx={34} cy={-6} rx={22} ry={16} fill={C.ink} opacity={0.5} />
          <ellipse cx={74} cy={-6} rx={22} ry={16} fill={C.ink} opacity={0.5} />
          <circle cx={34} cy={-6} r={18 + glow * 4} fill={GLOW} opacity={0.35} />
          <circle cx={74} cy={-6} r={18 + glow * 4} fill={GLOW} opacity={0.35} />
          <circle cx={34} cy={-6} r={10} fill={GLOW} opacity={0.6 + glow * 0.4} />
          <circle cx={74} cy={-6} r={10} fill={GLOW} opacity={0.6 + glow * 0.4} />
          <circle cx={34} cy={-6} r={4} fill={C.white} />
          <circle cx={74} cy={-6} r={4} fill={C.white} />
        </g>
      )}
    />
  );
}
