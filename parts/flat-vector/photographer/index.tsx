import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Photographer preset: sand photo vest with pockets over a white shirt, khaki shorts, a camera in the hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const vest = C.sand;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.white}
      bottom="shorts"
      bottomColor={C.brown}
      shoes="sneakers"
      shoesColor={C.greyDark}
      hat="none"
      extra="none"
      over={() => (
        <g>
          <path d="M -80 -800 L -30 -800 L -30 -470 L -80 -470 Z" fill={vest} />
          <path d="M 84 -800 L 34 -800 L 34 -470 L 84 -470 Z" fill={vest} />
          <path d="M -80 -800 L -40 -760 L -80 -640 Z M 84 -800 L 44 -760 L 84 -640 Z" fill={shade(vest, 0.15)} />
          <rect x={-66} y={-600} width={26} height={30} rx={4} fill={shade(vest, 0.2)} />
          <rect x={44} y={-600} width={26} height={30} rx={4} fill={shade(vest, 0.2)} />
        </g>
      )}
      prop="camera"
      propColor={C.ink}
    />
  );
}
