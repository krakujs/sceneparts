import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pink brain, side view: cerebrum with folds, cerebellum at the back and the brain stem below.
// Organ, centred on (x, y), about 500 px wide at s = 1. anim "glow": a soft yellow halo breathes;
// anim "pulse": the brain swells and settles.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const col = p.color && p.color !== "none" ? p.color : C.pink;
  const dk = shade(col, 0.22);
  const anim: string = p.anim ?? "none";
  const halo = anim === "glow" ? 0.2 + 0.15 * Math.sin((f * 2 * Math.PI) / 80) : 0;
  const k = anim === "pulse" ? 1 + 0.04 * Math.sin((f * 2 * Math.PI) / 60) : 1;
  const fold = (d: string, w = 12, c = dk) => <path d={d} stroke={c} strokeWidth={w} strokeLinecap="round" fill="none" />;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(s)})`}>
      {halo > 0 && <circle cx={0} cy={0} r={310} fill={C.yellow} opacity={f1(halo)} />}
      <ellipse cx={0} cy={210} rx={180} ry={14} fill={C.shadow} />
      <g transform={`scale(${f1(k)})`}>
        <g transform="translate(0 -40)">
          {/* brain stem */}
          <rect x={-30} y={60} width={60} height={130} rx={28} fill={dk} />
          {/* cerebellum behind the lower right */}
          <ellipse cx={140} cy={120} rx={95} ry={50} fill={shade(col, 0.12)} />
          {fold("M 80 118 Q 140 98 200 118", 8, shade(col, 0.3))}
          {fold("M 92 142 Q 140 128 192 142", 8, shade(col, 0.3))}
          {/* cerebrum */}
          <path d="M -230 10 C -250 -90 -190 -170 -100 -170 C -60 -230 40 -235 90 -185 C 150 -200 230 -150 235 -60 C 255 0 235 60 185 80 C 150 110 80 110 30 95 C -20 90 -70 105 -120 95 C -190 85 -225 60 -230 10 Z" fill={col} />
          {/* shade along the underside */}
          <path d="M -120 95 C -70 105 -20 90 30 95 C 80 110 150 110 185 80 C 150 70 90 74 40 66 C -20 60 -80 70 -120 62 Z" fill={dk} opacity={0.5} />
          {/* folds */}
          {fold("M -150 -90 Q -110 -40 -160 0")}
          {fold("M -60 -140 Q -20 -90 -60 -50 Q -90 -20 -40 10")}
          {fold("M 40 -170 Q 70 -110 30 -70")}
          {fold("M 120 -140 Q 160 -90 120 -40 Q 100 -10 150 10")}
          {fold("M -120 60 Q -60 30 -10 60 Q 30 80 60 50")}
          {/* central fissure between the two halves */}
          {fold("M 10 -200 Q -5 -120 10 -60", 14, shade(col, 0.4))}
          {/* highlight */}
          <path d="M -170 -80 Q -150 -130 -100 -140" stroke={C.white} strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.4} />
        </g>
      </g>
    </g>
  );
}
