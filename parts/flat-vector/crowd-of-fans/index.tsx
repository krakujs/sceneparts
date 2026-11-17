import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, type Hand } from "../person/index";
import { C, shade } from "../style/index";

// Crowd of fans: two overlapping rows (back row smaller and darker), cheering and jumping out of phase.
// Some fans wave a plain pennant. Looks are fixed arrays so the crowd is the same every render.
type Look = { skin: string; hair: any; hc: string; top: any; tc: string; pennant?: string; expr?: any; acc?: any };
const FRONT: Look[] = [
  { skin: "light", hair: "spiky", hc: "blonde", top: "tshirt", tc: C.teal, pennant: C.yellow },
  { skin: "brown", hair: "afro", hc: "black", top: "hoodie", tc: C.orange },
  { skin: "tan", hair: "bun", hc: "brown", top: "tank", tc: C.purple, pennant: C.pink },
  { skin: "dark", hair: "braid", hc: "black", top: "tshirt", tc: C.blue },
  { skin: "medium", hair: "curly", hc: "black", top: "sweater", tc: C.red, pennant: C.lime },
];
const BACK: Look[] = [
  { skin: "fair", hair: "long", hc: "auburn", top: "tshirt", tc: C.greenDark },
  { skin: "brown", hair: "short", hc: "black", top: "hoodie", tc: C.navy, pennant: C.white },
  { skin: "tan", hair: "ponytail", hc: "brown", top: "tshirt", tc: C.tealDark },
  { skin: "medium", hair: "buzz", hc: "black", top: "tank", tc: C.purpleDark },
];
const pennantHeld = (c: string) => (h: Hand) => (
  <g>
    <rect x={h.x - 5} y={h.y - 170} width={10} height={190} rx={4} fill={C.brownDark} />
    <path d={`M ${h.x + 5} ${h.y - 170} L ${h.x + 120} ${h.y - 140} L ${h.x + 5} ${h.y - 110} Z`} fill={c} />
  </g>
);
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = (p.s ?? 1) * 0.86;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      {BACK.map((L, i) => (
        <Person key={"b" + i} x={-330 + i * 190} y={-20} s={0.36} f={f + i * 7 + 3} pose="cheer" expression="laugh" skin={L.skin} hair={L.hair} hairColor={L.hc} top={L.top} topColor={shade(L.tc, 0.1)} bottom="trousers" bottomColor={C.inkSoft} shoes="sneakers" shoesColor={C.white} held={L.pennant ? pennantHeld(L.pennant) : undefined} />
      ))}
      {FRONT.map((L, i) => (
        <Person key={"f" + i} x={-400 + i * 200} y={0} s={0.46} f={f + i * 7} pose="cheer" expression={i % 2 ? "open" : "laugh"} skin={L.skin} hair={L.hair} hairColor={L.hc} top={L.top} topColor={L.tc} bottom="trousers" bottomColor={C.navy} shoes="sneakers" shoesColor={C.ink} held={L.pennant ? pennantHeld(L.pennant) : undefined} />
      ))}
    </g>
  );
}
