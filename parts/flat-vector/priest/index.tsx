import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Priest preset: black clerical shirt with a white collar band, dark trousers and a small book in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.ink}
      shirtColor={C.ink}
      bottom="trousers"
      bottomColor={C.inkSoft}
      over={() => (
        <g>
          <rect x={-30} y={-822} width={86} height={22} rx={8} fill={C.white} />
          <rect x={-2} y={-812} width={22} height={34} rx={6} fill={C.white} />
        </g>
      )}
      prop={p.prop ?? "book"}
      propColor={p.propColor ?? C.navy}
    />
  );
}
