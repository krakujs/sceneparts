import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Fairy preset: small figure in a lilac dress, translucent wings that flutter, gentle hover, and a star wand.
/* eslint-disable @typescript-eslint/no-explicit-any */
const wing = "#CDEBFF";
export default function Part(p: PartProps<any>) {
  const flap = Math.sin(p.f / 2.5);
  const hover = Math.sin(p.f / 9) * 14;
  const wingEl = (dir: number, sx: number) => (
    <g transform={`translate(${-40 * dir} -790) scale(${1.7 * dir * (0.6 + 0.4 * Math.abs(flap))} ${1.7 * sx})`} opacity={0.75}>
      <path d="M 0 0 Q -90 -170 -200 -110 Q -220 -40 -120 40 Q -40 40 0 0 Z" fill={wing} stroke={C.skyDeep} strokeWidth={4} /><path d="M 0 10 Q -60 60 -130 120 Q -60 140 -10 60 Z" fill={wing} stroke={C.skyDeep} strokeWidth={4} />
      <path d="M 0 0 Q -70 -60 -130 -30" stroke={C.skyDeep} strokeWidth={5} fill="none" />
    </g>
  );
  return (
    <Person
      {...p}
      y={(p.y ?? 1560) - hover}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="child"
      top="dress"
      topColor={C.purple}
      bottom="skirt"
      bottomColor={C.pink}
      shoes="sandals"
      shoesColor={C.yellowDark}
      hat="none"
      hair="bob"
      hairColor="#F27BA6"
      pose="stand"
      over={() => (
        <g>
          {wingEl(1, 1 + flap * 0.04)}
          <path d="M -60 -700 Q 4 -670 74 -700" stroke={C.yellow} strokeWidth={8} fill="none" />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-20)`}>
          <rect x={-4} y={-90} width={8} height={100} rx={4} fill={C.yellowDark} />
          <path d="M 0 -150 L 10 -120 L 42 -118 L 16 -100 L 26 -70 L 0 -88 L -26 -70 L -16 -100 L -42 -118 L -10 -120 Z" fill={C.yellow} />
        </g>
      )}
    />
  );
}
