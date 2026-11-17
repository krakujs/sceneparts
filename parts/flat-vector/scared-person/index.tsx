import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Scared person: surprised face, both arms raised with hands near the face (over), trembling body, sweat drops.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const tremble = Math.sin(p.f * 1.6) * 3;
  const sk = "#F2C29E";
  const sleeve = C.teal;
  const sweat = (phase: number) => {
    const k = (p.f * 2 + phase) % 60;
    return (
      <g transform={`translate(124 ${-70 + k}) scale(1.8)`} opacity={k > 46 ? (60 - k) / 14 : 1}>
        <path d="M 0 -14 Q -9 2 0 6 Q 9 2 0 -14 Z" fill={C.skyDeep} />
      </g>
    );
  };
  return (
    <g transform={`translate(${tremble} 0)`}>
      <Person
        {...p}
        x={p.x + (p.vx ?? 0) * p.f}
        f={p.f}
        flip={!!p.flip}
        pose="stand"
        expression="surprised"
        skin="fair"
        hair="side"
        hairColor="auburn"
        top="shirt"
        topColor={C.teal}
        shirtColor={C.white}
        bottom="trousers"
        bottomColor={C.inkSoft}
        shoes="boots"
        shoesColor={C.brownDark}
        over={() => (
          <g>
            <path d="M -44 -775 Q -100 -830 -86 -900" stroke={sleeve} strokeWidth={60} fill="none" strokeLinecap="round" />
            <path d="M 48 -775 Q 110 -830 104 -895" stroke={sleeve} strokeWidth={60} fill="none" strokeLinecap="round" />
            <circle cx={-86} cy={-906} r={27} fill={sk} />
            <circle cx={104} cy={-900} r={27} fill={sk} />
          </g>
        )}
        topper={() => <g>{sweat(0)}{sweat(30)}</g>}
      />
    </g>
  );
}
