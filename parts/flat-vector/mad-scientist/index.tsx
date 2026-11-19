import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Mad scientist preset: white lab coat, wild purple hair, goggles pushed up on the forehead and a bubbling green flask that puffs.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const bub = (i: number) => {
    const t = ((p.f + i * 13) % 42) / 42;
    return { y: -40 - t * 90, r: 6 + t * 8, o: 1 - t };
  };
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.white}
      shirtColor={C.teal}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      hair="spiky"
      hairColor="#8E4FD1"
      accessory="none"
      expression="surprised"
      over={() => (
        <g>
          <path d="M -16 -812 L 14 -740 L 46 -812 Z" fill={C.teal} />
          <rect x={-40} y={-600} width={18} height={24} rx={4} fill={C.red} />
          <rect x={30} y={-640} width={22} height={18} rx={4} fill={C.blue} />
        </g>
      )}
      topper={() => (
        <g>
          <rect x={-96} y={-70} width={192} height={10} rx={4} fill={C.ink} />
          <rect x={-100} y={-70} width={12} height={0} fill={C.ink} />
          <rect x={14} y={-82} width={40} height={30} rx={12} fill={C.skyDeep} stroke={C.ink} strokeWidth={6} />
          <rect x={-40} y={-82} width={40} height={30} rx={12} fill={C.skyDeep} stroke={C.ink} strokeWidth={6} />
          <rect x={-100} y={-74} width={0} height={0} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M -8 -110 L -8 -60 L -56 30 Q -64 52 -40 56 L 40 56 Q 64 52 56 30 L 8 -60 L 8 -110 Z" fill="#E5FBEF" stroke={C.greyDark} strokeWidth={6} />
          <path d="M -46 22 Q 0 10 46 22 L 52 40 Q 0 52 -52 40 Z" fill={C.lime} />
          <rect x={-14} y={-124} width={28} height={16} rx={4} fill={C.brownDark} />
          {[0, 1, 2].map((i) => {
            const b = bub(i);
            return <circle key={i} cx={-8 + i * 10} cy={b.y + 20} r={b.r * 0.6} fill={C.lime} opacity={b.o} />;
          })}
        </g>
      )}
    />
  );
}
