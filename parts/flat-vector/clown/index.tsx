import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Clown preset: colourful yellow jumpsuit with polka dots, a round red nose on the face, a curly wig and a balloon (pose wave).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="jumpsuit"
      topColor={C.yellow}
      hat="none"
      accessory="none"
      extra="none"
      over={() => (
        <g>
          {[[-44, -730], [34, -760], [-14, -640], [52, -612], [-52, -540], [30, -500], [-6, -476]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={13} fill={i % 2 ? C.red : C.teal} />
          ))}
        </g>
      )}
      topper={() => (
        <g>
          <circle cx={98} cy={22} r={17} fill={C.red} />
          <circle cx={92} cy={16} r={5} fill={C.white} opacity={0.6} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M 0 0 Q 14 -50 0 -100" stroke={C.greyDark} strokeWidth={3} fill="none" />
          <ellipse cx={0} cy={-170} rx={52} ry={62} fill={C.teal} />
          <ellipse cx={-18} cy={-194} rx={12} ry={18} fill={C.white} opacity={0.5} />
          <path d="M -7 -108 L 7 -108 L 0 -96 Z" fill={C.teal} />
        </g>
      )}
    />
  );
}
