import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Human ear, side view: outer rim, lobe, inner concha and ear canal, in a skin tone from the style.
// Centred on (x, y), about 240 px wide and 350 px tall at s = 1. Sound arcs come in from the left.
// anim "sound": the arcs pulse one after another, moving toward the ear.
const f1 = (v: number) => v.toFixed(1);
const SHELL = "M 10 -160 C 95 -170 135 -95 122 -20 C 116 25 98 48 100 92 C 103 150 55 178 5 172 C -28 168 -42 142 -32 120 C -70 124 -96 96 -92 52 C -92 -20 -105 -90 -70 -130 C -50 -150 -20 -158 10 -160 Z";

// points on a circle from angle a0 to a1 (degrees), as a polyline
const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 12; i++) {
    const a = ((a0 + ((a1 - a0) * i) / 12) * Math.PI) / 180;
    pts.push(`${i === 0 ? "M" : "L"} ${f1(cx + r * Math.cos(a))} ${f1(cy + r * Math.sin(a))}`);
  }
  return pts.join(" ");
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const skin = skinColour(p.skin ?? "fair");
  const dk = shade(skin, 0.16);
  const inner = shade(skin, 0.26);
  const anim: string = p.anim ?? "none";
  const cx = 50, cy = 20; // ear canal, where the sound goes in
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(s)})`}>
      {/* sound arcs on the left, inner ones first */}
      {[0, 1, 2].map((i) => {
        const r = 170 + i * 60;
        const lit = anim === "sound" ? 0.2 + 0.8 * Math.max(0, Math.sin((f * 2 * Math.PI) / 36 + i * 1.2)) : 1;
        return (
          <path key={i} d={arc(cx - 60, cy, r, 140, 220)} stroke={C.blue} strokeWidth={16} strokeLinecap="round" fill="none" opacity={f1(lit)} />
        );
      })}
      <g transform="translate(60 0)">
        <ellipse cx={0} cy={172} rx={130} ry={12} fill={C.shadow} />
        {/* shadow edge, then the shell */}
        <path d={SHELL} fill={dk} transform="translate(-8 6)" />
        <path d={SHELL} fill={skin} />
        {/* rim line inside the shell */}
        <path d="M 20 -120 C 80 -110 96 -50 84 0" stroke={dk} strokeWidth={12} strokeLinecap="round" fill="none" />
        {/* concha and ear canal */}
        <ellipse cx={-6} cy={14} rx={44} ry={58} fill={inner} />
        <ellipse cx={-10} cy={20} rx={16} ry={20} fill={shade(skin, 0.45)} />
        {/* lobe */}
        <ellipse cx={30} cy={122} rx={20} ry={22} fill={dk} />
      </g>
    </g>
  );
}
