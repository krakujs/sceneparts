import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Picnicker: sitting on a folded checked blanket on a red picnic blanket, with a basket of fruit beside them.
// No bench: the blanket cushion is drawn here, and the person is drawn on top of it.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const x = (p.x ?? 540) + (p.vx ?? 0) * p.f;
  const y = p.y ?? 1560;
  const squares = [-300, -220, -140, -60, 20, 100, 180, 260];
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <rect x={-320} y={-6} width={640} height={26} rx={6} fill={C.red} />
      {squares.map((bx, i) => (
        <rect key={"g" + bx} x={bx} y={i % 2 ? 2 : -6} width={40} height={16} fill={C.white} opacity={0.6} />
      ))}
      <rect x={-130} y={-440} width={300} height={44} rx={10} fill={C.red} />
      {[-110, -50, 10, 70, 130].map((bx) => (
        <rect key={"c" + bx} x={bx} y={-440} width={18} height={44} fill={C.white} opacity={0.6} />
      ))}
      <path d="M -130 -400 L -130 -6 M 170 -400 L 170 -6" stroke={C.redDark} strokeWidth={16} />
      <Person
        x={0}
        y={0}
        s={1}
        f={p.f}
        flip={false}
        pose="sit"
        seat={false}
        top="sweater"
        topColor={C.pink}
        bottom="trousers"
        bottomColor={C.blue}
        shoes="sneakers"
        shoesColor={C.white}
        hat="none"
        hair="bun"
        hairColor="brown"
      />
      <path d="M 250 -110 L 370 -110 L 350 -4 L 270 -4 Z" fill={C.brown} />
      {[-96, -72, -48, -24].map((yy) => (
        <path key={yy} d={`M 256 ${yy - 2} L 364 ${yy - 2}`} stroke={C.brownDark} strokeWidth={4} />
      ))}
      <path d="M 260 -110 Q 310 -178 360 -110" stroke={C.brownDark} strokeWidth={10} fill="none" strokeLinecap="round" />
      <circle cx={288} cy={-122} r={17} fill={C.red} />
      <circle cx={336} cy={-120} r={17} fill={C.lime} />
    </g>
  );
}
