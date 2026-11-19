import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Queen preset: long teal gown, a flowing cape with a fur collar, a jewelled tiara and a glowing orb in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="dress"
      topColor={C.purple}
      bottom="skirt"
      bottomColor={C.purple}
      shoes="heels"
      shoesColor={C.yellowDark}
      hat="none"
      hair="bun"
      hairColor="#E3B65A"
      over={() => (
        <g>
          <path d="M -90 -800 Q -10 -760 90 -800 L 100 -560 Q 40 -500 -110 -320 L -150 -330 Q -110 -600 -90 -800 Z" fill={C.pink} />
          <path d="M -90 -800 Q -10 -760 90 -800 L 96 -776 Q -6 -728 -84 -776 Z" fill={C.white} />
          {[-80, -50, -20, 10, 40, 70].map((x, i) => <circle key={i} cx={x} cy={-790 + (i % 2) * 6} r={14} fill={C.white} />)}
          <path d="M -76 -520 L 84 -520 L 128 -300 L -122 -300 Z" fill={C.purple} opacity={0} />
          <circle cx={4} cy={-640} r={12} fill={C.yellow} />
          <rect x={-76} y={-470} width={160} height={14} rx={6} fill={C.yellow} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -58 -88 L -58 -128 L -36 -110 L -18 -146 L 0 -116 L 18 -146 L 36 -110 L 58 -128 L 58 -88 Z" fill={C.yellow} />
          <circle cx={0} cy={-102} r={9} fill={C.teal} />
          <circle cx={-32} cy={-94} r={5} fill={C.pink} />
          <circle cx={32} cy={-94} r={5} fill={C.pink} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-6} y={-6} width={12} height={34} rx={5} fill={C.yellowDark} />
          <circle cx={0} cy={-26} r={34} fill={C.teal} />
          <circle cx={-12} cy={-38} r={9} fill={C.white} opacity={0.6} />
        </g>
      )}
    />
  );
}
