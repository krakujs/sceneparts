import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round-point digging shovel lying on the floor: blade to the right, D-grip to the left. Origin = floor under the blade's heel.
// Hero scale: about 480 px long at s = 1; use about 0.25 next to a person.
// anim "dig": the blade stays on the ground while the handle lifts and drops (levering the soil).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.grey;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const lever = anim === "dig" ? (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50)) * 9 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-20} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={anim === "dig" ? `rotate(${f1(lever)} 240 0)` : undefined}>
          <path d="M -196 -92 C -262 -92 -262 -44 -196 -44" fill="none" stroke={shade(wood, 0.2)} strokeWidth={22} strokeLinecap="round" />
          <rect x={-206} y={-80} width={270} height={26} rx={13} fill={wood} />
          <path d="M 36 -104 L 176 -112 C 246 -116 284 -80 280 -40 C 276 -8 244 0 200 0 L 36 0 Z" fill={metal} />
          <path d="M 36 -22 L 212 -22 C 246 -22 270 -32 280 -40 C 276 -8 244 0 200 0 L 36 0 Z" fill={shade(metal, 0.2)} />
          <path d="M 72 -92 L 172 -98 C 204 -100 226 -88 236 -68" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" opacity={0.35} />
          <rect x={24} y={-100} width={28} height={40} rx={6} fill={shade(metal, 0.25)} />
        </g>
      </g>
    </g>
  );
}
