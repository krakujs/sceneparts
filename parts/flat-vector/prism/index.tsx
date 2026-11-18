import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Triangular glass prism standing on its base, with a white beam entering the left face and a rainbow fan leaving the right face.
// Origin = bottom centre (the prism rests on y). About 1000 px wide and 340 px tall at s = 1 (with the beam).
// anim "light": the beam travels in and the rainbow fans out, looping every 120 frames.
const f1 = (v: number) => v.toFixed(1);
const RAYS = [
  { c: C.red, a: -12 }, { c: C.orange, a: -7 }, { c: C.yellow, a: -2 },
  { c: C.green, a: 3 }, { c: C.blue, a: 8 }, { c: C.purple, a: 13 },
];
const EX = 92, EY = -150; // where the beam leaves the right face

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const glass = p.color && p.color !== "none" ? p.color : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const ph = (f % 120) / 120;
  const beamEnd = anim === "light" ? -480 + 387 * Math.min(1, 0.15 + ph * 1.7) : -92;
  const q = anim === "light" ? Math.min(1, Math.max(0, (ph - 0.35) * 2.2)) : 1;
  const rayLen = 420 * (0.15 + 0.85 * q);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      {/* white beam entering the left face */}
      <line x1={-480} y1={-150} x2={f1(beamEnd)} y2={-150} stroke={C.white} strokeWidth={22} strokeLinecap="round" />
      {/* rainbow fan leaving the right face */}
      {anim === "none" || q > 0 ? RAYS.map((r, i) => {
        const rad = (r.a * Math.PI) / 180;
        const ex = EX + rayLen * Math.cos(rad), ey = EY + rayLen * Math.sin(rad);
        return <line key={i} x1={EX} y1={EY} x2={f1(ex)} y2={f1(ey)} stroke={r.c} strokeWidth={14} strokeLinecap="round" />;
      }) : null}
      {/* triangular prism: left face lit, right face in shade */}
      <path d="M -170 0 L 170 0 L 0 -330 Z" fill={glass} />
      <path d="M 0 -330 L 170 0 L 0 0 Z" fill={shade(glass, 0.2)} />
      <path d="M -150 -40 L -60 -270" stroke={C.white} strokeWidth={14} strokeLinecap="round" opacity={0.55} />
    </g>
  );
}
