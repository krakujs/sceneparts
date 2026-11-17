import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Classroom of kids: six children at small desks seen from the side, one raising a hand, with a blackboard behind.
const KIDS = [
  { skin: "light", hair: "bob", hc: "brown", top: "tshirt", tc: C.teal },
  { skin: "tan", hair: "bun", hc: "black", top: "sweater", tc: C.orange },
  { skin: "brown", hair: "afro", hc: "black", top: "hoodie", tc: C.purple },
  { skin: "medium", hair: "braid", hc: "black", top: "tshirt", tc: C.blue },
  { skin: "fair", hair: "ponytail", hc: "auburn", top: "tshirt", tc: C.green },
  { skin: "dark", hair: "curly", hc: "black", top: "sweater", tc: C.pink },
] as const;
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      {/* blackboard with a frame and chalk tray */}
      <rect x={-440} y={-600} width={880} height={330} rx={12} fill={C.brownDark} />
      <rect x={-424} y={-584} width={848} height={298} rx={6} fill={shade(C.greenDark, 0.1)} />
      <rect x={-300} y={-420} width={160} height={8} rx={3} fill={C.white} opacity={0.5} />
      <rect x={-280} y={-380} width={120} height={8} rx={3} fill={C.white} opacity={0.4} />
      <rect x={-380} y={-260} width={760} height={12} rx={5} fill={C.brown} />
      {KIDS.map((k, i) => {
        const x = -375 + i * 150;
        return (
          <g key={i}>
            <Person x={x} y={0} s={0.42} age="child" f={f + i * 7} pose={i === 2 ? "cheer" : "sit"} seat={false} expression={i === 2 ? "open" : "smile"} skin={k.skin} hair={k.hair as any} hairColor={k.hc} top={k.top as any} topColor={k.tc} bottom="trousers" bottomColor={C.navy} shoes="shoes" shoesColor={C.ink} />
            <rect x={x - 10} y={-88} width={150} height={12} rx={4} fill={C.yellowDark} />
            <rect x={x + 120} y={-80} width={10} height={80} fill={C.brownDark} />
            <rect x={x - 6} y={-76} width={10} height={76} fill={C.brownDark} />
          </g>
        );
      })}
    </g>
  );
}
