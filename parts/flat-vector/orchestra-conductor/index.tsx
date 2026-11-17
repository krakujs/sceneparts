import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, type Hand } from "../person/index";
import { C } from "../style/index";

// Orchestra conductor: one person in a tailcoat on a small podium, baton hand conducting, with a music stand.
const baton = (h: Hand) => (
  <line x1={h.x} y1={h.y} x2={h.x + 70} y2={h.y - 150} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
);
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      {/* music stand */}
      <rect x={170} y={-300} width={10} height={300} fill={C.greyDark} />
      <rect x={140} y={-8} width={70} height={8} rx={4} fill={C.greyDark} />
      <path d="M 120 -360 L 210 -372 L 210 -300 L 120 -290 Z" fill={C.white} />
      <rect x={130} y={-340} width={70} height={6} fill={C.greyLight} />
      <rect x={130} y={-320} width={60} height={6} fill={C.greyLight} />
      {/* podium */}
      <rect x={-140} y={-70} width={220} height={70} rx={6} fill={C.brown} />
      <rect x={-140} y={-70} width={220} height={12} fill={C.brownDark} />
      <Person x={-30} y={-70} s={0.52} f={f} pose="wave" expression="open" skin="medium" hair="side" hairColor="grey" top="blazer" topColor={C.ink} shirtColor={C.white} bottom="trousers" bottomColor={C.ink} shoes="shoes" shoesColor={C.ink} extra="bowtie" extraColor={C.white} accessory="glasses" held={baton} />
    </g>
  );
}
