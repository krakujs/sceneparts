import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Choir: six singers in matching robes on two riser levels, mouths open, gently rocking.
const ROBE = C.purpleDark;
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  const rock = (i: number) => (Math.sin((f + i * 9) / 16) * 1.5).toFixed(2);
  const back = [
    { x: -230, skin: "fair", hair: "bun", hc: "brown" },
    { x: 0, skin: "dark", hair: "short", hc: "black" },
    { x: 230, skin: "tan", hair: "bob", hc: "black" },
  ];
  const front = [
    { x: -330, skin: "medium", hair: "ponytail", hc: "auburn" },
    { x: -110, skin: "light", hair: "buzz", hc: "grey" },
    { x: 110, skin: "brown", hair: "curly", hc: "black" },
  ];
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      {/* riser */}
      <rect x={-340} y={-150} width={680} height={150} fill={shade(C.brown, 0.1)} />
      <rect x={-340} y={-150} width={680} height={12} fill={C.brownDark} />
      {back.map((s, i) => (
        <g key={"b" + i} transform={`rotate(${rock(i)} ${s.x} -150)`}>
          <Person x={s.x} y={-150} s={0.42} f={f + i * 9} pose="talk" expression="open" skin={s.skin} hair={s.hair as any} hairColor={s.hc} top="dress" topColor={ROBE} bottom="trousers" bottomColor={ROBE} shoes="shoes" shoesColor={C.ink} seat={false} />
        </g>
      ))}
      {front.map((s, i) => (
        <g key={"f" + i} transform={`rotate(${rock(i + 3)} ${s.x} 0)`}>
          <Person x={s.x} y={0} s={0.42} f={f + i * 9 + 4} pose="talk" expression="open" skin={s.skin} hair={s.hair as any} hairColor={s.hc} top="dress" topColor={shade(ROBE, 0.12)} bottom="trousers" bottomColor={shade(ROBE, 0.12)} shoes="shoes" shoesColor={C.ink} seat={false} />
        </g>
      ))}
    </g>
  );
}
