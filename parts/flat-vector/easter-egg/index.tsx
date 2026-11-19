import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Decorated Easter egg: a pastel egg with a zigzag band, a row of dots and a soft shaded side.
// Origin = bottom centre (the egg stands on y). About 400 px wide and 520 px tall at s = 1.
// anim "wobble": the egg rocks gently. anim "bob": it rises and falls. anim "pop": springs in once.
const f1 = (v: number) => v.toFixed(1);
const EGG = "M 0 -520 C 150 -520 200 -330 200 -220 C 200 -90 110 0 0 0 C -110 0 -200 -90 -200 -220 C -200 -330 -150 -520 0 -520 Z";
const tint = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.round(v + (255 - v) * k).toString(16).padStart(2, "0");
  return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const base = p.color && p.color !== "none" ? p.color : tint(C.pink, 0.5);
  const band = p.color2 && p.color2 !== "none" ? p.color2 : tint(C.blue, 0.45);
  const anim: string = p.anim ?? "none";
  const wobble = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 70) * 3 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8 : 0;
  const t = Math.min(1, f / 18), c1 = 1.70158, c3 = c1 + 1;
  const pop = anim === "pop" ? 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2 : 1;
  const zig: string[] = [];
  for (let i = 0; i <= 10; i++) zig.push(`${-260 + i * 52} ${i % 2 ? -262 : -300}`);
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={`rotate(${f1(wobble)} 0 0) scale(${f1(pop)})`}>
        <defs>
          <clipPath id="easter-egg-clip">
            <path d={EGG} />
          </clipPath>
        </defs>
        <path d={EGG} fill={base} />
        <g clipPath="url(#easter-egg-clip)">
          {/* shaded right side */}
          <ellipse cx={200} cy={-260} rx={110} ry={330} fill={shade(base, 0.14)} />
          {/* zigzag band and dots */}
          <polyline points={zig.join(" ")} fill="none" stroke={band} strokeWidth={22} strokeLinejoin="round" strokeLinecap="round" />
          {[-180, -120, -60, 0, 60, 120, 180].map((dx) => <circle key={dx} cx={dx} cy={-118} r={12} fill={band} />)}
          {[-150, -90, -30, 30, 90, 150].map((dx) => <circle key={`u${dx}`} cx={dx} cy={-392} r={9} fill={C.white} opacity={0.8} />)}
        </g>
        {/* highlight */}
        <ellipse cx={-112} cy={-370} rx={22} ry={50} fill={C.white} opacity={0.55} transform="rotate(22 -112 -370)" />
      </g>
    </g>
  );
}
