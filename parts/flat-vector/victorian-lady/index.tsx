import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Victorian lady preset: long bustle dress with a high lace collar, small hat, hair in a bun and a parasol held over the back shoulder.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const dress = C.purpleDark;
  const dark = shade(dress, 0.2);
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="dress"
      topColor={dress}
      bottom="skirt"
      bottomColor={dress}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="sailor"
      hatColor={C.pink}
      over={() => (
        <g>
          <path d="M -80 -490 L 88 -490 L 150 -30 Q 0 -6 -150 -30 Z" fill={dress} />
          <ellipse cx={-130} cy={-350} rx={44} ry={72} fill={dark} />
          <path d="M -40 -420 Q -30 -250 -60 -40 M 40 -420 Q 50 -250 80 -40" stroke={dark} strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d="M -96 -470 L -132 -500 L -128 -440 Z M -96 -470 L -60 -500 L -64 -440 Z" fill={C.pink} />
          <circle cx={-96} cy={-470} r={8} fill={C.pink} />
          <ellipse cx={14} cy={-802} rx={54} ry={14} fill={C.white} />
          <path d="M -40 -800 Q 14 -760 68 -800" stroke={C.white} strokeWidth={12} fill="none" strokeLinecap="round" />
        </g>
      )}
      hair="bun"
      hairColor="brown"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-28)`}>
          <rect x={-5} y={-560} width={10} height={580} rx={5} fill={C.brownDark} />
          <path d="M -190 -540 Q 0 -700 190 -540 Q 100 -560 0 -560 Q -100 -560 -190 -540 Z" fill={C.pink} />
          <path d="M 0 -690 L -170 -545 M 0 -690 L 170 -545 M 0 -690 L 0 -560" stroke={C.white} strokeWidth={4} fill="none" />
          <circle cx={0} cy={-694} r={10} fill={C.yellow} />
        </g>
      )}
    />
  );
}
