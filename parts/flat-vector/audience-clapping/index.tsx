import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Audience clapping: two rows of seated people seen from the side. Each clap is a short burst of
// spark marks in front of the front row, repeating every 12 frames.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  const beat = f % 12;
  const clap = beat < 4;
  const k = clap ? 1 - beat / 4 : 0;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      {/* back row, smaller and darker, behind */}
      <Person x={-300} y={-40} s={0.38} f={f + 5} pose="sit" seat={false} expression="smile" skin="dark" hair="afro" hairColor="black" top="tshirt" topColor={C.greyDark} bottom="trousers" bottomColor={C.ink} shoes="shoes" shoesColor={C.ink} />
      <Person x={-100} y={-40} s={0.38} f={f + 12} pose="sit" seat={false} expression="open" skin="brown" hair="bun" hairColor="black" top="shirt" topColor={C.sky} shirtColor={C.white} bottom="trousers" bottomColor={C.inkSoft} shoes="shoes" shoesColor={C.ink} accessory="glasses" />
      <Person x={100} y={-40} s={0.38} f={f + 19} pose="sit" seat={false} expression="smile" skin="fair" hair="bob" hairColor="blonde" top="sweater" topColor={C.purpleDark} bottom="skirt" bottomColor={C.inkSoft} shoes="heels" shoesColor={C.red} />
      <Person x={300} y={-40} s={0.38} f={f + 26} pose="sit" seat={false} expression="laugh" skin="tan" hair="short" hairColor="black" top="hoodie" topColor={C.tealDark} bottom="trousers" bottomColor={C.navy} shoes="sneakers" shoesColor={C.white} />
      {/* front row */}
      <Person x={-240} y={0} s={0.46} f={f} pose="sit" seat={false} expression="laugh" skin="light" hair="spiky" hairColor="blonde" top="tshirt" topColor={C.orange} bottom="trousers" bottomColor={C.blueDark} shoes="sneakers" shoesColor={C.white} />
      <Person x={0} y={0} s={0.46} f={f + 7} pose="sit" seat={false} expression="open" skin="medium" hair="curly" hairColor="black" top="blazer" topColor={C.navy} shirtColor={C.white} bottom="trousers" bottomColor={C.inkSoft} shoes="shoes" shoesColor={C.ink} />
      <Person x={240} y={0} s={0.46} f={f + 14} pose="sit" seat={false} expression="smile" skin="brown" hair="long" hairColor="black" top="dress" topColor={C.yellow} bottom="skirt" bottomColor={C.yellow} shoes="sandals" shoesColor={C.brownDark} />
      {/* clap sparks in front of the chest */}
      {clap ? (
        <g opacity={k}>
          {[-150, 0, 150].map((x) => (
            <g key={x} transform={`translate(${x} -300)`}>
              <line x1={-22} y1={0} x2={-40} y2={-14} stroke={C.yellow} strokeWidth={7} strokeLinecap="round" />
              <line x1={22} y1={0} x2={40} y2={-14} stroke={C.yellow} strokeWidth={7} strokeLinecap="round" />
              <line x1={0} y1={-26} x2={0} y2={-44} stroke={C.yellow} strokeWidth={7} strokeLinecap="round" />
            </g>
          ))}
        </g>
      ) : null}
    </g>
  );
}
