import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cobweb: radial spokes with concentric rings, drawn in pale grey-white. A tiny round friendly spider hangs on a
// thread from the centre. corner "top-left" / "top-right" anchors the web at the frame's top corner.
// Origin = centre of the web (x, y). About 560 px across at s = 1. anim "sway": the spider bobs on its thread.
const f1 = (v: number) => v.toFixed(1);
const R = 280, SPOKES = 8, RINGS = [0.22, 0.44, 0.66, 0.9];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 300;
  const corner: string = p.corner ?? "centre";
  const anim: string = p.anim ?? "sway";
  const ox = corner === "top-left" ? -R * 0.6 : corner === "top-right" ? R * 0.6 : 0;
  const oy = corner === "centre" ? 0 : -R * 0.2;
  const sway = anim === "sway" ? (Math.sin((f * 2 * Math.PI) / 90) + 1) * 14 : 0;
  const web = "#7F899E", line = "#8A93A8";
  const polyRing = (rr: number) => {
    const pts: string[] = [];
    for (let i = 0; i < SPOKES; i++) {
      const a = (i * 2 * Math.PI) / SPOKES;
      pts.push(`${f1(Math.cos(a) * R * rr)} ${f1(Math.sin(a) * R * rr)}`);
    }
    return `M ${pts.join(" L ")} Z`;
  };
  const spokes = Array.from({ length: SPOKES }, (_, i) => {
    const a = (i * 2 * Math.PI) / SPOKES;
    return <line key={i} x1={0} y1={0} x2={f1(Math.cos(a) * R)} y2={f1(Math.sin(a) * R)} stroke={line} strokeWidth={4} strokeLinecap="round" />;
  });
  return (
    <g transform={`translate(${f1(x + ox)} ${f1(y + oy)}) scale(${p.flip ? -s : s} ${s})`}>
      {spokes}
      {RINGS.map((rr, i) => <path key={i} d={polyRing(rr)} fill="none" stroke={line} strokeWidth={4} strokeLinejoin="round" />)}
      {/* spider on a thread from above the centre */}
      <line x1={0} y1={-R * 0.9} x2={0} y2={f1(-40 + sway)} stroke={web} strokeWidth={4} />
      <g transform={`translate(0 ${f1(-40 + sway)}) scale(1.5)`}>
        <ellipse cx={-20} cy={-6} rx={14} ry={10} fill={C.ink} transform="rotate(-20)" />
        <ellipse cx={0} cy={0} rx={22} ry={18} fill={C.inkSoft} />
        {[-14, 0, 14].map((lx) => <path key={lx} d={`M ${lx - 10} 16 L ${lx - 26} 30 M ${lx + 10} 16 L ${lx + 26} 30`} stroke={C.inkSoft} strokeWidth={4} strokeLinecap="round" />)}
        <circle cx={-7} cy={-4} r={5} fill={C.white} />
        <circle cx={7} cy={-4} r={5} fill={C.white} />
        <circle cx={-6} cy={-4} r={2.5} fill={C.ink} />
        <circle cx={8} cy={-4} r={2.5} fill={C.ink} />
        <path d="M -6 6 Q 0 11 6 6" stroke={C.white} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      </g>
      <circle cx={0} cy={0} r={8} fill={shade(web, 0.1)} />
    </g>
  );
}
