import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Anatomical stomach, front view: the oesophagus comes down into the top, the big fundus bulges up and to
// the left, the greater curvature sweeps along the bottom and the pylorus opens into the duodenum on the right.
// Origin = centre (x, y). About 520 px tall and 560 px wide at s = 1. anim "churn" = a gentle squeeze wobble.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const col = p.color && p.color !== "none" ? p.color : C.pink;
  const dk = shade(col, 0.18), dk2 = shade(col, 0.32);
  const anim: string = p.anim ?? "none";
  const t = (f * 2 * Math.PI) / 50;
  const sx = anim === "churn" ? 1 + 0.03 * Math.sin(t) : 1;
  const sy = anim === "churn" ? 1 - 0.03 * Math.sin(t) : 1;
  const rot = anim === "churn" ? 2 * Math.sin(t / 2) : 0;
  const body = "M -10 -150 C -120 -230 -255 -170 -245 -30 C -238 100 -120 215 30 210 C 140 206 210 150 240 70 L 252 40 L 200 8 C 168 62 110 92 50 78 C -10 64 -40 -10 30 -128 Z";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1((p.flip ? -s : s) * sx)} ${f1(s * sy)}) rotate(${f1(rot)})`}>
      {/* oesophagus: a tube coming down into the top of the stomach */}
      <path d="M -6 -250 C -10 -205 -14 -175 -10 -140 L 34 -126 C 36 -170 38 -205 42 -250 Z" fill={dk} />
      <path d="M 4 -250 C 2 -210 0 -180 2 -146" stroke={shade(col, 0.05)} strokeWidth={10} fill="none" strokeLinecap="round" />
      {/* duodenum leaving the pylorus and curving down */}
      <path d="M 226 26 C 300 30 312 110 280 180" stroke={dk} strokeWidth={46} fill="none" strokeLinecap="round" />
      {/* pyloric ring */}
      <path d="M 252 40 L 200 8 L 196 22 L 246 54 Z" fill={dk2} />
      {/* stomach body */}
      <path d={body} fill={col} />
      {/* shade along the greater curvature */}
      <path d="M -245 -30 C -238 100 -120 215 30 210 C 140 206 210 150 240 70 C 190 140 120 176 30 176 C -100 176 -200 90 -245 -30 Z" fill={dk} />
      {/* inner folds (rugae) */}
      {["M -170 -90 C -150 -30 -120 20 -60 60", "M -130 -140 C -90 -60 -60 0 0 40", "M -200 10 C -150 80 -80 120 10 130", "M 60 120 C 110 120 160 100 200 60"].map((d, i) => (
        <path key={i} d={d} stroke={dk} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.7} />
      ))}
      {/* shine on the fundus */}
      <path d="M -190 -110 C -170 -160 -120 -180 -80 -170" stroke={C.white} strokeWidth={16} fill="none" strokeLinecap="round" opacity={0.45} />
    </g>
  );
}
