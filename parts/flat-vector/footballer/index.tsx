import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Footballer preset: plain red kit with white shorts and dark boots, holding a black-and-white football (generic, no club).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.red}
      bottom="shorts"
      bottomColor={C.white}
      shoes="boots"
      shoesColor={C.ink}
      hat="none"
      accessory="none"
      extra="none"
      held={(h) => (
        <g transform={`translate(${h.x + 20} ${h.y - 30})`}>
          <circle cx={0} cy={0} r={46} fill={C.white} />
          <circle cx={0} cy={0} r={16} fill={C.ink} />
          {[0, 1, 2, 3, 4].map((i) => {
            const a = ((i * 72 - 90) * Math.PI) / 180;
            return <circle key={i} cx={Math.cos(a) * 32} cy={Math.sin(a) * 32} r={10} fill={C.ink} />;
          })}
        </g>
      )}
    />
  );
}
