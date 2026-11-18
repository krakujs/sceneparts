import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Comet: a bright icy head with a long fading tail trailing up and to the left. Origin = centre of the head.
// anim "fly": the comet crosses the sky diagonally (down and to the right) in a fading loop of 150 frames.
const DIR = { x: -0.8, y: -0.6 };
const NRM = { x: 0.6, y: -0.8 };
const LAYERS: [number, number, string, number][] = [
  [120, 560, "#8EC5E8", 0.3], [80, 430, "#B5DDF5", 0.45], [44, 300, "#E3F4FF", 0.6], [20, 170, "#FFFFFF", 0.9],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const anim: string = p.anim ?? "none";
  const t = anim === "fly" ? (f % 150) / 150 : 0;
  const px = anim === "fly" ? -300 + 600 * t : 0;
  const py = anim === "fly" ? -225 + 450 * t : 0;
  const op = anim === "fly" ? Math.sin(Math.PI * t) : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(${px.toFixed(1)} ${py.toFixed(1)})`} opacity={op.toFixed(3)}>
        {LAYERS.map(([w, len, c, o], i) => {
          const tx = DIR.x * len, ty = DIR.y * len;
          const hx = (NRM.x * w) / 2, hy = (NRM.y * w) / 2;
          return <path key={i} d={`M ${hx.toFixed(1)} ${hy.toFixed(1)} L ${tx.toFixed(1)} ${ty.toFixed(1)} L ${(-hx).toFixed(1)} ${(-hy).toFixed(1)} Z`} fill={c} opacity={o} stroke={c} strokeWidth={6} strokeLinejoin="round" />;
        })}
        <circle r={140} fill={C.skyDeep} opacity={0.25} />
        <circle r={90} fill="#FFFFFF" opacity={0.35} />
        <circle r={46} fill="#FFFFFF" />
      </g>
    </g>
  );
}
