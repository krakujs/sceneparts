import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Chess players: two people seated at a small table facing each other over a chessboard. The player on the
// right is thinking (three thought dots above the head).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  const squares: React.ReactNode[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) {
    if ((r + c) % 2 === 0) squares.push(<rect key={`${r}-${c}`} x={-100 + c * 25} y={-156 + r * 6} width={25} height={6} fill={C.sand} />);
  }
  const pieces = [-80, -40, 0, 40, 80];
  const bob = Math.sin(f / 20) * 2;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      <Person x={-175} y={0} s={0.46} f={f} pose="sit" seat={false} expression="smile" skin="light" hair="side" hairColor="brown" top="sweater" topColor={C.teal} bottom="trousers" bottomColor={C.navy} shoes="shoes" shoesColor={C.ink} />
      <Person x={175} y={0} s={0.46} f={f + 11} flip pose="sit" seat={false} expression="neutral" skin="dark" hair="braid" hairColor="black" top="shirt" topColor={C.sky} shirtColor={C.white} bottom="trousers" bottomColor={C.inkSoft} shoes="shoes" shoesColor={C.ink} />
      {/* table */}
      <rect x={-120} y={-150} width={240} height={12} rx={4} fill={C.brown} />
      <rect x={-110} y={-138} width={220} height={6} fill={C.brownDark} />
      <rect x={-96} y={-132} width={12} height={132} fill={C.brownDark} />
      <rect x={84} y={-132} width={12} height={132} fill={C.brownDark} />
      {/* board, pieces */}
      <rect x={-102} y={-166} width={204} height={16} fill={C.brownDark} />
      {squares}
      {pieces.map((x, i) => (
        <g key={i} transform={`translate(${x} ${-172 - bob * 0})`}>
          <circle cx={0} cy={-6} r={6} fill={i % 2 ? C.white : C.ink} stroke={C.ink} strokeWidth={0} />
          <rect x={-6} y={-2} width={12} height={0} fill={C.ink} />
        </g>
      ))}
      {/* thought dots above the thinking player */}
      <g transform={`translate(230 -460)`} fill={C.grey}>
        <circle cx={-30} cy={20} r={6} />
        <circle cx={-12} cy={6} r={8} />
        <circle cx={10} cy={-14} r={22} fill={C.white} />
      </g>
    </g>
  );
}
