import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Gym group: four people in sportswear doing a synchronised jumping-jack routine on exercise mats.
const LOOKS = [
  { skin: "light", hair: "ponytail", hc: "blonde", top: "tank", tc: C.pink, bottom: "shorts", bc: C.ink },
  { skin: "tan", hair: "short", hc: "brown", top: "tshirt", tc: C.teal, bottom: "trousers", bc: C.navy },
  { skin: "brown", hair: "bun", hc: "black", top: "hoodie", tc: C.orange, bottom: "shorts", bc: C.greyDark },
  { skin: "dark", hair: "braid", hc: "black", top: "tank", tc: C.blue, bottom: "trousers", bc: C.ink },
] as const;
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      <rect x={-430} y={-14} width={860} height={14} rx={4} fill={C.teal} />
      <rect x={-430} y={0} width={860} height={6} fill={C.tealDark} />
      {LOOKS.map((L, i) => (
        <Person key={i} x={-330 + i * 220} y={0} s={0.45} f={f} pose="cheer" expression={i % 2 ? "open" : "smile"} skin={L.skin} hair={L.hair as any} hairColor={L.hc} top={L.top as any} topColor={L.tc} bottom={L.bottom as any} bottomColor={L.bc} shoes="sneakers" shoesColor={C.white} />
      ))}
    </g>
  );
}
