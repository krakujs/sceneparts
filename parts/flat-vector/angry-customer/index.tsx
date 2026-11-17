import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Angry customer: angry face, pointing forward, holding a receipt, red steam puffs from the head.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="point"
      expression="angry"
      skin="medium"
      hair="buzz"
      hairColor="black"
      top="shirt"
      topColor={C.orange}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.7)`}>
          <path d="M -24 -8 L 24 -8 L 24 -110 L 18 -102 L 12 -110 L 6 -102 L 0 -110 L -6 -102 L -12 -110 L -18 -102 L -24 -110 Z" fill={C.white} />
          {[-70, -48, -26, -4].map((yy, i) => <rect key={i} x={-14} y={yy} width={28} height={6} rx={3} fill={C.greyLight} />)}
        </g>
      )}
      topper={() => (
        <g>
          {[0, 1, 2].map((i) => {
            const k = (p.f * 2 + i * 30) % 90;
            return <circle key={i} cx={-70 + i * 60} cy={-130 - k} r={26 + i * 6} fill={C.red} opacity={Math.max(0, 1 - k / 90)} />;
          })}
        </g>
      )}
    />
  );
}
