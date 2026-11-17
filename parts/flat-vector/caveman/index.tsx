import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, SKIN } from "../style/index";

// Caveman preset: fur tunic over one shoulder, wild hair and beard, bare feet, and a wooden club resting on the shoulder (held in the front hand).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="tank"
      topColor={SKIN.brown}
      bottom="shorts"
      bottomColor={C.brown}
      shoes="sandals"
      shoesColor={SKIN.brown}
      hat="none"
      over={() => (
        <g>
          <path d="M -84 -800 Q -40 -826 -6 -812 L 30 -770 L 74 -600 L 96 -470 L 100 -330 L -96 -330 L -92 -520 L -84 -640 Z" fill={C.brown} />
          {[-84, -56, -28, 0, 28, 56, 84].map((x) => (
            <circle key={x} cx={x} cy={-330} r={15} fill={C.brown} />
          ))}
          {[-70, -40, -10, 20, 50].map((x) => (
            <path key={x} d={`M ${x} -730 L ${x + 6} -690 M ${x - 16} -640 L ${x - 10} -600`} stroke={C.brownDark} strokeWidth={6} strokeLinecap="round" />
          ))}
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M 8 24 L -190 -360" stroke={C.sand} strokeWidth={22} strokeLinecap="round" />
          <path d="M -8 -18 L 14 -4" stroke={C.brownDark} strokeWidth={26} strokeLinecap="round" />
          <circle cx={-190} cy={-362} r={36} fill={C.sand} />
          <circle cx={-198} cy={-372} r={14} fill={C.yellowDark} opacity={0.6} />
          <circle cx={-172} cy={-386} r={9} fill={C.brownDark} opacity={0.5} />
        </g>
      )}
    />
  );
}
