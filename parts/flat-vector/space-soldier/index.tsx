import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Space soldier: an armoured sci-fi soldier in a teal-and-grey suit with a rounded helmet, dark visor and a blocky blaster.
// Original design (not any film armour).
/* eslint-disable @typescript-eslint/no-explicit-any */
const TEAL = "#1FA39A", TEAL_D = "#167A73", GREY = "#7D8898", GREY_D = "#4E5768", VISOR = "#2B3F5C";
const pick = (p: any, d: Record<string, any>) => {
  const o: any = { ...d };
  for (const k of Object.keys(p)) if (p[k] !== undefined) o[k] = p[k];
  return o;
};
export default function Part(p: PartProps<any>) {
  const v = pick(p, { pose: "hold", expression: "neutral", skin: "light" });
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
      hair="none"
      top="jumpsuit"
      topColor={TEAL}
      shoes="boots"
      shoesColor={GREY_D}
      over={() => (
        <g>
          {/* grey shoulder pads and chest plate */}
          <path d="M -94 -806 Q -70 -850 -30 -822 L -30 -770 Q -66 -772 -94 -754 Z" fill={GREY} />
          <path d="M 96 -806 Q 74 -850 34 -822 L 34 -770 Q 70 -772 96 -754 Z" fill={GREY} />
          <rect x={-40} y={-700} width={100} height={92} rx={14} fill={GREY} />
          <rect x={-26} y={-684} width={72} height={20} rx={6} fill={TEAL_D} />
          <circle cx={-14} cy={-640} r={6} fill={C.yellow} />
        </g>
      )}
      topper={() => (
        <g>
          {/* rounded helmet with a dark visor */}
          <path d="M -112 -8 Q -116 -124 0 -128 Q 116 -124 112 -8 Q 110 24 80 36 Q 0 52 -80 36 Q -110 24 -112 -8 Z" fill={GREY} />
          <path d="M -112 -8 Q -116 -124 0 -128 Q -60 -104 -80 -40 Q -104 -30 -112 -8 Z" fill={shade(GREY, 0.2)} opacity={0.8} />
          <path d="M -82 -36 Q 0 -66 98 -34 Q 104 -2 84 24 Q 0 40 -82 14 Q -92 -6 -82 -36 Z" fill={VISOR} />
          <path d="M -58 -40 Q -20 -58 22 -48" stroke={C.white} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.6} />
          <path d="M -20 -100 L 20 -100" stroke={TEAL} strokeWidth={8} strokeLinecap="round" />
          <path d="M -104 26 Q -96 52 -60 56 L -54 38 Z" fill={TEAL} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-8)`}>
          {/* blocky blaster */}
          <rect x={-18} y={-30} width={150} height={52} rx={8} fill={GREY_D} />
          <rect x={-40} y={-24} width={46} height={44} rx={8} fill={shade(GREY_D, 0.2)} />
          <rect x={62} y={-16} width={44} height={18} rx={5} fill={TEAL} />
          <rect x={-2} y={22} width={28} height={40} rx={6} fill={GREY_D} transform="rotate(12 10 22)" />
          <circle cx={130} cy={-4} r={9} fill={TEAL} opacity={0.9} />
        </g>
      )}
    />
  );
}
