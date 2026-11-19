import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Witch's cauldron: black iron pot with a rim, three short legs and a small fire underneath.
// Origin = floor centre under the legs. About 460 px wide at s = 1; steam rises about 500 px above the rim.
const f1 = (v: number) => v.toFixed(1);
const IRON = "#2B2F3A";
const BUB = [{ x: -80, ph: 0 }, { x: -10, ph: 20 }, { x: 60, ph: 40 }, { x: 20, ph: 10 }];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const brew = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "bubble";
  const flick = anim === "bubble" ? 1 + 0.08 * Math.sin((f * 2 * Math.PI) / 18) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={240} ry={18} fill={C.shadow} />
      {/* small fire under the pot */}
      <g transform={`translate(0 -10) scale(${f1(flick)})`}>
        <path d="M -90 -10 Q -60 -90 -40 -40 Q -20 -120 0 -60 Q 20 -130 50 -50 Q 80 -100 90 -10 Z" fill={C.orange} />
        <path d="M -50 -10 Q -30 -60 -10 -20 Q 10 -70 35 -10 Z" fill={C.yellow} />
      </g>
      {/* legs */}
      <path d="M -170 -60 L -190 0 L -160 0 L -140 -60 Z" fill={shade(IRON, 0.2)} />
      <path d="M 170 -60 L 190 0 L 160 0 L 140 -60 Z" fill={shade(IRON, 0.2)} />
      <path d="M -20 -60 L -30 0 L 0 0 L 20 -60 Z" fill={shade(IRON, 0.2)} />
      {/* pot body */}
      <path d="M -200 -330 Q -200 -70 0 -70 Q 200 -70 200 -330 Z" fill={IRON} />
      <path d="M 60 -320 Q 130 -200 110 -90 Q 170 -120 190 -200 Q 200 -260 200 -330 Z" fill={shade(IRON, 0.25)} opacity={0.6} />
      {/* brew surface and bubbles */}
      <ellipse cx={0} cy={-330} rx={200} ry={34} fill={shade(IRON, 0.1)} />
      <ellipse cx={0} cy={-330} rx={176} ry={24} fill={brew} />
      {anim === "bubble" && BUB.map((b, i) => {
        const t = ((f + b.ph) % 50) / 50;
        return <circle key={i} cx={b.x} cy={f1(-330 + 6 - t * 10)} r={f1(8 - t * 3)} fill={C.white} opacity={0.7 * (1 - t * 0.5)} />;
      })}
      {/* rim */}
      <path d="M -220 -330 Q -220 -360 0 -360 Q 220 -360 220 -330 Q 220 -312 0 -312 Q -220 -312 -220 -330 Z" fill={shade(IRON, -0.1)} />
      <path d="M -220 -330 Q -220 -360 0 -360 Q 220 -360 220 -330" fill="none" stroke={C.greyDark} strokeWidth={6} />
      {/* steam curls */}
      {anim === "bubble" && [-90, 0, 90].map((sx, i) => {
        const t = ((f + i * 30) % 90) / 90;
        return (
          <path key={i} d={`M ${sx} -380 Q ${f1(sx + 30)} ${f1(-440 - t * 60)} ${sx} ${f1(-500 - t * 120)}`}
            fill="none" stroke={C.white} strokeWidth={18} strokeLinecap="round" opacity={0.55 * (1 - t)} />
        );
      })}
    </g>
  );
}
