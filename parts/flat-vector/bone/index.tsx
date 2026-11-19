import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Classic cartoon bone: a shaft with two knobbly ends, tilted at an angle. It stands on y: the lowest
// point of the tilted bone rests on the floor. About 400 px long at s = 1 (before the tilt).
const f1 = (v: number) => v.toFixed(1);
const KNOB_R = 46;
const KNOBS: [number, number][] = [[-150, -38], [-150, 38], [150, -38], [150, 38]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const col = p.color && p.color !== "none" ? p.color : C.white;
  const dk = shade(col, 0.14);
  const angle = typeof p.angle === "number" ? p.angle : -30;
  const anim: string = p.anim ?? "none";
  // lowest point of the tilted bone, so it rests on y
  const a = (angle * Math.PI) / 180, sa = Math.sin(a), ca = Math.cos(a);
  const yOf = (px: number, py: number) => px * sa + py * ca;
  let low = -Infinity;
  for (const [kx, ky] of KNOBS) low = Math.max(low, yOf(kx, ky) + KNOB_R);
  for (const cx of [-170, 170]) for (const cy of [-28, 28]) low = Math.max(low, yOf(cx, cy));
  const dy = -low;
  const rock = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8
    : 0;
  const wob = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${f1(s)})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(rock)}) rotate(${f1(wob)})`}>
        <g transform={`translate(0 ${f1(dy)}) rotate(${angle})`}>
          {/* shaft with a shaded underside */}
          <rect x={-170} y={-22} width={340} height={56} rx={16} fill={dk} />
          <rect x={-170} y={-28} width={340} height={52} rx={16} fill={col} />
          {/* knobs at both ends */}
          {KNOBS.map(([kx, ky]) => (
            <g key={`${kx}${ky}`}>
              <circle cx={kx} cy={ky + 6} r={KNOB_R} fill={dk} />
              <circle cx={kx} cy={ky} r={KNOB_R} fill={col} />
            </g>
          ))}
          <path d="M -120 -14 L 120 -14" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.6} />
        </g>
      </g>
    </g>
  );
}
