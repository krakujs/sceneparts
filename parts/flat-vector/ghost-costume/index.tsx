import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Ghost costume: a person completely under a white bed sheet with two eye holes; only the sneakers peek out at the hem.
// The sheet sways gently and its hem ripples.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const x = p.x + (p.vx ?? 0) * p.f;
  const y = p.y ?? 1560;
  const s = p.s ?? 1;
  const sway = Math.sin(p.f / 30) * 2.5;
  const w = (i: number) => Math.sin(p.f / 9 + i) * 10;
  const hem = [-130, -78, -26, 26, 78, 130];
  const hemPath = hem.map((hx, i) => `Q ${hx + 26} ${-170 + w(i)} ${hx + 52} ${-210 + w(i + 1) * 0.5}`).join(" ");
  const sheetD = `M 12 -1012 Q 120 -1010 126 -890 Q 132 -760 150 -520 Q 166 -330 182 -210 ${""}L 182 -210 L -130 -210 Q -146 -330 -136 -520 Q -120 -760 -112 -890 Q -100 -1010 12 -1012 Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${sway} 0 0)`}>
        <Person x={0} y={0} s={1} f={p.f} pose="stand" top="tshirt" topColor={C.white} bottom="trousers" bottomColor={C.white} shoes="sneakers" shoesColor={C.greyDark} hair="none" />
        <path d={sheetD} fill={C.white} />
        <path d={`M -130 -212 ${hemPath} L 182 -212 Z`} fill={C.white} />
        <path d="M 150 -520 Q 166 -330 182 -210" stroke={shade(C.white, 0.08)} strokeWidth={10} fill="none" />
        <path d="M -20 -700 Q 0 -500 -30 -260 M 70 -760 Q 96 -560 90 -300" stroke={shade(C.white, 0.08)} strokeWidth={8} fill="none" strokeLinecap="round" />
        <ellipse cx={48} cy={-900} rx={15} ry={21} fill={C.ink} />
        <ellipse cx={92} cy={-900} rx={15} ry={21} fill={C.ink} />
      </g>
    </g>
  );
}
