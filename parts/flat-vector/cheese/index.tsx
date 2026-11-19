import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cheese: a yellow wedge with holes plus a small cube, or a wheel. Variant wedge or wheel.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 380 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Cheese(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const variant = p.variant ?? "wedge";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const cheeseC = p.cheeseColor ?? "#FFC83D";
  const holeC = shade(cheeseC, 0.32);

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  const holes = (pts: [number, number, number][]) => pts.map(([hx, hy, r], i) => (
    <g key={i}><ellipse cx={hx} cy={hy} rx={r} ry={r * 0.8} fill={holeC} /><ellipse cx={hx - r * 0.2} cy={hy - r * 0.25} rx={r * 0.3} ry={r * 0.2} fill="#FFFFFF" opacity={0.3} /></g>
  ));

  if (variant === "wheel") {
    return (
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
        <ellipse cx={0} cy={0} rx={190} ry={18} fill={C.shadow} />
        <g transform={tr}>
          <path d="M -170 -60 L -170 -30 A 170 52 0 0 0 170 -30 L 170 -60 Z" fill={shade(cheeseC, 0.22)} />
          <ellipse cx={0} cy={-60} rx={170} ry={52} fill={cheeseC} />
          <ellipse cx={0} cy={-60} rx={150} ry={44} fill="none" stroke={shade(cheeseC, 0.1)} strokeWidth={6} opacity={0.7} />
          {holes([[-70, -66, 16], [20, -52, 20], [90, -72, 13], [-20, -84, 9], [130, -50, 10], [-130, -54, 9], [50, -30, 8]])}
          <ellipse cx={-80} cy={-82} rx={40} ry={10} fill="#FFFFFF" opacity={0.25} />
        </g>
      </g>
    );
  }
  // wedge: front triangle face, top slanted face, and a small cube in front
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={16} fill={C.shadow} />
      <g transform={tr}>
        {/* wedge: right side face, front face, top face */}
        <path d="M -160 0 L 160 0 L 160 -110 L -160 -130 Z" fill={cheeseC} />
        <path d="M -160 -130 L 160 -110 L 160 -120 L -160 -146 Z" fill={shade(cheeseC, 0.1)} />
        <path d="M -160 -146 L 160 -120 L 120 -150 Z" fill={shade(cheeseC, 0.02)} opacity={0} />
        <path d="M 160 -110 L 160 0 L 200 -20 L 200 -124 Z" fill={shade(cheeseC, 0.22)} />
        <path d="M -160 0 L 160 0 L 200 -20 L -120 -20 Z" fill={shade(cheeseC, 0.12)} opacity={0} />
        <path d="M -160 -146 L 200 -124 L 160 -110 L -160 -130 Z" fill={shade(cheeseC, 0.1)} opacity={0} />
        {holes([[-100, -70, 16], [-20, -44, 22], [60, -84, 14], [110, -40, 12], [-60, -110, 10], [20, -110, 9], [-125, -30, 8]])}
        <ellipse cx={-90} cy={-140} rx={44} ry={8} fill="#FFFFFF" opacity={0.25} />
        {/* small cube in front */}
        <g transform="translate(-210 -4)">
          <path d="M 0 0 L 40 0 L 40 -40 L 0 -40 Z" fill={cheeseC} />
          <path d="M 0 -40 L 40 -40 L 58 -54 L 18 -54 Z" fill={shade(cheeseC, 0.1)} />
          <path d="M 40 0 L 58 -14 L 58 -54 L 40 -40 Z" fill={shade(cheeseC, 0.22)} />
          <ellipse cx={16} cy={-20} rx={6} ry={5} fill={holeC} />
        </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Cheese {...p} />;
}
