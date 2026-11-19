import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Dwarf: short, sturdy miner with a bushy red beard, an iron cap, a leather apron and a pickaxe. Person generator at a smaller scale.
/* eslint-disable @typescript-eslint/no-explicit-any */
const IRON = "#7C8593", LEATHER = "#7A4E2D", SKIN = "#E0A77C";
const pick = (p: any, d: Record<string, any>) => {
  const o: any = { ...d };
  for (const k of Object.keys(p)) if (p[k] !== undefined) o[k] = p[k];
  return o;
};
export default function Part(p: PartProps<any>) {
  const v = pick(p, { pose: "stand", expression: "smile", skin: SKIN });
  const s = (p.s ?? 1) * 0.8;
  return (
    <Person
      x={(p.x ?? 540) + (p.vx ?? 0) * (p.f ?? 0)}
      y={p.y ?? 1560}
      s={s}
      f={p.f ?? 0}
      flip={!!p.flip}
      pose={v.pose}
      expression={v.expression}
      skin={v.skin}
      hair="none"
      top="tshirt"
      topColor="#B8553A"
      bottom="trousers"
      bottomColor="#4A4F5C"
      shoes="boots"
      shoesColor="#4A3322"
      accessory="beard"
      hairColor="#C2532B"
      extra="apron"
      extraColor={LEATHER}
      over={() => (
        <g>
          {/* a patch on the sleeve and a strap detail */}
          <rect x={-48} y={-640} width={30} height={26} rx={5} fill={shade("#B8553A", 0.25)} />
        </g>
      )}
      topper={() => (
        <g>
          {/* iron miner's cap */}
          <path d="M -96 -14 Q -100 -108 0 -116 Q 100 -108 96 -14 Q 60 -40 0 -44 Q -60 -40 -96 -14 Z" fill={IRON} />
          <path d="M -96 -14 Q -100 -108 0 -116 Q -40 -92 -52 -40 Q -80 -30 -96 -14 Z" fill={shade(IRON, 0.2)} opacity={0.7} />
          <path d="M -30 -92 Q 0 -102 24 -92" stroke="#B8C0CC" strokeWidth={6} fill="none" strokeLinecap="round" />
          <circle cx={0} cy={-118} r={12} fill={shade(IRON, 0.1)} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          {/* wooden pickaxe handle */}
          <path d="M -8 60 L 28 -210" stroke={LEATHER} strokeWidth={16} strokeLinecap="round" />
          {/* iron head */}
          <g transform="translate(28 -214) rotate(-12)">
            <path d="M -120 -6 Q 0 -42 120 -6 L 108 6 Q 0 -16 -108 6 Z" fill={IRON} />
            <path d="M -120 -6 L -146 -2 L -108 6 Z" fill={shade(IRON, 0.25)} />
            <path d="M 120 -6 L 146 -2 L 108 6 Z" fill={shade(IRON, 0.25)} />
          </g>
        </g>
      )}
    />
  );
}
