import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Meteor: a burning rock streaking down and to the left, with a long fiery trail behind it (up and to the right).
// Origin = centre of the rock; the trail is about 500 px long at s = 1. Not a comet: the rock itself is on fire.
// anim "fly": the meteor crosses the sky in a fading loop of 150 frames, the flames flicker.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const DIR = { x: 0.8, y: -0.6 }; // direction of the trail (away from the rock)
const NRM = { x: -0.6, y: -0.8 }; // perpendicular, for the trail width
const LAYERS: [number, number, string][] = [
  [200, 480, C.red], [130, 370, C.orange], [72, 250, C.yellow], [32, 140, "#FFF6CC"],
];
const ROCK = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  const r = 66 + 8 * Math.sin(3 * a) + 5 * Math.cos(5 * a + 1);
  return [Math.cos(a) * r, Math.sin(a) * r] as [number, number];
});

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const fly = p.anim === "fly";
  const t = fly ? (f % 150) / 150 : 0;
  const px = fly ? 300 - 600 * t : 0;
  const py = fly ? -225 + 450 * t : 0;
  const op = fly ? Math.min(1, Math.sin(Math.PI * t) * 1.6) : 1;
  const flick = (i: number) => 1 + 0.07 * Math.sin((f * 2 * Math.PI) / 9 + i * 2.1);
  const rockPath = ROCK.map(([rx, ry], i) => `${i === 0 ? "M" : "L"} ${f1(rx)} ${f1(ry)}`).join(" ") + " Z";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`translate(${f1(px)} ${f1(py)})`} opacity={f1(op)}>
        {/* fiery trail, widest at the back */}
        {LAYERS.map(([w, len, col], i) => {
          const L = len * flick(i);
          const hx = (NRM.x * w) / 2, hy = (NRM.y * w) / 2;
          const tx = DIR.x * L, ty = DIR.y * L;
          return (
            <path key={i} d={`M ${f1(hx)} ${f1(hy)} Q ${f1(tx * 0.45 + hx * 0.4)} ${f1(ty * 0.45 + hy * 0.4)} ${f1(tx)} ${f1(ty)} Q ${f1(tx * 0.45 - hx * 0.4)} ${f1(ty * 0.45 - hy * 0.4)} ${f1(-hx)} ${f1(-hy)} Z`} fill={col} opacity={0.9} />
          );
        })}
        {/* glow around the rock */}
        <circle r={112} fill={C.orange} opacity={0.35} />
        <circle r={92} fill={C.red} opacity={0.35} />
        {/* the burning rock */}
        <path d={rockPath} fill={C.brownDark} />
        <path d={rockPath} fill={C.brown} transform="translate(10 -10) scale(0.8)" />
        <path d="M -30 -20 L -10 0 L -36 22" stroke={C.orange} strokeWidth={6} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M 14 -40 L 34 -20 L 22 6" stroke={C.yellow} strokeWidth={6} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </g>
    </g>
  );
}
