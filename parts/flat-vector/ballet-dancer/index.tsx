import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Ballet dancer preset: pink dress bodice with a white tutu, pink tights and pink ballet shoes; default pose is a graceful raised arm.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="dress"
      topColor="#F7B7CF"
      bottom="trousers"
      bottomColor="#F7B7CF"
      shoes="shoes"
      shoesColor="#F27BA6"
      hat="none"
      accessory="none"
      extra="none"
      over={() => (
        <g>
          <path d="M -84 -470 L 90 -470 Q 152 -380 156 -330 Q 4 -292 -148 -330 Q -150 -380 -84 -470 Z" fill={C.white} />
          <path d="M -120 -392 Q 4 -344 130 -392 L 150 -346 Q 4 -300 -142 -346 Z" fill="#F7B7CF" />
          <path d="M -140 -338 Q 4 -296 146 -338 L 138 -316 Q 4 -276 -134 -316 Z" fill={C.white} />
        </g>
      )}
    />
  );
}
