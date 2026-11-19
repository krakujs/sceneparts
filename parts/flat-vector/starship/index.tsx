import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Starship: an original sleek spacecraft in side view, nose to the right. A navy hull with an orange stripe,
// a long glass canopy, a tall tail fin and two glowing engines. Origin = centre of the hull; about 780 px wide at s = 1.
// anim "thrust": the engine flames flicker and the ship bobs gently.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const ENGINES = [-68, -14];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 800;
  const body = p.color && p.color !== "none" ? p.color : C.navy;
  const accent = p.accent && p.accent !== "none" ? p.accent : C.orange;
  const thrust = p.anim === "thrust";
  const dy = thrust ? Math.sin((f * 2 * Math.PI) / 80) * 8 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y + dy)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* engine flames, drawn behind the nozzles */}
      {ENGINES.map((cy, i) => {
        const L = thrust ? 150 + 35 * Math.sin((f * 2 * Math.PI) / 23 + i * 1.7) : 70;
        const r = 18;
        return (
          <g key={i}>
            <path d={`M -340 ${cy - r} Q ${f1(-340 - L * 0.6)} ${cy - 12} ${f1(-340 - L)} ${cy} Q ${f1(-340 - L * 0.6)} ${cy + 12} -340 ${cy + r} Z`} fill={C.orange} />
            <path d={`M -340 ${cy - 9} Q ${f1(-340 - L * 0.4)} ${cy - 5} ${f1(-340 - L * 0.62)} ${cy} Q ${f1(-340 - L * 0.4)} ${cy + 5} -340 ${cy + 9} Z`} fill={C.yellow} />
          </g>
        );
      })}
      {/* dorsal fin and ventral fin */}
      <path d="M -300 -92 L -250 -205 Q -225 -210 -200 -150 L -200 -94 Z" fill={accent} />
      <path d="M -90 22 L -150 78 L -200 78 L -170 22 Z" fill={shade(body, 0.2)} />
      {/* hull */}
      <path d="M -340 -60 Q -340 -92 -300 -94 L 220 -100 Q 400 -104 432 -32 Q 402 30 220 24 L -300 22 Q -340 20 -340 -20 Z" fill={body} />
      <path d="M -300 22 L 220 24 Q 402 30 432 -32 Q 330 -2 -300 0 Z" fill={shade(body, 0.2)} />
      <path d="M -330 -40 L 420 -44 L 410 -30 L -330 -20 Z" fill={accent} />
      {/* canopy */}
      <path d="M 120 -100 Q 200 -170 300 -116 L 340 -62 L 120 -66 Z" fill={C.skyDeep} />
      <path d="M 150 -96 Q 200 -140 250 -120" stroke={C.white} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.7} />
      {/* small ports */}
      {[-60, -10, 40, 90].map((px) => (
        <ellipse key={px} cx={px} cy={-60} rx={12} ry={9} fill={C.ink} opacity={0.45} />
      ))}
      {/* engine nozzles */}
      {ENGINES.map((cy, i) => (
        <g key={`n${i}`}>
          <ellipse cx={-344} cy={cy} rx={16} ry={22} fill={shade(body, 0.45)} />
          <ellipse cx={-346} cy={cy} rx={8} ry={12} fill={C.ink} />
        </g>
      ))}
    </g>
  );
}
