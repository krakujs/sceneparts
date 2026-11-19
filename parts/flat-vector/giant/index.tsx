import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Giant: a huge friendly giant (about 1300 px tall at s = 1) in a patched green tunic with a rope belt, holding a club.
/* eslint-disable @typescript-eslint/no-explicit-any */
const TUNIC = "#7A9B5A", ROPE = "#C9A36B", WOOD = "#8A5A3C";
const pick = (p: any, d: Record<string, any>) => {
  const o: any = { ...d };
  for (const k of Object.keys(p)) if (p[k] !== undefined) o[k] = p[k];
  return o;
};
export default function Part(p: PartProps<any>) {
  const v = pick(p, { pose: "stand", expression: "laugh", skin: "medium" });
  const s = (p.s ?? 1) * 1.3;
  return (
    <Person
      x={(p.x ?? 540) + (p.vx ?? 0) * (p.f ?? 0)}
      y={p.y ?? 1600}
      s={s}
      f={p.f ?? 0}
      flip={!!p.flip}
      pose={v.pose}
      expression={v.expression}
      skin={v.skin}
      hair="buzz"
      hairColor="#6B4A2E"
      top="tshirt"
      topColor={TUNIC}
      bottom="trousers"
      bottomColor="#5E4A3A"
      shoes="boots"
      shoesColor="#3B2A1E"
      accessory="none"
      over={() => (
        <g>
          {/* patches sewn onto the tunic */}
          <rect x={-58} y={-720} width={44} height={38} rx={4} fill={shade(TUNIC, 0.25)} />
          <path d="M -58 -720 L -14 -682 M -14 -720 L -58 -682" stroke={C.white} strokeWidth={3} opacity={0.7} />
          <rect x={22} y={-612} width={50} height={40} rx={4} fill={shade(TUNIC, 0.3)} />
          <path d="M 22 -612 L 72 -572" stroke={C.white} strokeWidth={3} opacity={0.7} />
          {/* rope belt with a knot */}
          <rect x={-80} y={-486} width={170} height={28} rx={12} fill={ROPE} />
          {[-60, -36, -12, 12, 36, 60].map((x) => <path key={x} d={`M ${x} -484 L ${x + 10} -460`} stroke={shade(ROPE, 0.25)} strokeWidth={3} />)}
          <circle cx={50} cy={-472} r={16} fill={shade(ROPE, 0.12)} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          {/* a big wooden club */}
          <path d="M -10 40 L 22 -380" stroke={WOOD} strokeWidth={34} strokeLinecap="round" />
          <path d="M 22 -380 Q -6 -470 40 -500 Q 84 -520 60 -440 Q 52 -400 22 -380 Z" fill={WOOD} />
          <path d="M 30 -470 Q 48 -484 56 -470" stroke={shade(WOOD, 0.3)} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
