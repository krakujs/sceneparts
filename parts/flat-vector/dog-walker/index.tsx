import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Dog walker preset: casual green hoodie and jeans, holding several leashes that run to a small generic dog beside them.
/* eslint-disable @typescript-eslint/no-explicit-any */
const DOG = "#C99A62";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="hoodie"
      topColor={C.teal}
      bottom="trousers"
      bottomColor={C.blueDark}
      shoes="sneakers"
      shoesColor={C.white}
      held={(h) => (
        <g>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M ${h.x} ${h.y} Q ${h.x + 70} ${h.y + 60 + i * 10} ${252 - i * 4} ${-92 - i * 8}`} stroke={C.greyDark} strokeWidth={4} fill="none" strokeLinecap="round" />
          ))}
          <g transform="translate(200 0)">
            <ellipse cx={0} cy={-48} rx={64} ry={38} fill={DOG} />
            <circle cx={60} cy={-84} r={34} fill={DOG} />
            <ellipse cx={46} cy={-110} rx={12} ry={24} fill={shade(DOG)} />
            <ellipse cx={82} cy={-108} rx={10} ry={20} fill={shade(DOG)} />
            <circle cx={86} cy={-90} r={6} fill={C.ink} />
            <rect x={-44} y={-22} width={16} height={22} rx={6} fill={DOG} />
            <rect x={30} y={-22} width={16} height={22} rx={6} fill={DOG} />
            <path d="M -62 -58 Q -92 -86 -78 -104" stroke={DOG} strokeWidth={12} fill="none" strokeLinecap="round" />
          </g>
        </g>
      )}
    />
  );
}
