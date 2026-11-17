import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Knight preset: grey plate armour over a tunic, open-visor helmet, shield with a geometric crest. No weapon drawn.
/* eslint-disable @typescript-eslint/no-explicit-any */
const plate = "#AEB6C4";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.greyDark}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="boots"
      shoesColor={shade(C.greyDark, 0.2)}
      hat="none"
      hair="none"
      over={() => (
        <g>
          <path d="M -70 -806 Q 4 -820 80 -806 L 82 -640 Q 4 -610 -72 -640 Z" fill={plate} />
          <path d="M -70 -806 Q 4 -820 80 -806 L 80 -786 Q 4 -800 -70 -786 Z" fill={shade(plate, 0.2)} />
          <path d="M -60 -700 Q 4 -670 74 -700 L 70 -600 Q 4 -570 -56 -600 Z" fill={shade(plate, 0.1)} />
          <path d="M -76 -640 L -40 -640 L -44 -560 L -80 -572 Z" fill={plate} />
          <path d="M 84 -640 L 48 -640 L 52 -560 L 88 -572 Z" fill={plate} />
          <circle cx={-58} cy={-800} r={30} fill={plate} />
          <circle cx={74} cy={-800} r={30} fill={plate} />
          <rect x={-76} y={-520} width={160} height={22} rx={6} fill={shade(plate, 0.3)} />
          <rect x={-10} y={-522} width={28} height={26} rx={4} fill={C.yellow} />
          <circle cx={4} cy={-690} r={6} fill={shade(plate, 0.35)} />
          <circle cx={-30} cy={-690} r={6} fill={shade(plate, 0.35)} />
          <circle cx={38} cy={-690} r={6} fill={shade(plate, 0.35)} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -98 -6 Q -102 -118 4 -120 Q 104 -118 100 -6 L 78 -6 Q 74 -40 40 -46 L -60 -46 Q -88 -30 -90 -6 Z" fill={plate} />
          <path d="M -98 -6 Q -102 -118 4 -120 Q 104 -118 100 -6" stroke={shade(plate, 0.25)} strokeWidth={10} fill="none" />
          <rect x={-40} y={-120} width={12} height={40} rx={4} fill={shade(plate, 0.25)} />
          <rect x={6} y={-44} width={18} height={6} fill={shade(plate, 0.3)} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M -6 -104 L 64 -88 L 64 -10 Q 60 40 29 62 Q -2 40 -6 -10 Z" fill={C.blue} />
          <path d="M -6 -104 L 64 -88 L 64 -10 Q 60 40 29 62 Q -2 40 -6 -10 Z" fill="none" stroke={C.navy} strokeWidth={8} />
          <path d="M 29 -78 L 29 36 M 6 -30 L 52 -30" stroke={C.yellow} strokeWidth={12} />
          <path d="M 29 -78 L 29 36 M 6 -30 L 52 -30" stroke={C.yellow} strokeWidth={0} />
        </g>
      )}
    />
  );
}
