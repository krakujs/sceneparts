import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Kilt preset: green tartan kilt with yellow and red stripes, brown leather sporran, white knee socks and a dark jacket.
/* eslint-disable @typescript-eslint/no-explicit-any */
const TARTAN = "#2E5E4A";
const JACKET = "#2A2F3A";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={JACKET}
      shirtColor={C.white}
      bottom="skirt"
      bottomColor={TARTAN}
      shoes="boots"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          <path d="M -82 -500 L 88 -500 L 120 -226 L -112 -226 Z" fill={TARTAN} />
          {[-56, -10, 36, 80].map((x) => <rect key={x} x={x} y={-500} width={8} height={274} fill={C.yellow} opacity={0.7} />)}
          {[-58, 20].map((x) => <rect key={x} x={x} y={-500} width={6} height={274} fill={C.red} opacity={0.75} />)}
          {[-440, -380, -320, -260].map((y) => <rect key={y} x={-110} y={y} width={230} height={6} fill={C.red} opacity={0.6} />)}
          <rect x={-84} y={-512} width={172} height={18} rx={6} fill={C.ink} />
          <rect x={-18} y={-446} width={80} height={14} rx={5} fill={C.brownDark} />
          <path d="M -18 -434 L 62 -434 L 60 -390 Q 22 -370 -16 -390 Z" fill={C.brown} />
          <path d="M -12 -388 L -8 -376 L -4 -388 L 0 -376 L 4 -388 L 8 -376 L 12 -388 L 16 -376 L 20 -388 L 24 -376 L 28 -388 L 32 -376 L 36 -388 L 40 -376 L 44 -388 L 48 -376 L 52 -388 L 56 -376" stroke={C.ink} strokeWidth={3} fill="none" />
          {[-26, 60].map((x) => <path key={x} d={`M ${x} -226 L ${x} -30`} stroke={C.white} strokeWidth={70} strokeLinecap="round" />)}
          {[-26, 60].map((x) => <path key={"t" + x} d={`M ${x} -226 L ${x} -30`} stroke={shade(C.white, 0.12)} strokeWidth={6} />)}
        </g>
      )}
    />
  );
}
