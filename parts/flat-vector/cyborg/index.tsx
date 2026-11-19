import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Cyborg: a person with a robotic left arm, a metal plate on the cheek and a glowing cyan eye implant. Original design.
/* eslint-disable @typescript-eslint/no-explicit-any */
const METAL = "#B8C2CE", METAL_D = "#7D8898", GLOW = "#4FE3F0";
const pick = (p: any, d: Record<string, any>) => {
  const o: any = { ...d };
  for (const k of Object.keys(p)) if (p[k] !== undefined) o[k] = p[k];
  return o;
};
export default function Part(p: PartProps<any>) {
  const v = pick(p, { pose: "stand", expression: "smile", skin: "fair", hairColor: "#22201F" });
  const f = p.f ?? 0;
  const pulse = 0.6 + 0.4 * Math.sin(f / 6);
  return (
    <Person
      x={(p.x ?? 540) + (p.vx ?? 0) * f}
      y={p.y ?? 1560}
      s={p.s ?? 1}
      f={f}
      flip={!!p.flip}
      pose={v.pose}
      expression={v.expression}
      skin={v.skin}
      hair="side"
      hairColor={v.hairColor}
      top="hoodie"
      topColor="#3D4A5E"
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.ink}
      over={() => (
        <g>
          {/* panel lines and a chest light */}
          <path d="M -40 -740 L -40 -600 M 50 -740 L 50 -600" stroke={METAL_D} strokeWidth={4} strokeLinecap="round" />
          <circle cx={6} cy={-612} r={9} fill={GLOW} opacity={pulse} />
        </g>
      )}
      topper={() => (
        <g>
          {/* metal cheek plate with rivets */}
          <path d="M 30 -18 Q 70 -30 96 -4 L 92 34 Q 70 52 40 44 Q 26 20 30 -18 Z" fill={METAL} />
          <path d="M 30 -18 Q 70 -30 96 -4 L 92 2 Q 66 -14 34 -4 Z" fill={METAL_D} opacity={0.5} />
          {[[44, 6], [68, 14], [56, 30]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill={METAL_D} />)}
          {/* glowing eye implant, cyan ring */}
          <circle cx={74} cy={-6} r={26} fill={METAL_D} />
          <circle cx={74} cy={-6} r={20} fill={C.ink} />
          <circle cx={74} cy={-6} r={12 + pulse * 2} fill={GLOW} opacity={0.5 + pulse * 0.4} />
          <circle cx={74} cy={-6} r={5} fill={C.white} />
        </g>
      )}
      held={(h) => (
        <g>
          {/* robotic arm from shoulder to hand */}
          <path d={`M 48 -775 Q ${(48 + h.x) / 2 + 24} ${(-775 + h.y) / 2} ${h.x} ${h.y}`} stroke={METAL} strokeWidth={58} fill="none" strokeLinecap="round" />
          <path d={`M 48 -775 Q ${(48 + h.x) / 2 + 24} ${(-775 + h.y) / 2} ${h.x} ${h.y}`} stroke={METAL_D} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.5} strokeDasharray="2 30" />
          <circle cx={48} cy={-775} r={36} fill={METAL_D} />
          <circle cx={h.x} cy={h.y} r={32} fill={METAL_D} />
          <circle cx={h.x} cy={h.y} r={12} fill={GLOW} opacity={pulse} />
        </g>
      )}
    />
  );
}
