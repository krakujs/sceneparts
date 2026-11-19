import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bigfoot: a tall, shaggy brown ape-like forest creature with a brow ridge and big feet, walking mid-stride. Custom drawing.
// Feet at 0,0, faces right, ~1050 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
const FACE = "#B89070", CLAW = "#3B2A1E";
const shag = (cx: number, cy: number, rx: number, ry: number, n: number, amp: number) => {
  const P: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, k = i % 2 ? 1 : 1 + amp;
    P.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  let d = `M ${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const c = P[i], q = P[(i + 1) % n];
    d += ` Q ${c[0].toFixed(1)} ${c[1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  }
  return d + " Z";
};
export default function Part(p: PartProps<any>) {
  const FUR = (p as any).color || "#7A5238", FURD = shade(FUR, 0.22);
  const { x = 540, y = 1560, s = 1, f = 0, flip } = p as any;
  const ph = f / 9, a = Math.sin(ph), b = -a;
  const lift = Math.abs(Math.cos(ph)) * 16;
  const bob = Math.abs(a) * 10;
  const footF = (k: number) => `translate(${k * 130} 0)`;
  return (
    <g transform={`translate(${x + (p.vx ?? 0) * f} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={280} ry={26} fill={C.shadow} />
      {/* back leg (swings forward/back) */}
      <g transform={`translate(-60 ${-420 - bob}) rotate(${b * 14} 0 0)`}>
        <path d="M 0 0 L 4 300" stroke={FURD} strokeWidth={150} strokeLinecap="round" />
        <path d={shag(18, 320 - lift * 0.4, 120, 58, 16, 0.08)} fill={CLAW} />
      </g>
      {/* hunched shaggy torso */}
      <path d={shag(0, -640 - bob * 0.5, 230, 260, 30, 0.08)} fill={FUR} />
      <path d={shag(30, -660, 150, 170, 24, 0.06)} fill={FURD} opacity={0.22} />
      {/* back arm reaching down */}
      <g transform={`translate(-170 ${-760 - bob * 0.4}) rotate(${b * 6} 0 0)`}>
        <path d="M 0 0 L -40 330" stroke={FURD} strokeWidth={120} strokeLinecap="round" />
        <circle cx={-44} cy={360} r={70} fill={FURD} />
      </g>
      {/* front leg (mid-stride, planted) */}
      <g transform={`translate(70 ${-420 - bob}) rotate(${a * 14} 0 0)`}>
        <path d="M 0 0 L -6 300" stroke={FUR} strokeWidth={156} strokeLinecap="round" />
        <path d={shag(-14, 322 - lift * 0.2, 126, 62, 16, 0.08)} fill={CLAW} />
      </g>
      {/* front arm swinging */}
      <g transform={`translate(176 ${-760 - bob * 0.4}) rotate(${a * 8} 0 0)`}>
        <path d="M 0 0 L 40 340" stroke={FUR} strokeWidth={124} strokeLinecap="round" />
        <circle cx={44} cy={370} r={74} fill={FUR} />
      </g>
      {/* head pushed forward with a brow ridge */}
      <g transform={`translate(70 ${-1000 - bob * 0.5})`}>
        <path d={shag(0, 0, 130, 124, 26, 0.06)} fill={FUR} />
        <path d="M -20 -20 Q 40 -130 110 -40 Q 96 -10 40 -24 Z" fill={FURD} />
        <ellipse cx={40} cy={50} rx={84} ry={70} fill={FACE} />
        <ellipse cx={40} cy={28} rx={0} ry={0} fill={FACE} />
        <ellipse cx={-8} cy={-6} rx={16} ry={10} fill={C.white} />
        <ellipse cx={-8} cy={-6} rx={7} ry={7} fill={C.ink} />
        <ellipse cx={58} cy={-6} rx={16} ry={10} fill={C.white} />
        <ellipse cx={58} cy={-6} rx={7} ry={7} fill={C.ink} />
        <path d="M 96 26 Q 118 30 124 50 Q 100 56 76 46" fill={FURD} />
        <ellipse cx={116} cy={44} rx={16} ry={11} fill={C.ink} />
        <path d="M 14 88 Q 46 102 84 84" stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
