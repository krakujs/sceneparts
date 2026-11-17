import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Person in a puffy long winter coat with a scarf, beanie, gloves and a visible breath puff.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const k = p.f % 80;
  const puff = (i: number) => {
    const t = (k + i * 26) % 80;
    return <circle key={i} cx={130 + t * 0.9} cy={50 - t * 0.35} r={12 + t * 0.12} fill={C.white} opacity={Math.max(0, 0.9 - t / 80)} />;
  };
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="walk"
      expression="neutral"
      skin="tan"
      hair="long"
      hairColor="brown"
      hat="beanie"
      hatColor={C.red}
      top="coat"
      topColor={C.purpleDark}
      bottom="trousers"
      bottomColor={C.inkSoft}
      shoes="boots"
      shoesColor={C.brownDark}
      extra="scarf"
      extraColor={C.orange}
      over={() => (
        <g fill={C.purple}>
          <rect x={-86} y={-640} width={176} height={40} rx={20} />
          <rect x={-90} y={-580} width={184} height={40} rx={20} />
          <rect x={-94} y={-520} width={192} height={40} rx={20} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <ellipse cx={0} cy={-6} rx={30} ry={34} fill={C.red} />
          <rect x={-22} y={-38} width={44} height={14} rx={6} fill={C.redDark} />
        </g>
      )}
      topper={() => <g>{[0, 1, 2].map((i) => puff(i))}</g>}
    />
  );
}
