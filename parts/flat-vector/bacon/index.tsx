import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector bacon: two wavy strips with pink meat and white fat stripes.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 400 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** A wavy band from x0 to x1: top edge at yTop(x), thickness t. Returns a closed path. */
const band = (x0: number, x1: number, yc: number, amp: number, t: number, phase: number) => {
  const n = 24, top: string[] = [], bot: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const yy = yc + Math.sin((x / 90) * Math.PI + phase) * amp;
    top.push(`${f1(x)} ${f1(yy)}`);
  }
  for (let i = n; i >= 0; i--) {
    const x = x0 + ((x1 - x0) * i) / n;
    const yy = yc + Math.sin((x / 90) * Math.PI + phase) * amp + t;
    bot.push(`${f1(x)} ${f1(yy)}`);
  }
  return `M ${top.join(" L ")} L ${bot.join(" L ")} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Bacon(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const meatC = p.meatColor ?? "#E0655E";
  const fatC = p.fatColor ?? "#FFF3EC";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // one strip: meat base band with fat stripes drawn on top (in segments along x)
  const strip = (yc: number, phase: number, x0: number, x1: number) => {
    const T = 62, A = 14;
    const segs: [number, number, string][] = [];
    const cuts = [x0, x0 + 70, x0 + 150, x0 + 220, x1];
    for (let i = 0; i < cuts.length - 1; i++) segs.push([cuts[i], cuts[i + 1], i % 2 ? fatC : meatC]);
    return (
      <g>
        <path d={band(x0, x1, yc, A, T, phase)} fill={meatC} stroke={shade(meatC, 0.25)} strokeWidth={3} />
        {segs.map(([a, b, col], i) => (i % 2 === 1 ? <path key={i} d={band(a, b, yc + 6, A, 14, phase)} fill={col} opacity={0.95} /> : null))}
        {/* crisp edges and highlight */}
        <path d={band(x0 + 20, x0 + 120, yc + 8, A, 6, phase)} fill="#FFFFFF" opacity={0.25} />
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={16} fill={C.shadow} />
      <g transform={tr}>
        <g transform="translate(0 -140)">{strip(0, 0, -180, 180)}</g>
        <g transform="translate(-20 -54) rotate(-4)">{strip(0, 1.6, -130, 130)}</g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Bacon {...p} />;
}
