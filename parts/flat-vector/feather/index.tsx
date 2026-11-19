import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Single soft bird feather: cream quill, two vanes with barbs. Origin = bottom of the quill (rests on y).
// About 260 px wide and 540 px tall at s = 1. anim "fall" drifts it down, swinging, and fades it in and out.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
const VANE_R = "M 0 -20 C 70 -60 112 -200 84 -340 C 62 -430 30 -492 0 -524 Z";
const VANE_L = "M 0 -20 C -70 -60 -112 -200 -84 -340 C -62 -430 -30 -492 0 -524 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const col = pick(p.color, "#8EC5E8");
  const quill = pick(p.color2, "#F4EBDD");
  const anim: string = p.anim ?? "none";
  // fall: one cycle of 120 frames; the feather slides down from above and fades in and out, so the loop is seamless
  const t = (f % 120) / 120;
  const dy = anim === "fall" ? -220 * (1 - t) : 0;
  const op = anim === "fall" ? Math.sin(Math.PI * t) : 1;
  const swing = anim === "fall" ? 10 * Math.sin((f * 2 * Math.PI) / 60) : 4;
  const dx = anim === "fall" ? 40 * Math.sin((f * 2 * Math.PI) / 60) : 0;
  const barbs: React.ReactElement[] = [];
  for (let i = 0; i < 9; i++) {
    const yy = -70 - i * 52;
    const k = -yy / 524;
    const e = 110 * Math.sin(Math.PI * Math.min(1, k * 1.05 + 0.08)) * (1 - 0.2 * k);
    barbs.push(
      <path key={i} d={`M 0 ${f1(yy)} L ${f1(e)} ${f1(yy - 34)} M 0 ${f1(yy)} L ${f1(-e)} ${f1(yy - 34)}`} stroke={shade(col, 0.3)} strokeWidth={4} strokeLinecap="round" opacity={0.6} fill="none" />
    );
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-2} rx={70} ry={10} fill={C.shadow} opacity={anim === "fall" ? 0 : 1} />
        <g opacity={op} transform={`translate(${f1(dx)} ${f1(dy)}) rotate(${f1(18 + swing)})`}>
          <path d={VANE_R} fill={shade(col, 0.15)} />
          <path d={VANE_L} fill={col} />
          {barbs}
          <path d="M -7 0 L 0 26 L 7 0 Z" fill={quill} />
          <rect x={-4} y={-530} width={8} height={540} rx={4} fill={quill} />
        </g>
      </g>
    </g>
  );
}
