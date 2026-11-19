import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Minotaur: bull-headed humanoid with curved horns, a cream toga-style wrap and a plain golden-tipped staff.
// Person generator body; topper draws the bull head over the face.
/* eslint-disable @typescript-eslint/no-explicit-any */
const FUR = "#8A5A3C", MUZ = "#D9B894", HORN = "#F2E7CF", TOGA = "#F4EBD8";
const pick = (p: any, d: Record<string, any>) => {
  const o: any = { ...d };
  for (const k of Object.keys(p)) if (p[k] !== undefined) o[k] = p[k];
  return o;
};
export default function Part(p: PartProps<any>) {
  const v = pick(p, { pose: "stand", expression: "smile", skin: "#9A6240" });
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
      top="tshirt"
      topColor={TOGA}
      bottom="trousers"
      bottomColor={TOGA}
      shoes="sandals"
      shoesColor="#8A5A3C"
      over={() => (
        <g>
          {/* toga wrap draped diagonally across the chest, with a gold trim */}
          <path d="M -70 -806 L 16 -812 L 90 -560 L 60 -456 L -40 -520 Z" fill={TOGA} />
          <path d="M -70 -806 L 16 -812 L 22 -790 L -62 -782 Z" fill={shade(TOGA, 0.1)} />
          <path d="M 60 -560 L 90 -560 L 60 -456 Z" fill={shade(TOGA, 0.1)} />
          <path d="M -62 -640 Q -20 -600 40 -600" stroke={C.yellow} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d="M -20 -520 Q 10 -540 36 -512" stroke={C.yellow} strokeWidth={8} fill="none" strokeLinecap="round" />
        </g>
      )}
      topper={() => (
        <g>
          {/* curved horns */}
          <g transform="translate(0 -70) scale(1.5) translate(0 70)">
            <path d="M -54 -58 Q -92 -110 -86 -176 Q -80 -190 -68 -178 Q -70 -120 -36 -72 Z" fill={HORN} />
            <path d="M 42 -66 Q 84 -112 76 -180 Q 70 -194 60 -180 Q 62 -124 22 -76 Z" fill={HORN} />
          </g>
          {/* bull head covering the face */}
          <ellipse cx={-6} cy={-6} rx={96} ry={92} fill={FUR} />
          <path d="M -90 -40 Q -120 -30 -112 6 Q -102 20 -86 4 Z" fill={FUR} />
          <path d="M 84 -40 Q 116 -30 110 6 Q 100 20 84 4 Z" fill={FUR} />
          <path d="M -40 -40 Q 0 -10 40 -40" fill={shade(FUR, 0.2)} opacity={0.35} />
          {/* muzzle */}
          <ellipse cx={60} cy={44} rx={66} ry={52} fill={MUZ} />
          <circle cx={40} cy={44} r={7} fill={C.inkSoft} />
          <circle cx={72} cy={44} r={7} fill={C.inkSoft} />
          {/* eyes and brow */}
          <ellipse cx={24} cy={-18} rx={9} ry={11} fill={C.ink} />
          <ellipse cx={70} cy={-14} rx={9} ry={11} fill={C.ink} />
          <path d="M 12 -38 Q 26 -48 40 -38" stroke={shade(FUR, 0.4)} strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d="M 60 -34 Q 72 -44 84 -34" stroke={shade(FUR, 0.4)} strokeWidth={7} fill="none" strokeLinecap="round" />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          {/* plain staff with a golden tip */}
          <rect x={-7} y={-330} width={14} height={380} rx={6} fill="#8A5A3C" />
          <circle cx={0} cy={-344} r={18} fill={C.yellow} />
        </g>
      )}
    />
  );
}
