import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Nebula: a soft, colourful cloud of gas with a scatter of stars, about 800 px across at s = 1.
// Built for a dark background; the blurred clouds fade out at the edges.
// anim "drift": the cloud slowly drifts and the stars twinkle.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
// cloud puffs: [cx, cy, r, colour, opacity]
const CLOUDS: [number, number, number, string, number][] = [
  [-150, -90, 230, "#7B5CD6", 0.5], [170, -60, 220, "#F27BA6", 0.45], [0, 60, 260, "#3D6FE0", 0.42],
  [-200, 150, 170, "#1FA39A", 0.4], [210, 170, 170, "#FF8A3D", 0.32], [40, -190, 150, "#F27BA6", 0.35],
  [-60, 230, 140, "#8EC5E8", 0.3], [120, -250, 120, "#7B5CD6", 0.3], [-260, -20, 130, "#F27BA6", 0.3],
  [0, 0, 170, "#FFC83D", 0.18], [80, 120, 110, "#B5DDF5", 0.22],
];
const STARS = Array.from({ length: 46 }, (_, i) => {
  const a = i * 2.39996;
  const r = 400 * Math.sqrt((i + 0.5) / 46);
  return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.92, size: 2 + (i % 3) * 1.3, phase: i * 0.9 };
});

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const drift = p.anim === "drift";
  const dx = drift ? 16 * Math.sin((f * 2 * Math.PI) / 360) : 0;
  const dy = drift ? 12 * Math.cos((f * 2 * Math.PI) / 300) : 0;
  const rot = drift ? 4 * Math.sin((f * 2 * Math.PI) / 480) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <defs>
        <filter id="nebula-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={38} />
        </filter>
      </defs>
      <g transform={`translate(${f1(dx)} ${f1(dy)}) rotate(${f1(rot)})`}>
        <g filter="url(#nebula-blur)">
          <ellipse cx={0} cy={0} rx={330} ry={330} fill="#1A1440" opacity={0.9} />
          {CLOUDS.map(([cx, cy, r, col, o], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={col} opacity={o} />
          ))}
        </g>
        {/* bright dust core */}
        <circle cx={-20} cy={0} r={70} fill="#FFF6CC" opacity={0.2} />
      </g>
      {/* stars */}
      {STARS.map((st, i) => {
        const tw = drift ? 0.6 + 0.4 * Math.sin((f * 2 * Math.PI) / 110 + st.phase) : 0.9;
        return i % 6 === 0 ? (
          <path key={i} d={`M ${f1(st.x)} ${f1(st.y - st.size * 4)} L ${f1(st.x + st.size)} ${f1(st.y)} L ${f1(st.x)} ${f1(st.y + st.size * 4)} L ${f1(st.x - st.size)} ${f1(st.y)} Z M ${f1(st.x - st.size * 3)} ${f1(st.y)} L ${f1(st.x)} ${f1(st.y - st.size)} L ${f1(st.x + st.size * 3)} ${f1(st.y)} L ${f1(st.x)} ${f1(st.y + st.size)} Z`} fill={C.white} opacity={tw} />
        ) : (
          <circle key={i} cx={f1(st.x)} cy={f1(st.y)} r={st.size} fill={i % 4 === 1 ? C.yellow : C.white} opacity={tw} />
        );
      })}
    </g>
  );
}
