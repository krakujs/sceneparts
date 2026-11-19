import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, type Hand } from "../person/index";
import { C } from "../style/index";

// Team celebrating: five people in matching plain kit (no logos) jumping and cheering; one holds a generic trophy.
const trophy = (h: Hand) => (
  <g transform={`translate(${h.x} ${h.y})`}>
    <rect x={-22} y={-8} width={44} height={12} rx={4} fill={C.yellowDark} />
    <rect x={-6} y={-40} width={12} height={34} fill={C.yellowDark} />
    <path d="M -36 -120 L 36 -120 Q 34 -52 0 -44 Q -34 -52 -36 -120 Z" fill={C.yellow} />
    <path d="M -36 -110 Q -60 -110 -54 -88 Q -48 -70 -30 -68" stroke={C.yellow} strokeWidth={8} fill="none" />
    <path d="M 36 -110 Q 60 -110 54 -88 Q 48 -70 30 -68" stroke={C.yellow} strokeWidth={8} fill="none" />
  </g>
);
const LOOKS = [
  { skin: "light", hair: "short", hc: "brown" },
  { skin: "tan", hair: "bun", hc: "black" },
  { skin: "brown", hair: "curly", hc: "black" },
  { skin: "medium", hair: "ponytail", hc: "black" },
  { skin: "fair", hair: "spiky", hc: "red" },
] as const;
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      {LOOKS.map((L, i) => (
        <Person key={i} x={-350 + i * 175} y={0} s={0.44} f={f + i * 7} pose="cheer" expression={i % 2 ? "laugh" : "open"} skin={L.skin} hair={L.hair as any} hairColor={L.hc} top="tshirt" topColor={C.green} bottom="shorts" bottomColor={C.white} shoes="sneakers" shoesColor={C.ink} held={i === 2 ? trophy : undefined} />
      ))}
    </g>
  );
}
