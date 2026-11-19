import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Wind gust: curling white swoosh lines with a few blown leaves. Origin = centre.
// anim "blow": the swooshes sway along the wind and the leaves tumble across.
const SWOOSH = [
  "M -420 -70 C -260 -170 -90 -40 80 -110 C 190 -160 290 -150 320 -100 A 44 44 0 1 1 312 -26",
  "M -330 60 C -190 10 -40 70 110 20 C 210 -10 280 20 262 60",
  "M -400 170 C -270 130 -170 200 -30 160 C 50 140 120 170 170 150",
  "M 40 250 C 130 220 230 260 320 230 A 26 26 0 0 0 350 262",
];
const LEAVES: [number, number, number, string][] = [
  [-250, -200, -25, C.green], [160, -230, 30, C.orange], [-90, 240, -10, C.yellowDark], [250, 170, 40, C.green],
];
const LEAF = "M 0 0 Q 22 -26 52 -6 Q 26 22 0 0 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 700;
  const blow = (p.anim ?? "none") === "blow";
  const ph = (f * 2 * Math.PI) / 90;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(${blow ? (14 * Math.sin(ph)).toFixed(1) : 0} 0)`}>
        {SWOOSH.map((d, i) => (
          <g key={i}>
            <path d={d} transform="translate(0 8)" fill="none" stroke={C.skyDeep} strokeWidth={34} strokeLinecap="round" opacity={0.6} />
            <path d={d} fill="none" stroke={C.white} strokeWidth={22} strokeLinecap="round" />
          </g>
        ))}
      </g>
      {LEAVES.map(([lx, ly, rot, c], i) => {
        const dx = blow ? 50 * Math.sin(ph + i) : 0;
        const dr = blow ? 20 * Math.sin(ph * 1.3 + i) : 0;
        return (
          <g key={i} transform={`translate(${(lx + dx).toFixed(1)} ${ly}) rotate(${(rot + dr).toFixed(1)})`}>
            <path d={LEAF} fill={c} />
          </g>
        );
      })}
    </g>
  );
}
