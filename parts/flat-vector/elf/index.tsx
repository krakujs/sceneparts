import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Elf: slender generic woodland elf with pointed ears, an olive green-brown tunic, a hooded cloak and a longbow in the front hand.
// Built on the person generator with over (cloak), topper (hood, ears) and held (bow).
/* eslint-disable @typescript-eslint/no-explicit-any */
const TUNIC = "#6B7F3E", CLOAK = "#4B5A2A", LEATHER = "#7A4E2D", SKIN = "#F6D2B5";
const pick = (p: any, d: Record<string, any>) => {
  const o: any = { ...d };
  for (const k of Object.keys(p)) if (p[k] !== undefined) o[k] = p[k];
  return o;
};
export default function Part(p: PartProps<any>) {
  const v = pick(p, { pose: "stand", expression: "smile", skin: SKIN, hair: "none", hairColor: "#6B4A2E" });
  return (
    <Person
      x={(p.x ?? 540) + (p.vx ?? 0) * (p.f ?? 0)}
      y={p.y ?? 1560}
      s={p.s ?? 1}
      f={p.f ?? 0}
      flip={!!p.flip}
      pose={v.pose}
      expression={v.expression}
      skin={v.skin}
      hair={v.hair}
      hairColor={v.hairColor}
      top="tshirt"
      topColor={TUNIC}
      bottom="trousers"
      bottomColor={LEATHER}
      shoes="boots"
      shoesColor="#4A3322"
      accessory="none"
      extra="sash"
      extraColor={LEATHER}
      age={v.age}
      over={() => (
        <g>
          {/* cloak draped over the shoulders, open at the front */}
          <path d="M -86 -806 Q 0 -850 96 -800 L 118 -470 L 84 -440 L 70 -600 L -94 -600 L -112 -470 Z" fill={CLOAK} />
          <path d="M -86 -806 Q 0 -850 96 -800 L 96 -776 Q 0 -820 -86 -782 Z" fill={shade(CLOAK, 0.2)} />
        </g>
      )}
      topper={() => (
        <g>
          {/* pointed ears */}
          <path d="M -80 -44 L -180 -104 L -88 12 Z" fill={v.skin} />
          <path d="M 80 -44 L 180 -104 L 88 12 Z" fill={v.skin} />
          <path d="M -84 -28 L -150 -84 L -92 6 Z" fill={shade(v.skin, 0.1)} />
          <path d="M 84 -28 L 150 -84 L 92 6 Z" fill={shade(v.skin, 0.1)} />
          {/* hood framing the face */}
          <path d="M -122 44 Q -136 -126 0 -138 Q 136 -126 122 44 L 100 34 Q 94 -84 0 -94 Q -94 -84 -100 34 Z" fill={CLOAK} />
          <path d="M -122 44 Q -136 -126 0 -138 Q -40 -128 -60 -110 Q -120 -60 -100 34 Z" fill={shade(CLOAK, 0.14)} opacity={0.6} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M 12 -170 Q 96 0 12 170" stroke={LEATHER} strokeWidth={13} fill="none" strokeLinecap="round" />
          <path d="M 12 -170 L 12 170" stroke={C.white} strokeWidth={3} opacity={0.8} />
        </g>
      )}
    />
  );
}
