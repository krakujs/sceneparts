import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Perforated postage stamp with an original picture (sun and mountains) and a wavy postmark over it.
// Origin = bottom centre of the stamp, which stands upright on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

// Stamp outline with semicircular perforation bites along all four edges (300 x 380, centred on 0,0).
const perforated = (w: number, h: number) => {
  const nx = 9, ny = 11, sx = w / nx, sy = h / ny, hw = w / 2, hh = h / 2;
  let d = `M ${-hw} ${-hh}`;
  for (let i = 0; i < nx; i++) d += ` A ${sx / 2} ${sx / 2} 0 0 0 ${f1(-hw + (i + 1) * sx)} ${-hh}`;
  for (let i = 0; i < ny; i++) d += ` A ${sy / 2} ${sy / 2} 0 0 0 ${hw} ${f1(-hh + (i + 1) * sy)}`;
  for (let i = 0; i < nx; i++) d += ` A ${sx / 2} ${sx / 2} 0 0 0 ${f1(hw - (i + 1) * sx)} ${hh}`;
  for (let i = 0; i < ny; i++) d += ` A ${sy / 2} ${sy / 2} 0 0 0 ${-hw} ${f1(hh - (i + 1) * sy)}`;
  return d + " Z";
};

// A wavy postmark line from x0 for len px.
const wave = (x0: number, y: number, len: number) => {
  let d = `M ${x0} ${y} q 12 -10 24 0`;
  for (let x = 24; x < len; x += 24) d += " t 24 0";
  return d;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={10} fill={C.shadow} />
      <g transform={`translate(0 -190) ${motion(anim, f)}`}>
        <path d={perforated(300, 380)} fill={body} />
        {/* white margin and picture window */}
        <rect x={-128} y={-168} width={256} height={336} rx={4} fill={C.white} />
        <rect x={-112} y={-152} width={224} height={230} fill={C.sky} />
        {/* sun */}
        <circle cx={60} cy={-80} r={34} fill={C.yellow} />
        {/* mountains with a snowy peak */}
        <path d="M -112 78 L -20 -40 L 60 78 Z" fill={C.greenDark} />
        <path d="M -60 78 L 20 -20 L 112 78 Z" fill={C.green} />
        <path d="M 2 -48 L 20 -20 L 36 -38 L 28 -36 L 20 -20 L 12 -36 Z" fill={C.white} />
        <rect x={-112} y={78} width={224} height={4} fill={shade(C.sky, 0.1)} />
        {/* wavy postmark */}
        {[-134, -114, -94].map((ly, i) => (
          <path key={i} d={wave(-30 + i * 6, ly, 150)} stroke={C.ink} strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.55} />
        ))}
      </g>
    </g>
  );
}
