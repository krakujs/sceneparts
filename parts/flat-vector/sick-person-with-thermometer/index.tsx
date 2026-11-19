import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Sick person: flushed cheeks, thermometer in the mouth, wrapped in a blanket, droopy and pale-ish.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="stand"
      expression="sad"
      skin="light"
      hair="side"
      hairColor="grey"
      top="sweater"
      topColor={C.greyDark}
      bottom="trousers"
      bottomColor={C.inkSoft}
      shoes="shoes"
      shoesColor={C.ink}
      over={() => (
        <g>
          <path d="M -150 -820 Q 0 -870 150 -820 L 160 -540 Q 0 -500 -160 -540 Z" fill={C.purple} />
          {[-740, -680, -620, -560].map((yy) => <rect key={yy} x={-160} y={yy} width={320} height={14} fill={C.purpleDark} />)}
        </g>
      )}
      topper={() => (
        <g>
          <circle cx={28} cy={40} r={17} fill={C.red} opacity={0.4} />
          <circle cx={92} cy={38} r={17} fill={C.red} opacity={0.4} />
          <g transform="translate(62 50) scale(1.5) translate(-62 -50)"><rect x={58} y={50} width={74} height={13} rx={6} fill={C.white} stroke={C.greyDark} strokeWidth={2} />
          <rect x={84} y={52} width={48} height={9} rx={4} fill={C.red} /></g>
          <path d="M 110 0 Q 118 -22 96 -36" stroke={C.inkSoft} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.0} />
        </g>
      )}
    />
  );
}
