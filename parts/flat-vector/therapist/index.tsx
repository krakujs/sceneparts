import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Therapist: green knit sweater and brown skirt, a yellow notepad with a pen held in the front hand, calm neutral face.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor={C.greenDark}
      bottom="skirt"
      bottomColor={C.brown}
      shoes="boots"
      shoesColor={C.brownDark}
      expression="neutral"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 26}) scale(1.25)`}>
          <rect x={-40} y={-50} width={80} height={100} rx={6} fill={C.yellow} />
          <rect x={-40} y={-50} width={80} height={12} fill={C.yellowDark} />
          {[0, 1, 2].map((i) => <rect key={i} x={-28} y={-22 + i * 20} width={56} height={5} rx={2} fill={C.white} />)}
          <rect x={30} y={-6} width={62} height={14} rx={6} fill={C.blue} transform="rotate(-30 30 1)" />
        </g>
      )}
    />
  );
}
