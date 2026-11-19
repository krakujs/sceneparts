import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round virus particle: a sphere with clubbed spikes all round, like a crown. No face.
// Effect, centred on (x, y), about 460 px across at s = 1. anim "float": it bobs up and down; "spin": it turns.
const f1 = (v: number) => v.toFixed(1);
const N = 18;
const BUMPS: [number, number][] = [[-60, -40], [50, -70], [-20, 60], [80, 30], [-100, 20], [30, -110], [10, 20]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const body = p.color && p.color !== "none" ? p.color : C.green;
  const spike = p.color2 && p.color2 !== "none" ? p.color2 : C.purple;
  const anim: string = p.anim ?? "none";
  const bob = anim === "float" ? -Math.sin((f * 2 * Math.PI) / 90) * 14 : 0;
  const turn = anim === "spin" ? (f * 1.2) % 360 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(s)})`}>
      <g transform={`translate(0 ${f1(bob)})`}>
        <g transform={`rotate(${f1(turn)})`}>
          {/* spikes: stalk plus a club head */}
          {Array.from({ length: N }, (_, i) => {
            const a = (i * 2 * Math.PI) / N;
            const r0 = 140, r1 = 208;
            return (
              <g key={i}>
                <line x1={f1(Math.cos(a) * r0)} y1={f1(Math.sin(a) * r0)} x2={f1(Math.cos(a) * r1)} y2={f1(Math.sin(a) * r1)} stroke={shade(spike, 0.2)} strokeWidth={18} strokeLinecap="round" />
                <circle cx={f1(Math.cos(a) * r1)} cy={f1(Math.sin(a) * r1)} r={24} fill={spike} />
              </g>
            );
          })}
          {/* sphere with a shaded lower-right edge */}
          <circle cx={12} cy={12} r={150} fill={shade(body, 0.2)} />
          <circle cx={0} cy={0} r={150} fill={body} />
          {BUMPS.map(([bx, by], i) => (
            <circle key={i} cx={bx} cy={by} r={14} fill={shade(body, 0.22)} opacity={0.8} />
          ))}
          <path d="M -100 -60 Q -80 -110 -30 -128" stroke={C.white} strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.4} />
        </g>
      </g>
    </g>
  );
}
