import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, type Hand } from "../person/index";
import { C } from "../style/index";

// Protesters: four peaceful people holding blank placards or placards with simple symbols (heart, raised
// fist outline, globe). No words, no causes or slogans.
const board = (fill: string, symbol: "blank" | "heart" | "fist" | "globe") => (h: Hand) => (
  <g>
    <rect x={h.x - 5} y={h.y - 120} width={10} height={150} rx={4} fill={C.brownDark} />
    <rect x={h.x - 60} y={h.y - 270} width={130} height={158} rx={12} fill={fill} />
    <g transform={`translate(${h.x + 5} ${h.y - 190})`}>
      {symbol === "heart" ? <path d="M 0 30 C -40 4 -34 -28 -12 -26 C -2 -26 0 -18 0 -12 C 0 -18 2 -26 12 -26 C 34 -28 40 4 0 30 Z" fill={C.red} /> : null}
      {symbol === "fist" ? <path d="M -24 40 L -26 0 L -26 -30 Q -26 -40 -18 -40 L -6 -40 L -6 -54 L 6 -54 L 6 -40 L 14 -40 L 14 -50 L 26 -50 L 26 -20 L 20 0 Q 24 12 10 40 Z" fill="none" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" /> : null}
      {symbol === "globe" ? <g><circle cx={0} cy={0} r={36} fill="none" stroke={C.blue} strokeWidth={7} /><ellipse cx={0} cy={0} rx={16} ry={36} fill="none" stroke={C.blue} strokeWidth={5} /><line x1={-36} y1={0} x2={36} y2={0} stroke={C.blue} strokeWidth={5} /></g> : null}
    </g>
  </g>
);
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      <Person x={-330} y={0} s={0.47} f={f} pose="stand" expression="neutral" skin="tan" hair="bob" hairColor="brown" top="sweater" topColor={C.teal} bottom="trousers" bottomColor={C.navy} shoes="shoes" shoesColor={C.ink} held={board(C.white, "blank")} />
      <Person x={-110} y={0} s={0.47} f={f + 7} pose="wave" expression="open" skin="dark" hair="afro" hairColor="black" top="hoodie" topColor={C.purple} bottom="trousers" bottomColor={C.ink} shoes="sneakers" shoesColor={C.white} held={board(C.pink, "heart")} />
      <Person x={110} y={0} s={0.47} age="elder" f={f + 14} pose="stand" expression="smile" skin="light" hair="short" hairColor="grey" top="coat" topColor={C.greyDark} bottom="trousers" bottomColor={C.inkSoft} shoes="shoes" shoesColor={C.brownDark} accessory="glasses" held={board(C.sky, "globe")} />
      <Person x={330} y={0} s={0.47} f={f + 21} pose="cheer" expression="smile" skin="medium" hair="curly" hairColor="black" top="shirt" topColor={C.yellow} shirtColor={C.white} bottom="skirt" bottomColor={C.blueDark} shoes="boots" shoesColor={C.brownDark} held={board(C.lime, "fist")} />
    </g>
  );
}
