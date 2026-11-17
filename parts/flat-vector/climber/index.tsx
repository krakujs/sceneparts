import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Climber: yellow helmet, harness over a teal tee, rope coil on the back, chalk bag on the hip, reaching up.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.teal}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="sneakers"
      shoesColor={C.orange}
      hat="helmet"
      hatColor={C.yellow}
      pose={p.pose ?? "cheer"}
      over={() => (
        <g>
          <ellipse cx={-120} cy={-650} rx={34} ry={46} fill="none" stroke={C.orange} strokeWidth={12} />
          <ellipse cx={-120} cy={-650} rx={14} ry={20} fill="none" stroke={C.redDark} strokeWidth={8} />
          <path d="M -30 -806 L -46 -500" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
          <path d="M 58 -806 L 68 -500" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
          <rect x={-82} y={-500} width={176} height={22} rx={8} fill={C.ink} />
          <path d="M -50 -480 Q -62 -400 -30 -366 M 40 -480 Q 52 -400 20 -366" stroke={C.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
          <rect x={-116} y={-470} width={44} height={50} rx={10} fill={C.white} />
          <rect x={-116} y={-470} width={44} height={14} rx={6} fill={C.greyLight} />
        </g>
      )}
    />
  );
}
