import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Office meeting: three people seated at a side-view table, one standing and pointing at a chart board.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -(p.s ?? 1) : p.s ?? 1} ${p.s ?? 1})`}>
      {/* chart board on an easel */}
      <g transform="translate(20 0) scale(0.8)">
      <rect x={300} y={-620} width={250} height={180} rx={10} fill={C.white} />
      <rect x={316} y={-600} width={34} height={120} fill={C.blue} />
      <rect x={360} y={-570} width={34} height={90} fill={C.teal} />
      <rect x={404} y={-540} width={34} height={60} fill={C.yellow} />
      <rect x={448} y={-590} width={34} height={110} fill={C.orange} />
      <path d="M 316 -470 L 360 -520 L 404 -500 L 530 -560" stroke={C.green} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={418} y={-440} width={12} height={432} fill={C.greyDark} />
      <rect x={370} y={-8} width={110} height={10} rx={5} fill={C.greyDark} />
      </g>
      {/* seated attendees (drawn first, the table overlaps their legs) */}
      <Person x={-270} y={0} s={0.46} f={f} pose="sit" seat={false} expression="neutral" skin="brown" hair="curly" hairColor="black" top="blazer" topColor={C.navy} shirtColor={C.white} bottom="trousers" bottomColor={C.inkSoft} shoes="shoes" shoesColor={C.ink} />
      <Person x={-160} y={0} s={0.46} f={f + 7} pose="sit" seat={false} expression="smile" skin="light" hair="bob" hairColor="auburn" top="sweater" topColor={C.purple} bottom="trousers" bottomColor={C.ink} shoes="shoes" shoesColor={C.red} />
      <Person x={-50} y={0} s={0.46} f={f + 14} pose="sit" seat={false} expression="smile" skin="medium" hair="buzz" hairColor="black" top="shirt" topColor={C.sky} shirtColor={C.white} bottom="trousers" bottomColor={C.navy} shoes="sneakers" shoesColor={C.white} accessory="glasses" />
      {/* table, side view */}
      <rect x={-320} y={-330} width={420} height={22} rx={8} fill={C.brown} />
      <rect x={-310} y={-308} width={400} height={8} fill={shade(C.brown, 0.25)} />
      <rect x={-290} y={-300} width={14} height={300} fill={C.brownDark} />
      <rect x={70} y={-300} width={14} height={300} fill={C.brownDark} />
      <rect x={-230} y={-352} width={56} height={22} rx={3} fill={C.white} />
      <rect x={-60} y={-354} width={30} height={24} rx={4} fill={C.red} />
      {/* standing presenter, pointing at the board */}
      <Person x={120} y={0} s={0.5} f={f} pose="point" expression="open" skin="tan" hair="side" hairColor="black" top="shirt" topColor={C.white} shirtColor={C.white} bottom="trousers" bottomColor={C.navy} shoes="shoes" shoesColor={C.ink} accessory="glasses" />
    </g>
  );
}
