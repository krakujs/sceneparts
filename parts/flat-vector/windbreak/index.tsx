import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Windbreak: a row of tall, narrow poplar-style trees along a field edge, with a tilled soil strip in front.
// Origin = centre of the ground line. About 1000 px wide and 960 px tall at s = 1. anim "sway" rocks each tree gently.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
const TOPS = [-880, -940, -900, -960, -920, -940, -880];
const BOTTOM = -60;

/** A narrow poplar crown: pointed top, rounded sides, the right half in shade. Centred on x = 0. */
const poplar = (top: number, rx: number, c: string) => {
  const cy = (top + BOTTOM) / 2, ry = (BOTTOM - top) / 2;
  const whole = `M 0 ${f1(cy - ry)} C ${f1(rx)} ${f1(cy - ry * 0.55)} ${f1(rx)} ${f1(cy + ry * 0.7)} 0 ${f1(cy + ry)} C ${f1(-rx)} ${f1(cy + ry * 0.7)} ${f1(-rx)} ${f1(cy - ry * 0.55)} 0 ${f1(cy - ry)} Z`;
  const right = `M 0 ${f1(cy - ry)} C ${f1(rx)} ${f1(cy - ry * 0.55)} ${f1(rx)} ${f1(cy + ry * 0.7)} 0 ${f1(cy + ry)} Z`;
  return (
    <g>
      <path d={whole} fill={c} />
      <path d={right} fill={shade(c, 0.22)} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = pick(p.color, C.greenDark);
  const soil = pick(p.color2, "#B88A5A");
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-2} rx={500} ry={16} fill={C.shadow} />
        {TOPS.map((top, i) => {
          const tx = -420 + i * 140;
          const sw = anim === "sway" ? 2 * Math.sin((f * 2 * Math.PI) / 100 + i * 0.8) : 0;
          return (
            <g key={i} transform={`translate(${tx} 0) rotate(${f1(sw)} 0 ${BOTTOM})`}>
              <rect x={-6} y={BOTTOM} width={12} height={-BOTTOM} fill={C.brownDark} />
              {poplar(top, 66, leaf)}
            </g>
          );
        })}
        {/* tilled soil strip with furrows along the field edge */}
        <rect x={-510} y={-40} width={1020} height={40} rx={8} fill={soil} />
        {[-28, -14].map((fy) => (
          <line key={fy} x1={-500} y1={fy} x2={500} y2={fy} stroke={shade(soil, 0.25)} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
        ))}
      </g>
    </g>
  );
}
