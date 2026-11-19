import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, type Hand } from "../person/index";
import { C } from "../style/index";

// Card players: three people seated around a table, each holding a fanned hand of cards; one is laughing.
const fan = (c: string) => (h: Hand) => (
  <g transform={`translate(${h.x} ${h.y})`}>
    {[-28, -10, 8, 26].map((a, i) => (
      <g key={i} transform={`rotate(${a})`}>
        <rect x={-22} y={-96} width={44} height={70} rx={6} fill={i === 1 ? C.white : c} stroke={C.greyLight} strokeWidth={0} />
      </g>
    ))}
  </g>
);
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      <Person x={-270} y={0} s={0.44} f={f} pose="sit" seat={false} expression="smile" skin="fair" hair="short" hairColor="blonde" top="blazer" topColor={C.greyDark} shirtColor={C.white} bottom="trousers" bottomColor={C.ink} shoes="shoes" shoesColor={C.ink} held={fan(C.red)} />
      <Person x={-20} y={0} s={0.44} f={f + 9} pose="sit" seat={false} expression="neutral" skin="medium" hair="bun" hairColor="black" top="sweater" topColor={C.yellowDark} bottom="trousers" bottomColor={C.blueDark} shoes="sneakers" shoesColor={C.white} held={fan(C.blue)} />
      <Person x={230} y={0} s={0.44} f={f + 17} pose="sit" seat={false} expression="laugh" skin="brown" hair="afro" hairColor="black" top="tshirt" topColor={C.purple} bottom="trousers" bottomColor={C.inkSoft} shoes="shoes" shoesColor={C.ink} held={fan(C.green)} />
      {/* table in front of the players */}
      <rect x={-340} y={-150} width={680} height={14} rx={5} fill={C.brown} />
      <rect x={-330} y={-136} width={660} height={8} fill={C.brownDark} />
      <rect x={-300} y={-128} width={14} height={128} fill={C.brownDark} />
      <rect x={280} y={-128} width={14} height={128} fill={C.brownDark} />
      {/* chips */}
      <circle cx={-80} cy={-158} r={10} fill={C.yellow} />
      <circle cx={-64} cy={-158} r={10} fill={C.red} />
      <circle cx={130} cy={-158} r={10} fill={C.teal} />
    </g>
  );
}
