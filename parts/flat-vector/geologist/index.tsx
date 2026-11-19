import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Geologist preset: yellow hard hat, plaid shirt and dark trousers, holding a rock and a small rock hammer in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
const PLAID = "#3F7F5A";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={PLAID}
      bottom="trousers"
      bottomColor={C.brownDark}
      hat="hardhat"
      hatColor={C.yellow}
      over={() => (
        <g stroke={C.greenDark} strokeWidth={6} opacity={0.6}>
          {[-640, -590, -540].map((yy) => <path key={yy} d={`M -70 ${yy} L 82 ${yy}`} />)}
          {[-50, 0, 50].map((xx) => <path key={xx} d={`M ${xx} -812 L ${xx} -460`} strokeWidth={4} />)}
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.3)`}>
          <path d="M -40 -40 L -6 -66 L 30 -52 L 46 -8 L 18 30 L -30 26 Z" fill={C.grey} />
          <path d="M -40 -40 L -6 -66 L 4 -30 L -30 26 Z" fill={C.greyDark} opacity={0.5} />
          <rect x={-6} y={-30} width={14} height={62} rx={6} fill={C.brown} transform="rotate(-30 0 0)" />
          <rect x={6} y={-40} width={30} height={14} rx={4} fill={C.greyDark} transform="rotate(-30 0 0)" />
        </g>
      )}
    />
  );
}
