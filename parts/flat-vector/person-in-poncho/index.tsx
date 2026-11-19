import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Poncho preset: cream woven poncho with red, teal and yellow geometric bands and a brown brim hat.
/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE = "#F0E0BE";
const BANDS = [C.red, C.teal, C.yellow, C.navy];
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor={C.navy}
      bottom="trousers"
      bottomColor="#5B4636"
      shoes="boots"
      shoesColor={C.brownDark}
      hat="brim"
      hatColor={C.brown}
      over={() => (
        <g>
          <path d="M -104 -800 Q 12 -846 120 -800 L 128 -420 L -112 -420 Z" fill={BASE} />
          {[-780, -742, -704, -666, -628, -590, -552, -514, -476].map((y, i) => (
            <rect key={y} x={-112} y={y} width={240} height={14} fill={BANDS[i % BANDS.length]} opacity={0.9} />
          ))}
          {[-60, 40].map((x) => <path key={x} d={`M ${x} -740 L ${x + 30} -700 L ${x} -660 L ${x + 30} -620 L ${x} -580 L ${x + 30} -540 L ${x} -500`} stroke={C.navy} strokeWidth={4} fill="none" opacity={0.6} />)}
          <path d="M -104 -800 Q 12 -846 120 -800 Q 12 -790 -104 -800 Z" fill={BASE} />
          <ellipse cx={12} cy={-812} rx={34} ry={20} fill={C.navy} opacity={0.35} />
        </g>
      )}
    />
  );
}
