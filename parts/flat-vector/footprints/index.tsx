import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// A trail of bare footprints walking diagonally up and to the right, alternating left and right.
// Origin = bottom-left start of the trail (rests on y). About 560 px wide and 420 px tall at s = 1.
// anim "appear" prints the steps one after another, then they fade for a seamless loop.
const f1 = (v: number) => v.toFixed(1);
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const TOES: [number, number, number][] = [[-24, -70, 7], [-12, -84, 7], [2, -90, 7], [16, -84, 6], [27, -68, 6]];
// bare sole: narrow heel, wider ball of the foot, toes at the top (origin = centre of the sole)
const SOLE = "M 0 66 C -22 66 -24 40 -24 10 C -24 -16 -32 -40 -30 -58 C -27 -76 -12 -80 0 -80 C 12 -80 28 -76 30 -58 C 32 -40 24 -16 24 10 C 24 40 22 66 0 66 Z";
// direction of the walk: about -35 degrees (up and to the right), 120 px per step
const ANG = (-35 * Math.PI) / 180;
const STEP = 120;
const DX = Math.cos(ANG) * STEP, DY = Math.sin(ANG) * STEP;
const SIDE = 42;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const ink = pick(p.color, "#7A5A3A");
  const anim: string = p.anim ?? "none";
  const t = f % 150;
  const prints: React.ReactElement[] = [];
  for (let i = 0; i < 7; i++) {
    const left = i % 2 === 0;
    const cx = -250 + i * DX + (left ? -SIDE * 0.574 : SIDE * 0.574);
    const cy = i * DY + (left ? -SIDE * 0.819 : SIDE * 0.819);
    // rotate so the toes point along the walk: a foot drawn toes-up is rotated by (angle + 90)
    const rot = ((ANG * 180) / Math.PI) + 90;
    const op = anim === "appear" ? clamp((t - i * 18) / 10) * clamp((150 - t) / 12) : 1;
    prints.push(
      <g key={i} transform={`translate(${f1(cx)} ${f1(cy)}) rotate(${f1(rot)})`} opacity={op}>
        <path d={SOLE} fill={ink} />
        {TOES.map(([tx, ty, tr], k) => (
          <circle key={k} cx={tx} cy={ty} r={tr} fill={ink} />
        ))}
      </g>
    );
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g>{prints}</g>
    </g>
  );
}
