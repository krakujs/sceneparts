import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ankle-high lace-up work boots: a pair in side view, pointing right. Tall shaft, chunky tread sole, pull tab at the
// back. Origin = bottom centre (soles rest on y). About 600 px wide and 480 px tall at s = 1.
// anim "bob": the pair bounces; "walk": the far boot lifts and steps.
const f1 = (v: number) => v.toFixed(1);

const Boot = ({ c, sole, tab }: { c: string; sole: string; tab: string }) => (
  <g>
    {/* upper: tall shaft, lace panel and vamp */}
    <path d="M -236 -76 L -236 -410 Q -236 -440 -206 -440 L -84 -440 L -84 -262 Q -40 -214 60 -204 L 150 -196 Q 258 -184 262 -110 L 262 -76 Z" fill={c} />
    {/* toe cap and collar band in shade */}
    <path d="M 170 -190 Q 258 -180 262 -110 L 262 -76 L 170 -76 Z" fill={shade(c, 0.18)} />
    <path d="M -236 -410 Q -236 -440 -206 -440 L -84 -440 L -84 -400 L -236 -400 Z" fill={shade(c, 0.25)} />
    {/* lace panel with cross laces */}
    <rect x={-200} y={-388} width={112} height={124} rx={6} fill={shade(c, 0.3)} />
    {[-372, -340, -308, -276].map((ly) =>
      [-172, -116].map((cx) => (
        <g key={`${ly}-${cx}`}>
          <line x1={cx - 18} y1={ly - 10} x2={cx + 18} y2={ly + 10} stroke={C.white} strokeWidth={7} strokeLinecap="round" />
          <line x1={cx + 18} y1={ly - 10} x2={cx - 18} y2={ly + 10} stroke={C.white} strokeWidth={7} strokeLinecap="round" />
        </g>
      )),
    )}
    {/* pull tab at the back of the collar */}
    <rect x={-246} y={-476} width={46} height={44} rx={8} fill={tab} />
    {/* chunky tread sole with a lighter cleat band */}
    <rect x={-250} y={-80} width={512} height={80} rx={16} fill={sole} />
    <rect x={-250} y={-80} width={512} height={18} rx={8} fill={shade(sole, -0.3)} />
    {[-222, -150, -78, -6, 66, 138].map((tx) => (
      <rect key={tx} x={tx} y={-26} width={34} height={26} rx={6} fill={shade(sole, 0.3)} />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const upper = p.color && p.color !== "none" ? p.color : C.brown;
  const sole = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * Math.PI) / 30)) * 10 : 0;
  const lift = anim === "walk" ? Math.max(0, Math.sin((f * Math.PI) / 30)) * 26 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={310} ry={14} fill={C.shadow} />
      <g transform={`translate(-51 ${f1(bob)})`}>
        <g transform={`translate(90 ${f1(-22 - lift)})`}>
          <Boot c={shade(upper, 0.25)} sole={shade(sole, 0.1)} tab={shade(sole, 0.1)} />
        </g>
        <Boot c={upper} sole={sole} tab={sole} />
      </g>
    </g>
  );
}
