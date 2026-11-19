import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Cyclops: a friendly one-eyed giant in a rust tunic with a sturdy wooden staff. One big eye sits where the face's two eyes would be.
/* eslint-disable @typescript-eslint/no-explicit-any */
const TUNIC = "#B0643A", WOOD = "#8A5A3C", SKIN = "#E0A77C";
const pick = (p: any, d: Record<string, any>) => {
  const o: any = { ...d };
  for (const k of Object.keys(p)) if (p[k] !== undefined) o[k] = p[k];
  return o;
};
export default function Part(p: PartProps<any>) {
  const v = pick(p, { pose: "stand", expression: "smile", skin: SKIN });
  const s = (p.s ?? 1) * 1.15;
  const blink = (p.f ?? 0) % 120 < 5;
  const look = Math.sin((p.f ?? 0) / 40) * 6;
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
      hair="bob"
      hairColor="#2B2420"
      top="tshirt"
      topColor={TUNIC}
      bottom="trousers"
      bottomColor="#4A3A5E"
      shoes="boots"
      shoesColor="#3B2A1E"
      accessory="none"
      topper={() => (
        <g>
          {/* cover the two ordinary eyes and brows with skin, then draw one big eye */}
          <ellipse cx={56} cy={-4} rx={56} ry={34} fill={v.skin} />
          <circle cx={58} cy={-6} r={34} fill={C.white} />
          {blink ? <path d="M 26 -6 Q 58 8 92 -6" stroke={shade(v.skin, 0.4)} strokeWidth={8} fill="none" strokeLinecap="round" /> : (
            <g>
              <circle cx={58 + look * 0.6} cy={-4} r={18} fill={C.blue} />
              <circle cx={58 + look * 0.6} cy={-4} r={9} fill={C.ink} />
              <circle cx={52 + look * 0.6} cy={-10} r={4} fill={C.white} />
            </g>
          )}
          <path d="M 22 -30 Q 58 -54 94 -30" stroke={shade("#2B2420", 0.1)} strokeWidth={8} fill="none" strokeLinecap="round" />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          {/* wooden staff with a knob on top */}
          <rect x={-8} y={-330} width={16} height={380} rx={8} fill={WOOD} />
          <circle cx={0} cy={-344} r={20} fill={C.yellow} />
          <circle cx={-6} cy={-350} r={6} fill={C.white} opacity={0.7} />
        </g>
      )}
    />
  );
}
