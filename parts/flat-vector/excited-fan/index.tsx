import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Excited fan: cheer pose, jumping, holding a plain pennant flag with a star (no logo).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="cheer"
      expression="open"
      skin="dark"
      hair="afro"
      hairColor="black"
      top="tshirt"
      topColor={C.purple}
      bottom="shorts"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-6} y={-330} width={12} height={360} rx={6} fill={C.brownDark} />
          <path d="M 6 -320 L 190 -270 L 6 -220 Z" fill={C.teal} />
          <path d="M 6 -320 L 190 -270 L 6 -270 Z" fill={C.tealDark} />
          <path d="M 98 -292 L 104 -278 L 118 -278 L 107 -270 L 111 -256 L 98 -264 L 85 -256 L 89 -270 L 78 -278 L 92 -278 Z" fill={C.white} />
        </g>
      )}
    />
  );
}
