import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Family of four: two adults and two children side by side, all waving.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      <Person x={-280} y={0} s={0.5} f={f} pose="wave" expression="smile" skin="tan" hair="bob" hairColor="brown" top="blazer" topColor={C.teal} shirtColor={C.white} bottom="trousers" bottomColor={C.navy} shoes="shoes" shoesColor={C.ink} />
      <Person x={-110} y={0} s={0.5} age="child" f={f + 7} pose="wave" expression="open" skin="brown" hair="braid" hairColor="black" top="tshirt" topColor={C.yellow} bottom="shorts" bottomColor={C.blue} shoes="sneakers" shoesColor={C.white} />
      <Person x={60} y={0} s={0.5} f={f + 14} pose="wave" expression="smile" skin="light" hair="curly" hairColor="auburn" top="sweater" topColor={C.purple} bottom="trousers" bottomColor={C.ink} shoes="shoes" shoesColor={C.brownDark} accessory="glasses" />
      <Person x={230} y={0} s={0.5} age="toddler" f={f + 21} pose="wave" expression="laugh" skin="medium" hair="bun" hairColor="black" top="tshirt" topColor={C.red} bottom="shorts" bottomColor={C.greyDark} shoes="shoes" shoesColor={C.ink} />
    </g>
  );
}
