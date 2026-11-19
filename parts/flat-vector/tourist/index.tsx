import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Tourist preset: sun hat, pink tee, khaki shorts, white trainers, a camera in the front hand and a folded map in the back pocket.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.pink}
      bottom="shorts"
      bottomColor={C.sand}
      shoes="sneakers"
      shoesColor={C.white}
      hat="brim"
      hatColor={C.yellow}
      prop="camera"
      propColor={C.ink}
      over={() => (
        <g>
          <rect x={-70} y={-520} width={58} height={70} rx={5} fill={C.white} />
          <path d="M -70 -500 L -40 -485 L -12 -500" stroke={C.skyDeep} strokeWidth={5} fill="none" />
          <rect x={-70} y={-520} width={58} height={12} rx={4} fill={shade(C.white, 0.12)} />
        </g>
      )}
    />
  );
}
