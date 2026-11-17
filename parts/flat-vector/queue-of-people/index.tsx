import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Queue of people: five people standing in a line, small idle sways, one of them checking a phone.
const LOOKS = [
  { skin: "fair", hair: "bob", hc: "brown", top: "coat", tc: C.teal, bottom: "trousers", bc: C.navy },
  { skin: "dark", hair: "afro", hc: "black", top: "hoodie", tc: C.orange, bottom: "trousers", bc: C.ink },
  { skin: "tan", hair: "short", hc: "black", top: "tshirt", tc: C.purple, bottom: "shorts", bc: C.blueDark },
  { skin: "light", hair: "ponytail", hc: "blonde", top: "blazer", tc: C.greyDark, bottom: "skirt", bc: C.brownDark },
  { skin: "medium", hair: "buzz", hc: "black", top: "sweater", tc: C.yellowDark, bottom: "trousers", bc: C.inkSoft },
] as const;
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      {LOOKS.map((L, i) => {
        const x = -340 + i * 170;
        const sway = Math.sin((f + i * 7) / 24) * 1.6;
        return (
          <g key={i} transform={`rotate(${sway.toFixed(2)} ${x} 0)`}>
            <Person x={x} y={0} s={0.42} f={f + i * 7} pose={i === 2 ? "think" : "stand"} prop={i === 2 ? "phone" : "none"} propColor={C.ink} expression={i === 2 ? "neutral" : "smile"} skin={L.skin} hair={L.hair as any} hairColor={L.hc} top={L.top as any} topColor={L.tc} bottom={L.bottom as any} bottomColor={L.bc} shoes="shoes" shoesColor={C.ink} />
          </g>
        );
      })}
    </g>
  );
}
